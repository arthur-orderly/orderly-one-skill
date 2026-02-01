#!/usr/bin/env node
/**
 * WalletConnect Auto-Signer
 * 
 * Connects to a dApp via WalletConnect and automatically signs requests.
 * Used to automate wallet interactions with dex.orderly.network.
 * 
 * Usage:
 *   node wallet-signer.mjs --wallet <path> --uri <wc:uri>
 */

import { ethers } from 'ethers';
import { readFileSync } from 'fs';
import { Core } from '@walletconnect/core';
import { WalletKit } from '@reown/walletkit';
import { parseArgs } from 'util';
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils';

const { values: args } = parseArgs({
  options: {
    wallet: { type: 'string', short: 'w' },
    uri: { type: 'string', short: 'u' },
    chain: { type: 'string', default: 'ethereum' },
    help: { type: 'boolean', short: 'h' }
  }
});

if (args.help || !args.wallet) {
  console.log(`
🔐 WalletConnect Auto-Signer

Usage:
  node wallet-signer.mjs --wallet <path> --uri <wc:uri>

Options:
  -w, --wallet <path>   Path to wallet JSON file
  -u, --uri <string>    WalletConnect URI (from QR code)
  --chain <string>      Chain to use (ethereum|base|arbitrum|optimism)
  -h, --help            Show this help

Steps:
  1. Go to dex.orderly.network and click Connect
  2. Choose WalletConnect
  3. Copy the WC URI or scan with this script
  4. Run: node wallet-signer.mjs --wallet secrets/wallet.json --uri "wc:..."
`);
  process.exit(0);
}

const CHAINS = {
  ethereum: { chainId: 1, name: 'Ethereum' },
  base: { chainId: 8453, name: 'Base' },
  arbitrum: { chainId: 42161, name: 'Arbitrum' },
  optimism: { chainId: 10, name: 'Optimism' }
};

const RPC_URLS = {
  1: 'https://eth.llamarpc.com',
  8453: 'https://mainnet.base.org',
  42161: 'https://arb1.arbitrum.io/rpc',
  10: 'https://mainnet.optimism.io'
};

// Reown Project ID from dashboard.reown.com (NOT the URL ID!)
const PROJECT_ID = 'bc93b89449caef24aca0c472fa63bd3b';

class WalletConnectSigner {
  constructor(walletPath) {
    const walletData = JSON.parse(readFileSync(walletPath, 'utf8'));
    this.wallet = new ethers.Wallet(walletData.privateKey);
    this.walletkit = null;
    
    console.log('🔐 WalletConnect Auto-Signer');
    console.log('============================\n');
    console.log(`Address: ${this.wallet.address}`);
    console.log(`Project: ${PROJECT_ID}`);
  }
  
  async initialize() {
    console.log('\n⏳ Initializing WalletKit...');
    
    const core = new Core({
      projectId: PROJECT_ID
    });
    
    this.walletkit = await WalletKit.init({
      core,
      metadata: {
        name: 'Arthur Agent Wallet',
        description: 'Automated wallet for AI agents on Orderly Network',
        url: 'https://orderly.network',
        icons: ['https://orderly.network/favicon.png']
      }
    });
    
    // Set up event handlers
    this.walletkit.on('session_proposal', this.onSessionProposal.bind(this));
    this.walletkit.on('session_request', this.onSessionRequest.bind(this));
    this.walletkit.on('session_delete', () => {
      console.log('📤 Session deleted');
    });
    
    console.log('✅ WalletKit initialized\n');
  }
  
  async onSessionProposal({ id, params }) {
    console.log('📥 Session proposal received');
    console.log(`   From: ${params.proposer.metadata.name}`);
    console.log(`   URL: ${params.proposer.metadata.url}`);
    
    try {
      // Build approved namespaces for all EVM chains
      const namespaces = buildApprovedNamespaces({
        proposal: params,
        supportedNamespaces: {
          eip155: {
            chains: ['eip155:1', 'eip155:8453', 'eip155:42161', 'eip155:10'],
            methods: [
              'eth_sendTransaction',
              'eth_signTransaction',
              'eth_sign',
              'personal_sign',
              'eth_signTypedData',
              'eth_signTypedData_v3',
              'eth_signTypedData_v4',
              'wallet_switchEthereumChain',
              'wallet_addEthereumChain'
            ],
            events: ['accountsChanged', 'chainChanged'],
            accounts: [
              `eip155:1:${this.wallet.address}`,
              `eip155:8453:${this.wallet.address}`,
              `eip155:42161:${this.wallet.address}`,
              `eip155:10:${this.wallet.address}`
            ]
          }
        }
      });
      
      const session = await this.walletkit.approveSession({ id, namespaces });
      console.log('✅ Session approved');
      console.log(`   Topic: ${session.topic}\n`);
      return session;
    } catch (error) {
      console.error('❌ Failed to approve session:', error.message);
      await this.walletkit.rejectSession({
        id,
        reason: getSdkError('USER_REJECTED')
      });
    }
  }
  
  async onSessionRequest({ topic, params, id }) {
    const { request, chainId } = params;
    console.log(`\n📝 Sign request: ${request.method}`);
    console.log(`   Chain: ${chainId}`);
    
    try {
      let result;
      
      switch (request.method) {
        case 'personal_sign': {
          const message = request.params[0];
          const messageText = ethers.toUtf8String(message);
          console.log(`   Message preview: ${messageText.substring(0, 80)}...`);
          result = await this.wallet.signMessage(ethers.getBytes(message));
          break;
        }
        
        case 'eth_sign': {
          const message = request.params[1];
          result = await this.wallet.signMessage(ethers.getBytes(message));
          break;
        }
        
        case 'eth_signTypedData':
        case 'eth_signTypedData_v3':
        case 'eth_signTypedData_v4': {
          const data = typeof request.params[1] === 'string' 
            ? JSON.parse(request.params[1]) 
            : request.params[1];
          const { domain, types, message, primaryType } = data;
          
          // Remove EIP712Domain from types if present
          const typesWithoutDomain = { ...types };
          delete typesWithoutDomain.EIP712Domain;
          
          console.log(`   Type: ${primaryType}`);
          result = await this.wallet.signTypedData(domain, typesWithoutDomain, message);
          break;
        }
        
        case 'eth_sendTransaction': {
          const tx = request.params[0];
          console.log(`   To: ${tx.to}`);
          console.log(`   Value: ${tx.value || '0'}`);
          
          // Get provider for chain
          const chainNum = parseInt(chainId.split(':')[1]);
          const rpc = RPC_URLS[chainNum] || RPC_URLS[1];
          
          const provider = new ethers.JsonRpcProvider(rpc);
          const signer = this.wallet.connect(provider);
          
          // Prepare transaction
          const txRequest = {
            to: tx.to,
            value: tx.value || 0,
            data: tx.data || '0x',
          };
          
          if (tx.gas) txRequest.gasLimit = tx.gas;
          if (tx.gasPrice) txRequest.gasPrice = tx.gasPrice;
          if (tx.maxFeePerGas) txRequest.maxFeePerGas = tx.maxFeePerGas;
          if (tx.maxPriorityFeePerGas) txRequest.maxPriorityFeePerGas = tx.maxPriorityFeePerGas;
          
          const txResponse = await signer.sendTransaction(txRequest);
          console.log(`   TX Hash: ${txResponse.hash}`);
          result = txResponse.hash;
          break;
        }
        
        case 'wallet_switchEthereumChain': {
          console.log(`   Switching to chain: ${request.params[0].chainId}`);
          result = null;
          break;
        }
        
        default:
          throw new Error(`Unsupported method: ${request.method}`);
      }
      
      await this.walletkit.respondSessionRequest({
        topic,
        response: {
          id,
          jsonrpc: '2.0',
          result
        }
      });
      
      console.log('✅ Request signed successfully\n');
    } catch (error) {
      console.error('❌ Signing failed:', error.message);
      await this.walletkit.respondSessionRequest({
        topic,
        response: {
          id,
          jsonrpc: '2.0',
          error: {
            code: -32000,
            message: error.message
          }
        }
      });
    }
  }
  
  async pair(uri) {
    console.log('🔗 Pairing with WalletConnect URI...');
    try {
      await this.walletkit.pair({ uri });
      console.log('✅ Pairing initiated - waiting for session approval...\n');
    } catch (error) {
      console.error('❌ Pairing failed:', error.message);
      throw error;
    }
  }
  
  async run(uri) {
    await this.initialize();
    
    if (uri) {
      await this.pair(uri);
    } else {
      console.log('⏳ No URI provided. Waiting for connection...');
      console.log('   Get WC URI from dex.orderly.network and run:');
      console.log(`   node wallet-signer.mjs --wallet ${args.wallet} --uri "wc:..."\n`);
    }
    
    // Keep running
    console.log('🔄 Listening for requests... (Ctrl+C to stop)\n');
    
    // Keep process alive
    process.on('SIGINT', () => {
      console.log('\n👋 Shutting down...');
      process.exit(0);
    });
    
    // Heartbeat to keep connection alive
    setInterval(() => {
      // Keep alive
    }, 30000);
    
    await new Promise(() => {});
  }
}

async function main() {
  try {
    const signer = new WalletConnectSigner(args.wallet);
    await signer.run(args.uri);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();

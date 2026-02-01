---
name: orderly-one
description: Launch and graduate a DEX on Orderly One to earn trading fees. Use when user wants to create a perp DEX, get a broker ID, or start earning from trading volume. Requires ~10,000 ORDER tokens for graduation ($750 with discount).
---

# Orderly One DEX Creation

Create a perpetual futures DEX using Orderly Network's whitelabel infrastructure.

## Overview

Orderly One lets anyone launch a DEX frontend that connects to Orderly's shared liquidity. You earn trading fees from volume on your DEX. The process:

1. **Get Broker ID** → Register on Orderly One Hub
2. **Graduate** → Stake ORDER tokens for independent deployment rights
3. **Deploy** → Fork whitelabel template, configure, deploy to Vercel

## Prerequisites

- **Wallet**: MetaMask or WalletConnect-compatible
- **ORDER tokens**: ~10,000 ORDER for graduation (~$750 with early adopter discount, ~$1,500 at full price)
- **GitHub account**: For forking the template
- **Vercel account**: For deployment (free tier works)

## Step 1: Register on Orderly One Hub

1. Go to https://orderlyonehub.orderly.network
2. Connect wallet (supports multiple chains)
3. Create a Broker ID (your DEX identifier)
4. Note your **Broker ID** - needed for configuration

## Step 2: Graduate Your DEX

Graduation unlocks independent deployment (vs embedded iframe).

1. In Orderly One Hub, find "Graduate" section
2. Stake required ORDER tokens (~10,000 with discount)
3. Wait for graduation confirmation
4. You now have deployment rights

## Step 3: Get Configuration Values

After graduation, collect these from Orderly One Hub:

| Value | Description | Example |
|-------|-------------|---------|
| `BROKER_ID` | Your registered broker name | `arthur_orderly` |
| `ORDERLY_SECRET` | Base58-encoded private key | `5abc...xyz` |
| `ORDERLY_ACCOUNT_ID` | Your account identifier | `0x123...` |

## Step 4: Fork & Configure Template

### Fork the Repository

```bash
# Fork from GitHub UI or CLI
gh repo fork ArtDeFi/arthur-dex --clone
cd arthur-dex
```

The official whitelabel template: https://github.com/ArtDeFi/arthur-dex

### Configure Environment

Create `.env` file:

```env
BROKER_ID=your_broker_id
ORDERLY_SECRET=your_base58_private_key
ORDERLY_ACCOUNT_ID=your_account_id
```

### Customize Branding (Optional)

Edit `app/config/branding.ts` or similar config files to:
- Change logo and colors
- Update DEX name
- Modify default trading pairs

## Step 5: Deploy to Vercel

### Option A: Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your forked repository
3. **Critical Settings**:
   - Framework Preset: `Vite`
   - Output Directory: `build/client` (NOT `dist`!)
   - Build Command: `npm run build` (default)
4. Add Environment Variables:
   - `BROKER_ID`
   - `ORDERLY_SECRET`
   - `ORDERLY_ACCOUNT_ID`
5. Deploy

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Common Issues

### Build Fails: "No Output Directory"

**Cause**: Vercel defaults to `dist` but React Router v7/Remix outputs to `build/client`

**Fix**: In Vercel Settings → Build & Development:
- Set Output Directory to `build/client`
- Redeploy

### "Could not find .next" Error

**Cause**: Vercel auto-detected Next.js but project uses Vite

**Fix**: 
- Set Framework Preset to `Vite` (not auto-detect)
- Ensure Output Directory is `build/client`

### Environment Variables Not Working

**Fix**: 
- Add all three env vars in Vercel dashboard
- Trigger redeploy after adding variables
- Check for typos in variable names

## Verification

After deployment:

1. Visit your Vercel URL (e.g., `your-dex.vercel.app`)
2. Should see trading interface with:
   - Connect wallet button
   - Trading pairs (ETH-PERP, BTC-PERP, etc.)
   - Order book and trade history
   - "Powered by Orderly" footer
3. Connect wallet and verify you can see markets

## Revenue Model

- You earn a percentage of trading fees from volume on your DEX
- Fees are settled in USDC
- Track earnings in Orderly One Hub dashboard
- Higher volume = higher earnings

## Automation Scripts

This skill includes scripts for automated graduation:

### `scripts/graduate.mjs`
Check balances and broker ID availability:
```bash
node graduate.mjs --wallet secrets/wallet.json --name "My DEX" --dry-run
```

### `scripts/wallet-signer.mjs`
Auto-sign WalletConnect requests for headless operation:
```bash
node wallet-signer.mjs --wallet secrets/wallet.json --uri "wc:..."
```

**Note**: These scripts require `npm install ethers @walletconnect/core @reown/walletkit`

## References

For detailed information:
- **Vercel Deployment**: See [references/vercel-deployment.md](references/vercel-deployment.md) for build settings and troubleshooting
- **Orderly Hub**: See [references/orderly-hub.md](references/orderly-hub.md) for registration and graduation details

## Resources

- Orderly One Hub: https://orderlyonehub.orderly.network
- Orderly Docs: https://docs.orderly.network
- Whitelabel Template: https://github.com/ArtDeFi/arthur-dex
- ORDER Token: Available on major DEXs (Uniswap, etc.)

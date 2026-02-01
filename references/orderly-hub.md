# Orderly One Hub Guide

## What is Orderly One?

Orderly One is a platform that lets anyone launch their own perpetual futures DEX by:
- Providing shared liquidity across all DEXs
- Handling the complex trading infrastructure
- Offering whitelabel frontend templates
- Managing settlement and risk

You focus on branding and user acquisition; Orderly handles the trading engine.

## Registration Process

### 1. Access the Hub

URL: https://orderlyonehub.orderly.network

Supported wallets:
- MetaMask
- WalletConnect
- Coinbase Wallet
- And others

### 2. Connect Wallet

1. Click "Connect Wallet"
2. Select your wallet provider
3. Approve the connection
4. Sign the message to authenticate

### 3. Create Broker ID

Your Broker ID is your unique identifier in the Orderly ecosystem.

**Requirements:**
- Lowercase letters, numbers, underscores only
- Must be unique across all Orderly DEXs
- Cannot be changed after creation

**Examples:**
- `my_dex`
- `cryptotrade`
- `arthur_orderly`

### 4. Initial Setup (Sandbox)

Before graduation, you can:
- Test with the embedded iframe widget
- Explore the dashboard
- See sample analytics
- Understand the revenue model

## Graduation

Graduation unlocks independent deployment rights.

### Why Graduate?

| Feature | Pre-Graduation | Post-Graduation |
|---------|---------------|-----------------|
| Deployment | Embedded iframe only | Full standalone app |
| Customization | Limited | Full branding control |
| Revenue Share | Lower tier | Higher tier |
| Support | Community | Priority |

### Graduation Cost

Two payment options:
- **USDC**: $1,000
- **ORDER tokens**: $750 worth (25% discount)

The ORDER option saves you $250 and supports the ecosystem.

### How to Graduate

1. Acquire ORDER tokens (Uniswap, exchanges)
2. In Hub, go to "Graduation" section
3. Click "Graduate Now"
4. Approve token spend
5. Confirm staking transaction
6. Wait for confirmation (usually <1 minute)

### After Graduation

You receive:
- Full deployment rights
- Access to secrets/API keys
- Priority support channel
- Enhanced dashboard analytics

## Configuration Values

After graduation, find these in the Hub:

### BROKER_ID
- Location: Profile/Settings
- Format: String (your chosen ID)
- Example: `arthur_orderly`

### ORDERLY_SECRET
- Location: API Keys section
- Format: Base58-encoded private key
- **Keep this secure!** Never commit to git

### ORDERLY_ACCOUNT_ID
- Location: Account section
- Format: Hex address
- Example: `0x1234...abcd`

## Dashboard Features

### Analytics
- Trading volume (24h, 7d, 30d)
- Number of trades
- Unique traders
- Revenue earned

### Revenue
- Real-time fee accrual
- Settlement history
- Payout schedule
- Revenue breakdown by pair

### Settings
- Update profile
- Regenerate API keys
- Configure webhooks
- Manage team access

## Revenue Model

### How Fees Work

1. User trades on your DEX
2. Orderly charges trading fee (e.g., 0.05% taker, 0.02% maker)
3. You receive a percentage of that fee
4. Settlement happens periodically in USDC

### Revenue Tiers

Higher volume = better revenue share. Exact tiers:
- Check Orderly docs for current tier structure
- Generally ranges from 30-70% revenue share

### Payout

- Minimum threshold: Usually $10-50 USDC
- Frequency: Daily or weekly depending on tier
- Method: Direct to connected wallet

## Support

- Discord: Orderly Network Discord
- Docs: https://docs.orderly.network
- Email: Support through Hub

## Security Best Practices

1. **Never share ORDERLY_SECRET**
2. Use environment variables, not hardcoded values
3. Rotate keys if compromised
4. Enable 2FA on connected wallet
5. Use hardware wallet for large stakes

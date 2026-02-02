# Orderly One Platform Reference

> **URL:** https://dex.orderly.network

## Platform Overview

Orderly One is a no-code AI-powered platform for creating perpetual futures DEXs. Launched September 2025.

## Navigation

- **Home** (`/`) - Landing page with "Start Building" CTA
- **Board** (`/board`) - Browse all DEXs in the ecosystem
- **Case Studies** (`/case-studies`) - Success stories
- **Distributor** (`/distributor`) - Distributor program info
- **My DEX** (`/dex`) - Manage your DEX (requires wallet connection)

## Creating a DEX

### Step 1: Connect Wallet
- Click "Start Building" or navigate to My DEX
- Connect via MetaMask, WalletConnect, or supported wallets
- Supports multiple EVM chains

### Step 2: AI Configuration
- AI generates your DEX configuration
- Customizable branding, themes, colors
- Set social links and wallet options

### Step 3: Automatic Deployment
- Orderly creates GitHub repository
- Pattern: `OrderlyNetworkDexCreator/<dex-name>`
- Deploys to GitHub Pages automatically
- Default URL: `https://orderlynetworkdexcreator.github.io/<dex-name>`

## Graduation

Graduation unlocks fee revenue sharing. Access via My DEX → Graduation.

### What Graduation Provides
1. **Fee Revenue** - Earn from trading fees
2. **Broker ID** - Unique ecosystem identifier
3. **Custom Fees** - Set your own fee structure
4. **Board Listing** - Public visibility
5. **WOOFi Revenue** - Swap fee earnings

### Fee Structure Post-Graduation

Default fees (customizable):
- Maker: 3 bps (0.03%)
- Taker: 6 bps (0.06%)
- RWA Maker: 0 bps
- RWA Taker: 5 bps

Your revenue = Custom fee - Orderly base fee

### Builder Staking Programme

Stake ORDER to reduce base fees:

| Tier | Requirement | Base Taker Fee |
|------|-------------|----------------|
| PUBLIC | None | 3.00 bps |
| SILVER | $30M vol OR 100K ORDER | 2.75 bps |
| GOLD | $90M vol OR 250K ORDER | 2.50 bps |
| PLATINUM | $1B vol OR 2M ORDER | 2.00 bps |
| DIAMOND | $10B vol OR 7M ORDER | 1.00 bps |

**Important:** Stake ORDER from the same wallet used to create your DEX.

## My DEX Dashboard Features

### Configure Your DEX (`/dex/config`)
- Branding customization
- Logo and color schemes
- Social media links
- Wallet configuration

### DEX Card Setup (`/dex/card`)
- Board listing appearance
- Description and banner
- Token information
- Only visible after graduation

### Point Campaign (`/points`)
- Volume-based rewards
- PNL coefficients
- Referral bonuses

### Referral Settings (`/referral`)
- Auto referral program
- Commission structure
- Community growth tools

### Deployment Status
- View GitHub Actions status
- Track deployment progress
- Recent workflow runs

## Custom Domain

Configure in My DEX → Custom Domain Setup.

### DNS Requirements

**A Records (4 required):**
```
Type: A
Name: @
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
TTL: 3600
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: orderlynetworkdexcreator.github.io
TTL: 3600
```

### TradingView License
Custom domains require your own TradingView Advanced Charts license.
Apply at: https://www.tradingview.com/advanced-charts/

### Email Security (Recommended)
```
SPF: TXT @ "v=spf1 -all"
DMARC: TXT _dmarc "v=DMARC1; p=reject; sp=reject; aspf=s; adkim=s"
```

## Revenue & Analytics

### Fee Revenue
- Claimable in graduation dashboard
- Updated daily
- Paid in USDC

### WOOFi Swap Fees
- Separate claimable balance
- From swap page transactions

### Revenue Calculator
Available at `/dex/graduation`:
- Input expected volume
- Select staking tier
- Estimate monthly earnings

## Support & Resources

- **Docs:** https://orderly.network/docs
- **Builder Guidelines:** https://orderly.network/docs/introduction/orderly-one/builder-guidelines
- **Staking Info:** https://orderly.network/docs/build-on-omnichain/user-flows/builder-staking-programme
- **Discord:** https://discord.com/invite/orderlynetwork
- **Telegram:** https://t.me/Orderly_Discussions

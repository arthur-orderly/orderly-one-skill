---
name: orderly-one
description: Launch a perpetual futures DEX on Orderly One - a no-code platform. Use when user wants to create a perp DEX, earn trading fees, or manage their DEX. Graduation unlocks fee revenue sharing.
---

# Orderly One DEX Creation

Create a perpetual futures DEX using Orderly Network's no-code platform.

## Overview

Orderly One is an AI-powered no-code platform to launch a perp DEX in minutes. Your DEX connects to Orderly's shared liquidity (15+ chains, 140+ assets, up to 100x leverage). You earn trading fees from volume on your DEX.

**Key Stats:** 700K+ traders, 55+ partners, $110B+ cumulative volume

## Quick Start (5 Minutes)

1. Go to **https://dex.orderly.network**
2. Connect wallet (MetaMask or WalletConnect)
3. Click **"Start Building"**
4. AI generates your DEX configuration
5. Orderly creates a GitHub repo and deploys to GitHub Pages
6. **Graduate** to unlock fee revenue sharing
7. (Optional) Configure custom domain

No coding required. No manual deployment.

## Platform Navigation

| Page | URL | Purpose |
|------|-----|---------|
| Home | dex.orderly.network | Landing page, start building |
| Board | dex.orderly.network/board | Browse all DEXs |
| My DEX | dex.orderly.network/dex | Manage your DEX |
| Graduation | dex.orderly.network/dex/graduation | Graduate & view earnings |
| Config | dex.orderly.network/dex/config | Customize branding |

## Graduation

Graduation unlocks fee revenue sharing. Send ORDER tokens to graduate.

### Benefits of Graduation

- **Fee Revenue:** Earn from all trading fees on your DEX
- **Unique Broker ID:** Your identifier in the Orderly ecosystem
- **Custom Fees:** Set your own maker/taker fee structure
- **WOOFi Swap Fees:** Earn from swap page transactions
- **Board Listing:** Your DEX appears on the public board

### Builder Staking Tiers

Stake ORDER tokens to reduce Orderly's base fee and maximize your revenue:

| Tier | Volume (30d) | OR Staking | Base Taker Fee |
|------|--------------|------------|----------------|
| PUBLIC | - | - | 3.00 bps |
| SILVER | ≥$30M | 100K ORDER | 2.75 bps |
| GOLD | ≥$90M | 250K ORDER | 2.50 bps |
| PLATINUM | ≥$1B | 2M ORDER | 2.00 bps |
| DIAMOND | ≥$10B | 7M ORDER | 1.00 bps |

**Your Revenue = Your Custom Fee - Base Fee**

Example: If you set 6 bps taker fee and you're PUBLIC tier (3 bps base), you earn 3 bps.

## Custom Domain Setup

After creating your DEX, you can add a custom domain:

1. Go to **My DEX** → scroll to **Custom Domain Setup**
2. Enter your domain name
3. Configure DNS at your registrar:

**A Records (create 4):**
- Type: `A`
- Name: `@`
- Values: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

**CNAME Record:**
- Type: `CNAME`
- Name: `www`
- Value: `orderlynetworkdexcreator.github.io`

4. Wait for DNS propagation (up to 24 hours)
5. Apply for TradingView Advanced Charts license for custom domains

### Email Security Records (Recommended)

Prevent email spoofing on your domain:

**SPF Record:**
- Type: `TXT`, Name: `@`, Value: `v=spf1 -all`

**DMARC Record:**
- Type: `TXT`, Name: `_dmarc`, Value: `v=DMARC1; p=reject; sp=reject; aspf=s; adkim=s`

## DEX Management Features

### Configure Your DEX
- Branding (logos, colors, themes)
- Social links
- Wallet options
- Advanced settings

### DEX Card Setup
- Description and banner for board listing
- Logo and token information
- Only visible after graduation

### Point Campaign
- Configure trading volume coefficients
- PNL-based rewards
- Referral bonuses

### Referral Settings
- Auto referral program
- Incentivize traders
- Grow community

## Deployment

Orderly One handles deployment automatically:

1. Creates GitHub repo: `OrderlyNetworkDexCreator/<your-dex-name>`
2. Deploys to GitHub Pages
3. Updates deploy on config changes (2-5 minutes)

You can monitor deployment status in **My DEX** → **Updates & Deployment Status**

## Revenue Model

- **Trading Fees:** Your custom fee minus Orderly base fee
- **Swap Fees:** WOOFi integration earnings (claimable in dashboard)
- **Settlements:** Fees paid in USDC

### Revenue Calculator

Available at dex.orderly.network/dex/graduation:
- Input monthly trading volume
- Select your staking tier
- See estimated maker/taker revenue

Example: $10M monthly volume at PUBLIC tier with 3/6 bps maker/taker fees = ~$3K/month revenue

## Who Is This For?

- **Trading Communities:** Capture 100% of your community's fees
- **Meme Projects:** Give your token utility with buyback revenue
- **DeFi Protocols:** Add perpetuals without development
- **Everyone:** Your exchange, your rules

## Resources

- **Orderly One:** https://dex.orderly.network
- **Documentation:** https://orderly.network/docs
- **Builder Guidelines:** https://orderly.network/docs/introduction/orderly-one/builder-guidelines
- **Staking Programme:** https://orderly.network/docs/build-on-omnichain/user-flows/builder-staking-programme
- **ORDER Staking:** https://app.orderly.network
- **Analytics:** https://dune.com/orderly_network/orderly-dashboard

## Troubleshooting

### DEX Not Loading
- Check deployment status in My DEX dashboard
- Wait for GitHub Actions to complete (2-5 min)
- Clear browser cache

### Custom Domain Not Working
- Verify DNS records are correct
- Wait up to 24 hours for propagation
- Check CNAME points to `orderlynetworkdexcreator.github.io`

### Fee Revenue Not Showing
- Ensure DEX is graduated
- Revenue updates daily
- Use same wallet for staking as DEX setup

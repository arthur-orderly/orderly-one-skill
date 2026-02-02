# GitHub Pages Deployment Reference

> **Note:** Orderly One now handles deployment automatically. This reference is for understanding the system.

## Automatic Deployment

When you create a DEX on Orderly One:

1. **Repository Created:** `OrderlyNetworkDexCreator/<your-dex-name>`
2. **GitHub Actions:** Automatically builds and deploys
3. **GitHub Pages:** Hosts your DEX at `orderlynetworkdexcreator.github.io/<your-dex-name>`

## How It Works

### Repository Structure
```
OrderlyNetworkDexCreator/<dex-name>/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── app/
│   └── config/             # Your DEX configuration
├── build/
│   └── client/             # Built output
└── package.json
```

### Deployment Workflow

1. You update config in Orderly One dashboard
2. Orderly One commits changes to your repo
3. GitHub Actions triggers "Deploy to GitHub Pages" workflow
4. Build runs (typically 2-5 minutes)
5. Changes go live on your DEX URL

### Monitoring Deployments

In **My DEX** dashboard:
- Scroll to "Updates & Deployment Status"
- Shows recent workflow runs with status
- Click "Refresh" to update status
- "Success" = changes are live

## Custom Domain Configuration

### In Orderly One
1. Go to My DEX → Custom Domain Setup
2. Enter your domain (e.g., `mydex.com`)
3. Click save

### At Your DNS Provider

**A Records (create 4):**
| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**CNAME Record:**
| Type | Name | Value |
|------|------|-------|
| CNAME | www | orderlynetworkdexcreator.github.io |

### Propagation
- DNS changes can take up to 24 hours
- Often completes within a few hours
- GitHub automatically provisions SSL certificate

## Troubleshooting

### Build Fails
- Check workflow status in My DEX dashboard
- Orderly handles build configuration automatically
- Contact support if builds consistently fail

### Custom Domain Not Working

1. **Verify DNS records** - All 4 A records + CNAME
2. **Wait for propagation** - Up to 24 hours
3. **Check for typos** - Domain name must match exactly
4. **Verify deployment completed** - Check workflow status

### SSL Certificate Issues
- GitHub auto-provisions Let's Encrypt certificates
- Can take a few minutes after domain verification
- Check GitHub Pages settings if persistent issues

### Changes Not Appearing
1. Verify workflow completed successfully
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear browser cache
4. Wait a few minutes for CDN propagation

## Differences from Vercel (Old Method)

| Aspect | Old (Vercel) | New (GitHub Pages) |
|--------|--------------|-------------------|
| Deployment | Manual | Automatic |
| Repository | Fork template | Auto-created |
| Build Config | Manual setup | Handled by Orderly |
| Environment Vars | Manual in Vercel | Managed by Orderly |
| Custom Domain | Vercel dashboard | Orderly One dashboard |
| Build Output | build/client | Same, handled automatically |

## GitHub Repository Access

Your DEX repository is public and accessible at:
`https://github.com/OrderlyNetworkDexCreator/<your-dex-name>`

You can:
- View source code
- See deployment history
- Fork for custom modifications (advanced)

**Note:** Making direct changes to the repository may be overwritten by Orderly One updates. Use the Orderly One dashboard for configuration changes.

# Vercel Deployment Details

## Build Configuration

The Orderly whitelabel template uses React Router v7 with Vite. This combination has specific output paths that differ from typical Vite or Next.js projects.

### Correct Settings

| Setting | Value | Why |
|---------|-------|-----|
| Framework Preset | Vite | Project uses Vite, not Next.js |
| Build Command | `npm run build` | Default, uses react-router build |
| Output Directory | `build/client` | React Router v7 outputs here |
| Install Command | `npm install` | Default |
| Node.js Version | 20.x or higher | Modern Node features required |

### Build Output Structure

After `npm run build`, the project creates:

```
build/
├── client/          ← This is what Vercel serves
│   ├── assets/
│   ├── index.html
│   └── ...
└── server/          ← Server-side (not used for static deploy)
```

Vercel needs `build/client` as the output directory, NOT:
- `dist` (Vite default)
- `build` (too broad, includes server)
- `.next` (Next.js, wrong framework)

## Environment Variables

### Required Variables

```
BROKER_ID=your_broker_id
ORDERLY_SECRET=your_base58_private_key
ORDERLY_ACCOUNT_ID=your_account_id
```

### Adding in Vercel Dashboard

1. Go to Project → Settings → Environment Variables
2. Add each variable with:
   - Name: Variable name (e.g., `BROKER_ID`)
   - Value: Your value
   - Environment: Production (and optionally Preview, Development)
3. **Important**: Redeploy after adding variables

### Vercel CLI Method

```bash
vercel env add BROKER_ID production
vercel env add ORDERLY_SECRET production
vercel env add ORDERLY_ACCOUNT_ID production
```

## Fixing Failed Deployments

### Step 1: Check Build Logs

In Vercel Dashboard:
1. Go to Deployments
2. Click on failed deployment
3. Expand "Build Logs"
4. Look for error messages

### Step 2: Common Fixes

**"No Output Directory" or "could not find .next"**
```
Settings → Build and Deployment → Framework Settings
- Framework Preset: Vite (override if needed)
- Output Directory: build/client
- Save → Redeploy
```

**"Module not found" errors**
```bash
# Locally, ensure deps install correctly
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Environment variable errors**
- Check all three required variables are set
- Ensure no typos in names
- Values should not have quotes in Vercel UI

### Step 3: Redeploy

After fixing settings:
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Select "Redeploy"
4. Choose "Redeploy with existing Build Cache" or fresh build

## Custom Domain Setup

1. Go to Settings → Domains
2. Add your domain (e.g., `trade.yourdex.com`)
3. Configure DNS:
   - CNAME record pointing to `cname.vercel-dns.com`
   - Or A record to Vercel's IP
4. Wait for SSL certificate (automatic)

## Performance Optimization

### Recommended Settings

- Enable Vercel Edge Network (default)
- Use `vercel.json` for caching static assets:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Monitoring

- Use Vercel Analytics for traffic insights
- Enable Speed Insights for performance monitoring
- Check Runtime Logs for any client-side errors

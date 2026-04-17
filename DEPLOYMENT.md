# Deployment Guide

## Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# or
dev.bat
```

### Production Build
```bash
# Build for production
npm run build
# or
deploy.bat
```

### Preview Production Build
```bash
npm run preview
```

## Deployment Options

### 1. Netlify (Recommended)

#### Automatic Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `public`
4. Deploy automatically on push to main branch

#### Manual Deployment
1. Run `npm run build`
2. Drag and drop the `public` folder to Netlify
3. Your site will be live instantly

### 2. Vercel

#### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect the settings
3. Deploy automatically on push

#### Manual Deployment
1. Run `npm run build`
2. Run `vercel --prod` (requires Vercel CLI)

### 3. GitHub Pages

1. Update `vite.config.ts` base path to `/repository-name/`
2. Run `npm run build`
3. Deploy the `public` folder to `gh-pages` branch

### 4. Traditional Hosting

1. Run `npm run build`
2. Upload the entire `public` folder to your hosting service
3. Configure server to handle SPA routing (serve index.html for all routes)

## Environment Variables

Create `.env.local` for local development:
```env
NODE_ENV=development
```

## Build Optimization

The build process includes:
- TypeScript compilation
- SCSS compilation
- JavaScript minification
- Asset optimization
- Code splitting
- Source maps

## Troubleshooting

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `npm run build -- --force`

### Deployment Issues
- Ensure all files in `public` folder are uploaded
- Check file paths (should be absolute paths starting with `/`)
- Verify server configuration for SPA routing

### Performance
- Enable gzip compression on your server
- Set up proper caching headers for assets
- Consider CDN for static assets

## Custom Domain

### Netlify
1. Go to Site settings > Domain management
2. Add your custom domain
3. Update DNS records

### Vercel
1. Go to Project settings > Domains
2. Add your custom domain
3. Follow DNS instructions

## Analytics & SEO

- Add Google Analytics to `public/index.html`
- Submit sitemap to search engines
- Configure meta tags for social sharing

## Security

- HTTPS is enabled by default on most platforms
- CSP headers are configured in `netlify.toml`
- No sensitive data is exposed in client-side code

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

### 1. GitHub Codespaces (Recommended for Manual Deployment)

1. Open your repository in GitHub Codespaces
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. The built files will be in the `public` directory
5. Use the Codespaces port forwarding to preview your site
6. Deploy the `public` folder contents to your preferred hosting service

### 2. Netlify (Manual Deployment)

1. Run `npm run build`
2. Drag and drop the `public` folder to Netlify
3. Your site will be live instantly

### 3. Vercel (Manual Deployment)

1. Run `npm run build`
2. Run `vercel --prod` (requires Vercel CLI)

### 4. GitHub Pages

1. Update `vite.config.ts` base path to `/repository-name/`
2. Run `npm run build`
3. Deploy the `public` folder to `gh-pages` branch

### 5. Traditional Hosting

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
- No sensitive data is exposed in client-side code
- Consider adding CSP headers through your hosting service's security settings

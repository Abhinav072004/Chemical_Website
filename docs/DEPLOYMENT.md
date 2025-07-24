# Deployment Guide

This document provides instructions for deploying the IIT Indore Chemical Engineering website to various platforms.

## 🚀 Quick Deploy Options

### Netlify (Recommended)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/iit-indore-chemical-engineering)

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/iit-indore-chemical-engineering)

## 📋 Manual Deployment

### Prerequisites
- Node.js 18+ installed
- Git repository access
- Build tools configured

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build locally (optional)
npm run preview
```

## 🌐 Platform-Specific Instructions

### Netlify Deployment

#### Method 1: Git Integration (Recommended)
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

#### Method 2: Manual Deploy
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Environment Variables
Set these in Netlify dashboard:
```
NODE_VERSION=18
NPM_VERSION=8
```

### Vercel Deployment

#### Method 1: Git Integration
1. Import your GitHub repository to Vercel
2. Vercel auto-detects Vite configuration
3. Deploy automatically on push to main branch

#### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### GitHub Pages

#### Setup GitHub Actions
The repository includes a GitHub Actions workflow for automatic deployment.

#### Manual Setup
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

### AWS S3 + CloudFront

#### Prerequisites
- AWS CLI configured
- S3 bucket created
- CloudFront distribution set up

#### Deployment Script
```bash
# Build project
npm run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Build and Run
```bash
# Build Docker image
docker build -t iit-chemical-website .

# Run container
docker run -p 80:80 iit-chemical-website
```

## 🔧 Configuration

### Environment Variables
Create `.env.production` for production-specific settings:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_ANALYTICS_ID=your-analytics-id
VITE_CONTACT_EMAIL=chemical@iiti.ac.in
```

### Custom Domain Setup

#### Netlify
1. Go to Site settings > Domain management
2. Add custom domain
3. Configure DNS records:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

#### Vercel
1. Go to Project settings > Domains
2. Add your domain
3. Configure DNS as instructed

### SSL Certificate
Most platforms (Netlify, Vercel) provide automatic SSL certificates. For custom setups:
- Use Let's Encrypt for free SSL
- Configure HTTPS redirects
- Update security headers

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Enable compression
# Configure in vite.config.ts
```

### CDN Configuration
- Enable gzip/brotli compression
- Set appropriate cache headers
- Configure asset optimization

## 🔍 Monitoring & Analytics

### Setup Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring
- Set up Lighthouse CI
- Configure Core Web Vitals monitoring
- Enable error tracking (Sentry, LogRocket)

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 18+
```

#### Deployment Issues
- Verify build command and output directory
- Check environment variables
- Ensure all dependencies are in package.json
- Verify file permissions and paths

#### Performance Issues
- Optimize images and assets
- Enable compression
- Configure caching headers
- Use CDN for static assets

## 📞 Support

For deployment issues:
1. Check platform-specific documentation
2. Review build logs for errors
3. Test build locally first
4. Contact platform support if needed

## 🔄 Continuous Deployment

The repository includes GitHub Actions for:
- Automated testing on PR
- Build verification
- Deployment to staging/production
- Performance monitoring

Configure secrets in GitHub repository settings for deployment keys and tokens.
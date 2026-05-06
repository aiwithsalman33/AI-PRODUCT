# Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables are configured
- [ ] Google Apps Script API is deployed and tested
- [ ] Google Sheets is properly set up
- [ ] n8n workflow is configured (if using AI automation)
- [ ] All pages are tested locally
- [ ] Build completes without errors

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy a Next.js application.

#### Prerequisites
- GitHub account (for automatic deployments)
- Vercel account (free at [vercel.com](https://vercel.com))

#### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_BASE_URL` with your Apps Script URL
   - Click "Save"

4. **Deploy**
   - Vercel will automatically deploy your main branch
   - Your app will be available at `your-project.vercel.app`

#### Continuous Deployment

Push to your GitHub repository to automatically trigger deployments:
```bash
git push origin main
```

### Option 2: Docker + Cloud Run (Google Cloud)

#### Prerequisites
- Google Cloud account
- Docker installed
- `gcloud` CLI installed

#### Steps

1. **Create Dockerfile** (already provided in README)

2. **Build Docker Image**
   ```bash
   docker build -t gcr.io/PROJECT_ID/ai-product-automation .
   ```

3. **Push to Container Registry**
   ```bash
   docker push gcr.io/PROJECT_ID/ai-product-automation
   ```

4. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy ai-product-automation \
     --image gcr.io/PROJECT_ID/ai-product-automation \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NEXT_PUBLIC_API_BASE_URL=your-apps-script-url
   ```

### Option 3: AWS Amplify

#### Steps

1. **Push to GitHub** (see Vercel steps)

2. **Connect to AWS Amplify**
   - Go to AWS Amplify console
   - Click "New app" → "Host web app"
   - Select GitHub provider
   - Select your repository
   - Click "Next"

3. **Configure Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - 'node_modules/**/*'
     appRoot: /
   ```

4. **Add Environment Variables**
   - In Amplify console, go to Environment variables
   - Add `NEXT_PUBLIC_API_BASE_URL`

5. **Deploy**
   - Click "Save and deploy"

### Option 4: Traditional VPS (DigitalOcean, Linode, etc.)

#### Steps

1. **Create a Droplet**
   - Ubuntu 22.04 LTS recommended
   - Minimum 2GB RAM, 2 vCPU

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   ```

4. **Clone and Setup**
   ```bash
   git clone <your-repo> /home/ubuntu/ai-product-automation
   cd /home/ubuntu/ai-product-automation
   npm install
   npm run build
   ```

5. **Create `.env.local`**
   ```bash
   echo "NEXT_PUBLIC_API_BASE_URL=your-url" > .env.local
   ```

6. **Start with PM2**
   ```bash
   pm2 start npm --name "ai-product" -- start
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx Reverse Proxy**
   ```bash
   sudo apt install -y nginx
   ```

   Create `/etc/nginx/sites-available/ai-product`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable and restart:
   ```bash
   sudo ln -s /etc/nginx/sites-available/ai-product /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Post-Deployment

### 1. Verify Deployment
- Open your deployed URL
- Test all pages and functionality
- Verify API calls are working

### 2. Monitor Performance
- Setup error tracking (Sentry, DataDog)
- Monitor uptime
- Check application logs

### 3. Setup Analytics
- Add Google Analytics if needed
- Track user behavior
- Monitor engagement metrics

### 4. Configure Domain
- Update DNS records to point to your deployment
- Setup SSL certificate if not automatic

### 5. Backup Strategy
- Backup Google Sheets regularly
- Document API endpoint changes
- Maintain version control

## Environment Variables for Production

```env
NEXT_PUBLIC_API_BASE_URL=https://script.google.com/macros/d/YOUR_PRODUCTION_SCRIPT_ID/usercopy
```

## Performance Optimization

1. **Enable Image Optimization**
   - Already configured in Next.js

2. **Enable Caching**
   - Configure Cache-Control headers
   - Implement Redis cache if needed

3. **Monitor Bundle Size**
   ```bash
   npm run build
   # Check .next/static/chunks for bundle sizes
   ```

4. **Database Optimization**
   - Index frequently queried columns in Google Sheets
   - Archive old products

## Security Considerations

1. **API Security**
   - Validate all API inputs
   - Implement rate limiting
   - Use HTTPS only

2. **Data Protection**
   - Enable 2FA on Google account
   - Regularly audit Apps Script access
   - Encrypt sensitive data

3. **Frontend Security**
   - Keep dependencies updated
   - Regular security audits
   - Implement CSP headers

## Scaling

As your application grows:

1. **Database**: Consider migrating from Google Sheets to a proper database
2. **API**: Implement caching and API optimization
3. **Frontend**: Consider a CDN for static assets
4. **Backend**: Implement load balancing if needed

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### API Timeouts
- Check Google Apps Script quota usage
- Implement retry logic
- Optimize Apps Script performance

### High Memory Usage
- Check for memory leaks
- Implement pagination
- Optimize API responses

## Rollback Procedure

### Vercel
- Click "Deployments"
- Select previous deployment
- Click "Promote to Production"

### Docker
- Redeploy previous image version
- Update container registry

### Manual Deployment
- Restore from git branch
- Rebuild and redeploy

## Contact & Support

For deployment issues or questions, refer to:
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Google Cloud Documentation: [cloud.google.com/docs](https://cloud.google.com/docs)

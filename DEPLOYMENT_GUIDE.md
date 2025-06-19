# Portfolio Deployment Guide

This guide will help you deploy your portfolio website using GitHub and various hosting platforms.

## 🚀 Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest way to deploy Next.js applications.

### Step 1: Push to GitHub
```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository: `vnariset/MyPortfolio`
4. Vercel will automatically detect it's a Next.js project
5. Click "Deploy"

### Step 3: Add Environment Variables (for EmailJS)
1. In your Vercel project dashboard, go to Settings → Environment Variables
2. Add these variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID` = `service_uf30psh`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` = `template_lquq1qd`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` = `-fXcXPwOBR673P4Ao`
3. Redeploy your project

### Step 4: Custom Domain (Optional)
1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain (e.g., `udaychand.dev`)
3. Follow the DNS configuration instructions

**Your site will be live at**: `https://your-project-name.vercel.app`

---

## 🚀 Option 2: Netlify

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Netlify
1. Go to [Netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

### Step 3: Add Environment Variables
1. Go to Site Settings → Environment Variables
2. Add the same EmailJS variables as above

**Your site will be live at**: `https://your-project-name.netlify.app`

---

## 🚀 Option 3: GitHub Pages (Free)

### Step 1: Update Next.js Config
Edit `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### Step 2: Update package.json
Add this script to `package.json`:
```json
{
  "scripts": {
    "export": "next build && next export"
  }
}
```

### Step 3: Deploy
1. Run: `npm run export`
2. This creates an `out` folder with static files
3. Push the `out` folder to GitHub Pages

### Step 4: Enable GitHub Pages
1. Go to your GitHub repository
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` (or `gh-pages`)
5. Folder: `/ (root)` or `/out`

**Your site will be live at**: `https://vnariset.github.io/MyPortfolio`

---

## 🔧 Pre-Deployment Checklist

### ✅ Code Ready
- [ ] All changes committed to GitHub
- [ ] Portfolio content is up-to-date
- [ ] Contact form is working locally
- [ ] Resume file is in the public folder

### ✅ EmailJS Setup
- [ ] EmailJS account created
- [ ] Service and template configured
- [ ] Environment variables ready
- [ ] Test email sent successfully

### ✅ Testing
- [ ] Portfolio loads correctly
- [ ] All sections display properly
- [ ] Contact form submits successfully
- [ ] Resume downloads correctly
- [ ] Mobile responsive design works

---

## 🌐 Custom Domain Setup

### For Vercel:
1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In Vercel dashboard: Settings → Domains
3. Add your domain
4. Update DNS records as instructed

### For Netlify:
1. Buy a domain
2. In Netlify dashboard: Site Settings → Domain Management
3. Add custom domain
4. Update DNS records

### For GitHub Pages:
1. Buy a domain
2. Create `CNAME` file in your repository with your domain
3. Update DNS records to point to GitHub Pages

---

## 📱 Post-Deployment

### ✅ Verify Everything Works
- [ ] Website loads correctly
- [ ] Contact form sends emails
- [ ] Resume downloads
- [ ] All links work
- [ ] Mobile responsive

### ✅ SEO Optimization
- [ ] Add meta tags in `layout.tsx`
- [ ] Submit to Google Search Console
- [ ] Test with Google PageSpeed Insights

### ✅ Analytics (Optional)
- [ ] Add Google Analytics
- [ ] Add Google Search Console
- [ ] Monitor performance

---

## 🎯 Recommended Deployment: Vercel

I recommend **Vercel** because:
- ✅ **Easiest setup** for Next.js
- ✅ **Automatic deployments** on git push
- ✅ **Free tier** is generous
- ✅ **Great performance**
- ✅ **Easy custom domains**
- ✅ **Built-in analytics**

## 🚨 Common Issues

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure TypeScript errors are fixed
- Verify environment variables are set

### Contact Form Not Working
- Check EmailJS environment variables
- Verify EmailJS service is active
- Test with browser console open

### Styling Issues
- Clear browser cache
- Check Tailwind CSS is properly configured
- Verify all CSS imports are correct

---

## 🎉 You're Ready to Deploy!

Choose your preferred platform and follow the steps above. Your portfolio will be live and professional in minutes!

**Recommended URL**: `https://udaychand.vercel.app` or `https://udaychand.dev` 
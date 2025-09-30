# Gallaa - Luxury B2B Marketplace

India's premier luxury B2B marketplace connecting manufacturers and retailers with smart credit solutions.

## 🚀 Features

- **Luxury B2B Marketplace**: Connect verified manufacturers with premium retailers
- **Smart Credit Solutions**: AI-powered credit scoring with instant approval up to ₹50L
- **Progressive Web App**: Offline-first design with service worker caching
- **Mobile-First Design**: Responsive layout optimized for all devices
- **Performance Optimized**: Lighthouse score 95+ with lazy loading and code splitting
- **Accessibility Compliant**: WCAG 2.1 AA compliant with comprehensive ARIA support
- **Security First**: Bank-grade security with PCI DSS compliance

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Lucide React** for icons
- **Service Workers** for offline functionality

### Design System
- **Colors**: Dark luxury theme (#08070A background, #ECE8E3 text, #D4AF37-#FFD777 accents)
- **Typography**: Playfair Display (headings), Inter (body text)
- **Animations**: 60fps transforms with cubic-bezier(.22,.9,.26,1) easing
- **Spacing**: 8px base grid system

### Performance Features
- Intersection Observer animations
- Lazy loading for images and components
- Service worker caching strategy
- Critical CSS inlining
- Code splitting and tree shaking

## 🔧 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Azure CLI (for deployment)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment to Azure

### 1. Azure Static Web Apps

```bash
# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Create resource group
az group create \
  --name gallaa-rg \
  --location "Central India"

# Create static web app
az staticwebapp create \
  --name gallaa-app \
  --resource-group gallaa-rg \
  --source https://github.com/yourusername/gallaa \
  --location "Central India" \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "dist"
```

### 2. Azure App Service (Alternative)

```bash
# Create App Service plan
az appservice plan create \
  --name gallaa-plan \
  --resource-group gallaa-rg \
  --location "Central India" \
  --sku B1

# Create web app
az webapp create \
  --resource-group gallaa-rg \
  --plan gallaa-plan \
  --name gallaa-webapp \
  --runtime "NODE|18-lts"

# Configure deployment
az webapp deployment source config \
  --name gallaa-webapp \
  --resource-group gallaa-rg \
  --repo-url https://github.com/yourusername/gallaa \
  --branch main \
  --manual-integration
```

### 3. Environment Configuration

Create `staticwebapp.config.json`:

```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "responseOverrides": {
    "401": {
      "redirect": "/login",
      "statusCode": 302
    }
  },
  "globalHeaders": {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "mimeTypes": {
    ".json": "application/json",
    ".webmanifest": "application/manifest+json"
  }
}
```

## 🔐 Security Checklist

- [x] HTTPS enforcement
- [x] Content Security Policy headers
- [x] XSS protection headers
- [x] CSRF protection
- [x] Input validation and sanitization
- [x] Rate limiting implementation
- [x] Secure cookie configuration
- [x] Regular security dependency updates

## 📊 Analytics & Monitoring

### Google Analytics 4 Integration

Add to your environment variables:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Performance Monitoring

- **Core Web Vitals** tracking
- **Error boundary** implementation
- **Service worker** performance metrics
- **API response time** monitoring

## 🧪 A/B Testing

The application includes built-in A/B testing for hero variants:

- **Variant A**: "India's Premier Luxury B2B Marketplace"
- **Variant B**: "Credit-Powered Luxury Trade Platform"

Toggle between variants using the floating button (remove in production).

## 🌍 SEO Optimization

- **Meta tags** for social sharing
- **JSON-LD structured data**
- **Sitemap.xml** generation
- **Robots.txt** configuration
- **OpenGraph** and **Twitter Cards**
- **Canonical URLs** implementation

## 📱 PWA Features

- **Service Worker** with caching strategies
- **Web App Manifest** for installation
- **Offline functionality** for core features
- **Background sync** for form submissions
- **Push notifications** support

## 🔄 API Integration

### Registration Endpoints

```typescript
// Manufacturer registration
POST /api/register/manufacturer
{
  "companyName": "string",
  "contactPerson": "string",
  "email": "string",
  "phone": "string",
  "gstNumber": "string",
  "products": ["string"],
  "annualRevenue": "number"
}

// Retailer registration  
POST /api/register/retailer
{
  "businessName": "string",
  "ownerName": "string", 
  "email": "string",
  "phone": "string",
  "gstNumber": "string",
  "storeLocations": "number",
  "expectedPurchaseVolume": "number"
}
```

### Credit Assessment API

```typescript
POST /api/credit/assess
{
  "businessId": "string",
  "financialData": {
    "annualRevenue": "number",
    "monthlyTransactions": "number",
    "existingCredits": "number"
  }
}
```

## 🏦 Payment Integration

### Razorpay Setup (India)

```javascript
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
```

### Stripe Setup (International)

```javascript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
```

## 🧪 Testing Strategy

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Performance tests
npm run lighthouse

# Accessibility tests
npm run test:a11y
```

## 📝 Content Management

### Conversion Copy Guidelines

- **Headlines**: Focus on value proposition and urgency
- **CTAs**: Action-oriented with benefit-focused language
- **Trust signals**: Certifications, testimonials, and guarantees
- **Social proof**: User counts, transaction volumes, success stories

### SEO Content Structure

```
H1: Primary keyword (India's Premier Luxury B2B Marketplace)
H2: Secondary keywords (Credit Solutions, Marketplace Features)
H3: Long-tail keywords (Luxury Manufacturer Network, B2B Credit Line)
```

## 🚀 Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s  
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Lighthouse Score**: 95+

## 📧 Email Templates

Located in `/templates/emails/`:
- Welcome sequences for manufacturers and retailers
- Credit approval notifications
- Transaction confirmations
- Monthly business reports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes with conventional commits
4. Submit a pull request with detailed description

## 📄 License

Copyright © 2025 Gallaa. All rights reserved.

## 📞 Support

- **Technical Support**: tech@gallaa.com
- **Business Inquiries**: business@gallaa.com
- **Emergency**: +91-11-4567-8900

---

**Made with ❤️ in India** 🇮🇳
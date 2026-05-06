# 📚 Project Documentation Index

Welcome to the **AI Product Content Automation System** frontend! This index helps you navigate all the documentation and resources.

## 🚀 Getting Started

Start here if you're new to the project:

1. **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute setup guide
   - Initial setup steps
   - Google Apps Script setup
   - Running the development server

2. **[README.md](./README.md)** - Complete project overview
   - Features overview
   - Tech stack details
   - Project structure
   - Development tips

## 🏗️ Architecture & Design

Understand how the project is organized:

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture
   - System architecture diagram
   - Directory structure
   - Component tree
   - Data flow diagrams
   - Type system
   - Performance metrics

2. **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Backend integration
   - Google Apps Script setup
   - Google Sheets structure
   - n8n workflow setup
   - API integration details
   - Testing procedures

## 🚢 Deployment & Operations

Deploy your application to production:

1. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Comprehensive deployment guide
   - Pre-deployment checklist
   - Vercel deployment (recommended)
   - Docker deployment
   - AWS deployment
   - VPS deployment
   - Post-deployment steps
   - Performance optimization
   - Troubleshooting

2. **[PRE_LAUNCH_CHECKLIST.md](./PRE_LAUNCH_CHECKLIST.md)** - Launch checklist
   - Frontend setup verification
   - Backend setup verification
   - Testing checklist
   - Security audit checklist
   - Sign-off section

## 📁 Project Files

### Core Application Files

```
📦 ai-product-automation/
├── 📄 package.json              # Dependencies and scripts
├── 📄 tsconfig.json             # TypeScript config
├── 📄 next.config.js            # Next.js config
├── 📄 tailwind.config.js        # Tailwind CSS config
├── 📄 postcss.config.js         # PostCSS config
├── 📄 .env.example              # Environment variables template
└── 📄 .env.local                # Local environment (git ignored)
```

### Application Code

```
📂 app/                          # Next.js App Router
├── layout.tsx                   # Root layout
├── globals.css                  # Global styles
├── page.tsx                     # Dashboard (/)
├── 📂 add-product/
│   └── page.tsx                 # Add Product (/add-product)
└── 📂 products/
    ├── page.tsx                 # Products List (/products)
    └── 📂 [id]/
        └── page.tsx             # Product Details (/products/:id)

📂 components/                   # Reusable Components
├── Sidebar.tsx                  # Navigation sidebar
├── Navbar.tsx                   # Top navbar
├── LayoutWrapper.tsx            # Main layout
├── StatsCard.tsx                # Statistics card
├── ProductTable.tsx             # Table view
├── ProductCard.tsx              # Grid view card
├── StatusBadge.tsx              # Status indicator
├── SearchFilterBar.tsx          # Search & filters
├── LoadingSpinner.tsx           # Loading indicator
├── EmptyState.tsx               # Empty state UI
└── Toast.tsx                    # Toast notifications

📂 lib/                          # Utilities & Helpers
├── api.ts                       # API integration
├── types.ts                     # TypeScript types
├── utils.ts                     # Utility functions
└── toast-context.tsx            # Toast context
```

## 🔑 Key Concepts

### Pages

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/` | Overview with stats and recent products |
| Add Product | `/add-product` | Form to submit new products |
| Products | `/products` | View all products with filters |
| Product Details | `/products/:id` | Full product information |

### Components

| Component | Purpose |
|-----------|---------|
| `Sidebar` | Navigation menu |
| `Navbar` | Page header with status |
| `StatsCard` | Statistics display |
| `ProductTable` | Tabular product view |
| `ProductCard` | Grid product view |
| `StatusBadge` | Status indicator |
| `SearchFilterBar` | Search and filter controls |
| `LoadingSpinner` | Loading animation |
| `EmptyState` | Empty state message |
| `Toast` | Notification popup |

### Data Types

```typescript
Product {
  id: string
  name: string
  category: string
  price: number
  features: string
  status: ProductStatus
  description?: string
  seoKeywords?: string[]
  tags?: string[]
  createdAt: string
  updatedAt: string
}

ProductStatus = 'received' | 'pending_approval' | 'published' | 'rejected' | 'failed'
```

## 🔧 Development

### Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Code Structure

- **Hooks**: `useState`, `useEffect`, `useMemo`, `useRouter`
- **Context**: Toast notifications via React Context
- **API**: Centralized in `lib/api.ts`
- **Utils**: Helper functions in `lib/utils.ts`
- **Types**: Type definitions in `lib/types.ts`

## 🌐 API Integration

All API calls go through Google Apps Script:

### Endpoints

```
GET  /exec?action=get_products              # Get all products
GET  /exec?action=get_product&id=ID         # Get single product
GET  /exec?action=get_dashboard_stats       # Get dashboard stats
POST /exec                                  # Add new product
     Body: { action, name, features, price, category }
```

### Configuration

Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy
```

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Colors**: Slate (primary), Blue (action), Green (success), Yellow (warning), Red (error)
- **Responsive**: Mobile-first, breakpoints at 640px, 768px, 1024px
- **Animations**: Slide-in, fade-in, spin

## 📊 Features

- ✅ Product management (CRUD)
- ✅ Real-time statistics
- ✅ Advanced filtering and search
- ✅ Status tracking
- ✅ AI content display
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Error handling
- ✅ Loading states

## 🔐 Security

- Environment variables for sensitive data
- TypeScript for type safety
- Input validation on frontend
- XSS protection (React escaping)
- HTTPS-only in production
- No credentials in source code

## 📈 Performance

- Code splitting per page
- Image optimization
- Lazy loading
- Optimized re-renders
- CSS minification
- Bundle size < 200KB (gzipped)

## 🧪 Testing

### Manual Testing Checklist

- [ ] Add a product
- [ ] View all products
- [ ] Filter by category
- [ ] Filter by status
- [ ] Search by name
- [ ] View product details
- [ ] Check dashboard stats
- [ ] Test responsive design
- [ ] Test error handling

### API Testing

Use curl or Postman:

```bash
# Test GET endpoint
curl https://script.google.com/macros/d/YOUR_ID/usercopy?action=get_products

# Test POST endpoint
curl -X POST https://script.google.com/macros/d/YOUR_ID/usercopy \
  -H "Content-Type: application/json" \
  -d '{"action":"add_product","name":"Test","features":"Test","price":99.99,"category":"Electronics"}'
```

## 🚨 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| API not responding | Check `NEXT_PUBLIC_API_BASE_URL` |
| Products not showing | Verify Google Sheet data |
| Build errors | Run `npm install` again |
| Styling issues | Clear `.next` directory |

See [DEPLOYMENT.md](./DEPLOYMENT.md#troubleshooting) for more solutions.

## 📚 Resources

### External Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [n8n Docs](https://docs.n8n.io)

### Internal Documentation

1. **Setup & Quick Start**: [QUICKSTART.md](./QUICKSTART.md)
2. **Architecture Overview**: [ARCHITECTURE.md](./ARCHITECTURE.md)
3. **Backend Integration**: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
4. **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
5. **Launch Checklist**: [PRE_LAUNCH_CHECKLIST.md](./PRE_LAUNCH_CHECKLIST.md)

## 💡 Tips & Tricks

### Development

```bash
# Run with debug logs
npm run dev -- --inspect

# Check bundle size
npm run build
# Look in .next/static/chunks/

# Update dependencies
npm update

# Security audit
npm audit fix
```

### Debugging

- Use browser DevTools (F12)
- Check Network tab for API calls
- Use React DevTools extension
- Check Console for errors

### Performance

- Use React DevTools Profiler
- Check Lighthouse report
- Monitor API response times
- Test on slow networks

## 🎯 Next Steps

1. **Setup**: Follow [QUICKSTART.md](./QUICKSTART.md)
2. **Develop**: Modify components as needed
3. **Test**: Use [PRE_LAUNCH_CHECKLIST.md](./PRE_LAUNCH_CHECKLIST.md)
4. **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
5. **Monitor**: Track performance and errors

## 👥 Support

- **Frontend Issues**: Check documentation first
- **API Issues**: Review [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- **Deployment Issues**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **General Questions**: Check [ARCHITECTURE.md](./ARCHITECTURE.md)

## 📝 License

This project is provided as-is for the AI Product Content Automation System.

## 🎉 Ready to Launch?

Follow this sequence:

1. ✅ Complete [QUICKSTART.md](./QUICKSTART.md)
2. ✅ Review [ARCHITECTURE.md](./ARCHITECTURE.md)
3. ✅ Setup integration using [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
4. ✅ Test everything with [PRE_LAUNCH_CHECKLIST.md](./PRE_LAUNCH_CHECKLIST.md)
5. ✅ Deploy using [DEPLOYMENT.md](./DEPLOYMENT.md)

Good luck with your project! 🚀

# Architecture & Project Structure

## System Architecture

```
┌─────────────────┐
│   Frontend      │  (Next.js 14 + React + TypeScript)
│  (This Project) │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│  Google Apps    │  (Backend API)
│   Script        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Google Sheets  │  (Database)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│      n8n        │  (AI Automation Workflow)
│   Workflow      │
└─────────────────┘
```

## Directory Structure

```
ai-product-automation/
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                   # Root layout with providers
│   ├── page.tsx                     # Dashboard (/)
│   ├── globals.css                  # Global styles
│   │
│   ├── add-product/
│   │   └── page.tsx                 # Product submission form (/add-product)
│   │
│   └── products/
│       ├── page.tsx                 # Products list (/products)
│       └── [id]/
│           └── page.tsx             # Product details (/products/:id)
│
├── components/                       # Reusable React Components
│   ├── Sidebar.tsx                  # Navigation sidebar
│   ├── Navbar.tsx                   # Top navigation bar
│   ├── LayoutWrapper.tsx            # Main layout wrapper
│   ├── StatsCard.tsx                # Statistics card
│   ├── ProductTable.tsx             # Table view of products
│   ├── ProductCard.tsx              # Grid view card
│   ├── StatusBadge.tsx              # Status indicator
│   ├── SearchFilterBar.tsx          # Search and filter controls
│   ├── LoadingSpinner.tsx           # Loading indicator
│   ├── EmptyState.tsx               # Empty state UI
│   └── Toast.tsx                    # Toast notification component
│
├── lib/                             # Utilities & Helpers
│   ├── api.ts                       # API integration with Apps Script
│   ├── types.ts                     # TypeScript interfaces & types
│   ├── utils.ts                     # Utility functions
│   └── toast-context.tsx            # Toast notification context
│
├── public/                          # Static assets (images, favicons, etc.)
│
├── Configuration Files
│   ├── package.json                 # Dependencies and scripts
│   ├── tsconfig.json                # TypeScript configuration
│   ├── next.config.js               # Next.js configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── .gitignore                   # Git ignore rules
│
├── Documentation
│   ├── README.md                    # Project overview
│   ├── QUICKSTART.md                # Quick start guide
│   ├── DEPLOYMENT.md                # Deployment instructions
│   └── ARCHITECTURE.md              # This file
│
├── Environment
│   ├── .env.example                 # Example environment variables
│   └── .env.local                   # Local environment (git ignored)
│
└── .git/                            # Git repository
```

## Component Tree

```
App (layout.tsx)
├── ToastProvider
│   ├── DashboardPage
│   │   ├── LayoutWrapper
│   │   │   ├── Sidebar
│   │   │   ├── Navbar
│   │   │   ├── StatsCard (x4)
│   │   │   └── ProductTable
│   │   │       └── StatusBadge
│   │   └── ToastContainer
│   │
│   ├── AddProductPage
│   │   ├── LayoutWrapper
│   │   │   ├── Sidebar
│   │   │   ├── Navbar
│   │   │   └── Form
│   │   └── ToastContainer
│   │
│   ├── ProductsPage
│   │   ├── LayoutWrapper
│   │   │   ├── Sidebar
│   │   │   ├── Navbar
│   │   │   ├── SearchFilterBar
│   │   │   └── (Grid View)
│   │   │       └── ProductCard
│   │   │           └── StatusBadge
│   │   │   or (Table View)
│   │   │       └── ProductTable
│   │   │           └── StatusBadge
│   │   └── ToastContainer
│   │
│   └── ProductDetailsPage
│       ├── LayoutWrapper
│       │   ├── Sidebar
│       │   ├── Navbar
│       │   └── Product Details
│       │       └── StatusBadge
│       └── ToastContainer
```

## Data Flow

### Adding a Product

```
1. User Input
   └─→ AddProductPage (form validation)
       └─→ addProduct() in lib/api.ts
           └─→ HTTP POST to Apps Script
               └─→ Apps Script processes request
                   └─→ Data written to Google Sheets
                       └─→ Response sent back
                           └─→ Toast notification
                               └─→ Redirect to Products page
```

### Viewing Products

```
1. Products Page Loads
   └─→ useEffect triggers fetchProducts()
       └─→ getProducts() in lib/api.ts
           └─→ HTTP GET to Apps Script
               └─→ Apps Script queries Google Sheets
                   └─→ Returns product array
                       └─→ Set in state
                           └─→ Render ProductCard/ProductTable
```

### Dashboard Stats

```
1. Dashboard Page Loads
   └─→ useEffect triggers fetchDashboardData()
       ├─→ getDashboardStats()
       │   └─→ Apps Script calculates totals
       │
       └─→ getProducts()
           └─→ Display recent products
```

## Type System

All TypeScript types are defined in `lib/types.ts`:

```typescript
// Product Status Types
type ProductStatus = 'received' | 'pending_approval' | 'published' | 'rejected' | 'failed'

// Main Product Type
interface Product {
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

// Dashboard Stats
interface DashboardStats {
  total_products: number
  pending: number
  published: number
  rejected: number
}

// Category Types
type Category = 'Electronics' | 'Fashion' | 'Home & Kitchen' | 'Beauty' | 'Accessories' | 'Fitness'
```

## API Integration

All API calls go through `lib/api.ts`:

```typescript
// Generic API function
apiCall<T>(method: 'GET' | 'POST', params?: Record<string, any>): Promise<ApiResponse<T>>

// Exported methods
export addProduct()          // POST /exec - Add new product
export getProducts()         // GET /exec?action=get_products - Fetch all products
export getProductById()      // GET /exec?action=get_product&id=ID - Fetch single product
export getDashboardStats()   // GET /exec?action=get_dashboard_stats - Fetch stats
```

## State Management

- **Global State**: Toast notifications via React Context (`lib/toast-context.tsx`)
- **Local State**: Page-level state using `useState` hook
- **URL State**: Routing parameters via `useParams()` and `useSearchParams()`

## Styling Architecture

### Tailwind CSS Structure

```
Tailwind CSS
├── Base Styles (global.css)
├── Components (utilities in components)
├── Layout Classes
│   ├── Grid: grid, grid-cols-1, md:grid-cols-2, lg:grid-cols-3
│   ├── Flex: flex, flex-col, gap-4
│   ├── Spacing: p-4, m-4, px-6, py-3
│   └── Sizing: w-full, h-screen, max-w-4xl
├── Colors
│   ├── Slate: Primary/neutral colors
│   ├── Blue: Primary action color
│   ├── Green: Success status
│   ├── Yellow: Warning/pending status
│   ├── Red: Error/rejected status
│   └── Purple: Accent color
└── Effects
    ├── Shadows: shadow, shadow-lg, hover:shadow-md
    ├── Borders: border, rounded-lg, border-slate-200
    ├── Animations: animate-spin, animate-slide-in, animate-fade-in
    └── Transitions: transition-colors, transition-shadow
```

### Custom CSS

```css
/* Animations */
@keyframes slideIn    /* 0.3s smooth entry from top */
@keyframes fadeIn     /* 0.3s fade in effect */
@keyframes spin       /* Continuous rotation */

/* Utilities */
.animate-slide-in     /* Apply slideIn animation */
.animate-fade-in      /* Apply fadeIn animation */
.animate-spin         /* Apply spin animation */
```

## Key Features

### 1. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- All components are fully responsive

### 2. Real-time Updates
- Toast notifications for all user actions
- Automatic API error handling
- Loading states during data fetching

### 3. Data Filtering & Search
- Search by product name
- Filter by category and status
- Client-side filtering with useMemo

### 4. Error Handling
- Try-catch blocks in all API calls
- User-friendly error messages
- Graceful fallbacks

### 5. Performance
- Code splitting per page
- Lazy loading of components
- Optimized re-renders with useMemo

## Security Considerations

1. **API Security**
   - All requests use HTTPS
   - Environment variables for sensitive data
   - No credentials in client-side code

2. **Data Validation**
   - Form validation before submission
   - Type checking with TypeScript
   - Server-side validation in Apps Script

3. **XSS Protection**
   - React escapes content by default
   - No dangerouslySetInnerHTML usage
   - Sanitized user inputs

## Performance Metrics

- **First Contentful Paint (FCP)**: < 2s
- **Largest Contentful Paint (LCP)**: < 3s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 4s

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies Overview

### Core
- **next**: Next.js framework
- **react**: React library
- **react-dom**: DOM rendering

### Styling
- **tailwindcss**: Utility-first CSS
- **postcss**: CSS transformation
- **autoprefixer**: Browser prefix support

### Development
- **typescript**: Type safety
- **@types/react**: React type definitions
- **@types/node**: Node type definitions

## Build & Deployment

### Build Process
```bash
npm run build
# Creates .next directory with optimized build

npm start
# Runs production server on port 3000
```

### Bundle Size
- Typical production bundle: 150-200KB (gzipped)
- Code splitting reduces initial load

## Future Enhancements

1. **Authentication**: User login and role-based access
2. **Advanced Analytics**: Product performance metrics
3. **Bulk Operations**: Import/export functionality
4. **Custom Fields**: User-defined product attributes
5. **API Documentation**: Auto-generated API docs
6. **Webhooks**: Real-time data synchronization
7. **Caching**: Redis/CDN caching layer
8. **Internationalization**: Multi-language support

## Contributing Guidelines

1. Follow TypeScript best practices
2. Use meaningful variable/function names
3. Keep components focused and reusable
4. Add error handling for all API calls
5. Test responsive behavior
6. Update type definitions
7. Document complex logic

## Maintenance

### Regular Updates
- Update dependencies monthly: `npm update`
- Check for security vulnerabilities: `npm audit`
- Monitor performance metrics

### Monitoring
- Check error logs
- Monitor API response times
- Track user engagement
- Review performance metrics

### Backups
- Regular Google Sheets backups
- Version control all changes
- Document configuration changes

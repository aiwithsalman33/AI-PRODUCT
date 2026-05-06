# AI Product Content Automation System

A modern, production-ready frontend for managing AI-powered product content automation. Built with Next.js 14, React, Tailwind CSS, and TypeScript.

## Features

- **Dashboard**: Real-time statistics and overview of your product automation system
- **Product Management**: Add, view, and manage products
- **Smart Filtering**: Filter by category, status, and search by product name
- **AI Content Display**: View AI-generated descriptions, SEO keywords, and tags
- **Status Tracking**: Track product processing status through the entire workflow
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Google Sheets Integration**: All data is stored in Google Sheets via Apps Script API
- **Toast Notifications**: Real-time feedback for user actions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI**: React 18
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Backend**: Google Apps Script (via API)
- **Database**: Google Sheets
- **Automation**: n8n (for AI workflows)

## Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── globals.css              # Global styles
│   ├── page.tsx                 # Dashboard page
│   ├── add-product/
│   │   └── page.tsx             # Product submission form
│   ├── products/
│   │   ├── page.tsx             # Products grid/table view
│   │   └── [id]/
│   │       └── page.tsx         # Product details page
│
├── components/                   # Reusable React components
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── Navbar.tsx               # Top navigation bar
│   ├── LayoutWrapper.tsx        # Main layout wrapper
│   ├── StatsCard.tsx            # Statistics card component
│   ├── ProductTable.tsx         # Products table view
│   ├── ProductCard.tsx          # Product card (grid view)
│   ├── StatusBadge.tsx          # Status badge component
│   ├── SearchFilterBar.tsx      # Search and filter bar
│   ├── LoadingSpinner.tsx       # Loading indicator
│   ├── EmptyState.tsx           # Empty state display
│   └── Toast.tsx                # Toast notification component
│
├── lib/                         # Utility functions and helpers
│   ├── api.ts                   # Google Apps Script API integration
│   ├── types.ts                 # TypeScript type definitions
│   ├── utils.ts                 # Utility functions
│   └── toast-context.tsx        # Toast notification context
│
├── public/                      # Static assets (if needed)
├── .env.example                 # Environment variables example
├── .env.local                   # Local environment variables
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Google Apps Script API endpoint URL
- Google Sheets connected to your Apps Script

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-product-automation
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Google Apps Script API URL:
```env
NEXT_PUBLIC_API_BASE_URL=https://script.google.com/macros/d/YOUR_APPS_SCRIPT_ID/usercopy
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## API Integration

The frontend communicates with Google Apps Script API endpoints. All requests are configured in `lib/api.ts`.

### Available API Methods

#### GET Dashboard Stats
```
GET /exec?action=get_dashboard_stats
```
Returns:
- `total_products`: Total number of products
- `pending`: Products pending approval
- `published`: Published products
- `rejected`: Rejected products

#### GET All Products
```
GET /exec?action=get_products
```
Returns array of all products with full details.

#### GET Product by ID
```
GET /exec?action=get_product&id=PRODUCT_ID
```
Returns single product details.

#### POST Add Product
```
POST /exec
Body: {
  "action": "add_product",
  "name": "Product Name",
  "features": "Feature description",
  "price": 99.99,
  "category": "Electronics"
}
```

## Product Status Lifecycle

- **received**: Initial state when product is submitted
- **pending_approval**: Product is being processed by AI
- **published**: Product content has been approved and is live
- **rejected**: Product needs revision
- **failed**: Processing failed due to an error

## UI Components

### StatsCard
Displays statistics with color coding:
- Blue: Total products
- Yellow: Pending approval
- Green: Published
- Red: Rejected

### StatusBadge
Shows product status with color-coded badges matching the status lifecycle.

### SearchFilterBar
Provides search functionality and filtering by category and status.

### ProductTable
Displays products in a table format with sorting capabilities.

### ProductCard
Shows product preview in grid layout.

### LoadingSpinner
Animated loading indicator.

### EmptyState
Displayed when no products are available.

## Styling

The project uses Tailwind CSS with custom configuration:
- Soft shadows and rounded corners for modern UI
- Responsive grid layouts
- Smooth transitions and animations
- Accessible color contrasts

## Performance

- **Code Splitting**: Pages are automatically code-split
- **Image Optimization**: Using Next.js Image component
- **CSS**: Tailwind CSS is optimized and purged
- **API Caching**: Implemented request deduplication

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Google Apps Script endpoint | `https://script.google.com/macros/d/YOUR_ID/usercopy` |

## Troubleshooting

### API Connection Issues
- Verify the `NEXT_PUBLIC_API_BASE_URL` is correct
- Ensure Apps Script is deployed and accessible
- Check CORS settings if requests are blocked

### Products Not Loading
- Check browser console for error messages
- Verify Google Sheets has data
- Ensure Apps Script API is returning valid JSON

### Form Submission Fails
- Validate all required fields are filled
- Check browser console for error details
- Verify Apps Script endpoint is responding

## Development Tips

- Use the Toast component for user feedback
- All API calls return `ApiResponse<T>` type
- Components use TypeScript for type safety
- Utilize the utility functions in `lib/utils.ts`

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please contact the development team or create an issue in the repository.

## Roadmap

- [ ] Product analytics dashboard
- [ ] Batch product import
- [ ] Export to CSV/Excel
- [ ] Product comparison view
- [ ] Advanced search with filters
- [ ] User authentication
- [ ] Admin panel
- [ ] API rate limiting display

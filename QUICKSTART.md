# Quick Start Guide

## Step 1: Setup Google Apps Script

Before running the frontend, you need to set up a Google Apps Script that serves as your backend API.

### Creating the Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Replace the code with your backend implementation that handles:
   - Adding products to Google Sheets
   - Retrieving products
   - Getting dashboard statistics
   - Managing product status

### Example Apps Script Template

```javascript
// Main function to handle all API requests
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const action = e.parameter.action || (e.postData ? JSON.parse(e.postData.contents).action : null);
  
  try {
    switch(action) {
      case 'add_product':
        return addProduct(e);
      case 'get_products':
        return getProducts(e);
      case 'get_product':
        return getProduct(e);
      case 'get_dashboard_stats':
        return getDashboardStats(e);
      default:
        return sendResponse(false, 'Unknown action');
    }
  } catch(error) {
    return sendResponse(false, error.message);
  }
}

function addProduct(e) {
  // Implementation to add product to Google Sheets
  // Return success response
}

function getProducts(e) {
  // Implementation to retrieve all products
  // Return array of products
}

function getProduct(e) {
  // Implementation to get single product by ID
  // Return product object
}

function getDashboardStats(e) {
  // Implementation to calculate dashboard stats
  // Return stats object
}

function sendResponse(success, data) {
  const output = ContentService.createTextOutput(JSON.stringify({
    success: success,
    data: data
  }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

### Deploy the Apps Script

1. Click "Deploy" → "New Deployment"
2. Select type "Web app"
3. Set "Execute as" to your account
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. Copy the deployment URL

## Step 2: Setup the Frontend

### 1. Clone/Download the Project

```bash
git clone <repository-url> ai-product-automation
cd ai-product-automation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Apps Script URL:

```env
NEXT_PUBLIC_API_BASE_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy
```

Replace `YOUR_SCRIPT_ID` with the actual deployment ID from your Apps Script.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 3: Test the Integration

1. **Add a Product**: Go to `/add-product` and submit a test product
2. **View Products**: Navigate to `/products` to see the submitted product
3. **Check Dashboard**: The dashboard should show updated statistics
4. **View Details**: Click on a product to see full details

## Step 4: Connect n8n Workflow (Optional)

To enable AI content generation:

1. Create an n8n workflow that:
   - Listens for new products (via webhook or scheduled trigger)
   - Generates AI content using your preferred AI service
   - Updates the Google Sheet with generated content
   - Updates product status to "published"

2. Configure the workflow to trigger when products are added

## Troubleshooting

### "NEXT_PUBLIC_API_BASE_URL is not defined"

**Solution**: Make sure `.env.local` file exists and contains the correct API URL.

### API calls return 404

**Solution**: Verify the Apps Script is deployed correctly and the URL is accurate.

### Google Sheets is empty

**Solution**: Ensure your Apps Script is properly writing to Google Sheets with correct headers and data format.

## Next Steps

1. Customize the UI colors and branding
2. Implement authentication (optional)
3. Add more product fields as needed
4. Deploy to production (Vercel, AWS, etc.)
5. Setup custom domain

## Key Files to Modify

- `lib/api.ts` - API endpoints and integration
- `lib/types.ts` - Product data types
- `tailwind.config.js` - Branding and colors
- Component files - UI customization

## Support

For detailed setup instructions, see:
- [README.md](./README.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)

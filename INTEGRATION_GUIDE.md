# Integration Guide: Google Apps Script + n8n

This guide explains how to integrate your frontend with Google Apps Script for the backend and n8n for AI automation.

## Table of Contents

1. [Google Apps Script Setup](#google-apps-script-setup)
2. [Google Sheets Structure](#google-sheets-structure)
3. [n8n Workflow Setup](#n8n-workflow-setup)
4. [API Integration](#api-integration)
5. [Testing](#testing)

---

## Google Apps Script Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Create" → "Blank spreadsheet"
3. Name it "AI Product Automation"
4. Create columns:
   - A: ID (unique identifier)
   - B: Name
   - C: Category
   - D: Price
   - E: Features
   - F: Status
   - G: Description (AI Generated)
   - H: SEO Keywords
   - I: Tags
   - J: Created At
   - K: Updated At

### Step 2: Create Google Apps Script

1. In your Google Sheet, click "Extensions" → "Apps Script"
2. Delete default code and paste the complete script below:

```javascript
// Configuration
const SHEET_NAME = 'Products';
const API_HEADER_ROW = 1;

// Get the sheet
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    initializeSheet(sheet);
  }
  
  return sheet;
}

// Initialize sheet with headers
function initializeSheet(sheet) {
  const headers = [
    'ID',
    'Name',
    'Category',
    'Price',
    'Features',
    'Status',
    'Description',
    'SEO Keywords',
    'Tags',
    'Created At',
    'Updated At'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
}

// Main API handler
function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch(action) {
      case 'get_products':
        return sendResponse(true, getProducts());
      case 'get_product':
        return sendResponse(true, getProduct(e.parameter.id));
      case 'get_dashboard_stats':
        return sendResponse(true, getDashboardStats());
      default:
        return sendResponse(false, 'Unknown action');
    }
  } catch(error) {
    Logger.log('Error in doGet: ' + error);
    return sendResponse(false, 'Server error: ' + error);
  }
}

function doPost(e) {
  const action = JSON.parse(e.postData.contents).action;
  const data = JSON.parse(e.postData.contents);
  
  try {
    switch(action) {
      case 'add_product':
        return sendResponse(true, addProduct(data));
      default:
        return sendResponse(false, 'Unknown action');
    }
  } catch(error) {
    Logger.log('Error in doPost: ' + error);
    return sendResponse(false, 'Server error: ' + error);
  }
}

// Add a new product
function addProduct(data) {
  const sheet = getSheet();
  const id = Utilities.getUuid();
  const now = new Date().toISOString();
  
  const newRow = [
    id,
    data.name || '',
    data.category || '',
    data.price || 0,
    data.features || '',
    'received', // Initial status
    '', // Description (will be filled by n8n)
    '', // SEO Keywords
    '', // Tags
    now,
    now
  ];
  
  sheet.appendRow(newRow);
  
  // Log for n8n webhook
  Logger.log('New product added: ' + id);
  
  // Call n8n webhook if configured
  triggerN8nWorkflow(id, data);
  
  return {
    success: true,
    id: id,
    message: 'Product added successfully'
  };
}

// Get all products
function getProducts() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return [];
  }
  
  const headers = data[0];
  const products = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const product = {
      id: row[0],
      name: row[1],
      category: row[2],
      price: row[3],
      features: row[4],
      status: row[5],
      description: row[6],
      seoKeywords: row[7] ? row[7].split(',').map(k => k.trim()) : [],
      tags: row[8] ? row[8].split(',').map(t => t.trim()) : [],
      createdAt: row[9],
      updatedAt: row[10]
    };
    products.push(product);
  }
  
  return products.reverse(); // Return newest first
}

// Get single product by ID
function getProduct(id) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      const row = data[i];
      return {
        id: row[0],
        name: row[1],
        category: row[2],
        price: row[3],
        features: row[4],
        status: row[5],
        description: row[6],
        seoKeywords: row[7] ? row[7].split(',').map(k => k.trim()) : [],
        tags: row[8] ? row[8].split(',').map(t => t.trim()) : [],
        createdAt: row[9],
        updatedAt: row[10]
      };
    }
  }
  
  return null;
}

// Get dashboard statistics
function getDashboardStats() {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  let total = 0;
  let pending = 0;
  let published = 0;
  let rejected = 0;
  
  for (let i = 1; i < data.length; i++) {
    const status = data[i][5];
    total++;
    
    switch(status) {
      case 'pending_approval':
      case 'received':
        pending++;
        break;
      case 'published':
        published++;
        break;
      case 'rejected':
      case 'failed':
        rejected++;
        break;
    }
  }
  
  return {
    total_products: total,
    pending: pending,
    published: published,
    rejected: rejected
  };
}

// Update product status (called by n8n)
function updateProductStatus(id, status, description, seoKeywords, tags) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      const now = new Date().toISOString();
      
      sheet.getRange(i + 1, 6).setValue(status); // Status
      sheet.getRange(i + 1, 7).setValue(description || ''); // Description
      sheet.getRange(i + 1, 8).setValue(seoKeywords ? seoKeywords.join(', ') : ''); // Keywords
      sheet.getRange(i + 1, 9).setValue(tags ? tags.join(', ') : ''); // Tags
      sheet.getRange(i + 1, 11).setValue(now); // Updated At
      
      Logger.log('Product ' + id + ' updated to status: ' + status);
      return { success: true };
    }
  }
  
  return { success: false };
}

// Trigger n8n workflow
function triggerN8nWorkflow(productId, productData) {
  // Get your n8n webhook URL from your n8n instance
  const webhookUrl = 'YOUR_N8N_WEBHOOK_URL';
  
  if (!webhookUrl || webhookUrl === 'YOUR_N8N_WEBHOOK_URL') {
    Logger.log('n8n webhook not configured');
    return;
  }
  
  const payload = {
    productId: productId,
    name: productData.name,
    features: productData.features,
    category: productData.category,
    price: productData.price
  };
  
  try {
    const options = {
      method: 'post',
      payload: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(webhookUrl, options);
    Logger.log('n8n webhook response: ' + response.getResponseCode());
  } catch(error) {
    Logger.log('Error triggering n8n workflow: ' + error);
  }
}

// Send response helper
function sendResponse(success, data) {
  const output = ContentService.createTextOutput(JSON.stringify({
    success: success,
    data: data
  }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

### Step 3: Deploy the Script

1. Click "Deploy" → "New Deployment"
2. Select type "Web app"
3. Set "Execute as" to your account
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. Copy the deployment URL (you'll need this in the next step)
7. Click "Change" next to the deployment if you need to update it later

---

## Google Sheets Structure

### Example Data Layout

| ID | Name | Category | Price | Features | Status | Description | SEO Keywords | Tags | Created At | Updated At |
|----|------|----------|-------|----------|--------|-------------|--------------|------|------------|-----------|
| uuid | Product 1 | Electronics | 99.99 | Feature list | published | AI generated desc | keyword1, keyword2 | tag1, tag2 | 2024-01-01T00:00:00Z | 2024-01-01T00:00:00Z |

### Status Values
- `received` - Initial state
- `pending_approval` - Processing by AI
- `published` - Ready to display
- `rejected` - Needs revision
- `failed` - Error during processing

---

## n8n Workflow Setup

### Step 1: Create n8n Account

1. Sign up at [n8n.io](https://n8n.io)
2. Create a new workflow

### Step 2: Create Webhook Trigger

1. Click "+" to add a node
2. Search for "Webhook"
3. Select "Webhook"
4. Leave it as GET method initially
5. Copy the webhook URL

### Step 3: Add AI Processing

1. Add an HTTP Request node
2. Configure it to call your AI service (OpenAI, Google AI, etc.)
3. Pass the product features as input
4. Extract AI-generated description and keywords

Example for OpenAI:

```json
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "You are a product description writer. Write compelling product descriptions."
    },
    {
      "role": "user",
      "content": "Write a product description for: {{$node[\"Webhook\"].json[\"features\"]}}"
    }
  ]
}
```

### Step 4: Update Google Sheets

1. Add an "Google Sheets" node
2. Configure it to update the product row
3. Set status to "published"
4. Update description with AI output
5. Add keywords and tags

### Step 5: Complete Workflow

```
Webhook (trigger)
  ↓
AI Service (generate content)
  ↓
Google Sheets (update product)
  ↓
Send Response
```

---

## API Integration

### Environment Variable Setup

Add to `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy
```

### API Endpoint Examples

#### Add Product
```bash
curl -X POST https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add_product",
    "name": "Wireless Headphones",
    "category": "Electronics",
    "price": 129.99,
    "features": "Noise cancellation, 30h battery life, Bluetooth 5.0"
  }'
```

#### Get All Products
```bash
curl https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy?action=get_products
```

#### Get Dashboard Stats
```bash
curl https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy?action=get_dashboard_stats
```

---

## Testing

### Test the Apps Script

1. In Apps Script editor, click "Deploy" → "Test Deployments"
2. Test each function:
   ```javascript
   testAddProduct()
   testGetProducts()
   testGetDashboardStats()
   ```

### Test the Frontend Integration

1. Update `.env.local` with your Apps Script URL
2. Run `npm run dev`
3. Open http://localhost:3000
4. Test adding a product in `/add-product`
5. Verify it appears in `/products`
6. Check dashboard stats

### Test n8n Integration

1. Create a test product via the frontend
2. Check n8n workflow logs
3. Verify product status updates to "published"
4. Confirm AI-generated content appears in product details

---

## Troubleshooting

### API Returns 404

**Solution**: Verify the Apps Script deployment URL is correct in `.env.local`

### Products Don't Save

**Solution**: 
- Check Google Sheet permissions
- Verify column headers match exactly
- Check Apps Script logs for errors

### n8n Webhook Not Triggering

**Solution**:
- Verify webhook URL is correct in Apps Script
- Check n8n workflow is active
- Review n8n logs for errors

### AI Content Not Showing

**Solution**:
- Verify n8n workflow completes successfully
- Check Google Sheet is updated by n8n
- Refresh browser to see latest data

---

## Security Best Practices

1. **Apps Script Security**
   - Keep deployment URL private
   - Use OAuth for authentication
   - Validate all inputs

2. **n8n Security**
   - Use environment variables for API keys
   - Enable webhook authentication
   - Monitor API usage

3. **Data Protection**
   - Enable Google Sheets versioning
   - Regular backups
   - Audit log access

---

## Performance Tips

1. **Optimize Google Sheets**
   - Archive old products in separate sheet
   - Use filters for faster queries
   - Index frequently searched columns

2. **Optimize n8n**
   - Cache API responses
   - Batch process products
   - Set appropriate timeouts

3. **Frontend Optimization**
   - Implement pagination
   - Cache API responses
   - Use lazy loading

---

## Next Steps

1. Deploy Apps Script
2. Setup Google Sheet
3. Configure n8n workflow
4. Add Apps Script URL to `.env.local`
5. Test end-to-end flow
6. Deploy to production

For more information, see:
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [n8n Documentation](https://docs.n8n.io)
- [Google Sheets API](https://developers.google.com/sheets/api)

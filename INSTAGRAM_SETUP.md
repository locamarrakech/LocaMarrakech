# Instagram API Setup Guide

This guide will help you set up Instagram API integration to fetch real Instagram posts on your website.

## Option 1: Instagram Graph API (Recommended)

### Prerequisites
1. A Facebook Business Account
2. A Facebook App
3. An Instagram Business or Creator Account

### Steps

1. **Create a Facebook App**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create a new app
   - Add "Instagram Graph API" product

2. **Get Access Token**
   - Go to Graph API Explorer
   - Select your app
   - Generate a User Token with permissions: `instagram_basic`, `pages_show_list`, `pages_read_engagement`
   - Exchange for Long-Lived Token (valid for 60 days)

3. **Get Instagram Business Account ID**
   - Use Graph API: `GET /me/accounts`
   - Get the page ID
   - Use: `GET /{page-id}?fields=instagram_business_account`
   - Get the Instagram Business Account ID

4. **Create Backend Endpoint**

You'll need to create a backend API endpoint that fetches Instagram posts. Here's an example using Node.js/Express:

```javascript
// Example: /api/instagram/posts endpoint
const express = require('express');
const axios = require('axios');

const router = express.Router();

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_BUSINESS_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

router.get('/posts', async (req, res) => {
  try {
    const limit = req.query.limit || 12;
    
    const response = await axios.get(
      `https://graph.instagram.com/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`,
      {
        params: {
          fields: 'id,media_type,media_url,permalink,caption,timestamp,thumbnail_url,like_count,comments_count',
          access_token: INSTAGRAM_ACCESS_TOKEN,
          limit: limit
        }
      }
    );

    res.json({ data: response.data.data });
  } catch (error) {
    console.error('Instagram API Error:', error);
    res.status(500).json({ error: 'Failed to fetch Instagram posts' });
  }
});

module.exports = router;
```

5. **Set Environment Variables**

Create a `.env` file in your project root:

```env
VITE_INSTAGRAM_API_URL=http://localhost:3001/api/instagram/posts
VITE_INSTAGRAM_USERNAME=locamarrakech
```

Or if using a backend proxy, update `services/instagramService.ts`:

```typescript
const INSTAGRAM_API_ENDPOINT = 'https://your-backend.com/api/instagram/posts';
```

## Option 2: Using a Third-Party Service

### RapidAPI Instagram Services

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to an Instagram API service
3. Get your API key
4. Update the service to use RapidAPI endpoints

### Example with RapidAPI:

```typescript
// In instagramService.ts
export const fetchInstagramPosts = async (limit: number = 12): Promise<InstagramPost[]> => {
  try {
    const response = await fetch('https://instagram-api1.p.rapidapi.com/api/user/posts', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'instagram-api1.p.rapidapi.com'
      }
    });
    
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
};
```

## Option 3: Serverless Function (Vercel/Netlify)

### Vercel Serverless Function Example:

Create `api/instagram/posts.ts`:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
  const INSTAGRAM_BUSINESS_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  try {
    const limit = request.query.limit || 12;
    
    const res = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,media_type,media_url,permalink,caption,timestamp,thumbnail_url,like_count,comments_count&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${limit}`
    );

    const data = await res.json();
    response.status(200).json({ data: data.data });
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch Instagram posts' });
  }
}
```

Set environment variables in Vercel dashboard:
- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_BUSINESS_ACCOUNT_ID`

## Testing

Once set up, the component will automatically fetch and display your Instagram posts. If there's an error, it will show a fallback message with a link to your Instagram profile.

## Troubleshooting

1. **CORS Issues**: Make sure your backend has CORS enabled
2. **Token Expired**: Instagram tokens expire. Set up token refresh logic
3. **Rate Limits**: Instagram has rate limits. Implement caching
4. **No Posts Showing**: Check browser console for errors

## Security Notes

- Never expose your Instagram Access Token in client-side code
- Always use a backend proxy to handle API calls
- Store tokens in environment variables
- Implement token refresh mechanism for long-term use


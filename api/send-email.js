import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

// Import the original handler
let originalHandler;

async function getHandler() {
  if (!originalHandler) {
    try {
      // Try to import the compiled JavaScript version first
      const module = await import('../pages/api/send-email.js');
      originalHandler = module.default;
    } catch (error) {
      console.log('Could not import compiled JS version, falling back to TS import');
      try {
        // Dynamically import the original handler
        const module = await import('../pages/api/send-email.ts');
        originalHandler = module.default;
      } catch (tsError) {
        console.error('Error importing send-email handler:', tsError);
        throw tsError;
      }
    }
  }
  return originalHandler;
}

export default async function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    const handlerFunction = await getHandler();
    return handlerFunction(req, res);
  } catch (error) {
    console.error('Error in send-email handler:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to load email handler',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

// Import the original handler
const contactHandler = async (req, res) => {
  try {
    // Dynamically import the original handler
    const { default: handler } = await import('../pages/api/contact.ts');
    return handler(req, res);
  } catch (error) {
    console.error('Error importing contact handler:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to load contact handler' 
    });
  }
};

export default contactHandler;
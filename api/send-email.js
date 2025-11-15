import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

// Import the original handler
const sendEmailHandler = async (req, res) => {
  try {
    // Dynamically import the original handler
    const { default: handler } = await import('../pages/api/send-email.ts');
    return handler(req, res);
  } catch (error) {
    console.error('Error importing send-email handler:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to load email handler' 
    });
  }
};

export default sendEmailHandler;
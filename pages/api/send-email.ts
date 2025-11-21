// pages/api/send-email.ts
// If you get type errors, you can also create this as send-email.js instead

import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { resolve } from 'path';

// Lazy load WhatsApp service to avoid CommonJS issues in SSR
async function sendWhatsAppNotification(data: any, phoneNumber: string) {
  try {
    console.log('📧 [Email API] Attempting to send WhatsApp notification...');
    console.log('📧 [Email API] WhatsApp number from env:', phoneNumber);
    
    // Use dynamic import with relative path to avoid module resolution issues
    const { sendWhatsAppMessage, formatBookingMessage } = await import('../../services/whatsappService');
    
    console.log('📧 [Email API] WhatsApp service loaded successfully');
    
    const message = formatBookingMessage(data);
    console.log('📧 [Email API] Message formatted, length:', message.length);
    
    const success = await sendWhatsAppMessage(phoneNumber, message);
    
    if (success) {
      console.log('✅ [Email API] WhatsApp notification sent successfully');
    } else {
      console.error('❌ [Email API] WhatsApp notification failed (returned false)');
    }
  } catch (error: any) {
    // Log detailed error but don't fail the request
    console.error('❌ [Email API] WhatsApp notification failed (non-critical):', error.message || error);
    console.error('❌ [Email API] Error stack:', error.stack);
  }
}

// Load environment variables from .env.local or .env
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

type BookingData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  startDate: string;
  endDate: string;
  carName: string;
  featuredImage: string;
  carPrice?: string;
  carModel?: string;
  carTransmission?: string;
  carSeats?: string;
  carFuel?: string;
  carSpeed?: string;
};

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const body: BookingData = req.body;
    console.log('Received booking:', body);

    // Check if email credentials are configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Debug logging (remove in production)
    console.log('Email config check:', {
      hasEmailUser: !!emailUser,
      emailUserLength: emailUser?.length || 0,
      hasEmailPass: !!emailPass,
      emailPassLength: emailPass?.length || 0,
      emailUserPreview: emailUser ? `${emailUser.substring(0, 5)}...` : 'not set',
    });

    // Basic validation - just check if they exist
    if (!emailUser || !emailPass) {
      console.error('Email credentials not configured');
      console.error('EMAIL_USER:', emailUser ? 'set' : 'NOT SET');
      console.error('EMAIL_PASS:', emailPass ? 'set' : 'NOT SET');
      return res.status(500).json({ 
        success: false, 
        message: 'Email service not configured. Please set EMAIL_USER and EMAIL_PASS in .env.local file and restart the server.' 
      });
    }
    
    // Warn about placeholder values but don't block
    if (emailUser.includes('your-actual-gmail') || emailPass === 'abcdefghijklmnop') {
      console.warn('⚠️ WARNING: Using placeholder values. Emails will likely fail. Please update .env.local with real credentials.');
    }

    // Warn if using default placeholder values
    if (emailUser === 'locamarrakech.com@gmail.com' || emailPass === 'oyee ciop hzbb pzeu') {
      console.warn('Warning: Using default placeholder email credentials. Please update .env.local with your actual Gmail credentials.');
    }

    // Create transporter with your email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
        from: body.email,
      to: process.env.EMAIL_USER || 'locamarrakech.com@gmail.com',
      subject: "You've Received a New Booking",
      text: `New Booking Received:
Full Name: ${body.fullName}
Email: ${body.email}
Phone: ${body.phoneNumber}
City: ${body.city}
Booking Period: ${new Date(body.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} to ${new Date(body.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Car Name: ${body.carName}
Car Price: ${body.carPrice || 'N/A'}€/day
Car Model: ${body.carModel || 'N/A'}
Transmission: ${body.carTransmission || 'N/A'}
Seats: ${body.carSeats || 'N/A'}
Fuel: ${body.carFuel || 'N/A'}
Max Speed: ${body.carSpeed ? `${body.carSpeed} km/h` : 'N/A'}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Car Booking</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #DAB875; font-size: 28px; font-weight: 700; letter-spacing: 2px;">NEW BOOKING RECEIVED</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">LocaMarrakech - Car Rental</p>
    </td>
  </tr>

          <!-- Car Image Section -->
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #ffffff;">
              <img src="${body.featuredImage}" alt="${body.carName}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
      </td>
    </tr>

          <!-- Car Name & Price -->
          <tr>
            <td style="padding: 0 30px 20px 30px; text-align: center;">
              <h2 style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">${body.carName}</h2>
              <div style="display: inline-block; background-color: #DAB875; color: #1a1a1a; padding: 8px 20px; border-radius: 20px; font-weight: 700; font-size: 18px;">
                ${body.carPrice || 'N/A'}€ <span style="font-size: 12px; font-weight: 400;">/ day</span>
  </div>
            </td>
          </tr>

          <!-- Car Specifications -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9f9f9; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 8px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 14px; width: 50%;">Model:</td>
                        <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; text-align: right;">${body.carModel || 'N/A'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-top: 1px solid #e0e0e0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 14px; width: 50%;">Transmission:</td>
                        <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; text-align: right;">${body.carTransmission || 'N/A'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-top: 1px solid #e0e0e0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 14px; width: 50%;">Seats:</td>
                        <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; text-align: right;">${body.carSeats || 'N/A'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-top: 1px solid #e0e0e0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 14px; width: 50%;">Fuel Type:</td>
                        <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; text-align: right;">${body.carFuel || 'N/A'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${body.carSpeed ? `
                <tr>
                  <td style="padding: 8px 0; border-top: 1px solid #e0e0e0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="color: #666; font-size: 14px; width: 50%;">Max Speed:</td>
                        <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; text-align: right;">${body.carSpeed} km/h</td>
                      </tr>
                    </table>
      </td>
    </tr>
                ` : ''}
</table>
            </td>
          </tr>

          <!-- Booking Details Section -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background: linear-gradient(135deg, #DAB875 0%, #C09A55 100%); padding: 20px; border-radius: 8px;">
                <h3 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Booking Details</h3>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(26,26,26,0.2);">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; width: 40%;">Full Name:</td>
                          <td style="color: #1a1a1a; font-size: 14px; text-align: right;">${body.fullName}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(26,26,26,0.2);">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; width: 40%;">Email:</td>
                          <td style="text-align: right;">
                            <a href="mailto:${body.email}" style="color: #1a1a1a; font-size: 14px; text-decoration: none;">${body.email}</a>
      </td>
    </tr>
</table>
                    </td>
                  </tr>
    <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(26,26,26,0.2);">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
  <tr>
                          <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; width: 40%;">Phone:</td>
                          <td style="text-align: right;">
                            <a href="tel:${body.phoneNumber}" style="color: #1a1a1a; font-size: 14px; text-decoration: none;">${body.phoneNumber}</a>
    </td>
  </tr>
</table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(26,26,26,0.2);">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; width: 40%;">City:</td>
                          <td style="color: #1a1a1a; font-size: 14px; text-align: right;">${body.city}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid rgba(26,26,26,0.2);">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; width: 40%;">Start Date:</td>
                          <td style="color: #1a1a1a; font-size: 14px; text-align: right; font-weight: 700;">${new Date(body.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="color: #1a1a1a; font-size: 14px; font-weight: 600; width: 40%;">End Date:</td>
                          <td style="color: #1a1a1a; font-size: 14px; text-align: right; font-weight: 700;">${new Date(body.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
</table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #ffffff; font-size: 12px; opacity: 0.8;">This is an automated notification from LocaMarrakech</p>
              <p style="margin: 10px 0 0 0; color: #DAB875; font-size: 12px;">Please contact the customer to confirm the booking.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
</table>
</body>
</html>
      `,
    });

    // Send WhatsApp notification (non-blocking, lazy-loaded)
    const whatsappNumber = process.env.WHATSAPP_NUMBER;
    if (whatsappNumber) {
      // Send WhatsApp asynchronously (don't wait for it)
      sendWhatsAppNotification({
        fullName: body.fullName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        city: body.city,
        startDate: body.startDate,
        endDate: body.endDate,
        carName: body.carName,
        featuredImage: body.featuredImage,
        carPrice: body.carPrice,
        carModel: body.carModel,
        carTransmission: body.carTransmission,
        carSeats: body.carSeats,
        carFuel: body.carFuel,
      }, whatsappNumber).catch(() => {
        // Error already logged in function
      });
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Gmail authentication failed. Please check your EMAIL_USER and EMAIL_PASS environment variables. Make sure you are using a Gmail App Password, not your regular password.';
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection to email server failed. Please check your internet connection.';
    } else if (error.responseCode === 535) {
      errorMessage = 'Gmail authentication failed. Please verify your App Password is correct.';
    } else if (error.message) {
      errorMessage = `Email error: ${error.message}`;
    }
    
    
    return res.status(500).json({ 
      success: false, 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
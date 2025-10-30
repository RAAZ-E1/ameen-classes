import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, course } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate enquiry ID
    const enquiryId = `ENQ${Date.now().toString().slice(-6)}`;
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    
    // For now, we'll just log the enquiry
    console.log('New Enquiry Received:', {
      id: enquiryId,
      name,
      email,
      phone,
      subject,
      message,
      course,
      timestamp: new Date().toISOString()
    });

    // Simulate email notification (in real app, use services like SendGrid, Nodemailer, etc.)
    console.log(`Email notification sent to admin about enquiry ${enquiryId}`);
    console.log(`Confirmation email sent to ${email}`);

    return NextResponse.json({
      success: true,
      enquiryId,
      message: 'Enquiry submitted successfully'
    });

  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET method to retrieve enquiries (for admin dashboard)
export async function GET() {
  // In a real application, you would:
  // 1. Check authentication/authorization
  // 2. Fetch enquiries from database
  // 3. Return paginated results
  
  return NextResponse.json({
    message: 'Enquiry API endpoint - GET method for admin dashboard'
  });
}
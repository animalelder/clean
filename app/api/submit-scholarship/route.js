// app/api/submit-scholarship/route.js
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// MongoDB connection string - replace with your actual connection string
const uri = process.env.MONGODB_URI;
// Admin email to receive notifications
const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

// Export a named POST function instead of a default export
export async function POST(request) {
  try {
    console.log("submitting Scholarship application...");
    // Get form data from request body
    const formData = await request.json();

    console.log(`form data: ${formData}`);

    // Add timestamp
    formData.submittedAt = new Date();

    // Connect to MongoDB
    console.log("connecting to MongoDB...");
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("scholarship-db");
    const applications = database.collection("applications");

    // Insert into MongoDB
    console.log("inserting...");
    const result = await applications.insertOne(formData);

    // Send confirmation email
    console.log("sending confirmation email and admin email...");
    await sendEmails(formData);

    // Close the connection
    await client.close();

    // Return success response
    console.log("response to user...");
    return NextResponse.json(
      {
        message: "Application submitted successfully",
        applicationId: result.insertedId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      {
        message: "Error submitting application",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// We can also export a GET method if needed
export async function GET() {
  return NextResponse.json(
    {
      message: "This endpoint only accepts POST requests for form submissions",
    },
    { status: 405 },
  );
}

// Email sending function
async function sendEmails(formData) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify transporter configuration
  await transporter.verify();

  // Send confirmation email to applicant
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: formData.email,
    subject: "CLEAN Scholarship Application Received",
    html: `
      <h1>Thank you for your application!</h1>
      <p>Dear ${formData.fullName},</p>
      <p>We have received your application for the CLEAN scholarship program. Our team will review your submission and contact you soon.</p>
      <p>Regards,<br>The CLEAN Program Team</p>
    `,
  });

  // Send notification email to admin
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: ` ${formData.fullName} -- New CLEAN Scholarship Application`,
    html: `
      <h1>New Scholarship Application</h1>
      <p>A new scholarship application has been submitted by ${formData.fullName}.</p>
      <h2>Application Details:</h2>
      <ul>
        ${Object.entries(formData)
          .map(
            ([key, value]) =>
              `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:</strong> ${value}</li>`,
          )
          .join("")}
      </ul>



      <p>Please log in to MongoDB to view the complete application.</p>
    `,
  });
}

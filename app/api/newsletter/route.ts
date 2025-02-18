import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		// Validate the incoming request
		if (!req.body) {
			return NextResponse.json(
			  { error: "Request body is required" },
			  { status: 400 }
			);
		  }

		// Then parse the request body
		const { name, email, source } = await req.json();

		const [firstName, lastName] = name.split(" ");
		
		// Validate required fields
		if (!name || !email || !source) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Prepare the sheet_data payload
		const sheet_payload = {
			data: [
			  {
				id: "INCREMENT",
				name,
				email,
				source,
				date_added: "DATETIME"
			  },
			],
		  };

		  // Prepare the MailerLite payload - only add to general 30MMM list
		  const ML_payload = {
			email,
			fields: {
				name: firstName,
				last_name: lastName
			},
			groups: [
				"145613058614494607", "145423618440955699"
			]
		  };
		
		  // Make the API call to SheetDB
		  const response1 = await fetch("https://sheetdb.io/api/v1/6ew5z0x4mui24", {
			method: "POST",
			headers: {
			  Authorization: `Bearer ${process.env.SHEETDB_TOKEN}`,
			  Accept: "application/json",
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(sheet_payload),
		  });

		
		  // Check if the SheetsDB API call was successful
		  if (!response1.ok) {
			const errorData1 = await response1.json();
			return NextResponse.json(
			  { error: "Failed to save sheet_db data", details: errorData1 },
			  { status: response1.status }
			);
		  }

		  // Make the API call to MailerLite to add to general subscription list
		  const response2 = await fetch("https://connect.mailerlite.com/api/subscribers", {
			method: "POST",
			headers: {
			  Authorization: `Bearer ${process.env.MAILERLITE_TOKEN}`,
			  Accept: "application/json",
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(ML_payload),
		  });

		  // Check if the Mailerlite API call was successful
		  if (!response2.ok) {
			const errorData2 = await response2.json();
			return NextResponse.json(
			  { error: "Failed to update general 30MMM newsletter", details: errorData2 },
			  { status: response2.status }
			);
		  }

		// Return success response for SheetDB
		const data1 = await response1.json();
		
		// Return success response for MailerLite
		const data2 = await response2.json();

	  
		if (data1 && data2) {
			return NextResponse.json(
				{ message: "Data saved successfully", data1, data2},
				{ status: 201 }
			  );
		}
		
		
	} catch (error) {
		// Log the error for debugging (consider using a proper logging service)
		console.error("API Error:", error);
	
		// Return a generic error response
		return NextResponse.json(
		  { error: "Internal server error" },
		  { status: 500 }
		);
	  }
}
// app/api/profile/route.js
import prisma from "@/db"; // Use your existing prisma import
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Import your auth instance

export async function POST(request) {
  try {
    const session = await auth.api.getSession(request);
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to update your profile" },
        { status: 401 },
      );
    }

    // Get the user ID from the session
    const userId = session.user.id;

    // Parse the request body
    const profileData = await request.json();

    // Create or update user profile in the database
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: userId },
      update: {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        birthDate: profileData.birthdate
          ? new Date(profileData.birthdate)
          : null,
        maritalStatus: profileData.maritalStatus,
        childrenCount: parseInt(profileData.childrenCount) || 0,
        churchAffiliation: profileData.churchAffiliation,
        email: profileData.email,
        phoneNumber: profileData.telephone,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        zipcode: profileData.zipcode,
      },
      create: {
        userId: userId,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        birthDate: profileData.birthdate
          ? new Date(profileData.birthdate)
          : null,
        maritalStatus: profileData.maritalStatus,
        childrenCount: parseInt(profileData.childrenCount) || 0,
        churchAffiliation: profileData.churchAffiliation,
        email: profileData.email,
        phoneNumber: profileData.telephone,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        zipcode: profileData.zipcode,
      },
    });

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 },
    );
  }
}

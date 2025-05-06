// app/api/profile/route.js
import prisma from "@/db"; // Use your existing prisma import
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Import your auth instance

export async function POST(request) {
  try {
    //TODO: fix this to use the auth instance properly to retrieve the session information
    const authContext = auth.getAuthContext(request);
    const session = await authContext.getSession(request);

    // Check if user is authenticated
    if (!session || !session.data?.user) {
      return NextResponse.json(
        { error: "You must be logged in to update your profile" },
        { status: 401 },
      );
    }

    // Get the user ID from the session
    const userId = !session.data?.user.id;

    // Parse the request body
    const profileData = await request.json();

    // Create or update user profile in the database
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: userId },
      update: {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        birthdate: profileData.birthdate
          ? new Date(profileData.birthdate)
          : null,
        maritalStatus: profileData.maritalStatus,
        childrenCount: parseInt(profileData.childrenCount) || 0,
        churchAffiliation: profileData.churchAffiliation,
        email: profileData.email,
        telephone: profileData.telephone,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        zipcode: profileData.zipcode,
      },
      create: {
        userId: userId,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        birthdate: profileData.birthdate
          ? new Date(profileData.birthdate)
          : null,
        maritalStatus: profileData.maritalStatus,
        childrenCount: parseInt(profileData.childrenCount) || 0,
        churchAffiliation: profileData.churchAffiliation,
        email: profileData.email,
        telephone: profileData.telephone,
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
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}

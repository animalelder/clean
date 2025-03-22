import clientPromise from "@/lib/mongodb";

export default async function StoreMetadata(
  cohort,
  firstName,
  lastName,
  week,
  day,
  cleanFilename,
  imageUrl,
) {
  // creating a client
  // connecting to MongoDB
  try {
    const client = await clientPromise;

    // mongodb will create this db and collection if they don't already exist
    const collection = client.db("testimonials").collection("video-uploads");

    await collection.insertOne({
      cohort,
      firstName,
      lastName,
      week,
      day,
      cleanFilename,
      imageUrl,
    });
  } catch (error) {
    console.log("error in storing metadata: ", error);
  }
}

import { getDatabase } from "@/lib/mongodb";

export async function PUT(req) {
  const db = await getDatabase();
  const collection = db.collection("students");

  const body = await req.json();
  const { date, defaultStar = 1 } = body;

  if (!date) {
    return new Response(JSON.stringify({ error: "Date is required" }), {
      status: 400,
    });
  }

  // Update all students by adding the new date with the default star
  await collection.updateMany(
    {}, // Match all documents
    {
      $push: {
        stars: { date, star: defaultStar },
      },
    }
  );

  return new Response(JSON.stringify({ message: "Date added to all students" }), {
    status: 200,
  });
}

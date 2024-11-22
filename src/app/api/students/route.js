import { getDatabase } from "@/lib/mongodb";

export async function GET(req) {
  const db = await getDatabase();
  const collection = db.collection("students");

  const students = await collection.find({}).toArray();
  return new Response(JSON.stringify(students), { status: 200 });
}

export async function POST(req) {
  const db = await getDatabase();
  const collection = db.collection("students");

  const body = await req.json();
  const { name } = body;

  if (!name || typeof name !== "string") {
    return new Response(JSON.stringify({ error: "Invalid name" }), { status: 400 });
  }

  await collection.insertOne({ name, stars: [] });
  return new Response(JSON.stringify({ message: "Student added" }), { status: 201 });
}

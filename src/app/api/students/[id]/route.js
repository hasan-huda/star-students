import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
    const db = await getDatabase();
    const collection = db.collection("students");

    // Await params to ensure proper handling
    const { id } = await params;
    const body = await req.json();
    const { stars } = body;

    if (!ObjectId.isValid(id)) {
        return new Response(JSON.stringify({ error: "Invalid ID" }), {
            status: 400,
        });
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { stars } });

    return new Response(JSON.stringify({ message: "Student updated" }), {
        status: 200,
    });
}

import connectMongo from "@/lib/connectMongo";
import Revenue from "@/models/Revenue";

export async function GET() {
  await connectMongo();
  const revenues = await Revenue.find().sort({ createdAt: -1 });
  return Response.json(revenues);
}

export async function POST(req) {
  await connectMongo();
  const body = await req.json();

  const revenue = await Revenue.create({
    title: body.title,
    amount: body.amount,
    source: body.source,
    date: body.date ? new Date(body.date) : undefined,
  });

  return Response.json(revenue);
}

import connectMongo from "@/lib/connectMongo";
import Expense from "@/models/Expense";

export async function GET() {
  await connectMongo();
  const expenses = await Expense.find().sort({ createdAt: -1 });
  return Response.json(expenses);
}

export async function POST(req) {
  await connectMongo();
  const body = await req.json();
  const newExpense = await Expense.create(body);
  return Response.json(newExpense);
}

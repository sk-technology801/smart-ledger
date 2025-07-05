import connectMongo from '@/lib/connectMongo';
import Expense from '@/models/Expense';
import Revenue from '@/models/Revenue';

export async function GET() {
  await connectMongo();

  const expenses = await Expense.find({});
  const revenue = await Revenue.find({});

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const totalRevenue = revenue.reduce((acc, r) => acc + r.amount, 0);

  return Response.json({
    totalRevenue,
    totalExpenses,
    profit: totalRevenue - totalExpenses,
  });
}

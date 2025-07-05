import { connectDB } from "../../../lib/db";
import Revenue from "../../../models/revenue";
import Expense from "../../../models/expense";


export async function GET() {
  await connectDB();

  const revenues = await Revenue.find({});
  const expenses = await Expense.find({});

  const totalRevenue = revenues.reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthlyStats = months.map((month, index) => {
    const monthRevenues = revenues.filter(r => new Date(r.date).getMonth() === index);
    const monthExpenses = expenses.filter(e => new Date(e.date).getMonth() === index);

    const revenue = monthRevenues.reduce((sum, r) => sum + r.amount, 0);
    const expense = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      month,
      revenue,
      expenses: expense
    };
  });

  return Response.json({
    summary: {
      revenue: totalRevenue,
      expenses: totalExpenses
    },
    monthlyStats
  });
}

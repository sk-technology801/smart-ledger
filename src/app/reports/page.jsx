"use client";

import React, { useEffect, useState } from "react";

const ReportsPage = () => {
  const [revenues, setRevenues] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const revRes = await fetch("/api/revenue");
      const expRes = await fetch("/api/expenses");

      const revData = await revRes.json();
      const expData = await expRes.json();

      setRevenues(revData);
      setExpenses(expData);
    };

    fetchData();
  }, []);

  const totalRevenue = revenues.reduce((sum, r) => sum + Number(r.amount), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const profit = totalRevenue - totalExpenses;

  const combinedData = [
    ...revenues.map((item) => ({
      type: "Revenue",
      title: item.title,
      amount: item.amount,
      source: item.source,
      date: item.date || item.createdAt,
    })),
    ...expenses.map((item) => ({
      type: "Expense",
      title: item.title,
      amount: item.amount,
      source: item.category,
      date: item.date || item.createdAt,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Financial Reports</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">Total Revenue</h2>
            <p className="text-2xl font-bold text-green-400">${totalRevenue}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">Total Expenses</h2>
            <p className="text-2xl font-bold text-red-400">${totalExpenses}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">Net Profit</h2>
            <p className={`text-2xl font-bold ${profit >= 0 ? "text-green-300" : "text-red-300"}`}>
              ${profit}
            </p>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-left border border-gray-700 text-sm">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Title</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Source/Category</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map((item, i) => (
                <tr key={i} className="border-t border-gray-700">
                  <td className="p-3">{item.type}</td>
                  <td className="p-3">{item.title}</td>
                  <td
                    className={`p-3 ${
                      item.type === "Revenue" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    ${item.amount}
                  </td>
                  <td className="p-3">{item.source}</td>
                  <td className="p-3">
                    {new Date(item.date).toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;

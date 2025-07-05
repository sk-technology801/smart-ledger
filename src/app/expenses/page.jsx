"use client";

import React, { useEffect, useState } from "react";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const fetchExpenses = async () => {
    const res = await fetch("/api/expenses");
    const data = await res.json();
    setExpenses(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setForm({ title: "", amount: "", category: "", date: "" });
      fetchExpenses();
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Expenses Manager</h1>

        <form onSubmit={handleAdd} className="mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            className="p-2 rounded bg-gray-800 text-white"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="p-2 rounded bg-gray-800 text-white"
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
          <input
            className="p-2 rounded bg-gray-800 text-white"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 p-2 rounded text-white font-bold"
          >
            Add Expense
          </button>
        </form>

        <table className="w-full text-left border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id} className="border-t border-gray-700">
                <td className="p-3">{exp.title}</td>
                <td className="p-3 text-red-400">${exp.amount}</td>
                <td className="p-3">{exp.category}</td>
                <td className="p-3">
                  {exp.date
                    ? new Date(exp.date).toLocaleString()
                    : new Date(exp.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesPage;

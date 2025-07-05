"use client";

import React, { useEffect, useState } from "react";

const RevenuePage = () => {
  const [revenues, setRevenues] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    source: "",
    date: "",
  });

  const fetchRevenues = async () => {
    const res = await fetch("/api/revenue");
    const data = await res.json();
    setRevenues(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/revenue", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setForm({ title: "", amount: "", source: "", date: "" });
      fetchRevenues();
    }
  };

  useEffect(() => {
    fetchRevenues();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Revenues</h1>

        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <input
            className="p-2 rounded bg-gray-800 text-white"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
          <input
            className="p-2 rounded bg-gray-800 text-white"
            placeholder="Source"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
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
            Add Revenue
          </button>
        </form>

        <table className="w-full text-left border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Source</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {revenues.map((rev) => (
              <tr key={rev._id} className="border-t border-gray-700">
                <td className="p-3">{rev.title}</td>
                <td className="p-3 text-green-400">${rev.amount}</td>
                <td className="p-3">{rev.source}</td>
                <td className="p-3">
                  {rev.date
                    ? new Date(rev.date).toLocaleString()
                    : new Date(rev.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenuePage;

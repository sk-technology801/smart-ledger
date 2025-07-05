"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({ revenue: 0, expenses: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const json = await response.json();
        setData(json.monthlyStats);
        setSummary(json.summary);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10">Smart Ledger Dashboard</h1>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
  <div className="p-4 bg-gray-900 rounded-xl shadow-lg">
    <h2 className="text-lg">Total Revenue</h2>
    <p className="text-2xl font-bold text-green-400">${summary?.revenue ?? 0}</p>
  </div>
  <div className="p-4 bg-gray-900 rounded-xl shadow-lg">
    <h2 className="text-lg">Total Expenses</h2>
    <p className="text-2xl font-bold text-red-400">${summary?.expenses ?? 0}</p>
  </div>
</div>

        <div className="bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-lg mb-4">Monthly Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#666' }} />
              <Bar dataKey="revenue" fill="#34d399" />
              <Bar dataKey="expenses" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

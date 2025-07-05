"use client";

import React, { useEffect, useState, useRef } from "react";

const ReportsPage = () => {
  const [revenues, setRevenues] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const printRef = useRef();

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
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    if (startDate || endDate) {
      const filtered = combinedData.filter((item) => {
        const itemDate = new Date(item.date);
        const afterStart = startDate ? itemDate >= new Date(startDate) : true;
        const beforeEnd = endDate ? itemDate <= new Date(endDate) : true;
        return afterStart && beforeEnd;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(combinedData);
    }
  }, [startDate, endDate, revenues, expenses]);

  const totalRevenue = filteredData
    .filter((i) => i.type === "Revenue")
    .reduce((sum, r) => sum + Number(r.amount), 0);
  const totalExpenses = filteredData
    .filter((i) => i.type === "Expense")
    .reduce((sum, r) => sum + Number(r.amount), 0);
  const profit = totalRevenue - totalExpenses;

  const exportCSV = () => {
    const csvHeader = "Type,Title,Amount,Source,Date\n";
    const csvRows = filteredData.map(
      (item) =>
        `${item.type},${item.title},${item.amount},${item.source},${new Date(
          item.date
        ).toLocaleString()}`
    );
    const csvString = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "financial_report.csv";
    a.click();
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    const WinPrint = window.open("", "", "width=900,height=650");
    WinPrint.document.write("<html><head><title>Print Report</title>");
    WinPrint.document.write("</head><body>");
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.write("</body></html>");
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Financial Reports</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div>
            <label className="block mb-1">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={exportCSV}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Export CSV
            </button>
            <button
              onClick={handlePrint}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Print
            </button>
          </div>
        </div>

        <div ref={printRef}>
          {/* Totals */}
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

          {/* Table */}
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
                {filteredData.map((item, i) => (
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
    </div>
  );
};

export default ReportsPage;

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const [revenues, setRevenues] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Optional: Redirect unauthenticated users
    if (status === "unauthenticated") {
      window.location.href = "/api/auth/signin";
    }

    // Fetch revenue and expense data here
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome Admin: {session?.user?.email}</h1>
      {/* Show data */}
    </div>
  );
};

export default AdminPage;

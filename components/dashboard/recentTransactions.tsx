import React from "react";
import { cn } from "@/lib/utils";

type TransactionStatus = "paid" | "pending" | "failed" | "refunded";

interface Transaction {
  id: string;
  client: string;
  service: string;
  date: string;
  amount: number;
  status: TransactionStatus;
}

const transactions: Transaction[] = [
  {
    id: "TXN-001",
    client: "John Doe",
    service: "Hair Color",
    date: "21 Dec 2025 • 11:00 AM",
    amount: 7500,
    status: "paid",
  },
  {
    id: "TXN-002",
    client: "Mary Jane",
    service: "Hair Cut",
    date: "22 Dec 2025 • 2:30 PM",
    amount: 3500,
    status: "pending",
  },
  {
    id: "TXN-003",
    client: "Samuel",
    service: "Pedicure",
    date: "23 Dec 2025 • 10:00 AM",
    amount: 5000,
    status: "failed",
  },
];

const statusStyles: Record<TransactionStatus, string> = {
  paid: "bg-green-50 text-green-700 border border-green-700",
  pending: "bg-yellow-50 text-yellow-700 border border-yellow-700",
  failed: "bg-red-50 text-red-700 border border-red-700",
  refunded: "bg-gray-100 text-gray-700 border border-gray-400",
};

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

const RecentTransactions = () => {
  return (
    <div className="border-2 p-5 border-[#E9EBEC] rounded-sm">
      <h1 className="text-xl font-medium">Recent Transactions</h1>

      <div className="mt-6 space-y-4">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            No recent transactions
          </p>
        ) : (
          transactions.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between gap-4 border-b-2 border-[#E9EBEC] pb-4 last:border-b-0"
            >
              {/* Left */}
              <div>
                <h3 className="font-medium">{txn.client}</h3>
                <p className="text-sm text-gray-500">
                  {txn.service} • {txn.date}
                </p>
                <span className="font-semibold">
                  {formatAmount(txn.amount)}
                </span>

              </div>

              {/* Right */}
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap",
                    statusStyles[txn.status]
                  )}
                >
                  {txn.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;

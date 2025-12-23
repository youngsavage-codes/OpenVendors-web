import React from "react";
import { cn } from "@/lib/utils";

interface TopService {
  id: number;
  name: string;
  bookings: number;
  revenue: number;
}

const services: TopService[] = [
  {
    id: 1,
    name: "Hair Color",
    bookings: 42,
    revenue: 315000,
  },
  {
    id: 2,
    name: "Hair Cut",
    bookings: 36,
    revenue: 180000,
  },
  {
    id: 3,
    name: "Massage Therapy",
    bookings: 21,
    revenue: 262500,
  },
  {
    id: 4,
    name: "Pedicure",
    bookings: 18,
    revenue: 90000,
  },
];

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

const maxBookings = Math.max(...services.map((s) => s.bookings));

const TopServices = () => {
  return (
    <div className="border-2 p-5 border-[#E9EBEC] rounded-sm">
      <h1 className="text-xl font-medium">Top Services</h1>

      <div className="mt-6 space-y-4">
        {services.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            No service data available
          </p>
        ) : (
          services.map((service, index) => {
            const progress =
              (service.bookings / maxBookings) * 100;

            return (
              <div key={service.id} className="space-y-2">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-400">
                      #{index + 1}
                    </span>
                    <h3 className="font-medium">{service.name}</h3>
                  </div>

                  <span className="text-sm font-semibold">
                    {formatAmount(service.revenue)}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{service.bookings} bookings</span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TopServices;

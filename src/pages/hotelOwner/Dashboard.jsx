import React, { useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(dashboardDummyData);
  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze  revenue-all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      <div className="flex gap-4 my-8">
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt="totalBooking-Icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt="totalRevenue-Icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">
              $ {dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        {" "}
        Recent Bookings
      </h2>

      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md overflow-hidden rounded-2xl bg-clip-border">
        <table className="w-full min-w-160 table-auto text-left text-sm text-slate-700 ">
          <thead className="bg-slate-200 text-slate-500 ">
            <tr className="border-b border-slate-200 ">
              <th scope="col" className="px-4 py-3 font-medium">
                User Name
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Room Name
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                Total Amount
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {dashboardData.bookings.length > 0 ? (
              dashboardData.bookings.map((item) => (
                <tr key={item._id} className="transition-colors hover:bg-slate-100">
                  <td className="px-4 py-3 align-middle">
                    {item.user.username}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {item.room.roomType}
                  </td>
                  <td className="px-4 py-3 text-right align-middle tabular-nums">
                    ${item.totalPrice}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        item.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.isPaid ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No recent bookings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

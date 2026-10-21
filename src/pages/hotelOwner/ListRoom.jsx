import React, { useState } from "react";
import { roomsDummyData } from "../../assets/assets";
import Title from "../../components/Title";

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);
  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />
      <p className="text-gray-500 mt-8">All Rooms</p>

      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md overflow-hidden rounded-2xl bg-clip-border">
        <table className="w-full min-w-160 table-auto text-left text-sm text-slate-700 ">
          <thead className="bg-slate-200 text-slate-500 ">
            <tr className="border-b border-slate-200 ">
              <th scope="col" className="px-4 py-3 font-medium">
                Name
              </th>
              <th scope="col" className="px-4 py-3 font-medium max-sm:hidden">
                Facility
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                Price / night
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rooms.map((item) => (
              <tr key={item._id}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(" , ")}
                </td>
                <td className="px-4 py-3 text-right align-middle tabular-nums">
                  $ {item.pricePerNight}
                </td>
                <td className="px-4 py-3 border-t border-gray-300 align-middle tabular-nums text-red-500">
                  <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                      aria-label={`Toggle availability for ${item.roomType}`}
                      onChange={() =>
                        setRooms((currentRooms) =>
                          currentRooms.map((room) =>
                            room._id === item._id
                              ? { ...room, isAvailable: !room.isAvailable }
                              : room,
                          ),
                        )
                      }
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;

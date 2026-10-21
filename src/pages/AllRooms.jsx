import React, { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const CheckBox = ({ label, selected, onChange }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const roomTypes = [
    "Single Bed",
    "Dormitory Bed",
    "Double Bed",
    "Luxury Bed",
    "Family Bed",
  ];

  const priceRanges = [
    { label: "0 to 500", min: 0, max: 500 },
    { label: "500 to 1000", min: 500, max: 1000 },
    { label: "1000 to 2000", min: 1000, max: 2000 },
    { label: "2000 to 3000", min: 2000, max: 3000 },
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  const filteredRooms = roomsDummyData.filter((room) => {
    const matchesRoomType =
      selectedRoomTypes.length === 0 ||
      selectedRoomTypes.includes(room.roomType);
    const matchesPrice =
      selectedPriceRanges.length === 0 ||
      priceRanges.some(
        ({ label, min, max }) =>
          selectedPriceRanges.includes(label) &&
          room.pricePerNight >= min &&
          room.pricePerNight <= max
      );

    return matchesRoomType && matchesPrice;
  });

  const toggleSelection = (setSelection) => (checked, value) => {
    setSelection((current) =>
      checked
        ? [...current, value]
        : current.filter((selected) => selected !== value)
    );
  };

  const clearFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-500 last pb-30 last:border-0"
            >
              <img
                onClick={() => {
                  (navigate(`/rooms/${room._id}`), scrollTo(0, 0));
                }}
                src={room.images[0]}
                alt="Hotel-Image"
                title="View Room Details"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
              />
              <div className="md:w-1/2 flex flex-col gap-2">
                <p
                  onClick={() => {
                    (navigate(`/rooms/${room._id}`), scrollTo(0, 0));
                  }}
                  className="text-gray-500"
                >
                  {room.hotel.city}
                </p>
                <p className="text-gray-800 text-3xl font-playfair cursor-pointer">
                  {room.hotel.name}
                </p>
                <div className="flex items-center">
                  <StarRating />
                  <p className="ml-2">200+ Reviews</p>
                </div>

                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{room.hotel.address}</span>
                </div>

                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-5 h-5"
                      />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xl font-medium text-gray-700">
                  ${room.pricePerNight}/ night
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="py-10 text-gray-500">
            No rooms match the selected filters.
          </p>
        )}
      </div>

      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 lg:border-b border-gray-300 ${openFilters && "border-b"}`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block" onClick={clearFilters}>
              CLEAR
            </span>
          </div>
        </div>

        <div
          className={`${openFilters ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Room Type</p>
            {roomTypes.map((room) => (
              <CheckBox
                key={room}
                label={room}
                selected={selectedRoomTypes.includes(room)}
                onChange={toggleSelection(setSelectedRoomTypes)}
              />
            ))}
          </div>

          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price per Night</p>
            {priceRanges.map((range) => (
              <CheckBox
                key={range.label}
                label={`$ ${range.label}`}
                selected={selectedPriceRanges.includes(range.label)}
                onChange={(checked) =>
                  toggleSelection(setSelectedPriceRanges)(
                    checked,
                    range.label
                  )
                }
              />
            ))}
          </div>

          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;

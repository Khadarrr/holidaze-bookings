// "use client"
// import React, { useState, useEffect } from 'react';
// import { Booking, Venue } from '../lib/types'; // Import Venue interface
// import { fetchBookings, fetchVenues } from '../lib/data'; // Import fetchVenues function

// interface CalendarProps {
//   selectedDate?: Date | null;
//   onSelect: (date: Date) => void;
//   onBookingSelect?: (booking: Booking) => void;
//   reservedDates: { startDate: Date; endDate: Date; }[];
// }

// const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelect, onBookingSelect, reservedDates }) => {
//   const [currentDate, setCurrentDate] = useState<Date>(selectedDate || new Date());
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [isLoadingBookings, setIsLoadingBookings] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [venues, setVenues] = useState<Venue[]>([]);

//   useEffect(() => {
//     const fetchBookingsData = async () => {
//       setIsLoadingBookings(true);
//       try {
//         const fetchedBookings = await fetchBookings();
//         setBookings(fetchedBookings || []);
//       } catch (error) {
//         setError(error instanceof Error ? error.message : 'Failed to fetch bookings');
//       } finally {
//         setIsLoadingBookings(false);
//       }
//     };

//     const fetchVenuesData = async () => {
//       try {
//         const fetchedVenues = await fetchVenues();
//         setVenues(fetchedVenues || []);
//       } catch (error) {
//         console.error('Failed to fetch venues:', error);
//       }
//     };

//     fetchBookingsData();
//     fetchVenuesData();
//   }, [currentDate]);

//   const handlePrevMonth = () => {
//     const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
//     setCurrentDate(newDate);
//   };

//   const handleNextMonth = () => {
//     const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
//     setCurrentDate(newDate);
//   };

//   const handleDayClick = (date: Date) => {
//     onSelect(date);
//     openModalForDate(date);
//   };

//   const openModalForDate = (date: Date) => {
//     const bookingsForDate = bookings.filter(booking => {
//       const bookingStartDate = new Date(booking.dateFrom);
//       const bookingEndDate = new Date(booking.data.dateTo);
//       return date >= bookingStartDate && date <= bookingEndDate;
//     });
  
//     if (bookingsForDate.length > 0) {
//       const modal = document.getElementById('my_modal_4') as HTMLDialogElement | null;
//       modal?.close(); // Close the dialog if found
//     }
//   };


//   const getCalendarMonth = (date: Date): Array<Date | null> => {
//     const days = [];
//     const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
//     const firstDayWeekday = firstDay.getDay();

//     for (let i = 0; i < firstDayWeekday; i++) {
//       days.push(null);
//     }

//     const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(new Date(date.getFullYear(), date.getMonth(), i));
//     }

//     const remainingCells = 7 - (days.length % 7);
//     for (let i = 0; i < remainingCells; i++) {
//       days.push(null);
//     }

//     return days;
//   };

//   const days = getCalendarMonth(currentDate);

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header flex justify-between items-center mb-4">
//         <button onClick={handlePrevMonth}>&lt;</button>
//         <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
//         <button onClick={handleNextMonth}>&gt;</button>
//       </div>
//       <div className="calendar-grid grid grid-cols-7 gap-1">
//         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//           <div key={day} className="calendar-day-header font-bold text-center">{day}</div>
//         ))}
//         {days.map((day, index) => {
//           const isBooked = day && bookings.some((booking) => {
//             const bookingStartDate = new Date(booking?.data?.dateFrom);
//             const bookingEndDate = new Date(booking?.data?.dateTo);
//             return day >= bookingStartDate && day <= bookingEndDate;
//           });

//           const isSelected = day && day.getTime() === selectedDate?.getTime();

//           return (
//             <div
//               key={index}
//               className={`calendar-day text-center p-2 cursor-pointer ${isSelected ? 'bg-blue-200' : ''} ${isBooked ? 'bg-red-200' : ''}`}
//               onClick={() => day && handleDayClick(day)}
//             >
//               {day ? day.getDate() : ''}
//             </div>
//           );
//         })}
//       </div>
//       {error && <div className="text-red-500 text-center">{error}</div>}
//       {isLoadingBookings && <div className="text-center">Loading...</div>}

//       <dialog id="my_modal_4" className="modal">
//         {venues.length > 0 && (
//           <div className="modal-box w-11/12 max-w-5xl">
//             <h3 className="font-bold text-lg">Available Venues</h3>
//             {venues.map((venue) => (
//               <div key={venue.id} className="venue-card">
//                 <img src={venue.media[0]?.url} alt={venue.media[0]?.alt || ""} className="venue-image" />
//                 <div className="venue-details">
//                   <h4>{venue.name}</h4>
//                   <p>Price: ${venue.price}</p>
//                   <p>Max Guests: {venue.maxGuests}</p>
//                   {/* Additional details (optional) */}
//                   {venue.meta && (
//                     <ul className="flex space-x-2">
//                       {venue.meta.wifi && <li>Wi-Fi</li>}
//                       {venue.meta.parking && <li>Parking</li>}
//                       {venue.meta.breakfast && <li>Breakfast</li>}
//                       {venue.meta.pets && <li>Pets Allowed</li>}
//                     </ul>
//                   )}
//                 </div>
//               </div>
//             ))}
//             <div className="modal-action">
//               <form method="dialog">
//               <button className="btn" onClick={() => document.getElementById('my_modal_4')?.closest('.modal')}>Close</button>

//               </form>
//             </div>
//           </div>
//         )}
//       </dialog>
//     </div>
//   );
// };

// export default Calendar;

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { api } from '../services/apiClient';

const MyEventBookings = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState('');

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await api.get('/api/user/my-appointments');
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await api.post('/api/user/cancel-appointment', { appointmentId });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Event Booking Payment',
      description: 'Event Booking Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await api.post('/api/user/verifyRazorpay', response);
          if (data.success) {
            navigate('/my-bookings');
            getUserAppointments();
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await api.post('/api/user/payment-stripe', { appointmentId });
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="mx-4 sm:mx-10 lg:mx-20 my-16">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 tracking-tight mb-10 text-center animate-fade-in-down">
        My Event Bookings
      </h2>
      <div className="max-w-5xl mx-auto space-y-6">
        {appointments.length === 0 ? (
          <div className="text-center text-gray-600 text-lg font-medium bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg p-8 animate-fade-in-up">
            No event bookings found.
          </div>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl p-6 sm:flex sm:gap-8 items-center transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 animate-slide-in-up"
            >
              <div className="flex-shrink-0 relative group">
                <img
                  className="w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-xl border-2 border-orange-200/60 group-hover:scale-105 transition-transform duration-400 ease-in-out"
                  src={item.docData.image}
                  alt={item.docData.name}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-xl"></div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-80 animate-pulse delay-100"></div>
                <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-80 animate-pulse delay-300"></div>
              </div>
              <div className="flex-1 mt-4 sm:mt-0 text-sm text-gray-700">
                <p className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                  {item.docData.name}
                </p>
                <p className="text-gray-500 font-medium italic">{item.docData.speciality}</p>
                <p className="mt-3 text-gray-600 font-semibold">Venue:</p>
                <p className="text-gray-600">{item.docData.address.line1}</p>
                <p className="text-gray-600">{item.docData.address.line2}</p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold">Date & Time:</span>{' '}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-3 justify-center text-sm text-center mt-6 sm:mt-0">
                {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                  <button
                    onClick={() => setPayment(item._id)}
                    className="py-3 px-8 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full font-semibold hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                  <button
                    onClick={() => appointmentStripe(item._id)}
                    className="py-3 px-8 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-semibold hover:bg-gradient-to-r hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Pay with Stripe
                  </button>
                )}

                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="py-3 px-8 bg-green-100 text-green-700 rounded-full font-semibold border border-green-200 hover:bg-green-200 transition-all duration-300">
                    Paid
                  </button>
                )}

                {item.isCompleted && (
                  <button className="py-3 px-8 bg-orange-100 text-orange-700 rounded-full font-semibold border border-orange-200 hover:bg-orange-200 transition-all duration-300">
                    Completed
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="py-3 px-8 bg-red-100 text-red-600 rounded-full font-semibold hover:bg-red-200 hover:text-red-700 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Cancel
                  </button>
                )}

                {item.cancelled && (
                  <button className="py-3 px-8 bg-red-100 text-red-600 rounded-full font-semibold border border-red-200">
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyEventBookings;
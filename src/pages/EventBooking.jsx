import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { AppContext } from '../context/AppContext';
import { api } from '../services/apiClient';

const EventBooking = () => {
  const { docId: eventId } = useParams();
  const { doctors: events, currencySymbol, backendUrl, token, getDoctosData: getEventsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = events.find((doc) => doc._id === eventId);
    setDocInfo(docInfo);
  };

  const getAvailableSolts = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + '_' + month + '_' + year;
        const slotTime = formattedTime;

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book a slot');
      return navigate('/login');
    }

    const date = docSlots[slotIndex][0].datetime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = day + '_' + month + '_' + year;

    try {
      const { data } = await api.post('/api/user/book-appointment', { docId: eventId, slotDate, slotTime });
      if (data.success) {
        toast.success(data.message);
        getEventsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (events.length > 0) fetchDocInfo();
  }, [events, eventId]);

  useEffect(() => {
    if (docInfo) getAvailableSolts();
  }, [docInfo]);

  if (!docInfo) return null;

  return (
    <div className="mx-4 sm:mx-10 lg:mx-20 my-16">
      {/* Event Details Section */}
      <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl p-6 animate-slide-in-up">
        <div className="flex-shrink-0 relative group">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full sm:w-64 lg:w-80 h-72 rounded-2xl border-2 border-orange-200/60 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-80 animate-pulse delay-100"></div>
          <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-80 animate-pulse delay-300"></div>
        </div>

        <div className="flex-1 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 flex items-center gap-2 animate-fade-in-down">
            {docInfo.name}
            <img className="w-6" src={assets.verified_icon} alt="Verified" />
          </h1>
          <div className="flex items-center gap-4 mt-3 text-gray-600">
            <p className="text-sm sm:text-base font-medium">{docInfo.degree} • {docInfo.speciality}</p>
            <span className="py-1.5 px-4 border border-orange-200 text-xs rounded-full text-orange-600 bg-orange-50 hover:bg-orange-100 transition-all duration-300">
              {docInfo.experience}
            </span>
          </div>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              About the Event <img className="w-4" src={assets.info_icon} alt="Info" />
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-[700px] animate-fade-in-up delay-100">{docInfo.about}</p>
          </section>

          <p className="mt-5 text-base font-semibold text-gray-600">
            Entry Fee: <span className="text-gray-800 font-bold">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots Section */}
      <section className="mt-12">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-5 animate-fade-in-up">
          Available Time Slots
        </h3>

        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {docSlots.length > 0 &&
            docSlots.map((slotDay, idx) => (
              <div
                key={idx}
                onClick={() => setSlotIndex(idx)}
                className={`min-w-[90px] py-5 px-4 rounded-full text-center cursor-pointer transition-all duration-300 select-none ${
                  slotIndex === idx
                    ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white border border-orange-200/60 hover:bg-orange-50 hover:border-orange-300 text-gray-700'
                }`}
              >
                <p classNamekohli className="text-sm font-semibold">{slotDay[0] && daysOfWeek[slotDay[0].datetime.getDay()]}</p>
                <p className="text-lg font-medium">{slotDay[0] && slotDay[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex gap-3 overflow-x-auto mt-5 pb-3 scrollbar-hide">
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setSlotTime(slot.time)}
                className={`min-w-[100px] px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  slot.time === slotTime
                    ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white border border-orange-200/60 hover:bg-orange-50 hover:border-orange-300 text-gray-600'
                }`}
              >
                {slot.time.toLowerCase()}
              </button>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          disabled={!slotTime}
          className={`mt-8 w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-base px-14 py-3.5 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-600 hover:to-pink-600 hover:shadow-2xl hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
        >
          {slotTime ? 'Secure Your Spot' : 'Select a Time Slot'}
        </button>
      </section>

      {/* Related Events Section */}
      <section className="mt-14">
        <RelatedDoctors speciality={docInfo.speciality} docId={eventId} />
      </section>
    </div>
  );
};

export default EventBooking;
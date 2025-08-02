import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedStations';
import { AppContext } from '../context/AppContext';
import { api } from '../services/apiClient';

const StationBooking = () => {
  const { docId: stationId } = useParams();
  const { doctors: stations, currencySymbol, backendUrl, token, getDoctosData: getStationsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = stations.find((doc) => doc._id === stationId);
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
      const { data } = await api.post('/api/user/book-appointment', { docId: stationId, slotDate, slotTime });
      if (data.success) {
        toast.success(data.message);
        getStationsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (stations.length > 0) fetchDocInfo();
  }, [stations, stationId]);

  useEffect(() => {
    if (docInfo) getAvailableSolts();
  }, [docInfo]);

  if (!docInfo) return null;

  return (
    <div className="mx-4 sm:mx-10 lg:mx-20 my-16">
      {/* Station Details Section */}
      <div className="flex flex-col md:flex-row gap-8 bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_4px_16px_rgba(34,197,94,0.1)] p-6 animate-slide-in-up">
        <div className="flex-shrink-0 relative">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full sm:w-64 lg:w-80 h-72 rounded-2xl border-2 border-green-200/50 object-cover hover:border-lime-400 hover:shadow-[0_4px_12px_rgba(34,197,94,0.2)] transition-all duration-300"
            loading="lazy"
          />
        </div>

        <div className="flex-1 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-green-700 flex items-center gap-2 animate-fade-in-down">
            <span className="text-2xl text-lime-500 animate-pulse">⚡️</span>
            {docInfo.name}
            <img className="w-6" src={assets.verified_icon} alt="Verified" />
          </h1>
          <div className="flex items-center gap-4 mt-3 text-gray-600">
            <p className="text-sm sm:text-base font-medium">{docInfo.type} • {docInfo.location}</p>
          </div>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2">
              About the Station <img className="w-4" src={assets.info_icon} alt="Info" />
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-[700px] animate-fade-in-up delay-100">{docInfo.about}</p>
          </section>

          <p className="mt-5 text-base font-semibold text-gray-600">
            Charging Fee: <span className="text-green-700 font-semibold">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots Section */}
      <section className="mt-12">
        <h3 className="text-xl font-semibold text-green-700 mb-5 animate-fade-in-up">
          Available Charging Slots
        </h3>

        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {docSlots.length > 0 &&
            docSlots.map((slotDay, idx) => (
              <div
                key={idx}
                onClick={() => setSlotIndex(idx)}
                className={`min-w-[90px] py-5 px-4 rounded-xl text-center cursor-pointer transition-all duration-300 select-none border border-green-200/60 ${
                  slotIndex === idx
                    ? 'bg-green-600 text-white border-green-600 shadow-[0_4px_12px_rgba(34,197,94,0.3)]'
                    : 'bg-green-50 hover:bg-green-100 hover:border-lime-400 text-gray-700 active:bg-green-600 active:text-white'
                }`}
              >
                <p className="text-sm font-semibold">{slotDay[0] && daysOfWeek[slotDay[0].datetime.getDay()]}</p>
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
                className={`min-w-[100px] px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border border-green-200/60 ${
                  slot.time === slotTime
                    ? 'bg-green-600 text-white border-green-600 shadow-[0_4px_12px_rgba(34,197,94,0.3)]'
                    : 'bg-green-50 hover:bg-green-100 hover:border-lime-400 text-gray-600 active:bg-green-600 active:text-white'
                }`}
              >
                {slot.time.toLowerCase()}
              </button>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          disabled={!slotTime}
          className={`mt-8 w-full sm:w-auto bg-green-600 text-white font-semibold text-base px-14 py-3.5 rounded-xl transition-all duration-300 hover:bg-lime-500 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {slotTime ? 'Book Charging Slot' : 'Select a Time Slot'}
        </button>
      </section>

      {/* Related Stations Section */}
      <section className="mt-14">
        <RelatedDoctors speciality={docInfo.speciality} docId={stationId} />
      </section>

      {/* Custom Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes slide-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out;
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default StationBooking;
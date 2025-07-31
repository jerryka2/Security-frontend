import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { api } from '../services/apiClient';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      formData.append('userId', userData._id);
      if (image) formData.append('image', image);

      const { data } = await api.post('/api/user/update-profile', formData);

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="mx-4 sm:mx-10 lg:mx-24 my-20">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-100 mb-3 animate-pulse-slow">
            My Event Profile
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 font-medium">Personalize your details for unforgettable event experiences</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl border border-orange-100/50 overflow-hidden animate-slide-in-up">
          {/* Profile Image Section */}
          <div className="bg-gradient-to-b from-orange-50/80 to-pink-50/80 py-14 px-6 text-center relative">
            <div className="relative inline-block group">
              {isEdit ? (
                <label htmlFor="image" className="cursor-pointer">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto group-hover:scale-105 transition-transform duration-500 ease-in-out">
                    <img
                      className="w-full h-full object-cover"
                      src={image ? URL.createObjectURL(image) : userData.image}
                      alt="Profile"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                    <img className="w-6 h-6" src={assets.upload_icon} alt="Upload" />
                  </div>
                  <input
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
                        if (!validTypes.includes(file.type)) {
                          toast.error('Only .png, .jpeg, and .jpg files are allowed.');
                          return;
                        }
                        setImage(file);
                      }
                    }}
                    type="file"
                    id="image"
                    hidden
                  />
                </label>
              ) : (
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto group-hover:scale-105 transition-transform duration-500 ease-in-out">
                  <img
                    className="w-full h-full object-cover"
                    src={userData.image}
                    alt="Profile"
                  />
                </div>
              )}
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-75 animate-pulse delay-200"></div>
              <div className="absolute -bottom-5 -right-5 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-75 animate-pulse delay-400"></div>
            </div>

            {isEdit ? (
              <input
                className="mt-5 text-center text-2xl sm:text-3xl font-bold bg-transparent border-b-2 border-orange-300 focus:border-pink-500 outline-none px-4 py-2 text-gray-800 placeholder-gray-400 transition-all duration-300"
                type="text"
                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                value={userData.name}
                placeholder="Enter your name"
              />
            ) : (
              <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 animate-fade-in-up">
                {userData.name}
              </h2>
            )}
          </div>

          <div className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Contact Information */}
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-orange-200 pb-3 animate-fade-in-up delay-100">
                  Contact Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100/50 shadow-sm">
                    <p className="text-orange-600 font-medium">{userData.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                  {isEdit ? (
                    <input
                      className="w-full p-4 border border-orange-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none bg-white shadow-sm hover:shadow-md transition-all duration-300"
                      type="text"
                      onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                      value={userData.phone}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100/50 shadow-sm">
                      <p className="text-gray-700">{userData.phone}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                  {isEdit ? (
                    <div className="space-y-3">
                      <input
                        className="w-full p-4 border border-orange-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none bg-white shadow-sm hover:shadow-md transition-all duration-300"
                        type="text"
                        placeholder="Address Line 1"
                        onChange={(e) => setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))}
                        value={userData.address.line1}
                      />
                      <input
                        className="w-full p-4 border border-orange-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none bg-white shadow-sm hover:shadow-md transition-all duration-300"
                        type="text"
                        placeholder="Address Line 2"
                        onChange={(e) => setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))}
                        value={userData.address.line2}
                      />
                    </div>
                  ) : (
                    <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100/50 shadow-sm">
                      <p className="text-gray-700">
                        {userData.address.line1}<br />
                        {userData.address.line2}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-orange-200 pb-3 animate-fade-in-up delay-100">
                  Basic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
                  {isEdit ? (
                    <select
                      className="w-full p-4 border border-orange-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none bg-white shadow-sm hover:shadow-md transition-all duration-300"
                      onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                      value={userData.gender}
                    >
                      <option value="Not Selected">Not Selected</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100/50 shadow-sm">
                      <p className="text-gray-700">{userData.gender}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Birthday</label>
                  {isEdit ? (
                    <input
                      className="w-full p-4 border border-orange-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none bg-white shadow-sm hover:shadow-md transition-all duration-300"
                      type="date"
                      onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                      value={userData.dob}
                    />
                  ) : (
                    <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100/50 shadow-sm">
                      <p className="text-gray-700">{userData.dob}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-8 border-t border-orange-100 text-center">
              {isEdit ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={updateUserProfileData}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    Save Profile
                  </button>
                  <button
                    onClick={() => setIsEdit(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-10 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Edit Event Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default MyProfile;
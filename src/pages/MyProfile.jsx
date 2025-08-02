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
    <div className="mx-4 sm:mx-6 lg:mx-12 my-12">
      {/* Header Section */}
      <div className="bg-green-50 py-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-green-700 flex items-center justify-center gap-2">
          <span className="text-lg text-lime-500">⚡️</span>
          My Charging Profile
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl border border-green-200/50 shadow-sm">
          {/* Profile Image Section */}
          <div className="py-8 px-4 text-center">
            <div className="relative inline-block">
              {isEdit ? (
                <label htmlFor="image" className="cursor-pointer">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-green-200/50 mx-auto hover:border-lime-400 transition-all duration-200">
                    <img
                      className="w-full h-full object-cover"
                      src={image ? URL.createObjectURL(image) : userData.image}
                      alt="Profile"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-green-600 rounded-full p-1 hover:bg-lime-500 transition-all duration-200">
                    <img className="w-4 h-4" src={assets.upload_icon} alt="Upload" />
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
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-green-200/50 mx-auto">
                  <img
                    className="w-full h-full object-cover"
                    src={userData.image}
                    alt="Profile"
                  />
                </div>
              )}
            </div>

            {isEdit ? (
              <input
                className="mt-3 text-center text-lg font-medium bg-transparent border-b border-green-200/50 focus:border-lime-400 outline-none px-2 py-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
                type="text"
                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                value={userData.name}
                placeholder="Enter your name"
              />
            ) : (
              <h2 className="mt-3 text-lg font-medium text-green-700">{userData.name}</h2>
            )}
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-green-700 border-b border-green-200/50 pb-1">
                  Contact Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <div className="bg-green-50/30 p-2.5 rounded-lg border border-green-200/50">
                    <p className="text-green-600 font-medium text-sm">{userData.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  {isEdit ? (
                    <input
                      className="w-full p-2.5 border border-green-200/50 rounded-lg focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none bg-green-50/30 transition-all duration-200"
                      type="text"
                      onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                      value={userData.phone}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="bg-green-50/30 p-2.5 rounded-lg border border-green-200/50">
                      <p className="text-gray-700 text-sm">{userData.phone}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                  {isEdit ? (
                    <div className="space-y-2">
                      <input
                        className="w-full p-2.5 border border-green-200/50 rounded-lg focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none bg-green-50/30 transition-all duration-200"
                        type="text"
                        placeholder="Address Line 1"
                        onChange={(e) => setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))}
                        value={userData.address.line1}
                      />
                      <input
                        className="w-full p-2.5 border border-green-200/50 rounded-lg focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none bg-green-50/30 transition-all duration-200"
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
                    <div className="bg-green-50/30 p-2.5 rounded-lg border border-green-200/50">
                      <p className="text-gray-700 text-sm">
                        {userData.address.line1}<br />
                        {userData.address.line2}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-green-700 border-b border-green-200/50 pb-1">
                  Basic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                  {isEdit ? (
                    <select
                      className="w-full p-2.5 border border-green-200/50 rounded-lg focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none bg-green-50/30 transition-all duration-200"
                      onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                      value={userData.gender}
                    >
                      <option value="Not Selected">Not Selected</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <div className="bg-green-50/30 p-2.5 rounded-lg border border-green-200/50">
                      <p className="text-gray-700 text-sm">{userData.gender}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Birthday</label>
                  {isEdit ? (
                    <input
                      className="w-full p-2.5 border border-green-200/50 rounded-lg focus:border-lime-400 focus:ring-1 focus:ring-lime-400 outline-none bg-green-50/30 transition-all duration-200"
                      type="date"
                      onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                      value={userData.dob}
                    />
                  ) : (
                    <div className="bg-green-50/30 p-2.5 rounded-lg border border-green-200/50">
                      <p className="text-gray-700 text-sm">{userData.dob}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-green-200/50 text-center">
              {isEdit ? (
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={updateUserProfileData}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-lime-500 transition-all duration-200"
                  >
                    Save Profile
                  </button>
                  <button
                    onClick={() => setIsEdit(false)}
                    className="bg-green-50 text-green-700 px-6 py-2 rounded-lg font-medium hover:bg-green-100 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-lime-500 transition-all duration-200"
                >
                  Edit Charging Profile
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
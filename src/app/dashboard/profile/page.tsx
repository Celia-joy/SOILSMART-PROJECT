'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit, FiSave, FiX } from 'react-icons/fi'
import { GiPlantSeed } from 'react-icons/gi'
import { useTranslation } from '@/hooks/useTranslation'

interface FarmerProfile {
  name: string
  email: string
  phone: string
  location: string
  farmName: string
  farmSize: string
  joinDate: string
  bio: string
  crops: string[]
}

export default function ProfilePage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<FarmerProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'Nairobi, Kenya',
    farmName: 'Green Valley Farm',
    farmSize: '25 acres',
    joinDate: 'January 2023',
    bio: 'Passionate farmer dedicated to sustainable agriculture and soil health. Using technology to improve crop yields and protect the environment.',
    crops: ['Maize', 'Wheat', 'Beans', 'Tomatoes'],
  })

  useEffect(() => {
    const storedUser = localStorage.getItem('soilsmart_user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      // Update profile with user data if available
      if (userData.email) {
        setProfile(prev => ({
          ...prev,
          name: userData.name || prev.name,
          email: userData.email || prev.email,
          phone: userData.phone || prev.phone,
        }))
      }
    }
  }, [])

  const handleSave = () => {
    // Here you would typically save to an API
    setIsEditing(false)
    // Show success message
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original values if needed
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-3 sm:px-0 pb-4 sm:pb-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiArrowLeft className="text-xl" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display mb-1 sm:mb-2">{t('profile.title')}</h1>
                <p className="text-sm sm:text-base text-gray-600">Manage your profile information and farm details</p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-lg transition-colors text-sm font-medium"
              >
                <FiEdit className="text-base" />
                {t('profile.editProfile')}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <FiX className="text-base" />
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <FiSave className="text-base" />
                  {t('profile.saveChanges')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#16a34a] to-[#15803d] p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-[#16a34a]">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{profile.name}</h2>
                <p className="text-green-100 text-sm sm:text-base">{profile.farmName}</p>
                <p className="text-green-100 text-xs sm:text-sm mt-1">{profile.location}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiUser className="text-[#16a34a]" />
                  {t('profile.personalInfo')}
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.fullName')}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiMail className="text-gray-400" />
                    {t('profile.email')}
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiPhone className="text-gray-400" />
                    {t('profile.phone')}
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiMapPin className="text-gray-400" />
                    {t('profile.location')}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.location}</p>
                  )}
                </div>
              </div>

              {/* Farm Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <GiPlantSeed className="text-[#16a34a]" />
                  {t('profile.farmInfo')}
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.farmName')}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.farmName}
                      onChange={(e) => setProfile({ ...profile, farmName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.farmName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.farmSize')}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.farmSize}
                      onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.farmSize}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiCalendar className="text-gray-400" />
                    {t('profile.memberSince')}
                  </label>
                  <p className="text-gray-900">{profile.joinDate}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.cropsGrown')}</label>
                  <div className="flex flex-wrap gap-2">
                    {profile.crops.map((crop, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.bio')}</label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all resize-none"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}




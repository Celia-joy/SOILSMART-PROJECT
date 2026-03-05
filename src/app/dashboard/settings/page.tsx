'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { FiUser, FiMail, FiPhone, FiSave, FiBell, FiLock, FiSettings, FiShield, FiHelpCircle, FiArrowRight, FiEye, FiEyeOff, FiSun, FiGlobe, FiDownload, FiTrash2, FiX, FiCheck, FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'

type SettingsTab = 'profile' | 'notification' | 'preferences' | 'privacy' | 'support'

export default function SettingsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [user, setUser] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  
  const [formData, setFormData] = useState({
    name: 'Haya MASIMBILE',
    email: 'hope@giggrok.com',
    phone: '+250 745698909',
    bio: 'Dedicated farmer nurturing the land with care to grow healthy, sustainable crops.',
  })
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    taskReminders: true,
    communityUpdates: false,
    systemAnnouncements: true,
    emailNotifications: false,
    pushNotifications: true,
  })

  const [appPreferences, setAppPreferences] = useState({
    themeMode: 'light', // 'light' or 'dark'
    language: 'en-US',
  })

  const [privacySettings, setPrivacySettings] = useState({
    twoFactorAuth: false,
  })

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('soilsmart_user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setFormData({
        name: userData.name || 'Haya MASIMBILE',
        email: userData.email || 'hope@giggrok.com',
        phone: userData.phone || '+250 745698909',
        bio: userData.bio || 'Dedicated farmer nurturing the land with care to grow healthy, sustainable crops.',
      })
      if (userData.notificationSettings) {
        setNotificationSettings(userData.notificationSettings)
      }
      if (userData.appPreferences) {
        setAppPreferences(userData.appPreferences)
      }
      if (userData.privacySettings) {
        setPrivacySettings(userData.privacySettings)
      }
    }
  }, [])

  useEffect(() => {
    // Validate password match in real-time
    if (passwordData.newPassword && passwordData.confirmPassword) {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setPasswordError("Password don't match!")
      } else {
        setPasswordError('')
      }
    } else {
      setPasswordError('')
    }
  }, [passwordData.newPassword, passwordData.confirmPassword])

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      const updatedUser = { ...user, ...formData, notificationSettings, appPreferences, privacySettings }
      localStorage.setItem('soilsmart_user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setIsSaving(false)
      alert('Settings saved successfully!')
    }, 1000)
  }

  const handleSavePreferences = () => {
    setIsSaving(true)
    setTimeout(() => {
      const updatedUser = { ...user, appPreferences }
      localStorage.setItem('soilsmart_user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setIsSaving(false)
      alert('Preferences saved successfully!')
    }, 1000)
  }

  const handleToggleTwoFactor = () => {
    setPrivacySettings(prev => ({
      ...prev,
      twoFactorAuth: !prev.twoFactorAuth,
    }))
  }

  const handleDownloadData = () => {
    // Simulate data download
    const data = {
      user: formData,
      settings: { notificationSettings, appPreferences, privacySettings },
      timestamp: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `soilsmart-data-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    alert('Data download started!')
  }

  const handleDeleteAccount = () => {
    // Delete user data
    localStorage.removeItem('soilsmart_user')
    setShowDeleteModal(false)
    alert('Account deleted successfully!')
    window.location.href = '/'
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Password don't match!")
      return
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters!')
      return
    }
    setPasswordError('')
    alert('Password changed successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setShowChangePassword(false)
  }

  const handleToggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleMuteAll = () => {
    setNotificationSettings({
      taskReminders: false,
      communityUpdates: false,
      systemAnnouncements: false,
      emailNotifications: false,
      pushNotifications: false,
    })
  }

  const bioWordCount = formData.bio.split(/\s+/).filter(word => word.length > 0).length

  const settingsTabs = [
    { id: 'profile' as SettingsTab, label: t('settings.profile'), icon: FiUser },
    { id: 'notification' as SettingsTab, label: t('settings.notification'), icon: FiBell },
    { id: 'preferences' as SettingsTab, label: t('settings.appPreferences'), icon: FiSettings },
    { id: 'privacy' as SettingsTab, label: t('settings.privacySecurity'), icon: FiShield },
    { id: 'support' as SettingsTab, label: t('settings.supportFeedback'), icon: FiHelpCircle },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-3 sm:px-0 pb-4 sm:pb-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => router.push('/dashboard')}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display mb-1 sm:mb-2">{t('settings.title')}</h1>
              <p className="text-sm sm:text-base text-gray-600">{t('settings.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-2 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4 px-2">{t('settings.title')}</h3>
              <div className="space-y-1">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id)
                        setShowChangePassword(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                        activeTab === tab.id
                          ? 'bg-[#16a34a] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="text-lg sm:text-xl" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && !showChangePassword && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{t('settings.profileInformation')}</h2>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#16a34a] rounded-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl">
                      {formData.name.charAt(0)}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.fullName')}</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.email')}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.phoneNumber')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.bioDescription')}</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => {
                      const newBio = e.target.value
                      const wordCount = newBio.split(/\s+/).filter(word => word.length > 0).length
                      if (wordCount <= 100) {
                        setFormData({ ...formData, bio: newBio })
                      }
                    }}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all resize-none text-sm sm:text-base"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">{bioWordCount}/100 words</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 sm:flex-none px-6 py-3 bg-[#15803d] hover:bg-[#166534] text-white font-semibold rounded-lg transition-all disabled:opacity-50 text-sm sm:text-base"
                  >
                    {isSaving ? 'Saving...' : 'Save changes'}
                  </button>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="flex items-center justify-between sm:justify-center gap-2 px-4 sm:px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base"
                  >
                    <FiLock className="text-lg sm:text-xl" />
                    <span>Change password</span>
                    <FiArrowRight className="text-lg sm:text-xl" />
                  </button>
                </div>
              </div>
            )}

            {/* Change Password Section */}
            {activeTab === 'profile' && showChangePassword && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Change Password</h2>
                  <button
                    onClick={() => {
                      setShowChangePassword(false)
                      setPasswordError('')
                    }}
                    className="text-gray-600 hover:text-gray-900 text-sm sm:text-base"
                  >
                    ← Back to Profile
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all text-sm sm:text-base"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.current ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all text-sm sm:text-base"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.new ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-[#16a34a] transition-all text-sm sm:text-base ${
                          passwordError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#16a34a]'
                        }`}
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.confirm ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                      </button>
                    </div>
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                    )}
                  </div>

                  <button
                    onClick={handleChangePassword}
                    className="w-full px-6 py-3 bg-[#15803d] hover:bg-[#166534] text-white font-semibold rounded-lg transition-all text-sm sm:text-base"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            )}

            {/* Notification Tab */}
            {activeTab === 'notification' && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Notification Settings</h2>

                <div className="space-y-4 sm:space-y-6">
                  {/* Task Reminders */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{t('settings.taskReminders')}</h3>
                      <p className="text-sm text-gray-600">{t('settings.taskRemindersDesc')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.taskReminders}
                        onChange={() => handleToggleNotification('taskReminders')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]"></div>
                    </label>
                  </div>

                  {/* Community Updates */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Community Updates</h3>
                      <p className="text-sm text-gray-600">Stay informed about community posts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.communityUpdates}
                        onChange={() => handleToggleNotification('communityUpdates')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]"></div>
                    </label>
                  </div>

                  {/* System Announcements */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{t('settings.systemAnnouncements')}</h3>
                      <p className="text-sm text-gray-600">{t('settings.systemAnnouncementsDesc')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.systemAnnouncements}
                        onChange={() => handleToggleNotification('systemAnnouncements')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]"></div>
                    </label>
                  </div>

                  {/* Email Notifications */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Email notifications</h3>
                      <p className="text-sm text-gray-600">Receive updates through email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={() => handleToggleNotification('emailNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]"></div>
                    </label>
                  </div>

                  {/* Push Notifications */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Push notifications</h3>
                      <p className="text-sm text-gray-600">Receive notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={() => handleToggleNotification('pushNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]"></div>
                    </label>
                  </div>

                  {/* Mute All Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={handleMuteAll}
                      className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all text-sm sm:text-base"
                    >
                      Mute All Notifications
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* App Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">App Preferences</h2>

                <div className="space-y-6 sm:space-y-8">
                  {/* Theme Mode */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <FiSun className="text-yellow-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Theme Mode</h3>
                        <p className="text-sm text-gray-600">
                          {appPreferences.themeMode === 'light' ? 'Light mode is active' : 'Dark mode is active'}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={appPreferences.themeMode === 'dark'}
                        onChange={(e) => setAppPreferences({ ...appPreferences, themeMode: e.target.checked ? 'dark' : 'light' })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]"></div>
                    </label>
                  </div>

                  {/* Language */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <FiGlobe className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Language</h3>
                        <p className="text-sm text-gray-600">English (US)</p>
                      </div>
                    </div>
                    <select
                      value={appPreferences.language}
                      onChange={(e) => setAppPreferences({ ...appPreferences, language: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all text-sm sm:text-base"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="fr-FR">Français</option>
                      <option value="sw-KE">Kiswahili</option>
                      <option value="am-ET">Amharic</option>
                    </select>
                  </div>

                  {/* Save Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSavePreferences}
                      disabled={isSaving}
                      className="w-full px-6 py-3 bg-[#15803d] hover:bg-[#166534] text-white font-semibold rounded-lg transition-all disabled:opacity-50 text-sm sm:text-base"
                    >
                      {isSaving ? 'Saving...' : 'Save changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Security Tab */}
            {activeTab === 'privacy' && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Security & Privacy</h2>

                <div className="space-y-6 sm:space-y-8">
                  {/* Two-Factor Authentication */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add extra protection to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.twoFactorAuth}
                        onChange={handleToggleTwoFactor}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16a34a]"></div>
                    </label>
                  </div>

                  {/* Linked Accounts */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-4">Linked Accounts</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FiMail className="text-gray-600 text-xl" />
                        <span className="text-sm sm:text-base text-gray-700">Email: {formData.email}</span>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                        Connected
                      </span>
                    </div>
                  </div>

                  {/* Data Management */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Data management</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <button
                        onClick={handleDownloadData}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base"
                      >
                        <FiDownload className="text-lg" />
                        Download My Data
                      </button>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2">Get a copy of your account data (CSV format)</p>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-red-600 text-sm sm:text-base">Danger zone</h3>
                    <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all text-sm sm:text-base"
                      >
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Support & Feedback Tab */}
            {activeTab === 'support' && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Support & Feedback</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Help Center */}
                  <div className="p-4 sm:p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Help Center</h3>
                    <p className="text-sm text-gray-600 mb-4">Browse frequently asked questions</p>
                    <button className="w-full px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-medium rounded-lg transition-all text-sm sm:text-base">
                      Visit help center
                    </button>
                  </div>

                  {/* Send Feedback */}
                  <div className="p-4 sm:p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Send Feedback</h3>
                    <p className="text-sm text-gray-600 mb-4">Help us improve SoilSmart</p>
                    <button className="w-full px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-medium rounded-lg transition-all text-sm sm:text-base">
                      Share feedback
                    </button>
                  </div>

                  {/* Report a Problem */}
                  <div className="p-4 sm:p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Report a Problem</h3>
                    <p className="text-sm text-gray-600 mb-4">Tell us about any issues</p>
                    <button className="w-full px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-medium rounded-lg transition-all text-sm sm:text-base">
                      Report issue
                    </button>
                  </div>

                  {/* Contact Support */}
                  <div className="p-4 sm:p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">Contact Support</h3>
                    <p className="text-sm text-gray-600 mb-4">Reach our support team</p>
                    <div className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
                      <FiMail className="text-lg" />
                      <span>{formData.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Account Modal */}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Delete Account?</h2>
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FiX className="text-2xl" />
                    </button>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    This will permanently delete your account and all your data. Are you sure you must to continue?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all text-sm sm:text-base"
                    >
                      YES, DELETE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

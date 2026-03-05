'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { FiArrowLeft, FiBell, FiCheck, FiX, FiTrash2 } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'

interface Notification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
  type: 'info' | 'warning' | 'success' | 'alert'
}

export default function NotificationsPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Irrigation Completed',
      message: 'Zone 1 irrigation has been completed successfully. Water usage: 45L',
      time: '2 hours ago',
      read: false,
      type: 'success',
    },
    {
      id: 2,
      title: 'Low Battery Warning',
      message: 'Sensor SENS-004 battery is at 15%. Please replace soon.',
      time: '5 hours ago',
      read: false,
      type: 'warning',
    },
    {
      id: 3,
      title: 'Weather Update',
      message: 'Rain expected tomorrow. Irrigation scheduled has been adjusted.',
      time: '1 day ago',
      read: false,
      type: 'info',
    },
    {
      id: 4,
      title: 'Soil Analysis Ready',
      message: 'Your weekly soil analysis report is now available for download.',
      time: '2 days ago',
      read: true,
      type: 'info',
    },
    {
      id: 5,
      title: 'New Community Post',
      message: 'Farmer Kallis shared a new post in the community hub.',
      time: '3 days ago',
      read: true,
      type: 'info',
    },
    {
      id: 6,
      title: 'AI Recommendation',
      message: 'Increase irrigation for Zone 1. Soil moisture is below optimal level.',
      time: '4 days ago',
      read: true,
      type: 'alert',
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'warning':
        return '⚠'
      case 'alert':
        return '🔔'
      default:
        return 'ℹ'
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'alert':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display mb-1 sm:mb-2">{t('notifications.title')}</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {unreadCount > 0 ? t('notifications.unreadCount', { count: unreadCount }) : t('notifications.allCaughtUp')}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-[#16a34a] hover:text-[#15803d] font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                {t('notifications.markAllRead')}
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <FiBell className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('notifications.noNotifications')}</h3>
              <p className="text-gray-600">{t('notifications.allCaughtUp')}</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-4 sm:p-5 transition-all ${
                  notification.read
                    ? 'border-gray-100 opacity-75'
                    : `${getNotificationColor(notification.type)} border-l-4`
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                      notification.read ? 'bg-gray-100 text-gray-400' : getNotificationColor(notification.type)
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-semibold text-sm sm:text-base ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="flex-shrink-0 w-2 h-2 bg-[#16a34a] rounded-full mt-2"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">{notification.message}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-[#16a34a] hover:text-[#15803d] font-medium px-3 py-1 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-1"
                          >
                            <FiCheck className="text-sm" />
                            {t('notifications.markAsRead')}
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}




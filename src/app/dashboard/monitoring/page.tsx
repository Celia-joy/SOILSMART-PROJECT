'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { FiDownload, FiAlertCircle, FiTrendingUp, FiCloud, FiArrowLeft } from 'react-icons/fi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useTranslation } from '@/hooks/useTranslation'

export default function MonitoringPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'nutrients' | 'temperature' | 'ph'>('nutrients')

  const chartData = [
    { time: '00:00', value: 200 },
    { time: '04:00', value: 350 },
    { time: '08:00', value: 500 },
    { time: '12:00', value: 650 },
    { time: '16:00', value: 800 },
    { time: '20:00', value: 600 },
    { time: '24:00', value: 400 },
  ]

  const soilReports = [
    { id: 1, title: t('monitoring.weeklySoilAnalysis'), date: 'Oct 24, 2023' },
    { id: 2, title: t('monitoring.weeklySoilAnalysis'), date: 'Oct 17, 2023' },
    { id: 3, title: t('monitoring.weeklySoilAnalysis'), date: 'Oct 10, 2023' },
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display mb-1 sm:mb-2">{t('monitoring.title')}</h1>
              <p className="text-sm sm:text-base text-gray-600">{t('monitoring.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-1 sm:p-2">
          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('nutrients')}
              className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all ${
                activeTab === 'nutrients'
                  ? 'bg-[#16a34a] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('monitoring.nutrients')}
            </button>
            <button
              onClick={() => setActiveTab('temperature')}
              className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all ${
                activeTab === 'temperature'
                  ? 'bg-[#16a34a] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('monitoring.temperature')}
            </button>
            <button
              onClick={() => setActiveTab('ph')}
              className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all ${
                activeTab === 'ph'
                  ? 'bg-[#16a34a] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('monitoring.ph')}
            </button>
          </div>
        </div>

        {/* Nutrients Tab */}
        {activeTab === 'nutrients' && (
          <>
            {/* Soil Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">{t('monitoring.moistureLevel')}</h3>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">51.8%</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-[#16a34a] h-3 rounded-full" style={{ width: '51.8%' }}></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">{t('monitoring.nutrientStatus')}</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">{t('monitoring.nitrogen')}</span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">{t('monitoring.phosphorus')}</span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900">32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-600">{t('monitoring.potassium')}</span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900">28%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-2">Moisture level</h3>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">5.9 ppm</div>
            </div>

            {/* Graph */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{t('monitoring.soilHealthTrend')}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 1000]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#16a34a"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{t('monitoring.aiRecommendations')}</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <FiAlertCircle className="text-orange-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{t('monitoring.irrigationAlert')}</h4>
                      <p className="text-sm sm:text-base text-gray-700">
                        {t('monitoring.irrigationAlertDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <FiTrendingUp className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{t('monitoring.fertilizerSchedule')}</h4>
                      <p className="text-sm sm:text-base text-gray-700">
                        {t('monitoring.fertilizerScheduleDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-gray-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <FiCloud className="text-gray-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{t('monitoring.weatherAdvisory')}</h4>
                      <p className="text-sm sm:text-base text-gray-700">
                        {t('monitoring.weatherAdvisoryDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Soil Reports */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{t('monitoring.soilReports')}</h3>
              <div className="space-y-3 sm:space-y-4">
                {soilReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{report.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{report.date}</p>
                    </div>
                    <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors text-xs sm:text-sm font-medium">
                      <FiDownload className="text-sm sm:text-base" />
                      <span className="hidden sm:inline">{t('monitoring.downloadPDF')}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Temperature Tab */}
        {activeTab === 'temperature' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{t('monitoring.temperatureMonitoring')}</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} name={t('monitoring.temperatureUnit')} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* pH Tab */}
        {activeTab === 'ph' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">{t('monitoring.phLevels')}</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis domain={[5, 8]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} name={t('monitoring.phLevel')} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

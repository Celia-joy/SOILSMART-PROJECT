'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { FiArrowLeft, FiDownload, FiCalendar, FiTrendingUp, FiDroplet, FiThermometer, FiFileText } from 'react-icons/fi'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useTranslation } from '@/hooks/useTranslation'

export default function ReportsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month')

  const soilHealthData = [
    { date: 'Week 1', health: 72, moisture: 45, ph: 6.5 },
    { date: 'Week 2', health: 75, moisture: 48, ph: 6.6 },
    { date: 'Week 3', health: 76, moisture: 51, ph: 6.5 },
    { date: 'Week 4', health: 78, moisture: 52, ph: 6.7 },
  ]

  const waterUsageData = [
    { date: 'Mon', used: 245, saved: 89 },
    { date: 'Tue', used: 230, saved: 95 },
    { date: 'Wed', used: 260, saved: 75 },
    { date: 'Thu', used: 245, saved: 89 },
    { date: 'Fri', used: 250, saved: 85 },
    { date: 'Sat', used: 240, saved: 90 },
    { date: 'Sun', used: 235, saved: 95 },
  ]

  const temperatureData = [
    { time: '00:00', temp: 22 },
    { time: '04:00', temp: 20 },
    { time: '08:00', temp: 25 },
    { time: '12:00', temp: 30 },
    { time: '16:00', temp: 28 },
    { time: '20:00', temp: 24 },
  ]

  const reports = [
    { id: 1, title: t('reports.weeklySoilAnalysisReport'), date: 'Nov 20, 2025', type: 'PDF' },
    { id: 2, title: t('reports.monthlyWaterUsageReport'), date: 'Nov 1, 2025', type: 'PDF' },
    { id: 3, title: t('reports.soilHealthTrendReport'), date: 'Oct 27, 2025', type: 'CSV' },
    { id: 4, title: t('reports.irrigationEfficiencyReport'), date: 'Oct 20, 2025', type: 'PDF' },
  ]

  const handleDownload = (reportId: number) => {
    // Simulate download
    alert(`Downloading report ${reportId}...`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-3 sm:px-0 pb-4 sm:pb-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display mb-1 sm:mb-2">{t('reports.title')}</h1>
            <p className="text-sm sm:text-base text-gray-600">{t('reports.subtitle')}</p>
          </div>
        </div>

        {/* Period Selector */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{t('reports.selectPeriod')}</h2>
            <div className="flex gap-2">
              {(['week', 'month', 'year'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-[#16a34a] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(`reports.${period}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiTrendingUp className="text-green-600 text-xl" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">76%</div>
            <p className="text-xs sm:text-sm text-gray-600">{t('reports.overallSoilHealth')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiDroplet className="text-blue-600 text-xl" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">73%</div>
            <p className="text-xs sm:text-sm text-gray-600">{t('reports.waterEfficiency')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FiThermometer className="text-orange-600 text-xl" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">30°C</div>
            <p className="text-xs sm:text-sm text-gray-600">{t('reports.avgTemperature')}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiFileText className="text-purple-600 text-xl" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">12</div>
            <p className="text-xs sm:text-sm text-gray-600">{t('reports.totalReports')}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Soil Health Trend */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t('reports.soilHealthTrend')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={soilHealthData}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="health" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorHealth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Water Usage */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t('reports.waterUsageSavings')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={waterUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="used" fill="#3b82f6" name={t('reports.usedLiters')} />
                <Bar dataKey="saved" fill="#16a34a" name={t('reports.savedLiters')} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Chart */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t('reports.temperatureTrend')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} name="Temperature (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Available Reports */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('reports.availableReports')}</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors text-sm">
              <FiDownload className="text-base" />
              <span className="hidden sm:inline">{t('reports.exportAll')}</span>
            </button>
          </div>
          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FiFileText className="text-gray-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{report.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <FiCalendar className="text-gray-400 text-xs" />
                      <span className="text-xs text-gray-600">{report.date}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{report.type}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(report.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors text-sm"
                >
                  <FiDownload className="text-base" />
                  <span className="hidden sm:inline">{t('reports.download')}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { 
  FiDroplet, 
  FiClock, 
  FiTrendingUp, 
  FiAlertCircle,
  FiPlay,
  FiPause,
  FiSettings,
  FiActivity,
  FiCalendar,
  FiCloud,
  FiSun,
  FiWind,
  FiThermometer,
  FiEdit,
  FiX,
  FiSave,
  FiDollarSign,
  FiBell,
  FiZap,
  FiArrowLeft
} from 'react-icons/fi'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts'

// Sample data for charts
const waterUsageData = [
  { day: 'Mon', usage: 45, optimal: 40 },
  { day: 'Tue', usage: 52, optimal: 40 },
  { day: 'Wed', usage: 38, optimal: 40 },
  { day: 'Thu', usage: 41, optimal: 40 },
  { day: 'Fri', usage: 47, optimal: 40 },
  { day: 'Sat', usage: 39, optimal: 40 },
  { day: 'Sun', usage: 43, optimal: 40 },
]

const soilMoistureData = [
  { time: '00:00', zone1: 65, zone2: 58, zone3: 72, zone4: 45 },
  { time: '04:00', zone1: 62, zone2: 55, zone3: 68, zone4: 43 },
  { time: '08:00', zone1: 58, zone2: 52, zone3: 64, zone4: 40 },
  { time: '12:00', zone1: 54, zone2: 48, zone3: 60, zone4: 38 },
  { time: '16:00', zone1: 68, zone2: 62, zone3: 75, zone4: 50 },
  { time: '20:00', zone1: 70, zone2: 65, zone3: 78, zone4: 55 },
]

const historicalData = [
  { month: 'Jan', water: 1200, cost: 240 },
  { month: 'Feb', water: 1350, cost: 270 },
  { month: 'Mar', water: 1100, cost: 220 },
  { month: 'Apr', water: 980, cost: 196 },
  { month: 'May', water: 1050, cost: 210 },
  { month: 'Jun', water: 1245, cost: 249 },
]

export default function IrrigationPage() {
  const router = useRouter()
  const [zones, setZones] = useState([
    { id: 1, name: 'Zone 1 - North Field', status: 'active', moisture: 65, flowRate: 12.5, lastWatered: '2 hours ago', area: 2.5, crop: 'Maize', schedule: 'Daily 6AM' },
    { id: 2, name: 'Zone 2 - South Field', status: 'idle', moisture: 58, flowRate: 0, lastWatered: '5 hours ago', area: 3.0, crop: 'Beans', schedule: 'Daily 7AM' },
    { id: 3, name: 'Zone 3 - East Field', status: 'active', moisture: 72, flowRate: 15.2, lastWatered: '1 hour ago', area: 1.8, crop: 'Tomatoes', schedule: 'Twice Daily' },
    { id: 4, name: 'Zone 4 - West Field', status: 'scheduled', moisture: 45, flowRate: 0, lastWatered: '8 hours ago', area: 2.2, crop: 'Potatoes', schedule: 'Daily 2:30PM' },
  ])

  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedZone, setSelectedZone] = useState<any>(null)
  const [calculatorInputs, setCalculatorInputs] = useState({ area: '', days: '', currentUsage: '' })

  const notifications = [
    { id: 1, type: 'alert', message: 'Zone 4 needs immediate irrigation', time: '5 min ago', read: false },
    { id: 2, type: 'info', message: 'Water savings target achieved this week', time: '1 hour ago', read: false },
    { id: 3, type: 'success', message: 'Zone 1 irrigation completed successfully', time: '2 hours ago', read: true },
  ]

  const weatherData = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    forecast: 'Light rain expected in 2 hours',
    icon: '⛅'
  }

  const toggleZoneStatus = (zoneId: number) => {
    setZones(zones.map(zone => {
      if (zone.id === zoneId) {
        const newStatus = zone.status === 'active' ? 'idle' : 'active'
        return { ...zone, status: newStatus }
      }
      return zone
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'idle': return 'text-gray-600 bg-gray-100'
      case 'scheduled': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getMoistureColor = (moisture: number) => {
    if (moisture >= 70) return 'text-green-600'
    if (moisture >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const calculateSavings = () => {
    const area = parseFloat(calculatorInputs.area) || 0
    const days = parseFloat(calculatorInputs.days) || 0
    const currentUsage = parseFloat(calculatorInputs.currentUsage) || 0
    
    if (area === 0 || days === 0 || currentUsage === 0) return { saved: 0, percentage: 0, cost: 0 }
    
    const optimizedUsage = area * 40 * days // 40L per hectare per day optimal
    const saved = currentUsage - optimizedUsage
    const percentage = ((saved / currentUsage) * 100).toFixed(1)
    const cost = saved * 0.2 // $0.20 per liter
    
    return { saved: saved.toFixed(0), percentage, cost: cost.toFixed(2) }
  }

  const savings = calculateSavings()

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-4 sm:pb-6">
        {/* Header with Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-display">
                💧 Smart Irrigation System
              </h1>
              <p className="mt-2 text-gray-600">
                Monitor and control your irrigation zones in real-time
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <button 
              onClick={() => setShowCalculator(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <FiDollarSign className="text-lg" />
              <span>Savings Calculator</span>
            </button>
            <button 
              onClick={() => setShowNotifications(true)}
              className="relative btn-secondary flex items-center space-x-2"
            >
              <FiBell className="text-lg" />
              <span>Notifications</span>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <FiCalendar className="text-lg" />
              <span>Schedule</span>
            </button>
          </div>
        </div>

        {/* Weather Integration Card */}
        <div className="card bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-5xl">{weatherData.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{weatherData.condition}</h3>
                <p className="text-sm text-gray-600">{weatherData.forecast}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <FiThermometer className="text-2xl text-orange-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-900">{weatherData.temperature}°C</p>
                <p className="text-xs text-gray-600">Temperature</p>
              </div>
              <div className="text-center">
                <FiDroplet className="text-2xl text-blue-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-900">{weatherData.humidity}%</p>
                <p className="text-xs text-gray-600">Humidity</p>
              </div>
              <div className="text-center">
                <FiWind className="text-2xl text-gray-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-gray-900">{weatherData.windSpeed} km/h</p>
                <p className="text-xs text-gray-600">Wind Speed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Water Usage</p>
                <p className="text-2xl font-bold text-gray-900">1,245 L</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <FiTrendingUp className="mr-1" />
                  15% savings this week
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiDroplet className="text-3xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Zones</p>
                <p className="text-2xl font-bold text-gray-900">2 / 4</p>
                <p className="text-xs text-gray-500 mt-1">Currently irrigating</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FiActivity className="text-3xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="card hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Soil Moisture</p>
                <p className="text-2xl font-bold text-gray-900">60%</p>
                <p className="text-xs text-green-600 mt-1">Optimal range</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <FiTrendingUp className="text-3xl text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="card hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Cost Savings</p>
                <p className="text-2xl font-bold text-gray-900">$249</p>
                <p className="text-xs text-green-600 mt-1">This month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FiZap className="text-3xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Irrigation Zones with Enhanced Features */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 font-display">
              Irrigation Zones
            </h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All Zones →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {zones.map((zone) => (
              <div 
                key={zone.id}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-primary-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{zone.name}</h3>
                      <button
                        onClick={() => {
                          setSelectedZone(zone)
                          setShowConfigModal(true)
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <FiEdit className="text-sm" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(zone.status)}`}>
                        {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">• {zone.crop}</span>
                      <span className="text-xs text-gray-500">• {zone.area} ha</span>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FiClock className="text-xs" />
                      {zone.schedule}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleZoneStatus(zone.id)}
                    className={`p-3 rounded-lg transition-colors ml-2 ${
                      zone.status === 'active' 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {zone.status === 'active' ? <FiPause className="text-xl" /> : <FiPlay className="text-xl" />}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Soil Moisture</p>
                    <p className={`text-lg font-bold ${getMoistureColor(zone.moisture)}`}>
                      {zone.moisture}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Flow Rate</p>
                    <p className="text-lg font-bold text-gray-900">
                      {zone.flowRate} L/min
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Last Watered</p>
                    <p className="text-sm text-gray-700">
                      {zone.lastWatered}
                    </p>
                  </div>
                </div>

                {/* Mini progress bar */}
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        zone.moisture >= 70 ? 'bg-green-500' : 
                        zone.moisture >= 50 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}
                      style={{ width: `${zone.moisture}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Water Usage Chart */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-display">
              Weekly Water Usage
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={waterUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="usage" fill="#10b981" name="Actual Usage (L)" />
                <Bar dataKey="optimal" fill="#6366f1" name="Optimal (L)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Soil Moisture Trends */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-display">
              Soil Moisture Trends (24h)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={soilMoistureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="zone1" stroke="#10b981" strokeWidth={2} name="Zone 1" />
                <Line type="monotone" dataKey="zone2" stroke="#3b82f6" strokeWidth={2} name="Zone 2" />
                <Line type="monotone" dataKey="zone3" stroke="#8b5cf6" strokeWidth={2} name="Zone 3" />
                <Line type="monotone" dataKey="zone4" stroke="#f59e0b" strokeWidth={2} name="Zone 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historical Data Chart */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-display">
            Historical Water Usage & Cost (6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#3b82f6" />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="water" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWater)" name="Water (L)" />
              <Area yAxisId="right" type="monotone" dataKey="cost" stroke="#10b981" fillOpacity={1} fill="url(#colorCost)" name="Cost ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="card bg-yellow-50 border-2 border-yellow-200">
          <div className="flex items-start space-x-3">
            <FiAlertCircle className="text-2xl text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-1">System Alert</h3>
              <p className="text-yellow-800 text-sm">
                Zone 4 (West Field) has low soil moisture (45%). Irrigation scheduled for 2:30 PM today.
              </p>
              <button className="mt-3 text-sm font-medium text-yellow-900 hover:text-yellow-950 underline">
                Start Irrigation Now →
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Irrigation Schedule</h2>
                <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
                  <FiX className="text-2xl" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {zones.map((zone) => (
                  <div key={zone.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{zone.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(zone.status)}`}>
                        {zone.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="text-sm text-gray-600">Schedule Time</label>
                        <input type="time" defaultValue="06:00" className="w-full mt-1 px-3 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Frequency</label>
                        <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                          <option>Daily</option>
                          <option>Twice Daily</option>
                          <option>Every 2 Days</option>
                          <option>Weekly</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="text-sm text-gray-600">Duration (minutes)</label>
                      <input type="number" defaultValue="30" className="w-full mt-1 px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                ))}
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setShowScheduleModal(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={() => setShowScheduleModal(false)} className="btn-primary flex items-center space-x-2">
                    <FiSave />
                    <span>Save Schedule</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Zone Configuration Modal */}
        {showConfigModal && selectedZone && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Configure {selectedZone.name}</h2>
                <button onClick={() => setShowConfigModal(false)} className="text-gray-400 hover:text-gray-600">
                  <FiX className="text-2xl" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Zone Name</label>
                  <input type="text" defaultValue={selectedZone.name} className="w-full mt-1 px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Crop Type</label>
                  <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                    <option>Maize</option>
                    <option>Beans</option>
                    <option>Tomatoes</option>
                    <option>Potatoes</option>
                    <option>Rice</option>
                    <option>Wheat</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Area (hectares)</label>
                  <input type="number" defaultValue={selectedZone.area} step="0.1" className="w-full mt-1 px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Optimal Moisture Level (%)</label>
                  <input type="number" defaultValue="60" min="30" max="90" className="w-full mt-1 px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Flow Rate (L/min)</label>
                  <input type="number" defaultValue={selectedZone.flowRate} step="0.1" className="w-full mt-1 px-3 py-2 border rounded-lg" />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setShowConfigModal(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={() => setShowConfigModal(false)} className="btn-primary flex items-center space-x-2">
                    <FiSave />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Water Savings Calculator Modal */}
        {showCalculator && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Water Savings Calculator</h2>
                <button onClick={() => setShowCalculator(false)} className="text-gray-400 hover:text-gray-600">
                  <FiX className="text-2xl" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Farm Area (hectares)</label>
                  <input 
                    type="number" 
                    value={calculatorInputs.area}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, area: e.target.value})}
                    placeholder="e.g., 2.5"
                    step="0.1"
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Days Period</label>
                  <input 
                    type="number" 
                    value={calculatorInputs.days}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, days: e.target.value})}
                    placeholder="e.g., 30"
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Current Water Usage (Liters)</label>
                  <input 
                    type="number" 
                    value={calculatorInputs.currentUsage}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, currentUsage: e.target.value})}
                    placeholder="e.g., 3000"
                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                  />
                </div>
                
                {parseFloat(calculatorInputs.area) > 0 && parseFloat(calculatorInputs.days) > 0 && parseFloat(calculatorInputs.currentUsage) > 0 && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mt-4">
                    <h3 className="font-bold text-green-900 mb-2">Potential Savings</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Water Saved:</span>
                        <span className="font-bold text-green-600">{savings.saved} L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Savings Percentage:</span>
                        <span className="font-bold text-green-600">{savings.percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Cost Savings:</span>
                        <span className="font-bold text-green-600">${savings.cost}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setShowCalculator(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Modal */}
        {showNotifications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">
                  <FiX className="text-2xl" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-4 rounded-lg border-2 ${
                      notif.type === 'alert' ? 'bg-red-50 border-red-200' :
                      notif.type === 'info' ? 'bg-blue-50 border-blue-200' :
                      'bg-green-50 border-green-200'
                    } ${!notif.read ? 'font-semibold' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

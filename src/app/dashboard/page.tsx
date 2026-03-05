'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { 
  FiSun, 
  FiDroplet, 
  FiClock,
  FiCheck,
  FiPlus,
  FiMessageSquare,
  FiFileText,
  FiUsers,
  FiX,
  FiCalendar,
  FiSearch,
  FiBell,
  FiArrowLeft
} from 'react-icons/fi'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'

export default function DashboardPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Apply organic compost', completed: false },
    { id: 2, text: 'Check irrigation system', completed: false },
    { id: 3, text: 'Monitor soil pH levels', completed: true },
  ])
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [newTask, setNewTask] = useState({
    name: '',
    date: '',
    time: '',
    description: '',
  })

  const announcements = [
    {
      id: 1,
      title: t('dashboard.newAISoilAnalysis'),
      description: t('dashboard.newAISoilAnalysisDesc'),
      link: t('common.readMore')
    },
    {
      id: 2,
      title: t('dashboard.rainyWeekAhead'),
      description: t('dashboard.rainyWeekAheadDesc'),
      link: t('common.readMore')
    },
    {
      id: 3,
      title: t('dashboard.join30DayChallenge'),
      description: t('dashboard.join30DayChallengeDesc'),
      link: t('common.readMore')
    },
  ]

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.name.trim()) {
      setTasks([...tasks, {
        id: tasks.length + 1,
        text: newTask.name,
        completed: false,
      }])
      setNewTask({ name: '', date: '', time: '', description: '' })
      setShowAddTaskModal(false)
    }
  }

  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy')
  const currentTime = format(new Date(), 'h:mm a')

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-3 sm:px-0 pb-4 sm:pb-6">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => router.push('/')}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display mb-1 sm:mb-2">{t('dashboard.title')}</h1>
              <p className="text-sm sm:text-base text-gray-600">{t('dashboard.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Weather/Location Info */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-sm sm:text-base text-gray-600">{currentDate}</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">{t('dashboard.location', { location: 'Ruyenzi, Komonyi' })}</p>
            </div>
            <div className="flex items-center gap-2">
              <FiSun className="text-orange-500 text-xl sm:text-2xl" />
              <span className="text-base sm:text-lg font-semibold text-gray-900">{t('dashboard.weather', { temp: 30, condition: 'Sunny cloudy' })}</span>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Overall Soil Health */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                <FiDroplet className="text-xl sm:text-2xl text-green-600" />
              </div>
            </div>
            <div className="mb-2">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">76%</div>
              <p className="text-xs sm:text-sm text-gray-600">{t('dashboard.overallSoilHealth')}</p>
              <p className="text-xs text-gray-500 mt-1">{t('dashboard.lastUpdated', { minutes: 2 })}</p>
            </div>
          </div>

          {/* Today's Water Usage */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                <FiDroplet className="text-xl sm:text-2xl text-blue-600" />
              </div>
            </div>
            <div className="mb-2">
              <p className="text-sm sm:text-base text-gray-600 mb-1">{t('dashboard.used', { liters: 245 })}</p>
              <p className="text-sm sm:text-base text-gray-600 mb-1">{t('dashboard.saved', { liters: 89 })}</p>
              <p className="text-xs sm:text-sm font-semibold text-green-600">{t('dashboard.efficiencyToday', { percent: 73 })}</p>
            </div>
          </div>

          {/* Next Irrigation */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
                <FiClock className="text-xl sm:text-2xl text-purple-600" />
              </div>
            </div>
            <div className="mb-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{t('dashboard.nextIrrigation', { hours: 2, minutes: 45 })}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">{t('dashboard.zoneCrop', { zone: 'A', crop: 'tomatoes' })}</p>
              <button className="text-xs sm:text-sm bg-[#16a34a] text-white px-3 py-1 rounded-lg hover:bg-[#15803d] transition-colors">
                {t('dashboard.doItNow')}
              </button>
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
                <FiSun className="text-xl sm:text-2xl text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">30°C</h3>
            <p className="text-xs sm:text-sm text-gray-600">{t('dashboard.temperature')}</p>
          </div>
        </div>

        {/* Latest Announcements */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 font-display">{t('dashboard.announcements')}</h2>
          <div className="space-y-3 sm:space-y-4">
            {announcements.map((announcement) => (
              <div 
                key={announcement.id}
                className="border-l-4 border-[#16a34a] pl-3 sm:pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{announcement.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">{announcement.description}</p>
                <a href="#" className="text-xs sm:text-sm text-[#16a34a] hover:text-[#15803d] font-medium">
                  {announcement.link} →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* My Tasks and Quick Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* My Tasks */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-display">{t('dashboard.myTasks')}</h2>
              <button 
                onClick={() => setShowAddTaskModal(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors text-xs sm:text-sm font-medium"
              >
                <FiPlus className="text-xs sm:text-sm" />
                <span className="hidden xs:inline">{t('dashboard.addTask')}</span>
                <span className="xs:hidden">{t('dashboard.add')}</span>
              </button>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                      task.completed
                        ? 'bg-[#16a34a] border-[#16a34a]'
                        : 'border-gray-300 hover:border-[#16a34a]'
                    }`}
                  >
                    {task.completed && <FiCheck className="text-white text-xs" />}
                  </button>
                  <span 
                    className={`flex-1 text-sm sm:text-base ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}
                  >
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 font-display">{t('dashboard.quickActions')}</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button 
                onClick={() => setShowAddTaskModal(true)}
                className="flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-[#16a34a] hover:bg-green-50 transition-all group"
              >
                <FiPlus className="text-xl sm:text-2xl text-gray-600 group-hover:text-[#16a34a] mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#16a34a] text-center">{t('dashboard.addTask')}</span>
              </button>
              <Link href="/dashboard/ai-chat" className="flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-[#16a34a] hover:bg-green-50 transition-all group">
                <FiMessageSquare className="text-xl sm:text-2xl text-gray-600 group-hover:text-[#16a34a] mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#16a34a] text-center">{t('dashboard.askAI')}</span>
              </Link>
              <Link href="/dashboard/reports" className="flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-[#16a34a] hover:bg-green-50 transition-all group">
                <FiFileText className="text-xl sm:text-2xl text-gray-600 group-hover:text-[#16a34a] mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#16a34a] text-center">{t('dashboard.viewReports')}</span>
              </Link>
              <Link href="/dashboard/community" className="flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:border-[#16a34a] hover:bg-green-50 transition-all group">
                <FiUsers className="text-xl sm:text-2xl text-gray-600 group-hover:text-[#16a34a] mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#16a34a] text-center">{t('dashboard.postUpdate')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{t('dashboard.addATask')}</h2>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX className="text-2xl" />
              </button>
            </div>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dashboard.taskName')}
                </label>
                <input
                  id="taskName"
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                  placeholder={t('dashboard.enterTaskName')}
                  required
                />
              </div>
              <div>
                <label htmlFor="taskDate" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dashboard.date')}
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="taskDate"
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="taskTime" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dashboard.time')}
                </label>
                <div className="relative">
                  <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="taskTime"
                    type="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dashboard.description')}
                </label>
                <textarea
                  id="taskDescription"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all resize-none"
                  placeholder={t('dashboard.enterTaskDescription')}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#15803d] hover:bg-[#166534] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                {t('dashboard.addTask')}
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { FiCheck, FiZap, FiPlus, FiX, FiCalendar, FiClock, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'

interface Task {
  id: number
  text: string
  time: string
  status: 'completed' | 'pending' | 'in-progress' | 'not-started'
  completed: boolean
}

interface Reminder {
  id: number
  text: string
  date: string
  time: string
  priority: 'high' | 'medium' | 'low'
}

export default function TasksPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'today' | 'calendar' | 'reminders'>('today')
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showAddReminderModal, setShowAddReminderModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Irrigate 1.8L', time: '9:00 PM', status: 'completed', completed: true },
    { id: 2, text: 'Apply organic compost', time: '8:00 AM', status: 'pending', completed: true },
    { id: 3, text: 'Plant Snow Seeds', time: '2:00 PM', status: 'completed', completed: false },
    { id: 4, text: 'Checking Irrigation System', time: '6:00 PM', status: 'in-progress', completed: false },
    { id: 5, text: 'Fertilize Big Area', time: '10:00 AM', status: 'not-started', completed: false },
  ])

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, text: 'Irrigate 1.8L', date: '2024-09-10', time: '10:00 AM', priority: 'high' },
    { id: 2, text: 'Irrigate 1.8L', date: '2024-09-11', time: '10:00 AM', priority: 'high' },
    { id: 3, text: 'Irrigate 1.8L', date: '2024-09-12', time: '10:00 AM', priority: 'high' },
  ])

  const [newTask, setNewTask] = useState({
    name: '',
    date: '',
    time: '',
    description: '',
  })

  const [newReminder, setNewReminder] = useState({
    name: '',
    date: '',
    time: '',
    description: '',
    category: 'high' as 'high' | 'medium' | 'low',
  })

  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length

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
        time: newTask.time || 'All day',
        status: 'pending',
        completed: false,
      }])
      setNewTask({ name: '', date: '', time: '', description: '' })
      setShowAddTaskModal(false)
    }
  }

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReminder.name.trim()) {
      setReminders([...reminders, {
        id: reminders.length + 1,
        text: newReminder.name,
        date: newReminder.date,
        time: newReminder.time,
        priority: newReminder.category,
      }])
      setNewReminder({ name: '', date: '', time: '', description: '', category: 'high' })
      setShowAddReminderModal(false)
    }
  }

  const handleDelete = () => {
    if (activeTab === 'reminders' && selectedItem) {
      setReminders(reminders.filter(r => r.id !== selectedItem))
    } else if (selectedItem) {
      setTasks(tasks.filter(t => t.id !== selectedItem))
    }
    setShowDeleteModal(false)
    setSelectedItem(null)
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-gray-100 text-gray-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      'not-started': 'bg-red-100 text-red-700',
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  const getStatusText = (status: string) => {
    const texts: { [key: string]: string } = {
      completed: t('tasks.statusCompleted'),
      pending: t('tasks.statusPending'),
      'in-progress': t('tasks.statusInProgress'),
      'not-started': t('tasks.statusNotStarted'),
    }
    return texts[status] || t('tasks.statusPending')
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-orange-500',
      low: 'bg-green-500',
    }
    return colors[priority as keyof typeof colors] || colors.high
  }

  // Calendar generation
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const monthNames = [t('tasks.january'), t('tasks.february'), t('tasks.march'), t('tasks.april'), t('tasks.may'), t('tasks.june'), t('tasks.july'), t('tasks.august'), t('tasks.september'), t('tasks.october'), t('tasks.november'), t('tasks.december')]
  const dayNames = [t('tasks.sun'), t('tasks.mon'), t('tasks.tue'), t('tasks.wed'), t('tasks.thu'), t('tasks.fri'), t('tasks.sat')]
  const calendarDays = getDaysInMonth(currentMonth)

  const calendarTasks: { [key: number]: string[] } = {
    5: ['Fertilizing maize'],
    12: ['Watering maize'],
    18: ['Fertilizing maize'],
    25: ['Watering maize'],
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 px-3 sm:px-0 pb-4 sm:pb-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display mb-1 sm:mb-2">{t('tasks.title')}</h1>
              <p className="text-sm sm:text-base text-gray-600">{t('tasks.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-1 sm:p-2">
          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all ${
                activeTab === 'today'
                  ? 'bg-[#16a34a] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('tasks.todaysTasks')}
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all ${
                activeTab === 'calendar'
                  ? 'bg-[#16a34a] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('tasks.plantingCalendar')}
            </button>
            <button
              onClick={() => setActiveTab('reminders')}
              className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all ${
                activeTab === 'reminders'
                  ? 'bg-[#16a34a] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('tasks.reminders')}
            </button>
          </div>
        </div>

        {/* Today's Tasks Tab */}
        {activeTab === 'today' && (
          <>
            {/* Suggestion Box */}
            <div className="bg-[#16a34a] rounded-xl shadow-lg p-4 sm:p-6 text-white">
              <div className="flex items-start gap-3 sm:gap-4">
                <FiZap className="text-xl sm:text-2xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{t('tasks.suggestion')}</h3>
                  <p className="text-sm sm:text-base opacity-90">
                    {t('tasks.suggestionText')}
                  </p>
                </div>
              </div>
            </div>

            {/* Today's Progress */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">{t('tasks.todaysProgress')}</h3>
                <span className="text-sm sm:text-base font-bold text-gray-900">
                  {t('tasks.completedOf', { completed: completedCount, total: totalCount })}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#16a34a] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Task List */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                        task.completed
                          ? 'bg-[#16a34a] border-[#16a34a]'
                          : 'border-gray-300 hover:border-[#16a34a]'
                      }`}
                    >
                      {task.completed && <FiCheck className="text-white text-xs sm:text-sm" />}
                    </button>
                    <div className="flex-1">
                      <p
                        className={`text-sm sm:text-base font-medium ${
                          task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                        }`}
                      >
                        {task.text}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">{task.time === 'All day' ? t('tasks.allDay') : task.time}</p>
                    </div>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusBadge(
                        task.status
                      )}`}
                    >
                      {getStatusText(task.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Planting Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiChevronLeft className="text-xl" />
                </button>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiChevronRight className="text-xl" />
                </button>
              </div>
              <button
                onClick={() => setShowAddTaskModal(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors text-sm sm:text-base"
              >
                <FiPlus className="text-sm sm:text-base" />
                <span className="hidden sm:inline">{t('dashboard.addTask')}</span>
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {/* Day Headers */}
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[60px] sm:min-h-[80px] p-2 border border-gray-200 rounded-lg ${
                    day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                  }`}
                >
                  {day && (
                    <>
                      <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">{day}</div>
                      {calendarTasks[day] && (
                        <div className="space-y-1">
                          {calendarTasks[day].map((task, i) => (
                            <div
                              key={i}
                              className="text-[10px] sm:text-xs text-[#16a34a] bg-green-50 px-1 py-0.5 rounded truncate"
                            >
                              {task}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <>
            {/* Suggestion Box */}
            <div className="bg-[#16a34a] rounded-xl shadow-lg p-4 sm:p-6 text-white">
              <div className="flex items-start gap-3 sm:gap-4">
                <FiZap className="text-xl sm:text-2xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{t('tasks.suggestion')}</h3>
                  <p className="text-sm sm:text-base opacity-90">
                    {t('tasks.suggestionReminders')}
                  </p>
                </div>
              </div>
            </div>

            {/* Reminders Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{t('tasks.reminders')}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{t('tasks.upcoming')}</p>
                </div>
                <button
                  onClick={() => setShowAddReminderModal(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-colors text-sm sm:text-base"
                >
                  <FiPlus className="text-sm sm:text-base" />
                  <span className="hidden sm:inline">{t('tasks.addReminder')}</span>
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                  >
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(reminder.priority)}`}></div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-medium text-gray-900">{reminder.text}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {new Date(reminder.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {reminder.time}
                      </p>
                    </div>
                    <div className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">
                      {t(`tasks.${reminder.priority}`)}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedItem(reminder.id)
                        setShowDeleteModal(true)
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="text-sm sm:text-base" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

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

        {/* Add Reminder Modal */}
        {showAddReminderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{t('tasks.addAReminder')}</h2>
                <button
                  onClick={() => setShowAddReminderModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>
              <form onSubmit={handleAddReminder} className="space-y-4">
                <div>
                  <label htmlFor="reminderName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('dashboard.taskName')}
                  </label>
                  <input
                    id="reminderName"
                    type="text"
                    value={newReminder.name}
                    onChange={(e) => setNewReminder({ ...newReminder, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                    placeholder={t('dashboard.enterTaskName')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="reminderDate" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('dashboard.date')}
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="reminderDate"
                      type="date"
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('dashboard.time')}
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="reminderTime"
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="reminderDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('dashboard.description')}
                  </label>
                  <textarea
                    id="reminderDescription"
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16a34a] focus:border-[#16a34a] transition-all resize-none"
                    placeholder={t('tasks.enterReminderDescription')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('tasks.category')}</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setNewReminder({ ...newReminder, category: 'high' })}
                      className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                        newReminder.category === 'high'
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300 hover:border-red-300'
                      }`}
                    >
                      <div className="w-6 h-6 bg-red-500 rounded-full mx-auto"></div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewReminder({ ...newReminder, category: 'medium' })}
                      className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                        newReminder.category === 'medium'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      <div className="w-6 h-6 bg-orange-500 rounded-full mx-auto"></div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewReminder({ ...newReminder, category: 'low' })}
                      className={`flex-1 py-2 rounded-lg border-2 transition-all ${
                        newReminder.category === 'low'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                    >
                      <div className="w-6 h-6 bg-green-500 rounded-full mx-auto"></div>
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#15803d] hover:bg-[#166534] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  {t('tasks.addReminder')}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('tasks.deleteConfirmTitle')}</h2>
              <p className="text-gray-600 mb-6">
                {t('tasks.deleteConfirmMessage')}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    setSelectedItem(null)
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
                >
                  {t('tasks.yesDelete')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

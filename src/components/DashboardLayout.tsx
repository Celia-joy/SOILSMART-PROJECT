'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome,
  FiCheckSquare,
  FiUsers,
  FiMessageSquare,
  FiMenu,
  FiX,
  FiBell,
  FiLogOut,
  FiSearch,
} from 'react-icons/fi'
import { GiPlantSeed } from 'react-icons/gi'
import { useTranslation } from '@/hooks/useTranslation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('soilsmart_user')
    if (!storedUser) {
      router.push('/login')
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('soilsmart_user')
    router.push('/')
  }

  const { t } = useTranslation()
  const navItems = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: FiHome },
    { name: t('nav.tasks'), href: '/dashboard/tasks', icon: FiCheckSquare },
    { name: t('nav.communityHub'), href: '/dashboard/community', icon: FiUsers },
    { name: t('nav.yourSoil'), href: '/dashboard/monitoring', icon: GiPlantSeed },
    { name: t('nav.messages'), href: '/dashboard/messages', icon: FiMessageSquare },
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#15803d] shadow-xl z-50 transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64 sm:w-72 lg:w-64`}
      >
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-[#166534] flex items-center justify-between flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2 sm:gap-3" onClick={() => setSidebarOpen(false)}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <GiPlantSeed className="text-[#16a34a] text-xl sm:text-2xl" />
            </div>
            <span className="text-lg sm:text-xl font-bold font-display text-white">
              SoilSmart
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-[#166534] p-2 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 space-y-1 overflow-y-auto flex-1 pb-16 sm:pb-20">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/dashboard')
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-[#16a34a] text-white font-semibold'
                    : 'text-white/80 hover:bg-[#166534] hover:text-white'
                }`}
              >
                <Icon className="text-lg sm:text-xl flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Log out Link */}
        <div className="sticky bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-[#166534] bg-[#15803d] mt-auto flex-shrink-0">
          <button
            onClick={() => {
              setShowLogoutModal(true)
              setSidebarOpen(false)
            }}
            className="w-full text-left text-white/80 hover:text-white px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg hover:bg-[#166534] transition-colors text-sm sm:text-base font-medium flex items-center gap-2 sm:gap-3"
          >
            <FiLogOut className="text-lg sm:text-xl flex-shrink-0" />
            <span>{t('common.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 bg-gray-50 min-h-screen flex flex-col w-full lg:w-[calc(100%-16rem)]">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <FiX className="text-xl sm:text-2xl" /> : <FiMenu className="text-xl sm:text-2xl" />}
            </button>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto">
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <FiSearch className="text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder={t('common.search')}
                  className="bg-transparent border-none outline-none text-sm text-gray-600 w-32 lg:w-40"
                />
              </div>
              <Link href="/dashboard/notifications" className="relative text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiBell className="text-lg sm:text-xl" />
                <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full text-[10px] sm:text-xs text-white flex items-center justify-center font-semibold">
                  3
                </span>
              </Link>
              <Link href="/dashboard/profile" className="w-9 h-9 sm:w-10 sm:h-10 bg-[#16a34a] rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-[#15803d] transition-colors flex-shrink-0">
                <span className="text-sm sm:text-base">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 pb-8 sm:pb-12 md:pb-16 relative">
          {children}
          {/* Bottom padding using ::after pseudo element */}
          <div className="dashboard-content-spacer"></div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t('dashboard.logoutConfirmTitle')}</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              {t('dashboard.logoutConfirmMessage')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all text-sm sm:text-base"
              >
                {t('common.logout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { GiPlantSeed } from 'react-icons/gi'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageSwitcher from './LanguageSwitcher'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useTranslation()

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.solutions'), href: '#solutions' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  const sectionIds = navLinks.map(link => link.href.replace('#', ''))
  const activeSection = useScrollSpy(sectionIds, 100)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.getElementById(href.replace('#', ''))
    if (element) {
      const offset = 80
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3 sm:py-4' : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4 xl:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 group">
            <div className="bg-primary-600 p-1.5 sm:p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
              <GiPlantSeed className="text-white text-xl sm:text-2xl" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold font-display text-gray-900">
              Soil<span className="text-[#16a34a]">Smart</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative font-medium transition-all duration-300 text-sm xl:text-base ${
                    isActive 
                      ? 'text-cyan-600 font-bold' 
                      : 'text-gray-700 hover:text-cyan-500'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/60 animate-pulse"></span>
                  )}
                </button>
              )
            })}
            <div className="ml-2 xl:ml-4">
              <LanguageSwitcher />
            </div>
            <div className="flex items-center gap-2 xl:gap-3 ml-2 xl:ml-4">
              <Link href="/login">
                <button className="btn-secondary text-xs xl:text-sm px-3 xl:px-6 py-2 xl:py-3 whitespace-nowrap">{t('common.login')}</button>
              </Link>
              <Link href="/signup">
                <button className="btn-primary text-xs xl:text-sm px-3 xl:px-6 py-2 xl:py-3 whitespace-nowrap">{t('hero.getStarted')}</button>
              </Link>
            </div>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden text-gray-900 text-xl sm:text-2xl p-2 -mr-2 hover:bg-gray-100 rounded-lg transition-colors z-50 relative"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX className="w-6 h-6 sm:w-7 sm:h-7" /> : <FiMenu className="w-6 h-6 sm:w-7 sm:h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black bg-opacity-50 z-[60] xl:hidden"
            />

            {/* Slide-in Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[70] xl:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
                <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
                  <div className="bg-primary-600 p-1.5 sm:p-2 rounded-lg">
                    <GiPlantSeed className="text-white text-xl sm:text-2xl" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold font-display text-gray-900">
                    Soil<span className="text-[#16a34a]">Smart</span>
                  </span>
                </Link>
                <button
                  onClick={closeMenu}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="px-4 sm:px-6 py-6">
                <nav className="flex flex-col space-y-1 mb-6">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.replace('#', '')
                    return (
                      <motion.button
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        onClick={() => handleNavClick(link.href)}
                        className={`text-left font-medium transition-all duration-300 py-3 sm:py-3.5 rounded-lg px-4 ${
                          isActive 
                            ? 'text-cyan-600 font-bold border-l-4 border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-sm' 
                            : 'text-gray-700 hover:text-cyan-500 hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </motion.button>
                    )
                  })}
                </nav>

                {/* Language Switcher */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <LanguageSwitcher />
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link href="/login" onClick={closeMenu} className="block">
                    <button className="btn-secondary w-full py-3 sm:py-3.5 text-sm sm:text-base font-semibold">
                      {t('common.login')}
                    </button>
                  </Link>
                  <Link href="/signup" onClick={closeMenu} className="block">
                    <button className="btn-primary w-full py-3 sm:py-3.5 text-sm sm:text-base font-semibold">
                      {t('hero.getStarted')}
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar


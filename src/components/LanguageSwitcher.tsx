'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { locales, localeNames, Locale } from '@/lib/i18n'
import { FiGlobe, FiChevronDown } from 'react-icons/fi'

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 w-full sm:w-auto"
      >
        <FiGlobe className="text-base sm:text-lg flex-shrink-0" />
        <span className="text-sm sm:text-base font-medium">{localeNames[locale]}</span>
        <FiChevronDown className={`text-xs sm:text-sm transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 sm:right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[160px] sm:min-w-[150px]">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                changeLocale(loc)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2.5 sm:py-2 text-sm sm:text-base hover:bg-gray-50 transition-colors ${
                locale === loc ? 'bg-green-50 text-[#16a34a] font-medium' : 'text-gray-700'
              }`}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}


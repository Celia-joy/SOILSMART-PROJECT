'use client'

import { useState, useEffect } from 'react'
import { Locale, t as translate, defaultLocale } from '@/lib/i18n'

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // Get locale from localStorage or default
    const savedLocale = localStorage.getItem('soilsmart_locale') as Locale
    if (savedLocale && ['en', 'rw', 'fr'].includes(savedLocale)) {
      setLocale(savedLocale)
    }
  }, [])

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('soilsmart_locale', newLocale)
    // Reload page to apply language change
    window.location.reload()
  }

  const t = (key: string, params?: Record<string, string | number>) => {
    return translate(key, locale, params)
  }

  return { t, locale, changeLocale }
}


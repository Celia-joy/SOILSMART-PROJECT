'use client'

import Link from 'next/link'
import { GiPlantSeed } from 'react-icons/gi'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiLinkedin, FiFacebook } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: t('footer.features'), href: '#features' },
      { name: t('footer.howItWorks'), href: '#how-it-works' },
      { name: t('footer.pricing'), href: '#pricing' },
      { name: t('footer.caseStudies'), href: '#case-studies' },
    ],
    company: [
      { name: t('footer.aboutUs'), href: '#about' },
      { name: t('footer.careers'), href: '#careers' },
      { name: t('footer.blog'), href: '#blog' },
      { name: t('footer.pressKit'), href: '#press' },
    ],
    resources: [
      { name: t('footer.documentation'), href: '#docs' },
      { name: t('footer.apiReference'), href: '#api' },
      { name: t('footer.community'), href: '#community' },
      { name: t('footer.support'), href: '#support' },
    ],
    legal: [
      { name: t('footer.privacyPolicy'), href: '#privacy' },
      { name: t('footer.termsOfService'), href: '#terms' },
      { name: t('footer.cookiePolicy'), href: '#cookies' },
      { name: t('footer.licenses'), href: '#licenses' },
    ],
  }

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Echo-Sols-Ltd', label: 'GitHub' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiFacebook, href: '#', label: 'Facebook' },
  ]

  return (
    <footer className="bg-[#14532d] text-gray-300">
      <div className="container-custom py-8 sm:py-12 md:py-16 px-4 sm:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="bg-[#16a34a] p-1.5 sm:p-2 rounded-lg">
                <GiPlantSeed className="text-white text-xl sm:text-2xl" />
              </div>
              <span className="text-xl sm:text-2xl font-bold font-display text-white">
                Soil<span className="text-[#4ade80]">Smart</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                <FiMail className="text-[#4ade80] flex-shrink-0 mt-0.5" />
                <a href="mailto:info@soilsmart.com" className="hover:text-[#4ade80] transition-colors break-all">
                  info@soilsmart.com
                </a>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                <FiPhone className="text-[#4ade80] flex-shrink-0 mt-0.5" />
                <a href="tel:+250123456789" className="hover:text-[#4ade80] transition-colors">
                  +250 123 456 789
                </a>
              </div>
              <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                <FiMapPin className="text-[#4ade80] flex-shrink-0 mt-0.5" />
                <span>{t('footer.kigaliRwanda')}</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.product')}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#4ade80] transition-colors text-xs sm:text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.company')}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#4ade80] transition-colors text-xs sm:text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.resources')}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#4ade80] transition-colors text-xs sm:text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.legal')}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#4ade80] transition-colors text-xs sm:text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#166534] pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              {t('footer.copyright', { year: currentYear })}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-[#166534] hover:bg-[#16a34a] rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="text-sm sm:text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

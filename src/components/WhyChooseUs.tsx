'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiCheck } from 'react-icons/fi'
import { GiPlantSeed } from 'react-icons/gi'
import { FiUsers, FiZap } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'

const WhyChooseUs = () => {
  const { t } = useTranslation()
  const values = [
    {
      icon: GiPlantSeed,
      title: t('whyChooseUs.sustainability'),
      description: t('whyChooseUs.sustainabilityDesc'),
    },
    {
      icon: FiUsers,
      title: t('whyChooseUs.community'),
      description: t('whyChooseUs.communityDesc'),
    },
    {
      icon: FiZap,
      title: t('whyChooseUs.innovation'),
      description: t('whyChooseUs.innovationDesc'),
    },
  ]

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center px-4 sm:px-0">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            {/* Farm Image */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/800px-Agriculture_in_Vietnam_with_farmers.jpg"
                alt="Thriving Green Farm - Sustainable Agriculture in Action"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                quality={95}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                <div className="text-center">
                  <span className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-4 block">🌾</span>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{t('whyChooseUs.thrivingGreenFarm')}</p>
                  <p className="text-green-100 text-sm sm:text-base">{t('whyChooseUs.sustainableAgriculture')}</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements - Hidden on mobile */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-green-600 rounded-full opacity-20 blur-3xl hidden md:block"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-green-400 rounded-full opacity-20 blur-3xl hidden md:block"></div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-px bg-gray-400"></span>
              {t('whyChooseUs.aboutUs')}
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('whyChooseUs.title')}
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              {t('whyChooseUs.description1')}
            </p>
            
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              {t('whyChooseUs.description2')}
            </p>

            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
              {t('whyChooseUs.description3')}
            </p>

            {/* Value Cards - Aligned with icons */}
            <div className="space-y-4 sm:space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="text-3xl sm:text-4xl flex-shrink-0 w-10 sm:w-12 flex items-center justify-center text-green-600">
                    <value.icon className="w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{value.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

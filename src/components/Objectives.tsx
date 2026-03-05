'use client'

import { motion } from 'framer-motion'
import { GiPlantSeed } from 'react-icons/gi'
import { FiTarget, FiActivity, FiZap, FiCpu, FiUsers, FiSmartphone } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'

const Objectives = () => {
  const { t } = useTranslation()
  const objectives = [
    {
      icon: FiActivity,
      title: t('objectives.monitorSoilHealth'),
      description: t('objectives.monitorSoilHealthDesc'),
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: FiZap,
      title: t('objectives.automateDelivery'),
      description: t('objectives.automateDeliveryDesc'),
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: FiCpu,
      title: t('objectives.aiPoweredGuidance'),
      description: t('objectives.aiPoweredGuidanceDesc'),
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: FiSmartphone,
      title: t('objectives.mobileApp'),
      description: t('objectives.mobileAppDesc'),
      gradient: 'from-orange-500 to-red-600',
    },
  ]

  return (
    <section id="solutions" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white to-green-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-0"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            <FiTarget className="text-sm sm:text-base" />
            {t('objectives.badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-3 sm:mb-4">
            <span className="text-gradient">SoilSmart</span> {t('objectives.title').replace('SoilSmart ', '')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mt-3 sm:mt-4">
            {t('objectives.subtitle')}
          </p>
        </motion.div>

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0">
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card h-full flex flex-col p-4 sm:p-6">
                {/* Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${objective.gradient} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <objective.icon className="text-white text-xl sm:text-2xl md:text-3xl" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{objective.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow">{objective.description}</p>

                {/* Hover Effect */}
                <div className={`mt-3 sm:mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${objective.gradient} transition-all duration-300 rounded-full`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 sm:mt-12 md:mt-16 text-center px-4 sm:px-0"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-primary-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl">
            <GiPlantSeed className="text-primary-600 text-2xl sm:text-3xl" />
            <p className="text-base sm:text-lg font-semibold text-gray-900 text-center sm:text-left">
              {t('objectives.joinFarmers')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Objectives

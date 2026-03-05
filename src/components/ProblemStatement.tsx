'use client'

import { motion } from 'framer-motion'
import { FiAlertCircle, FiTrendingDown, FiDroplet, FiHelpCircle } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'

const ProblemStatement = () => {
  const { t } = useTranslation()
  const problems = [
    {
      icon: FiTrendingDown,
      title: t('problem.decliningSoilFertility'),
      description: t('problem.decliningSoilFertilityDesc'),
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: FiDroplet,
      title: t('problem.poorIrrigation'),
      description: t('problem.poorIrrigationDesc'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FiHelpCircle,
      title: t('problem.limitedGuidance'),
      description: t('problem.limitedGuidanceDesc'),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
  ]

  return (
    <section id="problem" className="py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FiAlertCircle />
            {t('problem.challenge')}
          </div>
          <h2 className="section-title">{t('problem.title')}</h2>
          <p className="section-subtitle mx-auto mt-4">
            {t('problem.subtitle')}
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card"
            >
              <div className={`${problem.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                <problem.icon className={`${problem.color} text-3xl`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t('problem.climateChange')}
          </h3>
          <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto">
            {t('problem.climateChangeDesc')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemStatement


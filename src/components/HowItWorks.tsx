'use client'

import { motion } from 'framer-motion'
import { FiDownload, FiSettings, FiTrendingUp, FiAward } from 'react-icons/fi'
import { useTranslation } from '@/hooks/useTranslation'

const HowItWorks = () => {
  const { t } = useTranslation()
  const steps = [
    {
      number: '01',
      icon: FiDownload,
      title: t('howItWorks.step1'),
      description: t('howItWorks.step1Desc'),
      color: 'from-blue-500 to-cyan-600',
    },
    {
      number: '02',
      icon: FiSettings,
      title: t('howItWorks.step2'),
      description: t('howItWorks.step2Desc'),
      color: 'from-purple-500 to-pink-600',
    },
    {
      number: '03',
      icon: FiTrendingUp,
      title: t('howItWorks.step3'),
      description: t('howItWorks.step3Desc'),
      color: 'from-green-500 to-emerald-600',
    },
    {
      number: '04',
      icon: FiAward,
      title: t('howItWorks.step4'),
      description: t('howItWorks.step4Desc'),
      color: 'from-orange-500 to-red-600',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-500 to-transparent -translate-x-1/2"></div>
              )}

              <div className="bg-gray-800 rounded-xl p-6 h-full hover:bg-gray-750 transition-colors">
                {/* Number Badge */}
                <div className={`inline-block bg-gradient-to-r ${step.color} text-white font-bold text-sm px-4 py-1 rounded-full mb-4`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="text-white text-3xl" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            {t('howItWorks.startJourney')}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks


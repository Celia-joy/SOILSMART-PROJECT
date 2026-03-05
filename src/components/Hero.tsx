'use client'

import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { GiPlantRoots, GiWaterDrop, GiArtificialIntelligence } from 'react-icons/gi'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'

const Hero = () => {
  const { t } = useTranslation()
  const floatingIcons = [
    { Icon: GiPlantRoots, delay: 0, position: 'top-20 left-10' },
    { Icon: GiWaterDrop, delay: 0.2, position: 'top-40 right-20' },
    { Icon: GiArtificialIntelligence, delay: 0.4, position: 'bottom-32 left-20' },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20">
      {/* Animated Background Elements - Hidden on small screens */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        {floatingIcons.map(({ Icon, delay, position }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} text-primary-200 opacity-20`}
            initial={{ y: 0 }}
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon className="text-4xl sm:text-6xl md:text-8xl" />
          </motion.div>
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 sm:mb-6"
            >
              <span className="bg-primary-100 text-primary-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                🌱 {t('hero.badge')}
              </span>
            </motion.div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
              {t('hero.title')}{' '}
              <span className="text-gradient">{t('hero.titleHighlight')}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0">
              {t('hero.description')}
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <Link href="/signup">
                <button className="btn-primary flex items-center justify-center gap-2 group text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">
                  {t('hero.getStarted')}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="btn-secondary text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">{t('hero.learnMore')}</button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12 px-4 sm:px-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600">10K+</div>
                <div className="text-xs sm:text-sm text-gray-600">Farmers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600">50%</div>
                <div className="text-xs sm:text-sm text-gray-600">Yield Increase</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600">30%</div>
                <div className="text-xs sm:text-sm text-gray-600">Water Saved</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
              {/* Central Circle */}
              <motion.div
                className="absolute w-48 h-48 lg:w-64 lg:h-64 bg-gradient-primary rounded-full flex items-center justify-center shadow-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <GiPlantRoots className="text-white text-6xl lg:text-8xl" />
              </motion.div>

              {/* Orbiting Elements */}
              {[0, 120, 240].map((rotation, index) => (
                <motion.div
                  key={index}
                  className="absolute w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: index * 0.5 }}
                  style={{ rotate: rotation }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                    {index === 0 && <GiWaterDrop className="text-blue-500 text-2xl lg:text-3xl" />}
                    {index === 1 && <GiArtificialIntelligence className="text-purple-500 text-2xl lg:text-3xl" />}
                    {index === 2 && <GiPlantRoots className="text-green-500 text-2xl lg:text-3xl" />}
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

export default Hero

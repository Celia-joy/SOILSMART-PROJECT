'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FiSmartphone, FiDownload, FiCheck, FiDroplet, FiThermometer, FiActivity, FiTrendingUp } from 'react-icons/fi'
import { GiPlantSeed } from 'react-icons/gi'
import { useTranslation } from '@/hooks/useTranslation'

const MobileAppDownload = () => {
  const { t } = useTranslation()
  const features = [
    t('mobileApp.realTimeMonitoring'),
    t('mobileApp.offlineMode'),
    t('mobileApp.aiRecommendations'),
    t('mobileApp.communitySharing'),
  ]

  return (
    <section id="mobile-app" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center px-4 sm:px-0">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-[#16a34a]/10 text-[#16a34a] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <FiSmartphone className="text-sm sm:text-base" />
              {t('mobileApp.badge')}
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('mobileApp.title')}
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              {t('mobileApp.description')}
            </p>

            {/* Features List */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-[#16a34a] rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.soilsmart.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.5,14.5L15.07,12.06L17.5,9.63L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <span className="text-sm sm:text-base font-semibold">{t('mobileApp.googlePlay')}</span>
              </a>
              <a
                href="https://apps.apple.com/app/soilsmart/id123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05,20.28L14.18,23.22C13.03,24.37 11.37,24.37 10.22,23.22L4.95,17.96C4.17,17.19 4.17,15.94 4.95,15.17L7.82,12.22C8.97,11.07 10.63,11.07 11.78,12.22L17.05,17.5C17.83,18.27 17.83,19.53 17.05,20.28M19.3,9.25L12.78,2.64C11.63,1.5 9.97,1.5 8.82,2.64L5.95,5.58C5.17,6.36 5.17,7.61 5.95,8.39L12.47,15C13.63,16.15 15.28,16.15 16.43,15L19.3,12.06C20.08,11.29 20.08,10.03 19.3,9.25Z" />
                </svg>
                <span className="text-sm sm:text-base font-semibold">{t('mobileApp.appStore')}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Side - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-3 sm:p-4 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Phone Screen - App Dashboard Design */}
                  <div className="relative aspect-[9/19.5] bg-gray-50 overflow-hidden">
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-white flex items-center justify-between px-6 text-xs font-semibold text-gray-900 z-20">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 border border-gray-900 rounded-sm">
                          <div className="w-3 h-1.5 bg-gray-900 rounded-sm m-0.5"></div>
                        </div>
                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="absolute top-8 left-0 right-0 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#16a34a] rounded-full flex items-center justify-center">
                          <GiPlantSeed className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-gray-900">SoilSmart</h3>
                          <p className="text-xs text-gray-500">{t('dashboard.title')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="absolute top-24 left-0 right-0 bottom-0 overflow-y-auto pb-4">
                      {/* Stats Cards */}
                      <div className="px-4 mb-4 grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <FiDroplet className="text-blue-500 text-lg" />
                            <span className="text-xs text-green-600 font-semibold">+5%</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{t('dashboard.soilMoisture')}</p>
                          <p className="text-lg font-bold text-gray-900">45%</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <FiThermometer className="text-orange-500 text-lg" />
                            <span className="text-xs text-gray-400">24°C</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{t('dashboard.temperature')}</p>
                          <p className="text-lg font-bold text-gray-900">Optimal</p>
                        </div>
                      </div>

                      {/* Active Sensors */}
                      <div className="px-4 mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('dashboard.activeSensors')}</h4>
                        <div className="space-y-2">
                          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs font-medium text-gray-700">SENS-001</span>
                              </div>
                              <span className="text-xs text-gray-500">85%</span>
                            </div>
                            <p className="text-xs text-gray-500">{t('dashboard.soilMoisture')}</p>
                            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs font-medium text-gray-700">SENS-002</span>
                              </div>
                              <span className="text-xs text-gray-500">72%</span>
                            </div>
                            <p className="text-xs text-gray-500">Soil pH</p>
                            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Chart Section */}
                      <div className="px-4 mb-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-gray-900">Soil Health Trend</h4>
                            <FiTrendingUp className="text-green-500 text-sm" />
                          </div>
                          {/* Mini Chart Visualization */}
                          <div className="h-24 flex items-end justify-between gap-1">
                            {[40, 55, 48, 62, 58, 70, 65].map((value, index) => (
                              <div key={index} className="flex-1 flex flex-col items-center">
                                <div 
                                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                                  style={{ height: `${value}%` }}
                                ></div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                          </div>
                        </div>
                      </div>

                      {/* AI Recommendations */}
                      <div className="px-4 mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('dashboard.aiRecommendations')}</h4>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                          <div className="flex items-start gap-2">
                            <FiActivity className="text-green-600 text-base mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-gray-900 mb-1">{t('dashboard.increaseIrrigation')}</p>
                              <p className="text-xs text-gray-600">{t('dashboard.increaseIrrigationDesc')}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="px-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('dashboard.quickActions')}</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="bg-[#16a34a] text-white rounded-xl p-3 text-xs font-semibold shadow-sm">
                            {t('nav.monitoring')}
                          </button>
                          <button className="bg-white border border-gray-200 text-gray-700 rounded-xl p-3 text-xs font-semibold shadow-sm">
                            {t('dashboard.viewReports')}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex items-center justify-around">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 bg-[#16a34a] rounded-lg flex items-center justify-center">
                          <FiActivity className="text-white text-xs" />
                        </div>
                        <span className="text-xs text-[#16a34a] font-medium">{t('nav.home')}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <FiDroplet className="text-gray-400 text-lg" />
                        <span className="text-xs text-gray-400">{t('nav.irrigation')}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <FiTrendingUp className="text-gray-400 text-lg" />
                        <span className="text-xs text-gray-400">{t('nav.reports')}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <FiActivity className="text-gray-400 text-lg" />
                        <span className="text-xs text-gray-400">More</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#16a34a]/20 rounded-full blur-3xl hidden md:block"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#4ade80]/20 rounded-full blur-3xl hidden md:block"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MobileAppDownload



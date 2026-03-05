import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhyChooseUs from '@/components/WhyChooseUs'
import Objectives from '@/components/Objectives'
import Features from '@/components/Features'
import MobileAppDownload from '@/components/MobileAppDownload'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Objectives />
      <Features />
      <MobileAppDownload />
      <CallToAction />
      <Footer />
    </main>
  )
}


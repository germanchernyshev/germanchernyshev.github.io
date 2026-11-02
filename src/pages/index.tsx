import Hero from '@/widgets/hero'
import Metrics from '@/widgets/metrics'
import WhatRemains from '@/widgets/what-remains'
import Projects from '@/widgets/projects'
import SocialProof from '@/widgets/social-proof'
import Mentorship from '@/widgets/mentorship'
import Skills from '@/widgets/skills'
import Header from '@/widgets/header'
import Footer from '@/widgets/footer'
import SeoMeta from '@/widgets/seo-meta'
import SkipLink from '@/widgets/skip-link'

export default function Home() {
  return (
    <>
      <SeoMeta />
      <SkipLink />
      <Header />

      <main id="main-content">
        <div className="normalize-section normalize-container">
          <Hero />
        </div>

        <div className="normalize-section normalize-container">
          <Metrics />
        </div>

        <div className="normalize-section normalize-container">
          <WhatRemains />
        </div>

        <div className="normalize-section normalize-container">
          <Projects />
        </div>

        <div className="normalize-section normalize-container">
          <SocialProof />
        </div>

        <div className="normalize-section normalize-container">
          <Mentorship />
        </div>

        <div className="normalize-section normalize-container">
          <Skills />
        </div>

        <div className="normalize-section normalize-container">
          <Footer />
        </div>
      </main>
    </>
  )
}

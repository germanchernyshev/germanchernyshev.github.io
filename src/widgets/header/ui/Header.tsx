'use client'

import React, { useEffect, useState } from 'react'
import KitIcon, { KIT_ICON_MD } from '@/shared/ui/kit-icon'
import type { KitIconName } from '@/shared/ui/kit-icon'
import ProgressiveImage from '@/shared/ui/progressive-image'
import { publicAsset } from '@/shared/lib'
import { useTranslation } from 'react-i18next'

const NAV_SECTIONS: Array<{
  href: string
  sectionId: string
  labelKey:
    | 'nav.metrics'
    | 'nav.product'
    | 'nav.cases'
    | 'nav.mentorship'
    | 'nav.stack'
  icon: KitIconName
}> = [
  { href: '#metrics', sectionId: 'metrics', labelKey: 'nav.metrics', icon: 'bar-chart' },
  { href: '#playunmute', sectionId: 'playunmute', labelKey: 'nav.product', icon: 'rocket' },
  { href: '#cases', sectionId: 'cases', labelKey: 'nav.cases', icon: 'pouch' },
  { href: '#mentorship', sectionId: 'mentorship', labelKey: 'nav.mentorship', icon: 'book' },
  { href: '#stack', sectionId: 'stack', labelKey: 'nav.stack', icon: 'scroll-code' },
]

const NAV_SPLIT_AT = 3

export default function Navbar() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sectionIds = [
      ...NAV_SECTIONS.map(({ sectionId }) => sectionId),
      'contacts',
    ]

    const sectionElements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((element): element is HTMLElement => Boolean(element))

    if (sectionElements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sectionElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="header">
      <div className="header__bar">
        <nav
          className="nav"
          aria-label={t('nav.aria')}
        >
          {NAV_SECTIONS.slice(0, NAV_SPLIT_AT).map(({ href, sectionId, labelKey, icon }) => {
            const label = t(labelKey)

            return (
              <a
                key={sectionId}
                href={href}
                className={`nav__item${activeSection === sectionId ? ' nav__item--active' : ''}`}
                title={label}
                aria-current={activeSection === sectionId ? 'true' : undefined}
              >
                <KitIcon name={icon} size={KIT_ICON_MD} className="nav__item-icon" />
                <span className="nav__item-text">{label}</span>
              </a>
            )
          })}

          <a
            href="#top"
            className={`nav__item nav__item--logo${activeSection === '' ? ' nav__item--active' : ''}`}
            title={t('nav.home')}
            aria-current={activeSection === '' ? 'true' : undefined}
          >
            <ProgressiveImage
              src={publicAsset('/img/dragon4.png')}
              alt={t('nav.homeAlt')}
              width={80}
              height={80}
              className="nav-img"
              priority
            />
          </a>

          {NAV_SECTIONS.slice(NAV_SPLIT_AT).map(({ href, sectionId, labelKey, icon }) => {
            const label = t(labelKey)

            return (
              <a
                key={sectionId}
                href={href}
                className={`nav__item${activeSection === sectionId ? ' nav__item--active' : ''}`}
                title={label}
                aria-current={activeSection === sectionId ? 'true' : undefined}
              >
                <KitIcon name={icon} size={KIT_ICON_MD} className="nav__item-icon" />
                <span className="nav__item-text">{label}</span>
              </a>
            )
          })}
        </nav>

        <a
          href="#contacts"
          className={`header__cta${activeSection === 'contacts' ? ' header__cta--active' : ''}`}
          aria-label={t('common.write')}
          title={t('common.write')}
          aria-current={activeSection === 'contacts' ? 'true' : undefined}
        >
          <KitIcon name="mail" size={KIT_ICON_MD} className="header__cta-icon" />
          <span className="header__cta-text">{t('common.write')}</span>
        </a>
      </div>
    </header>
  )
}

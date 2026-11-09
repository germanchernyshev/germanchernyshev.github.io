'use client'

import React from 'react'
import KitIcon, { KIT_ICON_MD } from '@/shared/ui/kit-icon'
import type { KitIconName } from '@/shared/ui/kit-icon'
import SectionHeading from '@/shared/ui/section-heading'
import DragonAssistant from '@/features/dragon-assistant'
import { WEB_DRAGON_TIPS } from '@/shared/config'
import { useTranslation } from 'react-i18next'

const WHAT_REMAINS_KEYS = [
  'aiFirst',
  'designSystem',
  'releases',
  'onboarding',
  'team',
] as const

const WHAT_REMAINS_ICONS: Record<(typeof WHAT_REMAINS_KEYS)[number], KitIconName> = {
  aiFirst: 'wand',
  designSystem: 'documents',
  releases: 'shield',
  onboarding: 'sprout',
  team: 'community',
}

export default function WhatRemains() {
  const { t } = useTranslation()

  return (
    <section
      id="what-remains"
      className="what-remains"
      aria-labelledby="what-remains-heading"
    >
      <header className="what-remains__header">
        <SectionHeading id="what-remains-heading">
          {t('whatRemains.title')}
        </SectionHeading>
        <DragonAssistant
          tipId={WEB_DRAGON_TIPS.whatRemains.tipId}
          icon={WEB_DRAGON_TIPS.whatRemains.icon}
          text={t(WEB_DRAGON_TIPS.whatRemains.tipKey)}
          className="dragon-guide--section"
        />
      </header>

      <p className="section-lead what-remains__lead" data-aos="fade-up">
        {t('whatRemains.lead')}
      </p>

      <ul className="what-remains__grid">
        {WHAT_REMAINS_KEYS.map((itemKey) => (
          <li key={itemKey} data-aos="fade-up" className="what-remains__card">
            <div className="what-remains__title-row">
              <KitIcon
                name={WHAT_REMAINS_ICONS[itemKey]}
                className="what-remains__icon"
                size={KIT_ICON_MD}
              />
              <div className="what-remains__title">
                {t(`whatRemains.items.${itemKey}.title`)}
              </div>
            </div>
            <p className="what-remains__detail">
              {t(`whatRemains.items.${itemKey}.detail`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

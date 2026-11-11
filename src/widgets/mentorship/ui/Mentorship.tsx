'use client'

import React from 'react'
import KitIcon, { KIT_ICON_MD } from '@/shared/ui/kit-icon'
import type { KitIconName } from '@/shared/ui/kit-icon'
import Button from '@/shared/ui/button'
import Card from '@/shared/ui/card'
import SectionHeading from '@/shared/ui/section-heading'
import DragonAssistant from '@/features/dragon-assistant'
import { AUTHOR_TELEGRAM, WEB_DRAGON_TIPS } from '@/shared/config'
import PlayunmuteShowcase from '@/widgets/playunmute'
import { useTranslation } from 'react-i18next'

const MENTORSHIP_FORMATS: Array<{
  formatKey: 'interviews' | 'review' | 'playunmute'
  icon: KitIconName
}> = [
  { formatKey: 'interviews', icon: 'chat' },
  { formatKey: 'review', icon: 'clipboard' },
  { formatKey: 'playunmute', icon: 'diploma' },
]

export default function Mentorship() {
  const { t } = useTranslation()

  return (
    <section
      id="mentorship"
      className="mentorship"
      aria-labelledby="mentorship-heading"
    >
      <header className="mentorship__header">
        <SectionHeading id="mentorship-heading">
          {t('mentorship.title')}
        </SectionHeading>
        <DragonAssistant
          tipId={WEB_DRAGON_TIPS.mentorship.tipId}
          icon={WEB_DRAGON_TIPS.mentorship.icon}
          text={t(WEB_DRAGON_TIPS.mentorship.tipKey)}
          className="dragon-guide--section"
        />
        <div data-aos="fade-up">
          <p className="section-lead mentorship__lead">
            {t('mentorship.lead')}
          </p>
        </div>
      </header>

      <ul className="mentorship__grid">
        {MENTORSHIP_FORMATS.map((format) => (
          <Card
            key={format.formatKey}
            as="li"
            padding="padInner"
            data-aos="fade-up"
            className="mentorship__card"
          >
            <div className="mentorship__accent">
              {t(`mentorship.formats.${format.formatKey}.accent`)}
            </div>
            <div className="mentorship__label-row">
              <KitIcon
                name={format.icon}
                className="mentorship__icon"
                size={KIT_ICON_MD}
              />
              <div className="mentorship__label">
                {t(`mentorship.formats.${format.formatKey}.label`)}
              </div>
            </div>
            <p className="mentorship__context">
              {t(`mentorship.formats.${format.formatKey}.context`)}
            </p>
          </Card>
        ))}
      </ul>

      <PlayunmuteShowcase />

      <div
        className="mentorship__cta"
        data-aos="fade-up"
      >
        <Button
          href={AUTHOR_TELEGRAM}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
        >
          <KitIcon name="send" size={KIT_ICON_MD} className="ui-button__icon" />
          {t('mentorship.cta')}
        </Button>
      </div>
    </section>
  )
}

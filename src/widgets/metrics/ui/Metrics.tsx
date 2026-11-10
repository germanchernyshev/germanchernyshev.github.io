'use client'

import React from 'react'
import KitIcon, { KIT_ICON_MD } from '@/shared/ui/kit-icon'
import type { KitIconName } from '@/shared/ui/kit-icon'
import Card from '@/shared/ui/card'
import SectionHeading from '@/shared/ui/section-heading'
import DragonAssistant from '@/features/dragon-assistant'
import { WEB_DRAGON_TIPS } from '@/shared/config'
import { useTranslation } from 'react-i18next'
import MetricValue from './MetricValue'

const METRIC_KEYS = [
  'aiFirst',
  'components',
  'specialists',
  'faster',
  'bugs',
  'onboarding',
] as const

const METRIC_ICONS: Record<(typeof METRIC_KEYS)[number], KitIconName> = {
  aiFirst: 'sparkle',
  components: 'presentation',
  specialists: 'users',
  faster: 'target',
  bugs: 'bug',
  onboarding: 'history',
}

export default function Metrics() {
  const { t } = useTranslation()

  return (
    <section
      id="metrics"
      className="metrics"
      aria-labelledby="metrics-heading"
    >
      <header className="metrics__header">
        <SectionHeading id="metrics-heading">{t('metrics.title')}</SectionHeading>
        <DragonAssistant
          tipId={WEB_DRAGON_TIPS.metrics.tipId}
          icon={WEB_DRAGON_TIPS.metrics.icon}
          text={t(WEB_DRAGON_TIPS.metrics.tipKey)}
          className="dragon-guide--section"
        />
      </header>

      <p className="section-lead metrics__lead" data-aos="fade-up">
        {t('metrics.lead')}
      </p>

      <ul className="metrics__grid">
        {METRIC_KEYS.map((metricKey) => (
          <Card
            key={metricKey}
            as="li"
            padding="none"
            interactive
            data-aos="fade-up"
            className="metrics__card"
          >
            <MetricValue value={t(`metrics.items.${metricKey}.value`)} />
            <div className="metrics__label-row">
              <KitIcon
                name={METRIC_ICONS[metricKey]}
                className="metrics__card-icon"
                size={KIT_ICON_MD}
              />
              <div className="metrics__label">
                {t(`metrics.items.${metricKey}.label`)}
              </div>
            </div>
            <p className="metrics__context">
              {t(`metrics.items.${metricKey}.context`)}
            </p>
          </Card>
        ))}
      </ul>
    </section>
  )
}

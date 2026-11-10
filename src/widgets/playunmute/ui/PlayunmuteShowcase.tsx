'use client'

import React from 'react'
import KitIcon, { KIT_ICON_MD } from '@/shared/ui/kit-icon'
import type { KitIconName } from '@/shared/ui/kit-icon'
import Button from '@/shared/ui/button'
import Card from '@/shared/ui/card'
import Tag, { TagList } from '@/shared/ui/tag'
import ProgressiveImage from '@/shared/ui/progressive-image'
import { publicAsset } from '@/shared/lib'
import { useTranslation } from 'react-i18next'

const PLAYUNMUTE_DEMO = 'https://germanchernyshev.github.io/playunmute'
const PLAYUNMUTE_PREVIEW = publicAsset('/img/playunmute.webp')
const PLAYUNMUTE_COMING_SOON = false

const PLAYUNMUTE_STACK =
  'Fullstack · Nuxt 3 · Vue 3 · TypeScript · Node.js · Express'

const PLAYUNMUTE_FEATURES: Array<{
  labelKey:
    | 'playunmute.features.zoom'
    | 'playunmute.features.pace'
    | 'playunmute.features.verdict'
  icon: KitIconName
}> = [
  { labelKey: 'playunmute.features.zoom', icon: 'headset' },
  { labelKey: 'playunmute.features.pace', icon: 'terminal' },
  { labelKey: 'playunmute.features.verdict', icon: 'trophy' }
]

type PlayunmuteShowcaseProps = {
  comingSoon?: boolean
}

export default function PlayunmuteShowcase({
  comingSoon = PLAYUNMUTE_COMING_SOON
}: PlayunmuteShowcaseProps) {
  const { t } = useTranslation()

  return (
    <section
      id="playunmute"
      className="playunmute"
      aria-labelledby="playunmute-heading"
    >
      <Card
        as="article"
        data-aos="fade-up"
        className={
          comingSoon
            ? 'product-showcase product-showcase--coming-soon'
            : 'product-showcase'
        }
      >
        <div
          className="product-showcase__body"
          {...(comingSoon ? { inert: true } : {})}
        >
          <div className="product-showcase__copy">
            <p className="product-showcase__label">{t('playunmute.label')}</p>

            <div className="product-showcase__heading">
              <h2
                id="playunmute-heading"
                className="product-showcase__title"
              >
                Playunmute
              </h2>

              {!comingSoon && (
                <Button
                  href={PLAYUNMUTE_DEMO}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="nestedPrimary"
                  size="md"
                  elevated
                  className="product-showcase__demo"
                >
                  <KitIcon
                    name="star"
                    size={KIT_ICON_MD}
                    className="ui-button__icon"
                  />
                  {t('playunmute.tryDemo')}
                </Button>
              )}
            </div>

            <p className="product-showcase__proof">{t('playunmute.proof1')}</p>

            <TagList className="product-showcase__features">
              {PLAYUNMUTE_FEATURES.map(feature => (
                <Tag
                  key={feature.labelKey}
                  as="li"
                  className="product-showcase__feature"
                >
                  <KitIcon
                    name={feature.icon}
                    size={KIT_ICON_MD}
                    className="ui-tag__icon"
                  />
                  <span>{t(feature.labelKey)}</span>
                </Tag>
              ))}
            </TagList>

            <p className="product-showcase__stack">{PLAYUNMUTE_STACK}</p>
          </div>

          <div className="product-showcase__preview">
            <ProgressiveImage
              src={PLAYUNMUTE_PREVIEW}
              alt={t('playunmute.previewAlt')}
              width={800}
              height={800}
              className="product-showcase__preview-img"
              loading="lazy"
              lockAspect={false}
              sizes="(max-width: 767px) 92vw, 420px"
            />
          </div>
        </div>

        {comingSoon && (
          <div
            className="product-showcase__veil"
            role="status"
          >
            <p className="product-showcase__coming-soon">
              {t('playunmute.comingSoon')}
            </p>
          </div>
        )}
      </Card>
    </section>
  )
}

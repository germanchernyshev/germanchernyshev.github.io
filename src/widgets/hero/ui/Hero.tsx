'use client'

import React from 'react'
import { AUTHOR_PHOTO, AUTHOR_TELEGRAM, WEB_DRAGON_TIPS } from '@/shared/config'
import DragonAssistant from '@/features/dragon-assistant'
import KitIcon, { KIT_ICON_MD } from '@/shared/ui/kit-icon'
import Button from '@/shared/ui/button'
import ProgressiveImage from '@/shared/ui/progressive-image'
import { publicAsset } from '@/shared/lib'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <div id="top" className="hero">
      <div className="hero__stage">
        <div className="hero__brand hero__reveal hero__reveal--1">
          <ProgressiveImage
            src={publicAsset(AUTHOR_PHOTO)}
            alt={t('meta.authorName')}
            width={160}
            height={160}
            className="hero__photo"
            objectFit="cover"
            sizes="(max-width: 767px) 120px, 160px"
            priority
          />
          <div className="hero__identity">
            <p className="hero__role">{t('common.jobTitle')}</p>
            <h1 className="hero__name">{t('meta.authorName')}</h1>
          </div>
        </div>

        <DragonAssistant
          tipId={WEB_DRAGON_TIPS.hero.tipId}
          icon={WEB_DRAGON_TIPS.hero.icon}
          text={t(WEB_DRAGON_TIPS.hero.tipKey)}
          className="dragon-guide--hero"
          defaultOpen
        />

        <p className="hero__headline hero__reveal hero__reveal--2">
          {t('hero.headline')}
        </p>

        <p className="hero__support hero__reveal hero__reveal--3">
          {t('hero.support')}
        </p>

        <div className="hero__actions hero__reveal hero__reveal--4">
          <Button
            href={AUTHOR_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
            className="hero__cta"
          >
            <KitIcon name="send" size={KIT_ICON_MD} className="ui-button__icon" />
            {t('hero.discuss')}
          </Button>
          <Button
            href={AUTHOR_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="md"
            className="hero__cta"
          >
            <KitIcon name="wand" size={KIT_ICON_MD} className="ui-button__icon" />
            {t('hero.mentorCta')}
          </Button>
        </div>

        <p
          className="hero__focus hero__reveal hero__reveal--5"
          aria-label={t('common.focusAria')}
        >
          {t('common.focus')}
        </p>
      </div>
    </div>
  )
}

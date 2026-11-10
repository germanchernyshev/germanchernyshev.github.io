'use client'

import React from 'react'
import KitIcon, { KIT_ICON_MD } from '@/shared/ui/kit-icon'
import Button from '@/shared/ui/button'
import Card from '@/shared/ui/card'
import SectionHeading from '@/shared/ui/section-heading'
import DragonAssistant from '@/features/dragon-assistant'
import { AUTHOR_GITHUB_ARTICLE, WEB_DRAGON_TIPS } from '@/shared/config'
import { useTranslation } from 'react-i18next'

export default function SocialProof() {
  const { t } = useTranslation()

  return (
    <section
      id="expertise"
      className="social-proof"
      aria-labelledby="social-proof-heading"
    >
      <header className="social-proof__header">
        <SectionHeading id="social-proof-heading">
          {t('socialProof.title')}
        </SectionHeading>
        <DragonAssistant
          tipId={WEB_DRAGON_TIPS.article.tipId}
          icon={WEB_DRAGON_TIPS.article.icon}
          text={t(WEB_DRAGON_TIPS.article.tipKey)}
          className="dragon-guide--section"
        />
      </header>

      <Card
        as="article"
        padding="none"
        data-aos="fade-up"
        className="social-proof__card"
      >
        <p className="social-proof__excerpt">{t('socialProof.excerpt')}</p>
        <Button
          href={AUTHOR_GITHUB_ARTICLE}
          target="_blank"
          rel="noopener noreferrer"
          variant="nested"
          size="md"
          className="social-proof__link"
        >
          <KitIcon name="bookmark" size={KIT_ICON_MD} className="ui-button__icon" />
          {t('socialProof.readOnGithub')}
        </Button>
      </Card>
    </section>
  )
}

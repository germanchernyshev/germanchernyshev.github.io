'use client'

import React from 'react'
import { FaGithub } from 'react-icons/fa'
import KitIcon, { KIT_ICON_MD } from '@/shared/ui/kit-icon'
import Button from '@/shared/ui/button'
import Card from '@/shared/ui/card'
import {
  AUTHOR_TELEGRAM,
  AUTHOR_GITHUB,
  AUTHOR_EMAIL,
} from '@/shared/config'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="contacts"
      className="footer"
    >
      <Card
        className="footer__inner"
        shadow
        data-aos="fade-up"
      >
        <div className="footer__intro">
          <h2 className="footer__title">{t('common.jobTitle')}</h2>
          <p className="footer__text">{t('footer.text')}</p>
        </div>

        <nav
          className="footer__channels"
          aria-label={t('footer.contactsAria')}
        >
          <Button
            href={AUTHOR_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            variant="nestedGhost"
            size="lg"
            className="footer__cta"
          >
            <KitIcon name="send" size={KIT_ICON_MD} className="ui-button__icon" />
            {t('footer.cta')}
          </Button>
          <Button
            href={`mailto:${AUTHOR_EMAIL}`}
            variant="nestedGhost"
            size="lg"
            className="footer__cta"
          >
            <KitIcon name="mail" size={KIT_ICON_MD} className="ui-button__icon" />
            {t('common.email')}
          </Button>
          <Button
            href={AUTHOR_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            variant="nestedGhost"
            size="lg"
            className="footer__cta"
          >
            <FaGithub size={KIT_ICON_MD} aria-hidden className="ui-button__icon footer__cta-icon" />
            {t('common.github')}
          </Button>
        </nav>

        <p className="footer__copy">
          © {currentYear} webdragon
        </p>
      </Card>
    </footer>
  )
}

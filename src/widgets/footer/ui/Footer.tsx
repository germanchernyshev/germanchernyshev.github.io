'use client'

import React from 'react'
import { FaGithub } from 'react-icons/fa'
import KitIcon, { KIT_ICON_MD } from '@/shared/ui/kit-icon'
import {
  AUTHOR_TELEGRAM,
  AUTHOR_GITHUB,
  AUTHOR_EMAIL,
} from '@/shared/config'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = dayjs().year()

  return (
    <footer
      id="contacts"
      className="footer"
    >
      <div className="footer__inner">
        <div className="footer__intro">
          <h2 className="footer__title">{t('common.jobTitle')}</h2>
          <p className="footer__text">{t('footer.text')}</p>
        </div>

        <nav
          className="footer__channels"
          aria-label={t('footer.contactsAria')}
        >
          <a
            href={AUTHOR_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__cta"
          >
            <KitIcon name="send" size={KIT_ICON_MD} className="footer__cta-icon" />
            {t('footer.cta')}
          </a>
          <a
            href={`mailto:${AUTHOR_EMAIL}`}
            className="footer__cta"
          >
            <KitIcon name="mail" size={KIT_ICON_MD} className="footer__cta-icon" />
            {t('common.email')}
          </a>
          <a
            href={AUTHOR_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__cta"
          >
            <FaGithub size={KIT_ICON_MD} aria-hidden className="footer__cta-icon" />
            {t('common.github')}
          </a>
        </nav>

        <p className="footer__copy">
          © {currentYear} webdragon
        </p>
      </div>
    </footer>
  )
}

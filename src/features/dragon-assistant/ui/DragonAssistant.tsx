'use client'

import React, { useEffect, useState } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import ProgressiveImage from '@/shared/ui/progressive-image'
import { publicAsset } from '@/shared/lib'
import { useTranslation } from 'react-i18next'

const DESKTOP_MIN_WIDTH = '(min-width: 768px)'

export default function DragonAssistant({
  tipId,
  icon,
  text,
  className = '',
  defaultOpen = false,
}: {
  tipId: string
  icon: string
  text: string
  className?: string
  defaultOpen?: boolean
}) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const openLabel = t('dragon.openTip')
  const hideLabel = t('dragon.hideTip')

  useEffect(() => {
    if (!defaultOpen) {
      return
    }

    setIsOpen(window.matchMedia(DESKTOP_MIN_WIDTH).matches)
  }, [defaultOpen])

  const rootClass = ['dragon-guide', className].filter(Boolean).join(' ')

  return (
    <div className={rootClass}>
      <div className="dragon-guide__mascot" data-aos="fade-up">
        <button
          type="button"
          className={`dragon-guide__trigger${isOpen ? '' : ' dragon-guide__trigger--pulse'}`}
          onClick={() => setIsOpen(open => !open)}
          aria-expanded={isOpen}
          aria-controls={`dragon-tip-${tipId}`}
          aria-label={isOpen ? hideLabel : openLabel}
          title={isOpen ? undefined : openLabel}
        >
          <ProgressiveImage
            src={publicAsset(icon)}
            alt=""
            width={160}
            height={80}
            className="dragon-guide__icon"
            lockAspect={false}
            aria-hidden
            loading="lazy"
          />
          {!isOpen ? (
            <span className="dragon-guide__hint" aria-hidden>
              <HiOutlineInformationCircle size={20} />
            </span>
          ) : null}
        </button>
      </div>

      {isOpen ? (
        <div
          id={`dragon-tip-${tipId}`}
          className="dragon-guide__bubble"
          role="status"
          aria-label={t('dragon.tipDialog')}
        >
          <p className="dragon-guide__text">{text}</p>
          <button
            type="button"
            className="dragon-guide__close"
            onClick={() => setIsOpen(false)}
          >
            {t('dragon.collapse')}
          </button>
        </div>
      ) : null}
    </div>
  )
}

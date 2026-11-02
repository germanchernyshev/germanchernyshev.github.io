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
}: {
  tipId: string
  icon: string
  text: string
  className?: string
}) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const openLabel = t('dragon.openTip')
  const hideLabel = t('dragon.hideTip')

  useEffect(() => {
    setIsOpen(window.matchMedia(DESKTOP_MIN_WIDTH).matches)
  }, [])

  const closeTip = () => {
    setIsOpen(false)
  }

  const openTip = () => {
    setIsOpen(true)
  }

  const rootClass = ['dragon-guide', className].filter(Boolean).join(' ')

  return (
    <div className={rootClass} data-aos="fade-up">
      <button
        type="button"
        className={`dragon-guide__trigger${isOpen ? '' : ' dragon-guide__trigger--pulse'}`}
        onClick={isOpen ? closeTip : openTip}
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

      {isOpen ? (
        <div
          id={`dragon-tip-${tipId}`}
          className="dragon-guide__bubble"
          role="dialog"
          aria-label={t('dragon.tipDialog')}
        >
          <p className="dragon-guide__text">{text}</p>
          <button
            type="button"
            className="dragon-guide__close"
            onClick={closeTip}
          >
            {t('dragon.collapse')}
          </button>
        </div>
      ) : null}
    </div>
  )
}

'use client'

import React, { useId } from 'react'
import type { Case } from '@/entities/case'
import KitIcon, { KIT_ICON_MD } from '@/shared/ui/kit-icon'
import type { KitIconName } from '@/shared/ui/kit-icon'
import { useTranslation } from 'react-i18next'

const CASE_ICON_BY_ID: Record<string, KitIconName> = {
  'multi-product-platform': 'castle',
  'retail-platform': 'cart',
  'mini-apps': 'flask',
}

function renderCaseText(text: string) {
  const parts = text.split(/(\d+\+?%?|\d+ → \d+)/g)

  return parts.map((part, index) => {
    if (/^\d/.test(part)) {
      return <strong key={index}>{part}</strong>
    }
    return part
  })
}

type CaseAccordionProps = {
  caseEntry: Case
  isOpen: boolean
  onToggle: () => void
}

export default function CaseAccordion({
  caseEntry,
  isOpen,
  onToggle,
}: CaseAccordionProps) {
  const { t } = useTranslation()
  const panelId = useId()
  const triggerId = useId()
  const caseIcon = CASE_ICON_BY_ID[caseEntry.id] ?? 'folder'
  const title = t(`projects.cases.${caseEntry.id}.title`)
  const description = t(`projects.cases.${caseEntry.id}.description`)

  return (
    <article
      className={`case case--accordion${isOpen ? ' case--open' : ''}`}
    >
      <h3 className="case__heading">
        <button
          id={triggerId}
          type="button"
          className="case__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="case__trigger-start">
            <KitIcon name={caseIcon} size={KIT_ICON_MD} className="case__trigger-icon" />
            <span className="case__trigger-copy">
              <span className="case__trigger-text">{title}</span>
              <span className="case__summary">
                {t(`projects.cases.${caseEntry.id}.summary`)}
              </span>
            </span>
          </span>
          <svg
            className="case__chevron"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="case__panel"
        aria-hidden={!isOpen}
      >
        <div className="case__panel-inner">
          <p className="case__proof">{renderCaseText(description)}</p>
        </div>
      </div>
    </article>
  )
}

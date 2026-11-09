'use client'

import React from 'react'
import KitIcon, { KIT_ICON_LG } from '@/shared/ui/kit-icon'
import type { KitIconName } from '@/shared/ui/kit-icon'
import type { Skill as SkillType } from '@/shared/types'
import { useTranslation } from 'react-i18next'

const SKILL_ICON_BY_ID: Record<number, KitIconName> = {
  1: 'users',
  2: 'castle',
  3: 'laptop',
  4: 'server',
  5: 'checklist',
}

interface SkillProps {
  skill: SkillType
}

export default function Skill({ skill }: SkillProps) {
  const { t } = useTranslation()
  const iconName = SKILL_ICON_BY_ID[skill.id] ?? 'laptop'
  const title = t(skill.titleKey)
  const tags = t(skill.descriptionKey)
    .split('·')
    .map(tag => tag.trim())
    .filter(Boolean)

  return (
    <div
      data-aos="fade-up"
      className="skills__item"
    >
      <div className="skills__item-icon mb-4">
        <KitIcon name={iconName} className="skills__item-svg" size={KIT_ICON_LG} />
      </div>

      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>

      <div className="skills__tags">
        {tags.map(tag => (
          <span key={tag} className="skills__tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

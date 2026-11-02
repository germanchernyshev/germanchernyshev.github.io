import React from 'react'
import ProgressiveImage from '@/shared/ui/progressive-image'
import { publicAsset } from '@/shared/lib'

interface LoaderProps {
  className?: string
}

export default function Loader({ className = '' }: LoaderProps) {
  return (
    <div className={`loader ${className}`}>
      <ProgressiveImage
        src={publicAsset('/img/dragon4.png')}
        alt="Dragon illustration"
        width={100}
        height={100}
        className="loader__img w-24 lg:w-40"
        priority
      />
    </div>
  )
}

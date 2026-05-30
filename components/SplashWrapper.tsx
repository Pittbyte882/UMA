"use client"

import dynamic from 'next/dynamic'

const SplashScreen = dynamic(
  () => import('@/components/SplashScreen').then(mod => mod.SplashScreen),
  { ssr: false }
)

export function SplashWrapper() {
  return <SplashScreen />
}
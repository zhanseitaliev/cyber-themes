import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Green Rain: зелёный фосфор на почти чёрном, за панелями падают символы.
// Только тёмный режим. Неоновые цвета закреплены на ступенях, которые читает
// тёмный режим: 300 (текст и заливка), 600 у акцента (свечение фокуса).
const rain = makeColors({
  label: 'Green Rain',
  only: 'dark',
  roles: {
    accent: { seed: '#00FF41', stops: { 300: '#00FF41', 600: '#00FF41' }, fillShade: 300 },
    success: { seed: '#B4FF3B', stops: { 300: '#B4FF3B', 400: '#B4FF3B' }, fillShade: 400 },
    warning: { seed: '#FFC23B', stops: { 200: '#FFC23B', 300: '#FFC23B' } },
    danger: { seed: '#FF4455', stops: { 300: '#FF4455' }, fillShade: 300 },
    pro: { seed: '#3BFFD1', stops: { 300: '#3BFFD1', 450: '#3BFFD1' } },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#020803',
        'surface-1': '#07130B',
        'surface-2': '#07130B',
        'surface-3': '#07130B',
        'text-primary': '#CCFFD8',
        'text-secondary': '#6EE38C',
        'text-muted': '#4CC96C',
      },
      // Зеленоватый белый: от него считаются тонкие границы и подложка полей.
      stops: { 0: '#F4FFF6' },
    },
  },
})

// Neon Grid: строгий почти чёрный с синевой и неоновый циан.
const neon = makeColors({
  label: 'Neon Grid',
  only: 'dark',
  roles: {
    accent: { seed: '#00E5FF', stops: { 300: '#00E5FF', 600: '#00E5FF' }, fillShade: 300 },
    pro: { seed: '#7C5CFF', stops: { 450: '#7C5CFF' } },
    success: { seed: '#2BFFB0', stops: { 300: '#2BFFB0', 400: '#2BFFB0' }, fillShade: 400 },
    warning: { seed: '#FFB020', stops: { 200: '#FFB020', 300: '#FFB020' } },
    danger: { seed: '#FF4D6D', stops: { 300: '#FF4D6D' }, fillShade: 300 },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0A0E17',
        'surface-1': '#111827',
        'surface-2': '#111827',
        'surface-3': '#111827',
        'text-primary': '#E6EDF7',
        'text-secondary': '#8B9BB4',
        'text-muted': '#8B9BB4',
      },
      stops: { 0: '#F2F7FF' },
    },
  },
})

export const RAIN_SCENE_NAME = 'green-rain'

export type LookId = 'rain' | 'neon'

export const LOOKS: Record<LookId, { title: string; args: ThemeSetArgs; problems: string[] }> = {
  rain: {
    title: 'Green Rain',
    args: {
      colors: rain.theme,
      // Плотное стекло в цвет самих панелей: даже самый яркий символ дождя
      // прямо за текстом оставляет контраст ошибки (#FF4455) не ниже 4.5:1.
      backdrop: { scene: RAIN_SCENE_NAME, glass: { blur: 6, opacity: 0.88 } },
    },
    problems: rain.problems,
  },
  neon: {
    title: 'Neon Grid',
    args: { colors: neon.theme },
    problems: neon.problems,
  },
}

export function lookFrom(text: string): LookId | undefined {
  const word = text.trim().toLowerCase()

  if (['rain', 'matrix', 'матрица', 'green'].includes(word)) {
    return 'rain'
  }
  if (['neon', 'неон', 'grid'].includes(word)) {
    return 'neon'
  }

  return undefined
}

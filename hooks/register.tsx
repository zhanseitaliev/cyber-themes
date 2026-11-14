import type { EngineInterface, Register } from 'claude-code'

import { LOOKS, RAIN_SCENE_NAME, lookFrom, type LookId } from './looks.js'
import { RAIN_SCENE } from './scene.js'

const STORE_KEY = 'look'

async function storedLook($: EngineInterface): Promise<LookId> {
  const saved = await $.store.get(STORE_KEY)

  return saved === 'neon' ? 'neon' : 'rain'
}

async function apply($: EngineInterface, id: LookId): Promise<void> {
  const look = LOOKS[id]
  const unpainted = look.problems.find(line => line.startsWith("Desktop won't paint"))

  if (unpainted !== undefined) {
    $.ui.toast(unpainted)
  }
  const set = await $.theme.set(look.args)

  if (!set.isDrawn) {
    $.ui.status(set.reason)
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'look',
      description: 'Сменить тему: /look matrix или /look neon (без слова переключает)',
    })
    await apply($, await storedLook($))

    return next(e)
  })

  on('command.run', { command: 'look' }, async ($, e) => {
    const current = await storedLook($)
    const asked = e.args.trim() === '' ? (current === 'rain' ? 'neon' : 'rain') : lookFrom(e.args)

    if (asked === undefined) {
      return { text: `Не знаю тему «${e.args.trim()}». Есть: matrix, neon.` }
    }
    await $.store.set(STORE_KEY, asked)
    await apply($, asked)

    return { text: `Тема: ${LOOKS[asked].title}.` }
  })

  // Фон «цифровой дождь»: рисуется только для своей сцены.
  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.scene !== RAIN_SCENE_NAME) {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={RAIN_SCENE} alt="Колонки зелёных символов медленно падают сверху вниз" isInteractive />
  })
}

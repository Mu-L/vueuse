import type { Pausable } from '@vueuse/shared'
import type { MaybeRefOrGetter } from 'vue'
import type { ConfigurableNavigator } from '../_configurable'
import { toRef, useIntervalFn } from '@vueuse/shared'
import { defaultNavigator } from '../_configurable'
import { useSupported } from '../useSupported'

export interface UseVibrateOptions extends ConfigurableNavigator {
  /**
   *
   * Vibration Pattern
   *
   * An array of values describes alternating periods in which the
   * device is vibrating and not vibrating. Each value in the array
   * is converted to an integer, then interpreted alternately as
   * the number of milliseconds the device should vibrate and the
   * number of milliseconds it should not be vibrating
   *
   * @default []
   *
   */
  pattern?: MaybeRefOrGetter<number[] | number>
  /**
   * Interval to run a persistent vibration, in ms
   *
   * Pass `0` to disable
   *
   * @default 0
   *
   */
  interval?: number
}

/**
 * Reactive vibrate
 *
 * @see https://vueuse.org/useVibrate
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
 * @param options
 *
 * @__NO_SIDE_EFFECTS__
 */
export function useVibrate(options?: UseVibrateOptions) {
  const {
    pattern = [],
    interval = 0,
    navigator = defaultNavigator,
  } = options || {}

  const isSupported = useSupported(() => typeof navigator !== 'undefined' && 'vibrate' in navigator)

  const patternRef = toRef(pattern)
  let intervalControls: Pausable | undefined

  const vibrate = (pattern = patternRef.value) => {
    if (isSupported.value)
      navigator!.vibrate(pattern)
  }

  // Attempt to stop the vibration:
  const stop = () => {
    // Stope the vibration if we need to:
    if (isSupported.value)
      navigator!.vibrate(0)
    intervalControls?.pause()
  }

  if (interval > 0) {
    intervalControls = useIntervalFn(
      vibrate,
      interval,
      {
        immediate: false,
        immediateCallback: false,
      },
    )
  }

  return {
    isSupported,
    pattern,
    intervalControls,
    vibrate,
    stop,
  }
}

export type UseVibrateReturn = ReturnType<typeof useVibrate>

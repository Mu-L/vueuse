import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { MaybeComputedRefArgs } from '../utils'
import { computed } from 'vue'
import { toValueArgsFlat } from '../utils'

export function useMax(array: MaybeRefOrGetter<MaybeRefOrGetter<number>[]>): ComputedRef<number>
export function useMax(...args: MaybeRefOrGetter<number>[]): ComputedRef<number>

/**
 * Reactively get maximum of values.
 *
 * @see https://vueuse.org/useMax
 *
 * @__NO_SIDE_EFFECTS__
 */
export function useMax(...args: MaybeComputedRefArgs<number>) {
  return computed<number>(() => {
    const array = toValueArgsFlat(args)
    return Math.max(...array)
  })
}

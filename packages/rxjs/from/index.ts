import type { ObservableInput, Subscription } from 'rxjs'
import type { MaybeRef, Ref, WatchOptions } from 'vue'
import { fromEvent as fromEventRx, from as fromRxjs, Observable } from 'rxjs'
import { isRef, watch } from 'vue'

/* @__NO_SIDE_EFFECTS__ */
export function from<T>(value: ObservableInput<T> | Ref<T>, watchOptions?: WatchOptions): Observable<T> {
  if (isRef<T>(value))
    return new Observable(subscriber => watch(value, val => subscriber.next(val), watchOptions))

  return fromRxjs(value)
}

export function fromEvent<T extends HTMLElement | null>(value: MaybeRef<T>, event: string): Observable<Event> {
  if (isRef<T>(value)) {
    return new Observable((subscriber) => {
      let innerSub: Subscription | undefined
      return watch(value, (element) => {
        innerSub?.unsubscribe()
        if (element instanceof HTMLElement) {
          innerSub = fromEventRx(element, event).subscribe(subscriber)
          subscriber.add(innerSub)
        }
      }, { immediate: true })
    })
  }
  if (value === null) {
    throw new Error('The value is `null`, and it should be an HTMLElement.')
  }
  return fromEventRx(value, event)
}

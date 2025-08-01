import type { ComputedRef, ShallowRef } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
import { shallowRef } from 'vue'

import { defaultWindow } from '../_configurable'

import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'

export interface NavigatorLanguageState {
  isSupported: ComputedRef<boolean>
  /**
   *
   * ISO 639-1 standard Language Code
   *
   * @info The detected user agent language preference as a language tag
   * (which is sometimes referred to as a "locale identifier").
   * This consists of a 2-3 letter base language tag that indicates a
   * language, optionally followed by additional subtags separated by
   * '-'. The most common extra information is the country or region
   * variant (like 'en-US' or 'fr-CA').
   *
   *
   * @see https://www.iso.org/iso-639-language-codes.html
   * @see https://www.loc.gov/standards/iso639-2/php/code_list.php
   *
   */
  language: ShallowRef<string | undefined>
}

/**
 *
 * Reactive useNavigatorLanguage
 *
 * Detects the currently selected user language and returns a reactive language
 * @see https://vueuse.org/useNavigatorLanguage
 *
 * @__NO_SIDE_EFFECTS__
 */
export function useNavigatorLanguage(options: ConfigurableWindow = {}): Readonly<NavigatorLanguageState> {
  const { window = defaultWindow } = options

  const navigator = window?.navigator

  const isSupported = useSupported(() => navigator && 'language' in navigator)

  const language = shallowRef<string | undefined>(navigator?.language)

  // Listen to when to user changes language:
  useEventListener(window, 'languagechange', () => {
    if (navigator)
      language.value = navigator.language
  }, { passive: true })

  return {
    isSupported,
    language,
  }
}

export type UseNavigatorLanguageReturn = ReturnType<typeof useNavigatorLanguage>

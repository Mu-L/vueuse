---
category: '@Integrations'
---

# useNProgress

Reactive wrapper for [`nprogress`](https://github.com/rstacruz/nprogress).

## Install

```bash
npm i nprogress@^0
```

## Usage

```ts {6}
import { useNProgress } from '@vueuse/integrations/useNProgress'

const { isLoading } = useNProgress()

function toggle() {
  isLoading.value = !isLoading.value
}
```

### Passing a progress percentage

You can pass a percentage to indicate where the bar should start from.

```ts {3}
import { useNProgress } from '@vueuse/integrations/useNProgress'

const { progress } = useNProgress(0.5)

function done() {
  progress.value = 1.0
}
```

> To change the progress percentage, set `progress.value = n`, where n is a number between 0..1.

### Customization

Just edit [nprogress.css](https://github.com/rstacruz/nprogress/blob/master/nprogress.css) to your liking. Tip: you probably only want to find and replace occurrences of #29d.

You can [configure](https://github.com/rstacruz/nprogress#configuration) it by passing an object as a second parameter.

```ts {4}
import { useNProgress } from '@vueuse/integrations/useNProgress'

useNProgress(null, {
  minimum: 0.1,
  // ...
})
```

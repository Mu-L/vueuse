---
category: Component
---

# tryOnMounted

Safe `onMounted`. Call `onMounted()` if it's inside a component lifecycle, if not, just call the function

## Usage

```ts
import { tryOnMounted } from '@vueuse/core'

tryOnMounted(() => {

})
```

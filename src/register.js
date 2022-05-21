// @a110/s-e-a/src/register.js

// `STORY_RENDERED` event isn't sent at start, if the first
// item in the sidebar is a document page such as the built-in
//   `Example/Introduction.mdx`.

import { CURRENT_STORY_WAS_SET } from '@storybook/core-events'
import { addons } from '@storybook/addons'

const ADDON_ID = '@a110/s-e-a'

addons.register(
  ADDON_ID,
  (() => {
    let hasExpanded = false

    return api => {
      const emitter = addons.getChannel()

      emitter.on(CURRENT_STORY_WAS_SET, () => {
        if (!hasExpanded) {
          // "Calling on the next tick after storyRendered
          //  seems to work reliably."
          setTimeout(api.expandAll)
          hasExpanded = true
        }
      })
    }
  })()
)

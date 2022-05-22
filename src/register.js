// @a110/s-e-a/src/register.js

// `STORY_RENDERED` event isn't sent at start, if the first
// item in the sidebar is a document page such as the built-in
//   `Example/Introduction.mdx`.

import { CURRENT_STORY_WAS_SET } from '@storybook/core-events'
import { addons } from '@storybook/addons'

const ADDON_ID = '@a110/s-e-a'

const subscribeEvent = (emitter, event, callback) => (
  emitter.on(event, callback), () => emitter.off(event, callback)
)

class ExpandAllOnce {
  _emitter = addons.getChannel()
  _api
  _unsub

  expandAll = () => {
    this._api.expandAll()
    this._unsub()
  }

  constructor(api) {
    this._api = api
    this._unsub = subscribeEvent(
      this._emitter,
      CURRENT_STORY_WAS_SET,
      this.expandAll
    )
  }
}

addons.register(ADDON_ID, api => {
  new ExpandAllOnce(api)
})

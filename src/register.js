// @a110/s-e-a/src/register.js

import * as Events from '@storybook/core-events'
import { addons } from '@storybook/addons'

const ADDON_ID = '@a110/s-e-a'

const SEA_DEBUG = false

const listenAllEvents = api => {
  for (const event of [
    // hmm, some reason `Events` not iterable
    Events.CHANNEL_CREATED,
    Events.CONFIG_ERROR,
    Events.STORY_INDEX_INVALIDATED,
    Events.STORY_SPECIFIED,
    Events.SET_STORIES,
    Events.SET_CURRENT_STORY,
    Events.CURRENT_STORY_WAS_SET,
    Events.FORCE_RE_RENDER,
    Events.FORCE_REMOUNT,
    Events.PRELOAD_STORIES,
    Events.STORY_PREPARED,
    Events.STORY_CHANGED,
    Events.STORY_UNCHANGED,
    Events.STORY_RENDERED,
    Events.STORY_MISSING,
    Events.STORY_ERRORED,
    Events.STORY_THREW_EXCEPTION,
    Events.STORY_RENDER_PHASE_CHANGED,
    Events.UPDATE_STORY_ARGS,
    Events.STORY_ARGS_UPDATED,
    Events.RESET_STORY_ARGS,
    Events.SET_GLOBALS,
    Events.UPDATE_GLOBALS,
    Events.GLOBALS_UPDATED,
    Events.REGISTER_SUBSCRIPTION,
    Events.PREVIEW_KEYDOWN,
    Events.SELECT_STORY,
    Events.STORIES_COLLAPSE_ALL,
    Events.STORIES_EXPAND_ALL,
    Events.DOCS_RENDERED,
    Events.SHARED_STATE_CHANGED,
    Events.SHARED_STATE_SET,
    Events.NAVIGATE_URL,
    Events.UPDATE_QUERY_PARAMS,
  ]) {
    addons.getChannel().on(event, eventData => {
      console.log(`event ${event}`, eventData)
    })
  }
}

const subscribeEvent = (emitter, event, callback) => (
  emitter.on(event, callback), () => emitter.off(event, callback)
)

class ExpandAllOnce {
  _emitter = addons.getChannel()
  _api
  _storyKinds
  _unsubscribe

  _expandAll = () => {
    if (SEA_DEBUG) {
      console.log('s-e-a expandAll')
    }

    this._api.expandAll()
    this._unsubscribe()
  }

  _setStoryKinds = eventData => {
    const stories = eventData?.stories
    if (stories) {
      this._storyKinds = Object.values(stories).map(({ kind }) => kind)

      if (SEA_DEBUG) {
        console.log('_storyKinds', this._storyKinds)
      }
    }
  }

  _maybeGetIntroStoryKind = () => {
    const re = new RegExp('\\bintro', 'i')
    return this?._storyKinds?.filter(kind => re.test(kind))?.[0]
  }

  _maybeSelectIntroStory = () => {
    const introStoryKind = this._maybeGetIntroStoryKind()

    if (SEA_DEBUG) {
      console.log('maybe intro story kind', introStoryKind)
    }

    if (introStoryKind) {
      this._api.selectStory(introStoryKind)
    }
  }

  constructor(api) {
    if (SEA_DEBUG) {
      console.log('s-e-a')
      listenAllEvents(api)
    }

    this._api = api

    this._unsubscribe = subscribeEvent(
      addons.getChannel(),
      Events.CURRENT_STORY_WAS_SET,
      this._expandAll
    )

    subscribeEvent(addons.getChannel(), Events.SET_STORIES, this._setStoryKinds)
    subscribeEvent(
      addons.getChannel(),
      Events.STORY_MISSING,
      this._maybeSelectIntroStory
    )
  }
}

addons.register(ADDON_ID, api => {
  new ExpandAllOnce(api)
})

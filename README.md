# @a110/storybook-expand-all

[![npm version](https://badge.fury.io/js/@a110%2Fstorybook-expand-all.svg)](
  https://www.npmjs.com/package/@a110/storybook-expand-all)

This Storybook Add On aims to expand all the items in the
sidebar when the Storybook launches in the browser.

The credit is entirely due to [this issue post](https://github.com/storybookjs/storybook/issues/244#issuecomment-992084314).

## Usage

- Install with for example `yarn add -D @a110/storybook-expand-all`
- Add to the list of addons in `.storybook/main.js`:
  ```js
    ...
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-interactions',
      '@a110/storybook-expand-all',
    ],
    ...
  ```

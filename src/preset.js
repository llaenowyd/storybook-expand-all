// @a110/s-e-a/src/preset.js

function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')] //👈 Addon implementation
}

module.exports = { managerEntries }

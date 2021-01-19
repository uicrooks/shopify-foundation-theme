export default {
  name: 'select-option',
  directive: {
    inserted ($el, binding) {
      const result = Array.from($el).find(el => el.text === binding.value)
      if (result) result.selected = true
    }
  }
}
<script>
import { ref } from 'vue'

export default {
  setup (props, { slots }) {
    const initialRender = ref(true)
    const currentImage = ref(null)

    const switchImage = ($el) => {
      initialRender.value = false
      currentImage.value = {
        url: $el.target.dataset.url,
        alt: $el.target.dataset.alt || ''
      }
    }

    return () => slots.default({
      initialRender: initialRender.value,
      currentImage: currentImage.value,
      switchImage
    })
  }
}
</script>
<script>
export default {
  props: {
    featuredImage: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      initialRender: true,
      currentImage: null
    }
  },
  methods: {
    switchImage ($el) {
      this.initialRender = false
      this.currentImage = {
        url: $el.target.dataset.url,
        alt: $el.target.dataset.alt || ''
      }
    }
  },
  render () {
    return this.$scopedSlots.default({
      initialRender: this.initialRender,
      currentImage: this.currentImage,
      switchImage: this.switchImage
    })
  }
}
</script>
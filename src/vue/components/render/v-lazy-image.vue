<script>
/**
 * v-lazy-image package as a vue3 component
 * original repo and docs: https://github.com/alexjoverm/v-lazy-image
 */
import { h } from 'vue'

export default {
  name: 'VLazyImage',
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true
    },
    srcPlaceholder: {
      type: String,
      default: 'data:,'
    },
    srcset: {
      type: String,
      default: null
    },
    intersectionOptions: {
      type: Object,
      default: () => ({})
    },
    usePicture: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'intersect',
    'load',
    'error'
  ],
  data() {
    return {
      observer: null,
      intersected: false,
      loaded: false
    }
  },
  computed: {
    srcImage () {
      return this.intersected && this.src ? this.src : this.srcPlaceholder
    },
    srcsetImage () {
      return this.intersected && this.srcset ? this.srcset : false
    }
  },
  mounted () {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(entries => {
        const image = entries[0]

        if (image.isIntersecting) {
          this.intersected = true
          this.observer.disconnect()
          this.$emit('intersect')
        }
      }, this.intersectionOptions)

      this.observer.observe(this.$el)
    }
  },
  unmounted () {
    if ('IntersectionObserver' in window) {
      this.observer.disconnect()
    }
  },
  methods: {
    load () {
      if (this.$el.getAttribute('src') !== this.srcPlaceholder) {
        this.loaded = true
        this.$emit('load')
      }
    },
    error () {
      this.$emit('error', this.$el)
    }
  },
  render () {
    const img = h('img', {
      ...this.$attrs,
      src: this.srcImage ? this.srcImage : null,
      srcset: this.srcsetImage ? this.srcsetImage : null,
      class: {
        [this.$attrs.class]: true,
        'v-lazy-image': true,
        'v-lazy-image-loaded': this.loaded
      },
      onLoad: this.load,
      onError: this.error
    })

    if (this.usePicture) {
      return h(
        'picture',
        { onLoad: this.load },
        this.intersected ? [this.$slots.default(), img] : [img]
      )
    }

    return img
  }
}
</script>
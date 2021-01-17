<script>
export default {
  props: {
    initial: {
      type: String,
      required: true,
      default: null
    }
  },
  data () {
    return {
      active: null,
    }
  },
  created () {
    this.active = this.initial
  },
  methods: {
    show (payload) {
      this.active = payload
    }
  },
  render () {
    return this.$scopedSlots.default({
      active: this.active,
      show: this.show
    })
  }
}
</script>
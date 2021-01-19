<script>
export default {
  props: {
    addresses: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      visibleForm: false,
      currentlyEditedAddress: null
    }
  },
  methods: {
    showForm () {
      this.visibleForm = true
    },
    editAddress (id) {
      this.showForm()
      this.currentlyEditedAddress = this.addresses.find(el => el.id === id)
      this.scrollFormIntoView()
    },
    cancelEdit () {
      this.visibleForm = false
      this.currentlyEditedAddress = null
      this.scrollFormIntoView()
    },
    scrollFormIntoView () {
      // screen-lg
      if (this.$screen.width < 1024) {
        document.querySelector('.address-form').scrollIntoView({ behavior: 'smooth' })
      }
    }
  },
  render () {
    return this.$scopedSlots.default({
      currentlyEditedAddress: this.currentlyEditedAddress,
      visibleForm: this.visibleForm,
      showForm: this.showForm,
      editAddress: this.editAddress,
      cancelEdit: this.cancelEdit
    })
  }
}
</script>
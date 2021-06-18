<script>
import { ref, toRef } from 'vue'

export default {
  props: {
    addresses: {
      type: Array,
      default: null
    }
  },
  setup (props, { slots }) {
    const addresses = toRef(props, 'addresses')
    const visibleForm = ref(false)
    const currentlyEditedAddress = ref(null)

    const showForm = () => visibleForm.value = true

    const editAddress = (id) => {
      visibleForm.value = true
      currentlyEditedAddress.value = addresses.value.find(el => el.id === id)
      scrollFormIntoView()
    }

    const cancelEdit = () => {
      visibleForm.value = false
      currentlyEditedAddress.value = null
      scrollFormIntoView()
    }

    const scrollFormIntoView = () => {
      // smaller than screen-lg
      if (window.matchMedia('(max-width: 1023px)').matches) {
        document.querySelector('.address-form').scrollIntoView({ behavior: 'smooth' })
      }
    }

    return () => slots.default({
      visibleForm: visibleForm.value,
      currentlyEditedAddress: currentlyEditedAddress.value,
      showForm,
      editAddress,
      cancelEdit
    })
  }
}
</script>
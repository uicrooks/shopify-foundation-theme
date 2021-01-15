export default {
  methods: {
    appendParameter ({ parameter }, $event) {
      const url = new URL(window.location)
      url.searchParams.set(parameter, $event.target.value)

      window.location = url
    }
  }
}
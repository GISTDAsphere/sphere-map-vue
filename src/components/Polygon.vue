<script setup>
import { onUnmounted, inject } from 'vue'
import { useGeometryProps, useGeometryOptions } from '../composables/geometry.js'

let map = null
let overlay = null
const mapReady = inject('mapReady', null)
const emit = defineEmits(['add'])
const props = defineProps(useGeometryProps())

function addOverlay(location, options) {
  overlay = new window.sphere.Polygon(location, options)
  map?.Overlays.add(overlay)
  emit('add', overlay)
}

(() => {
  if (mapReady === null) {
    console.error('sphere Map Vue: Gistda sphere Map component is not ready')
    return
  }
  mapReady
  .then((obj) => {
    map = obj
    if (!props.location) {
      console.error('sphere Map Vue: Invalid polygon location')
      return
    }
    addOverlay(props.location, useGeometryOptions(props))
  })
  .catch((reason) => {
    console.error(reason)
  })
})()

onUnmounted(() => {
  map?.Overlays.remove(overlay)
})
</script>
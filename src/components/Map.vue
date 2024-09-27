<script setup>
import { ref, onMounted, provide } from 'vue'
import manager from '../manager'
manager.loadScript()

const props = defineProps({
  projection: {
    type: String,
    default: null
  },
  layer: {
    type: Array,
    default: null
  },
  zoom: {
    type: Number,
    default: null
  },
  zoomRange: {
    type: Object,
    default: null
  },
  location: {
    type: Object,
    default: null
  },
  ui: {
    type: String,
    default: null
  },
  input: {
    type: Boolean,
    default: null
  },
  autoResize: {
    type: Boolean,
    default: null
  },
  lastView: {
    type: Boolean,
    default: null
  },
  smoothZoom: {
    type: Boolean,
    default: null
  },
  language: {
    type: String,
    default: null
  }
})

let map = null
let isMapReady = false
const placeholder = ref(null)
const mapReady = new Promise((resolve, reject) => {
  (function check(times = 0) {
    if (isMapReady) {
      resolve(map)
      return
    } else if (times === 30000) {
      reject('sphere Map Vue: Cannot create sphere Map instance')
      return
    }
    setTimeout(() => {
      check(times)
    }, 10)
    times += 10
  })()
})
const emit = defineEmits(['load'])
provide('mapReady', mapReady)

function initSphereMap() {
  if (typeof window.sphere !== 'object') {
    console.error('sphere Map Vue: sphere Map API is not found')
    return
  }
  let options = getMapOptions()
  options.placeholder = placeholder.value
  map = new window.sphere.Map(options)
  if (options.zoomRange) {
    map.zoomRange(options.zoomRange)
  }
  map.Event.bind('ready', () => {
    isMapReady = true
    emit('load', map)
  })
}

function getMapOptions () {
  const options = {}
  for (const key in props) {
    if (props[key] !== null) {
      if (key === 'projection') {
        options.projection = window.sphere.Projections[props.projection]
      } else if (key === 'layer') {
        options.layer = getLayers(props.layer)
      } else if (key === 'ui') {
        options.ui = window.sphere.UiComponent[props.ui]
      } else {
        options[key] = props[key]
      }
    }
  }
  return options
}

function getLayers (layers) {
  let result = []
  for (let layer of layers) {
    result.push(window.sphere.Layers[layer])
  }
  return result
}

onMounted(() => {
  manager.scriptReady.then(() => {
    initSphereMap()
  })
})
</script>


<template>
  <div>
    <div style="width: 100%; height: 100%;" ref="placeholder">
      <slot></slot>
    </div>
  </div>
</template>
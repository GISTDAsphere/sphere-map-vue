<script setup>
import { onUnmounted, inject } from "vue";
let map = null;
let marker = null;
const mapReady = inject("mapReady", null);
const emit = defineEmits(["add"]);

const props = defineProps({
  location: {
    type: Object,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  icon: {
    type: Object,
    default: null,
  },
  detail: {
    type: String,
    default: null,
  },
  popup: {
    type: Object,
    default: null,
  },
  visibleRange: {
    type: Object,
    default: null,
  },
  clickable: {
    type: Boolean,
    default: null,
  },
  draggable: {
    type: Boolean,
    default: null,
  },
  weight: {
    type: String,
    default: null,
  },
  rotate: {
    type: Number,
    default: null,
  },
  iconStyle: {
    type: String,
    default: null,
  },
});

function getMarkerOptions() {
  const options = {};
  for (const key in props) {
    if (props[key] !== null) {
      if (key === "weight") {
        let weightVal = window.sphere.OverlayWeight[props.weight];
        if (weightVal) {
          options.weight = weightVal;
        }
      } else if (key === "iconStyle") {
        options.style = props.iconStyle;
      } else {
        options[key] = props[key];
      }
    }
  }
  return options;
}

function addMarker(location, options) {
  marker = new window.sphere.Marker(location, options);
  map?.Overlays.add(marker);
  emit("add", marker);
}

(() => {
  if (mapReady === null) {
    console.error("sphere Map Vue: sphere Map component is not ready");
    returnw;
  }
  mapReady
    .then((obj) => {
      map = obj;
      if (
        !props.location ||
        isNaN(props.location.lat) ||
        isNaN(props.location.lon)
      ) {
        console.error("sphere Map Vue: Invalid marker location");
        return;
      }
      addMarker(props.location, getMarkerOptions());
    })
    .catch((reason) => {
      console.error(reason);
    });
})();

onUnmounted(() => {
  map?.Overlays.remove(marker);
});
</script>

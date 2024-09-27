import manager from './manager'

import SphereMap from './components/Map.vue'
import SphereMapMarker from './components/Marker.vue'
import SphereMapPolyline from './components/Polyline.vue'
import SphereMapPolygon from './components/Polygon.vue'
import SphereMapCircle from './components/Circle.vue'
import SphereMapDot from './components/Dot.vue'
import SphereMapRectangle from './components/Rectangle.vue'

const SphereMapLoad = (load) => {
    manager.prepare(load)
}

export default {
    install (Vue, options) {
        if (options.load) {
            SphereMapLoad(options.load)
        }
        Vue.component('SphereMap', SphereMap)
        Vue.component('SphereMapMarker', SphereMapMarker)
        Vue.component('SphereMapPolyline', SphereMapPolyline)
        Vue.component('SphereMapPolygon', SphereMapPolygon)
        Vue.component('SphereMapCircle', SphereMapCircle)
        Vue.component('SphereMapDot', SphereMapDot)
        Vue.component('SphereMapRectangle', SphereMapRectangle)
    }
}

export {
    SphereMapLoad,
    SphereMap,
    SphereMapMarker,
    SphereMapPolyline,
    SphereMapPolygon,
    SphereMapCircle,
    SphereMapDot,
    SphereMapRectangle
}
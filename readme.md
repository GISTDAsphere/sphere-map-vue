
# GISTDA sphere Map VueJS

  

![](https://sphere.gistda.or.th/img/logo-sphere.png)


## Installation
You can easily install by using `npm`
```cli
npm i sphere-map-vue
```

## Usage
First, you need to get a [sphere Map API key](https://sphere.gistda.or.th/dashboard). Then, after you have sphere Map API key and component installed, you need to register it to your Vue project.

There are two ways of registering component:

### Register component globally
This is a recommended way of registering component

In your `main.js` or similar file:
```js
import  { createApp }  from  'vue'
import SphereMap from  'sphere-map-vue'
import App from  './App.vue'
import router from  './router'

createApp(App).use(router)
.use(SphereMap,  {
       load:  {
		apiKey:  'YOUR_SPHERE_MAP_API_KEY',
       }
})
.mount('#app')
```
Then you can use `<sphere-map />` in your component template.
```html
<template>
  <sphere-map />
</template>
```

### Register component locally
In your component file, for example `Foo.vue`:
```html
<script setup>
import { SphereMapLoad, SphereMap } from 'sphere-map-vue'

SphereMapLoad({
  apiKey: 'YOUR_SPHERE_MAP_API_KEY',
})
</script>

<template>
  <sphere-map />
</template>
```
You can import more components if you want, for example:

```js
import { SphereMapLoad, SphereMap, SphereMapMarker, SphereMapPolyline } from 'sphere-map-vue'
```

## Examples
Add a polygon to sphere Map:

```html
<script setup>
const locationList = [
  { lon: 99, lat: 14 },
  { lon: 100, lat: 13 },
  { lon: 102, lat: 13 },
  { lon: 103, lat: 14 }
]
</script>

<template>
  <sphere-map>
    <sphere-map-polygon
      :location="locationList"
      :lineWidth="2"
      :lineColor="'rgba(0, 0, 0, 1)'"
      :fillColor="'rgba(255, 0, 0, 0.4)'"
    />
  </sphere-map>
</template>
```

Add multiple markers to sphere Map:

```html
<template>
  <sphere-map :zoom="10" :last-view="false">
    <sphere-map-marker
      v-for="(item, i) in markers"
      :key="i"
      :location="item.location"
      :title="item.title"
      :detail="item.detail"
    />
  </sphere-map>
</template>
```

Using sphere Map object:

```html
<script setup>
function loadMap(map) {
  map.Layers.setBase(sphere.Layers.NORMAL)
}
function addMarker(marker) {
  console.log(marker.location())
}
</script>

<template>
  <sphere-map @load="loadMap">
    <sphere-map-marker @add="addMarker" :location="{ lon: 99, lat: 14 }" />
  </sphere-map>
</template>
```

## Components
* [sphere-map](#map)
* [sphere-map-marker](#overlay)
* [sphere-map-dot](#geometry)
* [sphere-map-circle](#geometry)
* [sphere-map-rectangle](#geometry)
* [sphere-map-polyline](#geometry)
* [sphere-map-polycurve](#geometry)
* [sphere-map-polygon](#geometry)

### Map
- [Props](https://api.sphere.gistda.or.th/map/doc.html#MapOptions)
- Event: `@load="Function(object)"`
```html
<sphere-map :zoom="10" :last-view="false" />
```

### Overlay
- [Props](https://api.sphere.gistda.or.th/map/doc.html#MarkerOptions)
- Event: `@add="Function(object)"`
```html
<sphere-map>
  <sphere-map-marker :location="{ lon: 99, lat: 14 }" :title="'Home'" :detail="'My home'" />
</sphere-map>
```

### Geometry
`sphere-map-dot`, `sphere-map-circle`, `sphere-map-rectangle`, `sphere-map-polyline`,`sphere-map-polygon`

- [Props](https://api.sphere.gistda.or.th/map/doc.html#GeometryOptions)
- Event: `@add="Function(object)"`
```html
<sphere-map>
  <sphere-map-polygon
    :location="[{ lon: 100.123, lat: 13.579 }, ...]"
    :lineWidth="2"
    :lineColor="'rgba(0, 0, 0, 1)'"
    :fillColor="'rgba(255, 0, 0, 0.4)'"
  />
</sphere-map>
```

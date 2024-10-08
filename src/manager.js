const SPHERE_MAP_SRC = "https://api.sphere.gistda.or.th/map/";

const manager = {
  apiKey: null,
  src: null,
  debug: false,
  loaded: null,
  scriptReady: null,
  prepare: function ({ apiKey = null, src = null, debug = false, loaded = null }) {
    if (typeof window === 'undefined') {
			return
		}
    if (window.sphere) {
      console.warn('sphere Map Vue: sphere Map API is already loaded')
      return
    }

    this.apiKey = apiKey
    this.src = src ? src : SPHERE_MAP_SRC
    this.debug = debug
    this.loaded = loaded
  },
	loadScript: function() {
    if (this.scriptReady !== null) {
      return
    }

    let url = this.src
    let params = {}
    if (this.apiKey) {
      params['key'] = this.apiKey
    }
    if (this.debug) {
      params['debug'] = true
    }
    const query = new URLSearchParams(params)
    if (query) {
      url += `?${query}`
    }

		this.scriptReady = new Promise((resolve, reject) => {
			let script = document.createElement('script')
			script.onload = () => {
        if (this.loaded && typeof this.loaded === 'function') {
          this.loaded(window.sphere)
        }
				resolve()
			}
			script.onerror = () => {
				reject()
			}
			script.async = true
			script.src = url
			document.body.appendChild(script)
		})
  },
}

export default manager
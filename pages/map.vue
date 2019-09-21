<template>
  <div class="d-flex flex-row Map">
    <div class="results">
      <MapSearch></MapSearch>
    </div>
    <div class="flex-fill map">
      <no-ssr>
        <l-map :zoom="map.zoom" :center="map.center" ref="map">
          <l-tile-layer :url="tileUrl"></l-tile-layer>
        </l-map>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import MapSearch from "~/components/MapSearch.vue";

export default {
  components: {
    MapSearch
  },
  mounted() {
    const checkMapObject = setInterval(() => {
      if (!this.$refs.map) return;
      const map = this.$refs.map.mapObject;

      map.on("dragend", () => {
        const center = map.getCenter();
        this.$store.dispatch("map/setMapState", {
          zoom: map.getZoom(),
          center: [center.lat, center.lng]
        });
      });

      clearInterval(checkMapObject);
    }, 100);
  },
  computed: {
    tileUrl() {
      const lang = this.$i18n.locale || "local";
      return `https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=${lang}`;
    },
    ...mapState(["map"])
  }
};
</script>

<style scoped>
.Map {
  height: calc(100vh - 56px);
}

.results {
  width: 300px;
}
</style>


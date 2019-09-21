<template>
  <div class="d-flex justify-content-center align-items-center img-thumbnail" v-if="filePath">
    <img :src="filePath" alt="Image" class="img-main" />
    <img :src="filePath" alt="Image" class="img-background" />
  </div>
  <div v-else>no img :(</div>
</template>

<script>
import { simplify } from "wikidata-sdk";

export default {
  props: ["id", "prop"],
  computed: {
    filePath() {
      const entity = this.$store.state.data.entities[this.id];
      if (!entity) {
        return undefined;
      }

      const params = {
        keepIds: true,
        keepTypes: true,
        keepRichValues: true
      };

      const values = simplify.propertyClaims(entity.claims[this.prop], params);
      if (values[0] && values[0].type === "commonsMedia") {
        const name = encodeURIComponent(values[0].value);
        return `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${name}&width=500&height=500`;
      }

      return false;
    }
  }
};
</script>

<style scoped>
.img-thumbnail {
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 500px;

  border: 0;
  border-radius: 0;
}

.img-main {
  z-index: 1;
}

.img-background {
  position: absolute;
  filter: blur(10px);
  opacity: 0.5;
  width: 500px;
  height: 500px;
}
</style>


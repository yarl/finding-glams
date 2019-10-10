<template>
  <div class="row mt-4 property" :class="[!values.length && !mandatory ? 'd-none' : '']">
    <div class="col-md-1"></div>
    <div class="col-md-5 pb-2 property__name" v-if="propertyName">{{ propertyName }} ({{ prop }})</div>
    <div class="col-md-5 pb-2 property__name--placeholder" v-else>
      <content-placeholders>
        <content-placeholders-text :lines="1" />
      </content-placeholders>
    </div>

    <div class="col-md-6 property__value" v-if="values.length">
      <Value v-for="value in values" :key="value.id" :value="value" :property="prop" :link="link"></Value>
    </div>
    <div class="col-md-6 property__value--no-data" v-else>
      <em>no data</em>
    </div>
  </div>
</template>

<script>
import { simplify } from "wikidata-sdk";
import { mapState } from "vuex";

import Value from "~/components/Value.vue";

export default {
  props: ["id", "prop", "link", "mandatory"],
  components: {
    Value
  },
  computed: {
    propertyName() {
      const property = this.$store.state.data.entities[this.prop];
      if (!property) {
        return undefined;
      }

      const lang = this.$i18n.locale;
      const label = property.labels[lang];
      return label ? label.value : property.labels.en.value;
    },
    values() {
      const entity = this.$store.state.data.entities[this.id];
      if (!entity) {
        return [];
      }

      const params = {
        keepIds: true,
        keepTypes: true,
        keepRichValues: true,
        keepQualifiers: true,
        keepReferences: true
      };
      return simplify.propertyClaims(entity.claims[this.prop], params);
    },
    ...mapState(["edit"])
  }
};
</script>

<style scoped>
.property__name {
  font-weight: 500;
}
</style>

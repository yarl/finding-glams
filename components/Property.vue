<template>
  <div class="row mt-4">
    <div class="col-sm"></div>
    <div class="col-sm" v-if="propertyName">{{ propertyName }} ({{ prop }})</div>
    <div class="col-sm" v-else>
      <content-placeholders>
        <content-placeholders-text :lines="1" />
      </content-placeholders>
    </div>
    <div class="col-sm" v-if="values.length">
      <Value v-for="value in values" :key="value.id" :value="value" :link="link"></Value>
    </div>
    <div class="col-sm" v-else>
      <em>no data</em>
    </div>
  </div>
</template>

<script>
import { simplify } from "wikidata-sdk";

import Value from "~/components/Value.vue";

export default {
  props: ["id", "prop", "link"],
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
        keepRichValues: true
      };
      return simplify.propertyClaims(entity.claims[this.prop], params);
    }
  }
};
</script>

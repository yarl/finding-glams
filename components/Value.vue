<template>
  <div v-if="valueName">
    <span v-if="value.type === 'wikibase-item'">
      <nuxt-link
        v-if="link"
        :to="localePath({ name: 'monument-id', params: { id: value.value } })"
      >{{ valueName }} ({{ value.value }})</nuxt-link>
      <span v-else>{{ valueName }} ({{ value.value }})</span>
    </span>
    <span v-else-if="value.type === 'monolingualtext'">{{ valueName }}</span>
    <span v-else-if="value.type === 'globe-coordinate'">{{ value.value.join(" ") }}</span>
    <span v-else>{{ value }}</span>
  </div>
  <div v-else>
    <content-placeholders>
      <content-placeholders-text :lines="1" />
    </content-placeholders>
  </div>
</template>

<script>
export default {
  props: ["value", "link"],
  computed: {
    valueName() {
      if (!this.value || !this.value.type) {
        return "";
      }
      const lang = this.$i18n.locale;

      if (this.value.type === "monolingualtext") {
        const value = this.value.value;
        return `${value.text} (${value.language})`;
      }

      if (this.value.type === "wikibase-item") {
        const entity = this.$store.state.data.entities[this.value.value];
        if (!entity) {
          return undefined;
        }

        const label = entity.labels[lang];
        return label ? label.value : entity.labels.en.value;
      }

      return this.value;
    }
  }
};
</script>

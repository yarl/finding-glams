<template>
  <div class="pb-1" v-if="valueName">
    <span v-if="value.type === 'wikibase-item'">
      <nuxt-link
        v-if="link"
        :to="localePath({ name: 'institution-id', params: { id: value.value } })"
      >{{ valueName }} ({{ value.value }})</nuxt-link>
      <span v-else>{{ valueName }} ({{ value.value }})</span>
    </span>
    <span v-else-if="value.type === 'url'">
      <a :href="value.value">{{ valueName }}</a>
    </span>
    <span v-else-if="value.type === 'external-id'">
      <a :href="valueName">{{ value.value }}</a>
    </span>
    <span v-else>{{ valueName }}</span>

    <div class="ml-2" v-if="hasQualifiers">
      <Value
        v-for="qualifier in Object.entries(this.value.qualifiers)"
        :key="qualifier[0]"
        :value="qualifier[1][0]"
      ></Value>
    </div>

    <div v-if="edit.isEdit && editable">
      <vue-bootstrap-typeahead
        class="mb-4"
        v-model="query"
        :data="users"
        :serializer="item => item.login"
        @hit="selectedUser = $event"
        placeholder="Search GitHub Users"
      ></vue-bootstrap-typeahead>

      <h3>Selected User JSON</h3>
      <pre>{{ selectedUser | stringify }}</pre>
    </div>
  </div>
  <div class="pb-1" v-else>
    <content-placeholders>
      <content-placeholders-text :lines="1" />
    </content-placeholders>
  </div>
</template>

<script>
import { mapState } from "vuex";

const computed = {
  valueName() {
    if (!this.value || !this.value.type) {
      return "";
    }
    const lang = this.$i18n.locale;

    if (this.value.type === "monolingualtext") {
      const value = this.value.value;
      return `${value.text} (${value.language})`;
    }

    if (this.value.type === "string") {
      const value = this.value.value;
      return value;
    }

    if (this.value.type === "time") {
      const value = this.value.value;
      return value;
    }

    if (this.value.type === "globe-coordinate") {
      const value = this.value.value.join(" ");
      return value;
    }

    if (this.value.type === "wikibase-item") {
      const entity = this.$store.state.data.entities[this.value.value];
      if (!entity) {
        return undefined;
      }

      const label = entity.labels[lang] || {};
      const engLabel = entity.labels.en || {};

      return label.value || engLabel.value || "?";
    }

    if (this.value.type === "url") {
      const value = this.value.value;
      return value.includes("mailto:") ? value.substring(7) : value;
    }

    if (this.value.type === "quantity") {
      return this.value.value.amount;
    }

    if (this.value.type === "external-id") {
      const prefixes = {
        P2013: "https://www.facebook.com/",
        P2003: "https://www.instagram.com/",
        P2002: "https://twitter.com/"
      };
      return `${prefixes[this.property]}${this.value.value}`;
    }

    return this.value;
  },
  hasQualifiers() {
    return false;
    /*
    if (!this.value || !this.value.qualifiers) {
      return false;
    }
    return Object.keys(this.value.qualifiers).length;
    */
  },
  ...mapState(["edit"])
};

function data() {
  return {
    query: "",
    selectedUser: null,
    users: []
  };
}

const filters = {
  stringify(value) {
    return JSON.stringify(value, null, 2);
  }
};

const props = ["property", "value", "link", "editable"];

const watch = {
  // When the query value changes, fetch new results from
  // the API - in practice this action should be debounced
  query(newQuery) {
    axios.get(`https://api.github.com/search/users?q=${newQuery}`).then(res => {
      this.users = res.data.items;
    });
  }
};

export default {
  computed,
  data,
  filters,
  props,
  watch
};
</script>

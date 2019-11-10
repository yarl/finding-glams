<template>
  <div class="pb-1 value" v-if="valueName">
    <div class="d-flex flex-column" v-if="edit.isEdit && editable">
      <input
        class="p-1 mb-1"
        v-model="editing.value"
        :placeholder="propertyName"
        @blur="onValueBlur()"
      />
      <small class="pl-1 mb-2 text-muted">{{ editHint }}</small>
      <input
        class="p-1"
        type="url"
        v-model="editing.source"
        placeholder="source URL"
        @blur="onValueBlur()"
      />
    </div>
    <div v-else>
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
        <a :href="valueUrl">{{ valueName }}</a>
      </span>
      <span v-else>{{ valueName }}</span>

      <div class="ml-2" v-if="hasQualifiers">
        <Value
          v-for="qualifier in Object.entries(this.value.qualifiers)"
          :key="qualifier[0]"
          :value="qualifier[1][0]"
        ></Value>
      </div>
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
  propertyName() {
    const property = this.$store.state.data.entities[this.property];
    if (!property) {
      return undefined;
    }

    const lang = this.$i18n.locale;
    const label = property.labels[lang];
    return label ? label.value : property.labels.en.value;
  },
  valueName() {
    if (!this.value) {
      return "";
    }
    if (!this.value.type) {
      return "–";
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

    if (this.value.type === "external-id") {
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

    return this.value;
  },
  valueUrl() {
    if (!this.value || !this.value.type) {
      return "";
    }

    if (this.value.type === "external-id") {
      const prefixes = {
        P2013: "https://www.facebook.com/",
        P2003: "https://www.instagram.com/",
        P2002: "https://twitter.com/"
      };
      return `${prefixes[this.property]}${this.value.value}`;
    }
  },
  editHint() {
    return "hint text";
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
    editing: {
      value: "",
      source: ""
    },
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

const methods = {
  onValueBlur() {
    const pageId = this.$route.params.id;
    const claimId = this.value.id || `${this.property}`;
    const isEqual = this.editing.value === this.valueName;

    // value reverted to original one
    if (
      isEqual &&
      this.edit.edits[pageId] &&
      this.edit.edits[pageId].find(edit => edit.claimId === claimId)
    ) {
      this.$store.dispatch("edit/removeEdit", {
        pageId,
        claimId
      });
    }

    // values are equal, ignore change
    if (isEqual) {
      return;
    }

    // value is changed
    this.$store.dispatch("edit/addEdit", {
      pageId,
      claimId,
      property: this.property,
      value: this.editing.value,
      source: this.editing.source
    });

    /*     console.log(this.value.id);
    console.log(this.$route.params.id);
    console.log(this.property, this.editing.value, this.editing.source); */
  }
};

function mounted() {
  this.editing.value = this.valueName === "–" ? "" : this.valueName;
}

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
  methods,
  mounted,
  props,
  watch
};
</script>

<style scoped>
input:focus {
  outline: 2px solid #096;
}
</style>
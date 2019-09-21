<template>
  <form id="search" @submit="search">
    <div class="d-flex flex-column align-items-center form-group">
      <label class="h5 mb-3">{{$t('search_first_line')}}</label>
      <input
        type="text"
        class="form-control search-input"
        v-model="text"
        :placeholder="$t('search_placeholder')"
      />
      <small class="form-text">{{$t('search_data_disclaimer')}}</small>
    </div>
  </form>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: function() {
    return {
      text: "bazylika kraków"
    };
  },
  methods: {
    search(e) {
      const { text } = this;
      this.$store.dispatch("search/searchText", text);
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
.search-input {
  width: 80vw;
  max-width: 500px;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
}

.search-input::placeholder {
  color: #888;
}
</style>
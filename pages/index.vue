<template>
  <div class="d-flex flex-column">
    <div
      class="d-flex flex-column justify-content-center align-items-center hero"
      :class="{ 'hero--short': !search.isPristine }"
    >
      <img class="hero__logo" src="~assets/wlm-logo.png" alt="Wiki Loves Monuments logo" />
      <div class="hero__search">
        <Search />
      </div>
    </div>
    <div class="container mt-5">
      <div v-if="search.isPristine">Pusto</div>
      <div v-else>
        <div v-if="!search.isBusy">
          <h3>
            Results for
            <em>{{ search.searchText || "?" }} ({{ search.results.length }})</em>
          </h3>
          <div class="d-flex flex-wrap results">
            <div
              class="mb-2 mr-2 card"
              v-for="result in search.results"
              :key="result.title"
              style="width: 18rem;"
            >
              <img
                :src="`https://commons.wikimedia.org/wiki/Special:Redirect/file/${getProperty(result.title, 'P18')}`"
                class="card-img-top"
                v-if="false && getProperty(result.title, 'P18')"
              />
              <div class="card-body">
                <h5 class="card-title">
                  <nuxt-link
                    :to="localePath({ name: 'monument-id', params: { id: result.title } })"
                  >
                    <span v-html="result.titlesnippet"></span>
                  </nuxt-link>
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">{{result.title}}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="container mt-5" v-else>
          <h4>Searching...</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wdk from "wikidata-sdk";

import Logo from "~/components/Logo.vue";
import Search from "~/components/Search.vue";

import { mapState } from "vuex";

export default {
  components: {
    Logo,
    Search
  },
  methods: {
    getProperty(id, property) {
      // console.log("getProperty", id, property);
      const entity = this.$store.state.data.entities[id];

      if (!entity || !entity.claims[property]) return false;
      // console.log(wdk.simplify.claim(entity.claims[property][0]));
      return wdk.simplify.claim(entity.claims[property][0]);
    }
  },
  computed: {
    ...mapState(["search"])
  }
};
</script>

<style scoped>
.container {
  color: #35495e;
}

.hero {
  position: relative;
  height: 500px;
  width: 100vw;
  background: url(~assets/hero-background.jpg);
  background-position: 50%;
  background-size: cover;
  color: white;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

.hero--short {
  height: 220px;
}

.hero--short .hero__logo {
  height: 40px;
}

.hero--short .hero__search {
  margin-top: 1rem;
}

.hero:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 1;
  width: 100vw;
  height: 100%;
  opacity: 0.5;
  background: linear-gradient(135deg, #c4c5a6 10%, #900 75%);
}

.hero__logo {
  height: 77px;
}

.hero__search {
  margin-top: 3rem;
}

.hero > * {
  z-index: 2;
}

.links {
  padding-top: 15px;
}
</style>

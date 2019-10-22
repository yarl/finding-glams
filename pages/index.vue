<template>
  <div class="d-flex flex-column">
    <div
      class="d-flex flex-column justify-content-center align-items-center hero"
      :class="{ 'hero--short': !search.isPristine }"
    >
      <h1 class="my-0">Finding GLAMs</h1>
      <div class="hero__search">
        <Search />
      </div>
    </div>
    <div class="container mt-5">
      <div
        v-if="search.isPristine"
      >Wikimedia Sverige (Sweden), UNESCO and the Wikimedia Foundation are working to build a truly worldwide database of cultural heritage institutions and their collections on Wikipedia, the largest and most popular educational site in the world. We will empower cultural organisations to share their knowledge and content with the world through collaboration, training, documentation and case studies. The project will lay the groundwork for long term and sustainable collaboration between cultural organisations and the Wikimedia movement (the organisations behind Wikipedia and other free educational websites).</div>
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
                    :to="localePath({ name: 'institution-id', params: { id: result.title } })"
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

const components = {
  Logo,
  Search
};

const computed = {
  ...mapState(["search"])
};

function head() {
  return {
    title: "FindingGLAMs"
  };
}

const methods = {
  getProperty(id, property) {
    // console.log("getProperty", id, property);
    const entity = this.$store.state.data.entities[id];

    if (!entity || !entity.claims[property]) return false;
    // console.log(wdk.simplify.claim(entity.claims[property][0]));
    return wdk.simplify.claim(entity.claims[property][0]);
  }
};

export default {
  components,
  computed,
  head,
  methods
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
  background: linear-gradient(135deg, #c4c5a6 10%, #009966 75%);
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

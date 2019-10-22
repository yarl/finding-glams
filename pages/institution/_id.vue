<template>
  <div class="my-4 container institution">
    <div v-if="monument">
      <h1>{{ label }}</h1>
      <h4>
        <a :href="`https://www.wikidata.org/wiki/${id}`" target="_blank">{{ id }}</a>
      </h4>
      <div class="d-none">
        <MainImage :id="id" prop="P18"></MainImage>
      </div>
      <button @click="toggleEdit()">edit {{ edit.isEdit }}</button>
      <div class="mt-4 institution__details">
        <h4 class="mt-4">{{$t('institution_general_data')}}</h4>
        <Property :id="id" prop="P31" :mandatory="true"></Property>
        <Property :id="id" prop="P527" link="true"></Property>
        <Property :id="id" prop="P361" link="true"></Property>
        <Property :id="id" prop="P463" link="true"></Property>

        <h4 class="mt-4">{{$t('institution_address_details')}}</h4>
        <Property :id="id" prop="P131" :mandatory="true"></Property>
        <Property :id="id" prop="P6375" :mandatory="true"></Property>
        <Property :id="id" prop="P159"></Property>
        <Property :id="id" prop="P625"></Property>

        <h4 class="mt-4">{{$t('institution_contact_details')}}</h4>
        <Property :id="id" prop="P856" :mandatory="true" :editable="true"></Property>
        <Property :id="id" prop="P968" :mandatory="true" :editable="true"></Property>
        <Property :id="id" prop="P1329" :mandatory="true" :editable="true"></Property>

        <h4 class="mt-4">{{$t('institution_social_media')}}</h4>
        <Property :id="id" prop="P2013" :mandatory="true" :editable="true"></Property>
        <Property :id="id" prop="P2002" :mandatory="true" :editable="true"></Property>
        <Property :id="id" prop="P2003" :mandatory="true" :editable="true"></Property>

        <h4 class="mt-4">{{$t('institution_details')}}</h4>
        <Property :id="id" prop="P1037"></Property>
        <Property :id="id" prop="P1174"></Property>
        <Property :id="id" prop="P1436"></Property>
      </div>
    </div>
    <div v-else>No data</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { fetchEntities } from "~/utils/search";

import Property from "~/components/Property";
import MainImage from "~/components/MainImage";

const propList = [
  "P31",
  "P527",
  "P361",
  "P131",
  "P463",
  "P6375",
  "P159",
  "P625",
  "P856",
  "P968",
  "P1329",
  "P2013",
  "P2002",
  "P2003",
  "P1037",
  "P1174",
  "P1436"
];

async function asyncData({ params, store }) {
  const { id } = params;
  const isPropList = false;
  const isEntity = store.state.data.entities[id];

  if (!isPropList) {
    await store.dispatch("data/addEntitiesById", propList);
  }
  if (!isEntity) {
    await store.dispatch("data/addEntityById", id);
    await store.dispatch("data/addEntityDeep", store.state.data.entities[id]);
  }
  if (isEntity && !isEntity.deep) {
    await store.dispatch("data/addEntityDeep", isEntity);
  }
}

const components = {
  Property,
  MainImage
};

const computed = {
  monument() {
    return this.$store.state.data.entities[this.id] || {};
  },
  id() {
    return this.$route.params.id;
  },
  label() {
    const { locale } = this.$i18n;
    return this.monument.labels[locale]
      ? this.monument.labels[locale].value
      : "?";
  },
  ...mapState(["edit"])
};

function head() {
  return {
    title: this.label
  };
}

const methods = {
  ...mapActions({
    toggleEdit: "edit/toggleEdit"
  })
};

async function mounted() {
  /*
  const { id } = this;
  const store = this.$store;
  const isPropList = false;
  const isEntity = store.state.data.entities[id];

  if (!isPropList) {
    await store.dispatch("data/addEntitiesById", propList);
  }
  if (!isEntity) {
    console.log(id, isEntity);
    await store.dispatch("data/addEntityById", id);
  }

  const entity = this.$store.state.data.entities[this.id];
  // this.$store.dispatch("data/addEntitiesById", propList);

  if (!entity && !this.asyncData) {
    this.$store.dispatch("data/addEntityById", this.id);
    this.$store.dispatch("data/addEntitiesById", ["P6375"]);
  } else if (!entity && this.asyncData) {
    this.$store.dispatch("data/addEntity", this.asyncData);
    this.$store.dispatch("data/addEntitiesById", ["P6375"]);
  } else {
    this.$store.dispatch("data/addEntity", entity);
  }
  */
}

export default {
  asyncData,
  components,
  computed,
  head,
  methods
  // mounted
};
</script>

<style scoped>
.institution__details {
  border-top: 4px solid #096;
}
</style>
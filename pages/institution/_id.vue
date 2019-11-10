<template>
  <div class="my-4 container institution" :class="[edit.isEdit ? 'institution--editing' : '']">
    <div v-if="monument">
      <h1>{{ label }}</h1>
      <h4 class="d-flex flex-row">
        <a class="mr-auto" :href="`https://www.wikidata.org/wiki/${id}`" target="_blank">{{ id }}</a>
        <button
          class="btn btn-link"
          :class="[edit.isEdit ? 'd-flex' : 'd-none']"
          @click="saveEdit()"
        >
          <i class="material-icons">save</i>
          <span class="ml-2">Save ({{ edit.edits[id] && edit.edits[id].length || 0 }})</span>
        </button>
        <button class="btn btn-link d-flex" @click="toggleEdit()">
          <i class="material-icons">create</i>
          <span class="ml-2">{{ edit.isEdit ? 'Cancel' : 'Edit' }}</span>
        </button>
      </h4>
      <div class="d-none">
        <MainImage :id="id" prop="P18"></MainImage>
      </div>
      <div>{{ edit.edits[id] && edit.edits[id].length }}</div>
      <div>{{ edit.edits[id] }}</div>
      <div class="mt-4 institution__details">
        <div class="px-2 institution__details__general">
          <h4 class="mt-4">{{$t('institution_general_data')}}</h4>
          <Property :id="id" prop="P31" :mandatory="true"></Property>
          <Property :id="id" prop="P527" link="true"></Property>
          <Property :id="id" prop="P361" link="true"></Property>
          <Property :id="id" prop="P463" link="true"></Property>
        </div>
        <div class="px-2 institution__details__address">
          <h4 class="mt-4">{{$t('institution_address_details')}}</h4>
          <Property :id="id" prop="P131" :mandatory="true"></Property>
          <Property :id="id" prop="P6375" :mandatory="true"></Property>
          <Property :id="id" prop="P159"></Property>
          <Property :id="id" prop="P625"></Property>
        </div>
        <div class="px-2 institution__details__contact">
          <h4 class="mt-4">{{$t('institution_contact_details')}}</h4>
          <Property :id="id" prop="P856" :mandatory="true" :editable="true"></Property>
          <Property :id="id" prop="P968" :mandatory="true" :editable="true"></Property>
          <Property :id="id" prop="P1329" :mandatory="true" :editable="true"></Property>
        </div>
        <div class="px-2 institution__details__social-media">
          <h4 class="mt-4">{{$t('institution_social_media')}}</h4>
          <Property :id="id" prop="P2013" :mandatory="true" :editable="true"></Property>
          <Property :id="id" prop="P2002" :mandatory="true" :editable="true"></Property>
          <Property :id="id" prop="P2003" :mandatory="true" :editable="true"></Property>
        </div>
        <div class="px-2 institution__details__details">
          <h4 class="mt-4">{{$t('institution_details')}}</h4>
          <Property :id="id" prop="P1037"></Property>
          <Property :id="id" prop="P1174"></Property>
          <Property :id="id" prop="P1436"></Property>
        </div>
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
    toggleEdit: "edit/toggleEdit",
    saveEdit: "edit/saveEdit"
  })
};

export default {
  asyncData,
  components,
  computed,
  head,
  methods
};
</script>

<style scoped>
.institution--editing {
  background: #eee;
}

.institution--editing .institution__details__contact,
.institution--editing .institution__details__social-media {
  background: white;
}

.institution__details {
  border-top: 4px solid #096;
}
</style>

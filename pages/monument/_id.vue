<template>
  <div class="my-4 container">
    <div v-if="monument">
      <h1>{{ label }}</h1>
      <h4>{{ id }}</h4>
      <MainImage :id="id" prop="P18"></MainImage>
      <div class="mt-4">
        <h4 class="mt-4">{{$t('monument_general_data')}}</h4>
        <Property :id="id" prop="P31"></Property>
        <Property :id="id" prop="P527" link="true"></Property>
        <Property :id="id" prop="P361" link="true"></Property>

        <h4 class="mt-4">{{$t('monument_address_details')}}</h4>
        <Property :id="id" prop="P131"></Property>
        <Property :id="id" prop="P6375"></Property>
        <Property :id="id" prop="P276"></Property>
        <Property :id="id" prop="P625"></Property>

        <h4 class="mt-4">{{$t('monument_technical_details')}}</h4>
        <Property :id="id" prop="P2048"></Property>
        <Property :id="id" prop="P2046"></Property>
        <Property :id="id" prop="P1101"></Property>

        <h4 class="mt-4">{{$t('monument_heritage')}}</h4>
        <Property :id="id" prop="P1435"></Property>
      </div>
    </div>
    <div v-else>No data</div>
  </div>
</template>

<script>
import { fetchEntities } from "~/utils/search";

import Property from "~/components/Property";
import MainImage from "~/components/MainImage";

export default {
  components: {
    Property,
    MainImage
  },
  computed: {
    monument() {
      return this.asyncData || this.$store.state.data.entities[this.id];
    },
    id() {
      return this.$route.params.id;
    },
    label() {
      const { locale } = this.$i18n;
      return this.monument.labels[locale]
        ? this.monument.labels[locale].value
        : "?";
    }
  },
  asyncData({ params }) {
    if (process.server) {
      const { id } = params;
      return fetchEntities([id]).then(response => {
        return { asyncData: response.data.entities[id] };
      });
    }
    return { asyncData: undefined };
  },
  mounted() {
    const entity = this.$store.state.data.entities[this.id];
    this.$store.dispatch("data/addEntitiesById", [
      "P31",
      "P527",
      "P361",
      "P131",
      "P6375",
      "P276",
      "P625",
      "P2048",
      "P2046",
      "P1101",
      "P1435"
    ]);

    if (!entity && !this.asyncData) {
      this.$store.dispatch("data/addEntityById", this.id);
      this.$store.dispatch("data/addEntitiesById", ["P6375"]);
    } else if (!entity && this.asyncData) {
      this.$store.dispatch("data/addEntity", this.asyncData);
      this.$store.dispatch("data/addEntitiesById", ["P6375"]);
    } else {
      this.$store.dispatch("data/addEntity", entity);
    }
  }
};
</script>
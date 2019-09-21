import { simplify } from "wikidata-sdk";

import { fetchEntities } from "~/utils/search";

export const state = () => ({
  entities: {}
});

export const mutations = {
  ADD_ENTITIES(state, entities = {}) {
    state.entities = {
      ...state.entities,
      ...entities
    };
  }
};

export const actions = {
  addEntitiesById({ state, commit, dispatch }, ids = []) {
    const list = ids.filter(item => !state.entities[item]); // get only missing ones
    fetchEntities(list).then(response => {
      commit("ADD_ENTITIES", response.data.entities);
    });
  },
  addEntityById({ commit, dispatch }, id = "") {
    fetchEntities([id]).then(response => {
      dispatch("data/addEntity", response.data.entities[id]);
      // commit("ADD_ENTITIES", response.data.entities);
      // console.log(response.data.entities[id]);
    });
  },
  addEntity({ state, commit, dispatch }, entity = {}) {
    const entities = { [entity.id]: entity };
    commit("ADD_ENTITIES", entities);
    dispatch("addEntitiesById", getIDsList(entity));
  }
};

export function getIDsList(entity = {}) {
  const { claims = [] } = simplify.entity(entity, { keepTypes: true });
  const ids = [];

  Object.values(claims).forEach(values =>
    values
      .filter(value => value.type === "wikibase-item")
      .forEach(value => ids.push(value.value))
  );

  return [...Object.keys(claims), ...ids];
}

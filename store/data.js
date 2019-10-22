import { fetchEntities } from "~/utils/search";
import { getIDsList } from "~/utils/utils";

export const state = () => ({
  entities: {}
});

export const mutations = {
  ADD_ENTITIES(state, entities = {}) {
    state.entities = {
      ...state.entities,
      ...entities
    };
  },
  CHANGE_ENTITY(state, { id, changes }) {
    state.entities[id] = {
      ...state.entities[id],
      ...changes
    };
  }
};

export const actions = {
  async addEntitiesById({ state, commit, dispatch }, ids = []) {
    const list = ids.filter(item => !state.entities[item]); // get only missing ones
    const response = await fetchEntities(list);
    commit("ADD_ENTITIES", response.data.entities);
  },
  async addEntityById({ commit, dispatch }, id = "") {
    const response = await fetchEntities([id]);
    const entity = response.data.entities[id];

    commit("ADD_ENTITIES", {
      [entity.id]: {
        ...entity,
        deep: false
      }
    });
  },
  async addEntityDeep({ state, commit, dispatch }, entity = {}) {
    await dispatch("addEntitiesById", getIDsList(entity));
    commit("CHANGE_ENTITY", { id: entity.id, changes: { deep: true } });
  }
};

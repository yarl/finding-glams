export const state = () => ({
  zoom: 9,
  center: [47.41322, -1.219482],
  list: []
});

export const mutations = {
  add(state, text) {
    state.list.push({
      text: text,
      done: false
    });
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1);
  },
  toggle(state, todo) {
    todo.done = !todo.done;
  },
  SET_MAP_STATE(state, { zoom, center }) {
    state.zoom = zoom;
    state.center = center;
  }
};

export const actions = {
  setMapState({ commit }, data) {
    commit("SET_MAP_STATE", data);
  }
};

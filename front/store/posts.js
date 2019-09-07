export const state = () => ({
  Posts: []
});

export const mutations = {
  addPosts(state, payload) {
    state.Posts.unshift(payload);
  },
  removePosts(state, payload) {
    const index = state.Posts.findIndex(v => v.id === payload.id);
    state.Posts.splice(index, 1);
  }
};

export const actions = {
  addStudy(context, payload) {
    context.commit("addPosts", payload);
  },
  remove(context, payload) {
    context.commit("removePosts", payload);
  }
};

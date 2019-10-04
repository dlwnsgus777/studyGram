export const state = () => ({
  hello: "클릭됨"
});

export const mutations = {
  bye(state) {
    if (state.hello === "클릭됨") {
      state.hello = "클릭안됨";
    } else {
      state.hello = "클릭됨";
    }
  }
};
export const actions = {
   nuxtServerInit({ commit, dispatch, state }, { req }) {
    console.log("유저셋팅실행");
    return dispatch("users/loadUser");
  }
};

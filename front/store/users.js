export const state = () => ({
  user_info: null, //로그인 상태
  followList: [],
  follower: []
});

// 동기
export const mutations = {
  // 로그인 상태 설정
  setInfo(state, payload) {
    state.user_info = payload;
  },
  // 친구추가
  addFollowList(state, payload) {
    state.followList.unshift(payload);
  },
  //친구 삭제
  removeFollowList(state, payload) {
    const index = state.followList.findIndex(
      v => v.User.nickname === payload.nickname
    );
    state.followList.splice(index, 1);
  }
};

// 비동기
export const actions = {
  // 회원가입
  signUp(context, payload) {
    console.dir(payload);
    this.$axios.post("http://localhost:3001/user", {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password
    });
    context.commit("setInfo", payload);
  },
  // 로그인
  logIn(context, payload) {
    context.commit("setInfo", payload);
  },
  // 로그아웃
  logOut(context, payload) {
    context.commit("setInfo", null);
  },
  addFollowList(context, payload) {
    context.commit("addFollowList", payload);
  },
  removeFollowList(context, payload) {
    context.commit("removeFollowList", payload);
  }
};

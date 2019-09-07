export const state = () => ({
  user_info: null //로그인 상태
});

// 동기
export const mutations = {
  // 로그인 상태 설정
  setInfo(state, payload) {
    state.user_info = payload;
  }
};

// 비동기
export const actions = {
  // 회원가입
  signUp(context, payload) {
    context.commit("setInfo", payload);
  },
  // 로그인
  logIn(context, payload) {
    context.commit("setInfo", payload);
  },
  // 로그아웃
  logOut(context, payload) {
    context.commit("setInfo", null);
  }
};

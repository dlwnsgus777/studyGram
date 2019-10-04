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
  async loadUser(context) {
    try {
      const res = await this.$axios.get("http://localhost:3001/user", {
        withCredentials: true
      });
      context.commit("setInfo", res.data);
    } catch (error) {
      console.error("오류남", error);
    }
  },

  // 회원가입
  signUp(context, payload) {
    this.$axios
      .post(
        "http://localhost:3001/user",
        {
          email: payload.email,
          nickname: payload.nickname,
          password: payload.password
        },
        {
          withCredentials: true
        }
      )
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  },
  // 로그인
  logIn(context, payload) {
    this.$axios
      .post(
        "http://localhost:3001/user/login",
        {
          email: payload.email,
          password: payload.password
        },
        {
          withCredentials: true
        }
      )
      .then(data => {
        console.log(data.data);
        context.commit("setInfo", data.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // 로그아웃
  logOut(context) {
    this.$axios
      .post(
        "http://localhost:3001/user/logout",
        {},
        {
          withCredentials: true
        }
      )
      .then(() => {
        context.commit("setInfo", null);
      })
      .catch(err => {
        console.log(err);
      });
  },
  addFollowList(context, payload) {
    context.commit("addFollowList", payload);
  },
  removeFollowList(context, payload) {
    context.commit("removeFollowList", payload);
  }
};

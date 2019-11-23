export const state = () => ({
  user_info: null //로그인 상태
});

// 동기
export const mutations = {
  // 로그인 상태 설정
  setInfo(state, payload) {
    state.user_info = payload;
  },
  //친구 삭제
  removeFollowingList(state, payload) {
    const index = state.user_info.Followings.findIndex(
      v => v.id === payload.userId
    );
    state.user_info.Followings.splice(index, 1);
  },
  follow(state, payload) {
    state.user_info.Followings.push({
      id: payload.userId
    });
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
    context.commit("addFollowerList", payload);
  },
  removeFollowList(context, payload) {
    context.commit("removeFollowingList", payload);
  },
  addFollow({ commit }, payload) {
    this.$axios
      .post(
        `http://localhost:3001/user/${payload.userId}/follow`,
        {},
        { withCredentials: true }
      )
      .then(res => {
        commit("follow", {
          userId: payload.userId
        });
      })
      .catch(e => {
        console.error(e);
      });
  },
  unFollow({ commit }, payload) {
    return this.$axios
      .delete(`http://localhost:3001/user/${payload.userId}/follow`, {
        withCredentials: true
      })
      .then(res => {
        commit("removeFollowingList", {
          userId: payload.userId
        });
      })
      .catch(e => {
        console.err(e);
      });
  }
};

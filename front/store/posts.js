import Vue from "vue";

export const state = () => ({
  StudyCards: [],
  morePost: true,
  imagePath: []
});

export const mutations = {
  addPosts(state, payload) {
    // unshift : 배열의 맨 앞에
    state.StudyCards.unshift(payload);
    state.imagePath = [];
  },
  removePosts(state, payload) {
    // postId로 해당 post의 index찾기
    const index = state.StudyCards.findIndex(v => v.id === payload.postId);
    state.StudyCards.splice(index, 1);
  },
  addComments(state, payload) {
    const index = state.StudyCards.findIndex(v => v.id === payload.postId);
    state.StudyCards[index].comments.unshift(payload);
  },
  removeComments(state, payload) {
    const index = state.StudyCards.findIndex(v => v.id === payload.postId);
    const commentIndex = state.StudyCards[index].comments.findIndex(
      v => v.id === payload.id
    );
    state.StudyCards[index].comments.splice(commentIndex, 1);
  },
  loadStudyCard(state, payload) {
    state.StudyCards = state.StudyCards.concat(payload);
    state.morePost = payload.length === 10;
  },
  addImagePath(state, payload) {
    state.imagePath = state.imagePath.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePath.splice(payload, 1);
  },
  loadComment(state, payload) {
    const index = state.StudyCards.findIndex(v => v.id === payload.PostId);
    Vue.set(state.StudyCards[index], "comments", payload.data);
  }
};

export const actions = {
  addStudy(context, payload) {
    // 게시글 추가
    this.$axios
      .post(
        "http://localhost:3001/studycard",
        {
          content: payload.content,
          imagePath: context.state.imagePath
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        context.commit("addPosts", res.data);
      })
      .catch(err => {
        alert("addStudy 에러");
      });
  },
  remove(context, payload) {
    // 게시글 삭제
    this.$axios
      .delete("http://localhost:3001/studycard/" + payload.postId, {
        withCredentials: true
      })
      .then(res => {
        context.commit("removePosts", payload.postId);
      })
      .catch(err => {
        alert("remove 에러");
      });
  },
  addComments(context, payload) {
    // 댓글 추가
    this.$axios
      .post(
        "http://localhost:3001/studycard/" + payload.postId + "/comment",
        {
          content: payload.comment
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        context.commit("addComments", res.data);
      })
      .catch(err => {});
  },
  removeComments(context, payload) {
    context.commit("removeComments", payload);
  },
  async loadStudyCard(context, payload) {
    if (context.state.morePost) {
      try {
        const res = await this.$axios.get(
          `http://localhost:3001/studycards?offset=${
            context.state.StudyCards.length
          }&limit=10`
        );
        context.commit("loadStudyCard", res.data);
      } catch (error) {
        console.log(error);
      }
    }
  },
  uploadImages(context, payload) {
    this.$axios
      .post("http://localhost:3001/studycard/images", payload, {
        withCredentials: true
      })
      .then(res => {
        context.commit("addImagePath", res.data);
      })
      .catch(err => {});
  },
  loadComment(context, payload) {
    this.$axios
      .get("http://localhost:3001/studycard/" + payload.postId + "/comments")
      .then(res => {
        context.commit("loadComment", {
          PostId: payload.postId,
          data: res.data
        });
      })
      .catch(err => {
        alert("loadComment 에러");
        console.log(err);
      });
  }
};

import Vue from "vue";
import throttle from "lodash.throttle";

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
    const index = state.StudyCards.findIndex(v => v.id === payload);
    state.StudyCards.splice(index, 1);
  },
  addComments(state, payload) {
    const index = state.StudyCards.findIndex(v => v.id === payload.StudycardId);
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
  },
  likePost(state, payload) {
    const index = state.StudyCards.findIndex(v => v.id === payload.postId);

    state.StudyCards[index].Likers.push({
      id: payload.userId
    });
  },
  unlikePost(state, payload) {
    const index = state.StudyCards.findIndex(v => v.id === payload.postId);

    const userIndex = state.StudyCards[index].Likers.findIndex(
      v => v.id === payload.userId
    );
    state.StudyCards[index].Likers.splice(userIndex, 1);
  }
};

export const actions = {
  likePost({ commit }, payload) {
    this.$axios
      .post(
        `http://localhost:3001/studycard/${payload.postId}/like`,
        {},
        {
          withCredentials: true
        }
      )
      .then(res => {
        commit("likePost", {
          userId: res.data.userId,
          postId: payload.postId
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  unlikePost({ commit }, payload) {
    this.$axios
      .delete(`http://localhost:3001/studycard/${payload.postId}/like`, {
        withCredentials: true
      })
      .then(res => {
        commit("unlikePost", {
          userId: res.data.userId,
          postId: payload.postId
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  addStudy(context, payload) {
    // 게시글 추가
    this.$axios
      .post(
        "http://localhost:3001/studycard",
        {
          content: payload.content,
          image: context.state.imagePath
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
  loadStudyCard: throttle(async function(context, payload) {
    console.log(state.StudyCards);
    try {
      if (context.state.morePost) {
        const lastPost =
          context.state.StudyCards[context.state.StudyCards.length - 1];
        const res = await this.$axios.get(
          `http://localhost:3001/studycards?lastId=${lastPost &&
            lastPost.id}&limit=10`
        );
        context.commit("loadStudyCard", res.data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, 3000),
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
  },
  loadHashtag: throttle(async function(context, payload) {
    try {
      if (context.state.morePost) {
        const lastPost =
          context.state.StudyCards[context.state.StudyCards.length - 1];
        const res = await this.$axios.get(
          `http://localhost:3001/hashtag/${payload.hashTag}?lastId=${lastPost &&
            lastPost.id}&limit=10`
        );
        context.commit("loadStudyCard", res.data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }, 3000)
};

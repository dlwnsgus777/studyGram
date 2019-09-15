export const state = () => ({
  /**
   *  게시글
   *  content : 게시글 내용,
   *  user : { nickname, id}  작성자 닉네임,
   *  comments : [
   *    postId : 게시글 아이디,
   *    comment : 댓글,
   *    nickname : 댓글 작성자 닉네임,
   *    id : Date.now 댓글 아이디
   *  ],
   *  images: [] 이미지,
   *  id : Date.now 게시글 아이디
   *  createAt : Date.now 게시글 작성일
   */
  StudyCards: [],
  morePost: true
});
const total = 101;
const limit = 10;

export const mutations = {
  addPosts(state, payload) {
    // unshift : 배열의 맨 앞에
    state.StudyCards.unshift(payload);
  },
  removePosts(state, payload) {
    // postId로 해당 post의 index찾기
    const index = state.StudyCards.findIndex(v => v.id === payload.id);
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
    const diff = total - state.StudyCards.length; // 아직 안불러온 게시글의 갯수
    const fake = Array(diff > limit ? limit : diff)
      .fill()
      .map(v => ({
        id: Math.random().toString(),
        user: {
          id: 1,
          nickname: "준스"
        },
        content: "인피니트 스크롤링 " + Math.random(),
        comments: [],
        images: []
      }));
    state.StudyCards = state.StudyCards.concat(fake);
    state.morePost = fake.length === limit;
  }
};

export const actions = {
  addStudy(context, payload) {
    // 게시글 추가
    context.commit("addPosts", payload);
  },
  remove(context, payload) {
    // 게시글 삭제
    context.commit("removePosts", payload);
  },
  addComments(context, payload) {
    // 댓글 추가
    context.commit("addComments", payload);
  },
  removeComments(context, payload) {
    context.commit("removeComments", payload);
  },
  loadStudyCard(context, payload) {
    if (context.state.morePost) {
      context.commit("loadStudyCard");
    }
  }
};

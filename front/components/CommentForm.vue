<template>
  <v-form ref="form" v-model="valid" @submit.prevent="sendComment">
    <v-textarea
      v-model="commentText"
      outlined
      auto-grow
      clearable
      :success-messages="successMsg"
      :success="success"
      :rules="textAreaRules"
      @input="typingText"
      label="댓글작성"
    />
    <v-btn absolute right type="submit">댓글작성</v-btn>
  </v-form>
</template>
<script>
export default {
  props: {
    postId: Number
  },
  data() {
    return {
      valid: false,
      commentClick: false,
      commentText: "",
      successMsg: "",
      success: false,
      textAreaRules: [v => !!v.trim() || "내용을 입력하세요."]
    };
  },
  computed: {
    user_info() {
      return this.$store.state.users.user_info;
    }
  },
  methods: {
    typingText() {
      this.successMsg = "";
      this.success = false;
    },
    sendComment() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/addComments", {
            postId: this.postId,
            comment: this.commentText
          })
          .then(() => {
            this.successMsg = "등록성공";
            this.success = true;
            this.commentText = "";
          })
          .catch(() => {
            alert("실패");
          });
      }
    }
  }
};
</script>
<style>
</style>

<template>
  <v-card>
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="submitTextArea">
        <v-textarea
          v-model="content"
          outlined
          auto-grow
          clearable
          :success-messages="successMsg"
          :success="success"
          label="작성"
          :rules="textAreaRules"
          @input="typingText"
        />
        <v-btn type="submit">작성</v-btn>
        <v-btn absolute right type="button">이미지</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      successMsg: "",
      success: false,
      valid: false,
      textAreaRules: [v => !!v.trim() || "내용을 입력하세요."]
    };
  },
  computed: {
    user_info() {
      return this.$store.state.users.user_info;
    }
  },
  methods: {
    submitTextArea() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/addStudy", {
            content: this.content,
            user: {
              nickname: this.user_info.nickname,
              id: this.user_info.id
            },
            comments: [],
            images: [],
            id: Date.now(),
            createdAt: Date.now()
          })
          .then(() => {
            this.successMsg = "등록성공";
            this.success = true;
            this.content = "";
          })
          .catch(() => {
            alert("등록실패");
          });
      }
    }
  }
};
</script>
<style>
</style>

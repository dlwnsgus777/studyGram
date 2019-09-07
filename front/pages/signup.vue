<template>
  <div>
    <v-container>
      <v-card>
        <v-subheader>열심히할수있나요?</v-subheader>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-container>
            <v-text-field v-model="email" :rules="emailRules" label="이메일" type="email" required />
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="비밀번호"
              type="password"
              required
            />
            <v-text-field
              v-model="passwordCheck"
              :rules="passwordCheckRules"
              label="비밀번호 확인"
              type="password"
              required
            />
            <v-text-field
              v-model="nickname"
              :rules="nicknameRules"
              label="닉네임"
              type="text"
              required
            />
            <v-btn :disabled="!valid" type="submit">가입하기</v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      emailRules: [
        v => !!v || "이메일을 입력하세요.",
        v => /.+@.+/.test(v) || "이메일이 유요하지않습니다."
      ],
      passwordRules: [v => !!v || "비밀번호를 입력하세요."],
      passwordCheckRules: [
        v => !!v || "비밀번호를 입력하세요.",
        v => v === this.password || "비밀번호 일치 실패"
      ],
      nicknameRules: [v => !!v || "닉네임을 입력하세요."]
    };
  },
  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("users/signUp", {
            email: this.email,
            nickname: this.nickname
          })
          .then(() => {
            this.$router.push({
              path: "/"
            });
          })
          .catch(() => {
            alert("회원가입 실패");
          });
      }
    }
  }
};
</script>

<style></style>

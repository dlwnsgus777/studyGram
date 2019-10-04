<template>
  <v-container v-if="!user_info">
    <v-card>
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
          <v-btn :disabled="!valid" type="submit">로그인</v-btn>
          <v-btn nuxt to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <userProfile :user="user_info" :followList="followList" />
  </v-container>
</template>
<script>
import userProfile from "~/components/Profile";
export default {
  components: {
    userProfile
  },
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "이메일을 입력하세요.",
        v => /.+@.+/.test(v) || "이메일이 유요하지않습니다."
      ],
      passwordRules: [v => !!v || "비밀번호를 입력하세요."]
    };
  },
  computed: {
    user_info() {
      return this.$store.state.users.user_info;
    },
    followList() {
      return this.$store.state.users.followList;
    }
  },
  fetch({ store }) {
    return store.dispatch("users/loadUser");
  },
  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("users/logIn", {
          email: this.email,
          password: this.password
        });
      } else {
        alert("회원가입 시도 실패");
      }
    }
  }
};
</script>
<style>
</style>

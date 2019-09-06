<template>
  <div>
    <v-container>
      <v-card>
        <v-subheader>열심히할수있나요?</v-subheader>
        <v-form>
          <v-container>
            <v-text-field label="이메일" type="email" required />
            <v-text-field label="비밀번호" type="password" required />
            <v-text-field label="비밀번호 확인" type="password" required />
            <v-text-field label="이름" type="text" required />
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
      name: "야야"
    };
  }
};
</script>

<style>
</style>


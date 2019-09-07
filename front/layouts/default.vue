<template>
  <v-app>
    <nav>
      <v-toolbar color="#26A69A">
        <v-toolbar-title>
          <nuxt-link to="/">
            <v-btn>
              <img src="/studycon.ico" />
            </v-btn>
          </nuxt-link>
        </v-toolbar-title>
        <div class="flex-grow-1" />
        <v-toolbar-items>
          <v-text-field
            :style="{ display: 'flex', alignItems: 'center' }"
            hide-details
            prepend-icon="mdi-magnify"
            color="white"
            label="검색"
          />
          <v-btn text nuxt to="/">일정관리</v-btn>
          <v-btn text nuxt to="/profile">프로필</v-btn>
          <v-btn text nuxt to="/signup">회원가입</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row no-gutters>
      <v-col cols="12" md="3">
        <Login />
      </v-col>
      <v-col cols="12" md="6">
        <nuxt />
      </v-col>
      <v-col cols="12" md="3">
        오른쪽
        <div>{{name}}</div>
        <v-btn @click="onChangeName">바이바이</v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Login from "~/components/Login";
export default {
  components: {
    Login
  },
  computed: {
    name() {
      return this.$store.state.posts.name;
    }
  },
  methods: {
    onChangeName() {
      this.$store.commit("posts/bye");
    }
  }
};
</script>
<style></style>

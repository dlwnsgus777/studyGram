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
          <v-form @submit.prevent="searchHashTag">
            <div
              :style="{ display: 'flex', height: '100%', alignItems: 'center' }"
            >
              <v-text-field
                dark
                v-model="HashTag"
                hide-details
                prepend-icon="mdi-magnify"
                color="white"
                label="검색"
              />
            </div>
          </v-form>
          <v-btn text nuxt to="/">일정관리</v-btn>
          <v-btn text nuxt to="/">메인</v-btn>
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
      <v-col cols="12" md="3"> </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Login from "~/components/Login";
export default {
  data() {
    return {
      HashTag: ""
    };
  },
  components: {
    Login
  },
  computed: {
    name() {
      return this.$store.state.hello;
    }
  },
  methods: {
    searchHashTag() {
      this.$router.push({
        path: "/hashtag/" + this.HashTag
      });
      this.HashTag = "";
    }
  }
};
</script>
<style></style>

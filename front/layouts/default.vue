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
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <v-text-field
            hide-details
            prepend-icon="mdi-magnify"
            color="white"
            label="검색"
            :style="{display : 'flex', alignItems:'center'}"
          />
          <v-btn text nuxt to="/">일정관리</v-btn>
          <v-btn text nuxt to="/profile">프로필</v-btn>
          <v-btn text nuxt to="/signup">회원가입</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <v-row>
      <v-col cols="12" md="3">
        <Login></Login>
      </v-col>
      <v-col cols="12" md="6">
        <nuxt />
      </v-col>
      <v-col cols="12" md="3">오른쪽</v-col>
    </v-row>
  </v-app>
</template>

<script>
import Login from "~/components/Login";
export default {
  components: {
    Login
  }
};
</script>
<style>
</style>


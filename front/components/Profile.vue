<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>{{user.nickname}} 로그인 됨</v-subheader>
        </v-container>
        <v-container>
          <v-card :max-height="300" class="overflow-y-auto">
            <v-container>
              <v-subheader>공부하는 사람들</v-subheader>
              <Studygroup v-for="p in followList" :key="p.id" :followList="p" />
            </v-container>
          </v-card>
        </v-container>
        <v-container>
          <v-card>
            <v-container>
              <v-subheader>공부고싶은 사람들</v-subheader>
              <Studygroup v-for="p in followingList" :key="p.id" :followList="p" />
            </v-container>
          </v-card>
        </v-container>
        <v-card-actions>
          <v-btn color="success" @click="onlogOut">로그아웃1</v-btn>
          <v-btn absolute right color="success" @click="onlogOut">로그아웃2</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Studygroup from "~/components/Studygroup";
export default {
  props: {
    user: Object,
    followingList: Array,
    followerList: Array
  },
  components: {
    Studygroup
  },
  methods: {
    onlogOut() {
      this.$store.dispatch("users/logOut");
    }
  }
};
</script>

<style></style>

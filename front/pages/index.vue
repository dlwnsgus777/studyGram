<template>
  <div>
    <v-container>
      <Studyform v-if="user_info" />
    </v-container>
    <Studycard v-for="p in Posts" :key="p.id" :post="p" />
  </div>
</template>

<script>
import Studycard from "~/components/Studycard";
import Studyform from "~/components/Studyform";
export default {
  components: {
    Studycard,
    Studyform
  },
  computed: {
    user_info() {
      return this.$store.state.users.user_info;
    },
    Posts() {
      return this.$store.state.posts.Posts;
    }
  }
};
</script>

<style></style>

<template>
  <v-container v-if="studycard">
    <StudyCard :post="studycard" />
  </v-container>
  <div v-else>존재하지않은 게시글입니다.</div>
</template>

<script>
import StudyCard from "~/components/Studycard";
export default {
  components: {
    StudyCard
  },
  computed: {
    studycard() {
      return this.$store.state.posts.StudyCards.find(
        v => v.id === parseInt(this.$route.params.id, 10)
      );
    }
  }
};
</script>

<style>
</style>
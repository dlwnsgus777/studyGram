<template>
  <div>
    <Studycard v-for="p in StudyCards" :key="p.id" :post="p" />
  </div>
</template>

<script>
import Studycard from "~/components/Studycard";

export default {
  components: {
    Studycard
  },
  computed: {
    user_info() {
      return this.$store.state.users.user_info;
    },
    StudyCards() {
      return this.$store.state.posts.StudyCards;
    },
    morePost() {
      return this.$store.state.posts.morePost;
    }
  },
  fetch({ store }) {
    store.dispatch("posts/loadStudyCard");
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (this.morePost) {
          this.$store.dispatch("posts/loadStudyCard");
        }
      }
    }
  }
};
</script>

<style></style>

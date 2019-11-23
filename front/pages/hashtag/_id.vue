<template>
  <div>
    <v-container>
      <Studyform v-if="user_info" />
    </v-container>
    <Studycard v-for="p in StudyCards" :key="p.id" :post="p" />
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
    StudyCards() {
      return this.$store.state.posts.StudyCards;
    },
    morePost() {
      return this.$store.state.posts.morePost;
    }
  },
  fetch({ store, params }) {
    console.log("포스트 패치");
    return store.dispatch("posts/loadHashtag", {
      hashTag: encodeURIComponent(params.id)
    });
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

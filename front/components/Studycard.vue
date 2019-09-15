<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title>
          <h3>
            <nuxt-link :to="'/user/' + post.user.id">{{post.user.nickname}}</nuxt-link>
          </h3>
        </v-card-title>
        <!--<v-image />-->
        <v-card-text>
          <div>
            <div>{{post.createdAt}}</div>
            <div>{{post.content}}</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn icon>
            <v-icon>mdi-thumb-up-outline</v-icon>
          </v-btn>
          <v-btn icon @click="clickComment">
            <v-icon>mdi-comment-outline</v-icon>
          </v-btn>
          <v-btn icon @click="addFollwList">
            <v-icon>mdi-account-multiple-plus-outline</v-icon>
          </v-btn>
          <v-btn icon @click="removePost">
            <v-icon>mdi-alpha-x-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-container>
      <v-container v-if="commentClick">
        <CommentForm :postId="post.id" />
        <v-container>
          <v-list style="margin-top:30px">
            <v-list-item v-for="c in post.comments" :key="c.id">
              <v-btn icon style="margin-right:10px;" @click="removeComment(c.id)">
                <v-icon>mdi-alpha-x-circle-outline</v-icon>
              </v-btn>
              <v-list-item-content>
                <h4>{{c.nickname}}</h4>
                <div>{{c.comment}}</div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-container>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import CommentForm from "~/components/CommentForm";
export default {
  props: {
    post: Object
  },
  components: {
    CommentForm
  },
  data() {
    return {
      commentClick: false
    };
  },
  computed: {
    user_info() {
      return this.$store.state.users.user_info;
    }
  },
  methods: {
    removePost() {
      this.$store.dispatch("posts/remove", {
        id: this.post.id
      });
    },
    clickComment() {
      if (this.commentClick) {
        this.commentClick = false;
      } else {
        this.commentClick = true;
      }
    },
    addFollwList() {
      this.$store.dispatch("users/addFollowList", {
        User: {
          nickname: this.post.user.nickname
        }
      });
    },
    removeComment(commentId) {
      this.$store.dispatch("posts/removeComments", {
        id: commentId,
        postId: this.post.id
      });
    }
  }
};
</script>
<style  scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>>

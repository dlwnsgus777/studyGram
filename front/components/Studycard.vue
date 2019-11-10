<template>
  <v-container>
    <v-card>
      <v-container>
        <v-card-title>
          <h3>
            <nuxt-link :to="'/user/' + post.User.id">{{post.User.nickname}}</nuxt-link>
          </h3>
        </v-card-title>
        <StudyImages :images="post.Images || []" />
        <v-card-text>
          <div>
            <div>{{post.createdAt}}</div>
            <div>{{post.content}}</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn icon @click="onClickLike">
            <v-icon>{{likeIcon}}</v-icon>
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
                <h4>{{c.User.nickname}}</h4>
                <div>{{c.content}}</div>
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
import StudyImages from "~/components/StudyImages";
export default {
  props: {
    post: Object
  },
  components: {
    CommentForm,
    StudyImages
  },
  data() {
    return {
      commentClick: false
    };
  },
  computed: {
    liked() {
      return !!(this.post.Likers || []).find(
        v => v.id === (this.user_info && this.user_info.id)
      );
    },
    user_info() {
      return this.$store.state.users.user_info;
    },
    likeIcon() {
      return this.liked ? "mdi-thumb-up" : "mdi-thumb-up-outline";
    }
  },
  methods: {
    onClickLike() {
      if (!this.user_info) {
        return alert("로그인필요함");
      }
      if (this.liked) {
        return this.$store.dispatch("posts/unlikePost", {
          postId: this.post.id
        });
      }
      return this.$store.dispatch("posts/likePost", {
        postId: this.post.id
      });
    },
    removePost() {
      this.$store.dispatch("posts/remove", {
        postId: this.post.id
      });
    },
    clickComment() {
      if (this.commentClick) {
        this.commentClick = false;
      } else {
        this.$store.dispatch("posts/loadComment", {
          postId: this.post.id
        });
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

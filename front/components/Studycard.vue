<template>
  <v-container>
    <v-card>
      <v-container>
        <v-image />
        <v-card-text>
          <div>
            <h3>{{post.user.nickname}}</h3>
            <div>{{post.createdAt}}</div>
            <div>{{post.content}}</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn icon>
            <v-icon>mdi-thumb-up-outline</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-comment-outline</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-account-multiple-plus-outline</v-icon>
          </v-btn>
          <v-btn icon @click="removePost">
            <v-icon>mdi-alpha-x-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    post: Object
  },
  methods: {
    removePost() {
      this.$store.dispatch("posts/remove", {
        id: this.post.id
      });
    }
  }
};
</script>
<style>
</style>
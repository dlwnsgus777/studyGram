<template>
  <v-col cols="12" md="4" style="display:inline-block">
    <v-list>
      <v-list-content>
        <v-avatar color="indigo" size="40px" :tile="false">
          <span class="white--text headline">{{followList.User.nickname[0]}}</span>
        </v-avatar>
        <v-list-item-title>{{followList.User.nickname}}</v-list-item-title>
        <v-icon
          @click="removeFollowList"
          @mouseover="iconColor"
          @mouseleave="iconColor"
          :color="color"
        >mdi-account-multiple-minus-outline</v-icon>
      </v-list-content>
    </v-list>
  </v-col>
</template>

<script>
export default {
  props: {
    followList: Object
  },
  data() {
    return {
      color: null
    };
  },
  methods: {
    removeFollowList() {
      this.$store.dispatch("users/removeFollowList", {
        nickname: this.followList.User.nickname
      });
    },
    iconColor() {
      if (this.color === null) {
        this.color = "red";
      } else {
        this.color = null;
      }
    }
  }
};
</script>
<style>
</style>
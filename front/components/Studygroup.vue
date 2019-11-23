<template>
  <v-list style="display:inline-block">
    <v-list-item>
      <div>
        <v-avatar color="indigo" size="40px" :tile="false">
          <span class="white--text headline">{{followList.nickname}}</span>
        </v-avatar>
        <v-list-item-title>{{followList.nickname}}</v-list-item-title>
        <v-icon
          v-if="canDelete"
          @click="removeFollowList"
          @mouseover="iconColor"
          @mouseleave="iconColor"
          :color="color"
        >mdi-account-multiple-minus-outline</v-icon>
      </div>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "Studygroup",
  props: {
    followList: Object,
    canDelete: Boolean
  },
  data() {
    return {
      color: null
    };
  },
  methods: {
    removeFollowList() {
      this.$store.dispatch("users/unFollow", {
        userId: this.followList.id
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
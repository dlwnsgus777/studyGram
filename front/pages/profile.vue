<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>내 프로필(변경예정)</v-subheader>
        </v-container>
        <v-card>
          <v-container>
            <v-subheader>함께 공부하는 사람들</v-subheader>
            <Studygroup />
          </v-container>
        </v-card>
        <v-card>
          <v-container>
            <v-subheader>함께 공부고싶은 사람들</v-subheader>
            <Studygroup />
          </v-container>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Studygroup from "~/components/Studygroup";
export default {
  components: {
    Studygroup
  }
};
</script>

<style></style>

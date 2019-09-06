<template>
  <v-container>
    <v-card>
      <v-container>
        <v-image />
        <v-card-text>
          <div>
            <h3>작성자</h3>
            <div>공부시간</div>
            <div>내용</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn icon>
            <v-icon>mdi-thumb-up-outline</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-comment-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>
<style>
</style>
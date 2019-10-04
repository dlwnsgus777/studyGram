<template>
  <v-card>
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="submitTextArea">
        <v-textarea
          v-model="content"
          outlined
          auto-grow
          clearable
          :success-messages="successMsg"
          :success="success"
          label="작성"
          :rules="textAreaRules"
          @input="typingText"
        />
        <v-btn type="submit">작성</v-btn>
        <input ref="imageInput" type="file" multiple hidden @change="inputImagesUpload" />
        <v-btn @click="imagesUpload" absolute right type="button">이미지</v-btn>
        <div>
          <div v-for="(p , i) in imagePath" :key="p" style="display:inline-block">
            <img :src="`http://localhost:3001/${p}`" :alt="p" style="width:200px;" />
            <div>
              <button @click="removeImage(i)" type="button">제거</button>
            </div>
          </div>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      successMsg: "",
      success: false,
      valid: false,
      textAreaRules: [v => !!v.trim() || "내용을 입력하세요."]
    };
  },
  computed: {
    user_info() {
      return this.$store.state.users.user_info;
    },
    imagePath() {
      return this.$store.state.posts.imagePath;
    }
  },
  methods: {
    submitTextArea() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/addStudy", {
            content: this.content
          })
          .then(() => {
            this.successMsg = "등록성공";
            this.success = true;
            this.content = "";
          })
          .catch(() => {
            alert("등록실패");
          });
      }
    },
    imagesUpload() {
      this.$refs.imageInput.click();
    },
    inputImagesUpload(e) {
      const imageFormData = new FormData();
      console.log(e.target.files);
      [].forEach.call(e.target.files, f => {
        imageFormData.append("image", f);
      });
      this.$store.dispatch("posts/uploadImages", imageFormData);
    },
    removeImage(index) {
      this.$store.commit("posts/removeImagePath", index);
    },
    typingText(value) {}
  }
};
</script>
<style>
</style>

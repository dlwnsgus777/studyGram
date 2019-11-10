<template>
  <div v-if="images.length === 0"></div>
  <div v-else-if="images.length === 1">
    <v-img
      :src="`http://localhost:3001/${images[0].src}`"
      contain
      aspect-ratio="2"
      @click="zoomImages"
    />
    <imagezoom v-if="imagezoomed" :close-modal="closeModal" :images="images" />
  </div>
  <div v-else-if="images.length === 2" style="display:flex">
    <v-img
      :src="`http://localhost:3001/${images[0].src}`"
      contain
      aspect-ratio="2"
      style="flex: 1"
      @click="zoomImages"
    />
    <v-img
      :src="`http://localhost:3001/${images[1].src}`"
      contain
      aspect-ratio="2"
      style="flex: 1"
      @click="zoomImages"
    />
    <imagezoom v-if="imagezoomed" :close-modal="closeModal" :images="images" />
  </div>
  <div v-else-if="images.length > 2" style="display:flex">
    <v-img
      :src="`http://localhost:3001/${images[0].src}`"
      contain
      aspect-ratio="2"
      style="flex: 1"
      @click="zoomImages"
    />
    <div style="flex: 1; display:flex" @click="zoomImages">
      <div>
        <v-icon>mdi-dots-horizontal</v-icon>
        <div style="text-align:center">더보기</div>
      </div>
    </div>
    <imagezoom v-if="imagezoomed" :close-modal="closeModal" :images="images" />
  </div>
</template>

<script>
import imagezoom from "~/components/imageZoom";
export default {
  props: {
    images: Array
  },
  components: {
    imagezoom
  },
  data() {
    return {
      imagezoomed: false
    };
  },
  methods: {
    closeModal() {
      this.imagezoomed = false;
    },
    zoomImages() {
      this.imagezoomed = true;
    }
  }
};
</script>

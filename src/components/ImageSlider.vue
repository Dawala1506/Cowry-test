<template>
  <div class="slider" v-if="isOpen" @click.self="closeSlider">
    <div class="slider-content">
      <img :src="photos[currentIndex].urls.full" :alt="photos[currentIndex].description" />
      <button @click="prevPhoto">Previous</button>
      <button @click="nextPhoto">Next</button>
      <button @click="closeSlider">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    photos: Array,
    initialIndex: Number,
  },
  data() {
    return {
      currentIndex: this.initialIndex,
    };
  },
  methods: {
    closeSlider() {
      this.$emit('close-slider');
    },
    prevPhoto() {
      this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    },
    nextPhoto() {
      this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    },
  },
};
</script>

<style scoped>
.slider {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

button {
  margin: 10px;
}
</style>
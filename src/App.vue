<template>
  <div id="app">
    <PhotoGrid @open-modal="openModal" />
    <PhotoModal :isOpen="isModalOpen" :selectedPhoto="selectedPhoto" @close-modal="closeModal" />
    <ImageSlider :isOpen="isSliderOpen" :photos="photos" :initialIndex="currentIndex" @close-slider="closeSlider" />
  </div>
</template>

<script>
import PhotoGrid from './components/PhotoGrid.vue';
import PhotoModal from './components/PhotoModal.vue';
import ImageSlider from './components/ImageSlider.vue';

export default {
  components: {
    PhotoGrid,
    PhotoModal,
    ImageSlider,
  },
  data() {
    return {
      isModalOpen: false,
      isSliderOpen: false,
      selectedPhoto: null,
      photos: [],
      currentIndex: 0,
    };
  },
  methods: {
    openModal(photo) {
      this.selectedPhoto = photo;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    openSlider(index) {
      this.currentIndex = index;
      this.isSliderOpen = true;
    },
    closeSlider() {
      this.isSliderOpen = false;
    },
  },
};
</script>

<style>
/* Add global styles if needed */
</style>
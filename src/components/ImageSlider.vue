<template>
    <transition name="fade">
      <div v-if="isOpen" class="image-slider-overlay" @click.self="closeSlider">
        <div class="image-slider">
          <!-- Close Button -->
          <button class="close-button" @click="closeSlider">×</button>
  
          <!-- Image Container -->
          <div class="slider-container">
            <transition :name="transitionDirection">
              <img
                :key="currentIndex"
                :src="photos[currentIndex].urls.full"
                :alt="photos[currentIndex].description"
                class="slider-image"
              />
            </transition>
          </div>
  
          <!-- Navigation Buttons -->
          <button class="nav-button prev-button" @click="prevImage">&#10094;</button>
          <button class="nav-button next-button" @click="nextImage">&#10095;</button>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: Boolean, // Controls whether the slider is open
      photos: Array, // Array of photos
      initialIndex: Number, // Index of the initially selected photo
    },
    data() {
      return {
        currentIndex: this.initialIndex, // Track the current image index
        transitionDirection: 'slide-right', // Track the transition direction
      };
    },
    methods: {
      closeSlider() {
        this.$emit('close-slider');
      },
      prevImage() {
        this.transitionDirection = 'slide-left';
        this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
      },
      nextImage() {
        this.transitionDirection = 'slide-right';
        this.currentIndex = (this.currentIndex + 1) % this.photos.length;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .image-slider-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .image-slider {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .close-button {
    position: absolute;
    top: 20px;
    right: 40px;
    background: none;
    border: none;
    color: white;
    font-size: 30px;
    cursor: pointer;
    z-index: 1001;
  
    &:hover {
      color: #ccc;
    }
  }
  
  .slider-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .slider-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
  }
  
  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 30px;
    cursor: pointer;
    padding: 10px;
    z-index: 1001;
  
    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  }
  
  .prev-button {
    left: 20px;
  }
  
  .next-button {
    right: 20px;
  }
  
  /* Slide Transitions */
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
  }
  
  .slide-right-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }
  
  .slide-right-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  
  .slide-left-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }
  
  .slide-left-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
  
  /* Fade Transition for Overlay */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
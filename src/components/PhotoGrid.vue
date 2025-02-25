<template>
    <div class="photo-app">
      <!-- Search Bar Section -->
      <div class="search-section">
        <div class="search-bar">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
            <path d="M10 2a8 8 0 105.293 14.707l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" fill="#999"/>
          </svg>
          <input
            type="text"
            placeholder="Search for photo"
            v-model="searchQuery"
            @input="handleSearch"
          />
        </div>
      </div>
  
      <!-- Photo Grid -->
      <div class="photo-grid">
        <div v-if="loading" class="loading-message">Loading...</div>
        <div v-else-if="error" class="error-message">Error: {{ error.message }}</div>
        <div class="photo-ingrid" v-else>
          <div
            v-for="(photo, index) in filteredPhotos"
            :key="photo.id"
            class="photo-item"
            :style="staggeredStyle(index)"
          >
            <img :src="photo.urls.small" :alt="photo.description" @click="openSlider(index)" />
            <div class="photo-info">
              <p class="author">{{ photo.user.name }}</p>
              <p class="location">{{ photo.location?.title || 'Unknown Location' }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Image Slider -->
      <ImageSlider
        v-if="isSliderOpen"
        :isOpen="isSliderOpen"
        :photos="photos"
        :initialIndex="currentIndex"
        @close-slider="closeSlider"
      />
    </div>
  </template>
  
  <script>
  import { fetchPhotos } from '../services/api';
  import ImageSlider from './ImageSlider.vue'; // Import the ImageSlider component
  
  export default {
    components: {
      ImageSlider, // Register the ImageSlider component
    },
    data() {
      return {
        photos: [],
        filteredPhotos: [],
        searchQuery: '',
        loading: true,
        error: null,
        isSliderOpen: false,
        currentIndex: 0,
      };
    },
    async created() {
      try {
        this.photos = await fetchPhotos();
        this.filteredPhotos = this.photos;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    methods: {
      openSlider(index) {
        this.currentIndex = index;
        this.isSliderOpen = true;
      },
      closeSlider() {
        this.isSliderOpen = false;
      },
      handleSearch() {
        this.filteredPhotos = this.photos.filter((photo) =>
          photo.user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (photo.location?.title && photo.location.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      },
      staggeredStyle(index) {
        // Stagger the grid items
        const rowStart = Math.floor(index / 3) * 2 + 1; // Adjust row start
        const rowEnd = rowStart + 2; // Adjust row end
        return {
          'grid-column': index % 3 === 0 ? '1 / 3' : 'auto', // Span 2 columns for every 3rd item
          'grid-row': `${rowStart} / ${rowEnd}`, // Adjust row span
        };
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .photo-app {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .search-section {
    width: 100%;
    background-color: #ccc; 
    padding: 20px 0; // Reduced padding for smaller screens
    display: flex;
    justify-content: center;
    align-items: center;
  
    @media (max-width: 768px) {
      padding: 15px 0; // Further reduce padding for mobile
    }
  }
  
  .search-bar {
    width: 80%; // Default width for larger screens
    position: relative;
  
    @media (max-width: 1024px) {
      width: 90%; // Increase width for tablets
    }
  
    @media (max-width: 768px) {
      width: 95%; // Increase width for mobile
    }
  
    .search-icon {
      position: absolute;
      left: 20px; 
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      fill: #999;
  
      @media (max-width: 768px) {
        left: 15px; // Adjust icon position for mobile
      }
    }
  
    input {
      width: 100%;
      padding: 12px 16px 12px 50px; // Default padding
      font-size: 16px; // Default font size
      border: 2px solid #ddd;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.3s ease;
  
      &:focus {
        border-color: #007bff;
      }
  
      &::placeholder {
        color: #999;
      }
  
      @media (max-width: 1024px) {
        padding: 10px 14px 10px 40px; // Adjust padding for tablets
        font-size: 14px; // Adjust font size for tablets
      }
  
      @media (max-width: 768px) {
        padding: 8px 12px 8px 36px; // Adjust padding for mobile
        font-size: 12px; // Adjust font size for mobile
      }
    }
  }
  .photo-ingrid{
    display: grid; 
    grid-template: repeat(1, 3fr);
     gap: 60px;
  }
  .photo-grid {
    width: 80%;
    max-width: 1200px;
    display: grid;
    grid-template-columns: repeat(1, 7fr); // 3 columns by default
    gap: 20px; // Space between grid items
    padding: 10px;
    justify-items: center; // Center items horizontally
    margin-top: 0;
  
    // For tablets (e.g., screens less than 1024px)
    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr); // 2 columns
    }
  
    // For mobile devices (e.g., screens less than 768px)
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr); // 1 column
    }
  }
  
  .photo-item {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
  
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  
    img {
      width: 100%;
      height: auto; // Allow images to have varying heights
      object-fit: cover;
      display: block;
    }
  }
  
  .photo-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 12px;
    text-align: left;
  
    .author {
      font-size: 14px;
      font-weight: bold;
      margin: 0;
    }
  
    .location {
      font-size: 12px;
      margin: 4px 0 0;
      color: #ccc;
    }
  }
  
  .loading-message,
  .error-message {
    text-align: center;
    font-size: 18px;
    color: #333;
    padding: 20px;
  }
  </style>
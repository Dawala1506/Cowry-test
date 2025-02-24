<template>
    <div class="photo-app">
      <!-- Search Bar -->
      <div class="search-bar">
        <input type="text" placeholder="Search for photo" />
      </div>
  
      <!-- Photo Grid -->
      <div class="photo-grid">
        <div v-if="loading" class="loading-message">Loading...</div>
        <div v-else-if="error" class="error-message">Error: {{ error.message }}</div>
        <div v-else>
          <div v-for="(photo, index) in photos" :key="photo.id" class="photo-item">
            <img :src="photo.urls.small" :alt="photo.description" @click="openSlider(index)" />
            <div class="photo-info">
              <p class="author">{{ photo.user.name }}</p>
              <p class="location">{{ photo.location?.title || 'Unknown Location' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchPhotos } from '../services/api';
  
  export default {
    data() {
      return {
        photos: [],
        loading: true,
        error: null,
      };
    },
    async created() {
      try {
        this.photos = await fetchPhotos();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    methods: {
      openSlider(index) {
        this.$emit('open-slider', index);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .photo-app {
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    min-height: 100vh;
    padding: 20px;
  }
  
  .search-bar {
    max-width: 1200px;
    margin: 0 auto 20px;
    padding: 0 20px;
  
    input {
      width: 100%;
      padding: 12px 16px;
      font-size: 16px;
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
    }
  }
  
  .photo-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 0 20px;
  }
  
  .photo-item {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  
    img {
      width: 100%;
      height: 200px; 
      object-fit: cover;
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
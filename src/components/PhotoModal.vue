<template>
  <div class="modal" v-if="isOpen" @click.self="closeModal">
    <div class="modal-content">
      <img :src="selectedPhoto.urls.full" :alt="selectedPhoto.description" />
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    selectedPhoto: Object,
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style scoped>
.modal {
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

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

button {
  margin-top: 10px;
}
</style>
<template>
  <div class="page_wrapper">
    <div
      class="page"
      v-for="page in pages"
      :key="page"
      :class="{
        current_page: page === currentPage
      }"
      @click="changeCurrentPage(page)"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          currentPage: 1, 
      }
  },
  props: {
    pages: {
      type: Number,
    },
  },
  methods: {
      changeCurrentPage(pageNumber) {
          this.currentPage = pageNumber; 
          this.$emit("changePage", this.currentPage); 
      }
  }
};
</script>

<style scoped>
.page_wrapper {
  display: flex;
}
.page {
  border: 1px solid green;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.current_page {
  border: 1px solid red;
}
</style>
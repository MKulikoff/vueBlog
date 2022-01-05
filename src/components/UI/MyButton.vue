<template>
  <button class="btn">
      <slot></slot>
  </button>
</template>

<script>
export default {
    name: 'my-button', 
}
</script>

<style scoped>
.btn {
  margin-top: 5px;
  width: fit-content;
  padding: 5px;
  background: none;
  font-size: 14px;
  border: 1px solid black;
}
</style>
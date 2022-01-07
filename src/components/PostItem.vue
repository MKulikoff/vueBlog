<template>
  <div class="post_wrapper">
    <div class="post">
      <div class="title">
        {{ post.id }}
        <strong>{{ post.title }}</strong>
      </div>
      <div class="date">{{ post.body }}</div>
    </div>
    <div class="btns">
      <my-button @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid black;
  margin-top: 10px;
  padding: 5px;
}

</style>
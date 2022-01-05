<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <post-item
      v-for="post in posts"
      :post="post"
      @remove="$emit('remove', post)"
      :key="post.id"
    />
  </div>
  <h2 v-else>
    Постов нет
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
</style>
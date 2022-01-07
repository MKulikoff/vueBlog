<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="postList">
      <post-item
        v-for="post in posts"
        :post="post"
        @remove="$emit('remove', post)"
        :key="post.id"
      />
    </transition-group>
  </div>
  <h2 v-else>Постов нет</h2>
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
.postList-item {
  display: inline-block;
  margin-right: 10px;
}
.postList-enter-active, .postList-leave-active {
  transition: all 0.3s;
}
.postList-enter, .postList-leave-active {
  opacity: 0;
  transform: translateX(130px);
}
.postList-move {
  transition: transform 0.3s;
}
</style>
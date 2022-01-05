<template>
  <form action="submit" v-on:submit.prevent>
    <div class="addPost">
      <my-input placeholder="Название" v-model="post.title" />
      <my-input placeholder="Текст" v-model="post.body" />
      <my-button @click="addNewPost">Добавить новый пост</my-button>
    </div>
  </form>
</template>

<script>
import MyInput from './UI/MyInput.vue';
export default {
  components: { MyInput },
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    addNewPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
.addPost {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>>

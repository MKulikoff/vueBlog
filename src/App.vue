<template>
  <div class="main">
    <h3>Страница с постами</h3>
    <div class="app_btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select :options="selectorOptions" v-model="selectedSort"></my-select>
    </div>
    <my-dialog v-model:showDialog="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <div v-if="!!isLoading" class="loading">Идет загрузка...</div>
    <post-list v-else :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false, 
      selectedSort: '', 
      selectorOptions: [
        {
          value: 'id', 
          name: 'По ID'
        },
        {
          value: 'title', 
          name: 'По названию'
        },
        {
          value: 'body', 
          name: 'По содержимому'
        }
      ]
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isLoading = true; 
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        this.posts = response.data;
      } catch (error) {
        alert(error);
      } finally {
        this.isLoading = false; 
      }
    }
  },
  mounted() {
    this.fetchPosts(); 
  },
  watch: {
    selectedSort(newValue) {
      if(newValue == 'id') {
        this.posts.sort((post1, post2) => {
          return post1[newValue] - post2[newValue]; 
        })
      } else {
        this.posts.sort((post1, post2) => {
        return post1[newValue].localeCompare(post2[newValue])
      })
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  margin: 15px;
}

.app_btns {
  display: flex;
  justify-content: space-between;
}
</style>

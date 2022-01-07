<template>
  <div class="main">
    <h3>Страница с постами</h3>
    <my-input
      placeholder="Поиск по заголовку..."
      v-model="searchedQuery"
      v-focus
    ></my-input>
    <div class="app_btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select :options="selectorOptions" v-model="selectedSort"></my-select>
    </div>
    <page-list :pages="totalPages" @changePage="changePageNumber"></page-list>
    <my-dialog v-model:showDialog="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <div v-if="!!isLoading" class="loading">Идет загрузка...</div>
    <post-list v-else :posts="sortAndSearchedPosts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import PageList from "@/components/PageList.vue";
import axios from "axios";

export default {
  components: {
    PostList,
    PostForm,
    PageList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false,
      selectedSort: "",
      searchedQuery: "",
      pageNumber: 1,
      limitPosts: 10,
      totalPages: 0,
      selectorOptions: [
        {
          value: "id",
          name: "По ID",
        },
        {
          value: "title",
          name: "По названию",
        },
        {
          value: "body",
          name: "По содержимому",
        },
      ],
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
    changePageNumber(currentPage) {
      this.pageNumber = currentPage;
    },

    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?",
          {
            params: {
              _page: this.pageNumber,
              _limit: this.limitPosts,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limitPosts
        );
        this.posts = response.data;
      } catch (error) {
        alert(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      if (this.selectedSort == "id") {
        return [...this.posts].sort((post1, post2) => {
          return post1[this.selectedSort] - post2[this.selectedSort];
        });
      } else {
        return [...this.posts].sort((post1, post2) => {
          return post1[this.selectedSort]?.localeCompare(
            post2[this.selectedSort]
          );
        });
      }
    },
    sortAndSearchedPosts() {
      return this.sortedPosts.filter((post) => {
        return post.title
          .toLowerCase()
          .includes(this.searchedQuery.toLowerCase());
      });
    },
  },
  watch: {
    pageNumber() {
      this.fetchPosts();
    },
  },
};
</script>

<style>
</style>

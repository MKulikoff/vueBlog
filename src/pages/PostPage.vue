<template>
  <div class="main">
    <h3>Страница с постами</h3>
    <my-input
      placeholder="Поиск по заголовку..."
      :model-value="searchedQuery"
      @update:model-value="setSearchedQuery"
      v-focus
    ></my-input>
    <div class="app_btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select 
      :options="selectorOptions" 
       model-value="selectedSort"
       @update:model-value="setSelectedSort"
       ></my-select>
    </div>
    <page-list :pages="totalPages" @changePage="setPageNumber"></page-list>
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
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'; 
export default {
  components: {
    PostList,
    PostForm,
    PageList,
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
      ...mapActions({
        fetchPosts: 'post/fetchPosts'
      }),
      ...mapMutations({
        setLoading: 'post/setLoading', 
        setPageNumber: 'post/setPageNumber',
        setSearchedQuery: 'post/setSearchedQuery',
        setSelectedSort: 'post/setSelectedSort'
      }),
    },
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
      this.setPageNumber(currentPage); 
    },
   computed: {
      ...mapState({
        posts: state => state.post.posts,
        isLoading: state => state.post.isLoading,
        selectedSort: state => state.post.selectedSort,
        searchedQuery: state => state.post.searchedQuery,
        pageNumber: state => state.post.pageNumber,
        limitPosts: state => state.post.limitPosts,
        totalPages: state => state.post.totalPages,
        selectorOptions: state => state.post.selectorOptions, 
      }),
      ...mapGetters({
        sortedPosts: 'post/sortedPost',
        sortAndSearchedPosts: 'post/sortAndSearchedPosts' 
      })
  },
  watch: {
    pageNumber() {
      this.fetchPosts();
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style>
</style>

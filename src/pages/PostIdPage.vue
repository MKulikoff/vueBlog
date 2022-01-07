<template>
  <h2>Пост с ID = {{ $route.params.id }}</h2>
</template>

<script>
//TODO: SHOW CURRENT POST, TITLE AND SO ON
import {useRoute} from 'vue-router'
export default {
  // setup() {
  //   const route = useRoute()
  //   const postId = route.params.id
  // },
  // methods: {
  //   async getPost(id) {
  //     try {
  //       const response = await axios.get(
  //         `https://jsonplaceholder.typicode.com/posts/${this.postId}`,
  //         {
  //           params: {
  //             _page: this.pageNumber,
  //             _limit: this.limitPosts,
  //           },
  //         }
  //       );
  //       this.totalPages = Math.ceil(
  //         response.headers["x-total-count"] / this.limitPosts
  //       );
  //       this.posts = response.data;
  //     } catch (error) {
  //       alert(error);
  //     } finally {
  //       this.isLoading = false;
  //     }
  //   }
  // }
  
}
</script>

<style>

</style>
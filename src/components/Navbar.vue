<template>
  <div class="nav_wrapper">
      <my-button @click="$router.push('/')">Главная</my-button>
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')">Об авторе</my-button>
  </div>
</template>

<script>
export default {
 
}
</script>

<style>

</style>
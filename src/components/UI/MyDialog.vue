<template>
  <div v-if="showDialog" class="dialog" @click.stop="closeDialog">
      <div @click.stop class="dialog_content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin'; 
export default {
    name: 'my-dialog',
    mixins: [toggleMixin]
}
</script>

<style>
.dialog { 
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}

.dialog_content { 
    background: white;
    padding: 10px;
    margin: auto; 
    min-height: 100px;
    min-width: 500px;
}

</style>
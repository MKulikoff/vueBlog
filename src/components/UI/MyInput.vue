<template>
  <input :value="modelValue" @input="updateInput" type="text" class="input" />
</template>

<script>
export default {
    name: 'my-input',
    props: {
      modelValue: [String, Number]
    },
    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }

};
</script>

<style scoped>
.input {
  width: 100%;
  margin-top: 5px;
  padding: 5px;
  border: 1px solid black;
  height: fit-content;
  font-size: 18px;
}
</style>
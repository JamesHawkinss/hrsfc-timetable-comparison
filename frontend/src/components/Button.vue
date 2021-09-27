
<template>
  <button @click="$emit('click')" :class="styles">
    <slot>Click me!</slot>
  </button>
</template>

<style scoped>
.button {
    font-family: inherit;
    font-size: initial;
    border: 0;
}

.primary {
    background-color: blue;
    color: white;
}
</style>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  computed: {
    styles() {
      const obj = {};
      obj[this.type] = true;

      return {
        'button': true,
        ...obj,
      }
    }
  }
};
</script>
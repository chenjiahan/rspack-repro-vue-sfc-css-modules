<template>
  <p :class="{ [$style.red]: isRed }">Am I red?</p>
  <p :class="[$style.red, $style.bold]">Red and bold</p>
  <button id="button1" type="button" @click="count++">A: {{ count }}</button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    return {
      isRed: true,
      count,
    };
  },
};
</script>

<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>

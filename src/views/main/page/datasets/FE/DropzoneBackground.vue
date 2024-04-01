<template>
  <div style="width: 100%; height: 100%">
    <Background :size="2" :gap="20" pattern-color="#BDBDBD">
      <slot></slot>
    </Background>
  </div>
</template>
<script lang="ts" setup>
  import { Background } from '@vue-flow/background';
</script>

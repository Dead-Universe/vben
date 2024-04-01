<template>
  <BasicDrawer v-bind="$attrs" @register="innerRegister" :isDetail="true" title="特征工程">
    <FE />
    <template #titleToolbar>
      <a-button type="default" @click="open" preIcon="ant-design:setting-outlined"> 设置 </a-button>
    </template>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import FE from './index.vue';

  // const [register, { openDrawer }] = useDrawer();

  const [innerRegister] = useDrawerInner((_data) => {});

  const open = () => {};
</script>

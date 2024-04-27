<template>
  <BasicDrawer v-bind="$attrs" @register="innerRegister" :isDetail="true" title="特征工程">
    <FE />
    <template #titleToolbar>
      <a-button size="middle" type="text" @click="open">
        <template #icon>
          <SaveOutlined />
        </template>
      </a-button>
      <a-button size="middle" type="text" @click="open">
        <template #icon>
          <RightSquareOutlined />
        </template>
      </a-button>
    </template>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { SaveOutlined, RightSquareOutlined } from '@ant-design/icons-vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import FE from './index.vue';

  // const [register, { openDrawer }] = useDrawer();

  const [innerRegister] = useDrawerInner((_data) => {});

  const open = () => {};
</script>

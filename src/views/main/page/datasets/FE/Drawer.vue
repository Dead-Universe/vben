<template>
  <BasicDrawer v-bind="$attrs" @register="innerRegister" :isDetail="true" title="特征工程">
    <FE ref="fe" />
    <template #titleToolbar>
      <a-button size="middle" type="text" @click="handleSave">
        <template #icon>
          <SaveOutlined />
        </template>
      </a-button>
      <a-button size="middle" type="text" @click="handleSubmit">
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
  import { ref, type Ref } from 'vue';
  import type { FlowExportObject, GraphEdge, GraphNode } from '@vue-flow/core';
  import { isConnectedGraphWithNoLoop } from '@/views/main/page/datasets/FE/utils/graph';

  const fe: Ref<any> = ref(null);

  // const [register, { openDrawer }] = useDrawer();

  const [innerRegister] = useDrawerInner((_data) => {});

  const handleSubmit = () => {
    // TODO
    console.log(fe?.value.toObject());
    let obj: FlowExportObject = fe?.value.toObject();
    console.log(isConnectedGraphWithNoLoop(obj.nodes as GraphNode[], obj.edges as GraphEdge[]));
  };

  const handleSave = () => {
    // TODO
    console.log(fe?.value.toObject());
  };
</script>

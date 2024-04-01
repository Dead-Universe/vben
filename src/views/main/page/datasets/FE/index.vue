<template>
  <BasicDrawer v-bind="$attrs" @register="innerRegister" :isDetail="true" title="特征工程">
    <Layout>
      <LayoutSider collapsible collapsedWidth="0" theme="light"><Sidebar /></LayoutSider>
      <LayoutContent>
        <div class="dndflow" @drop="onDrop">
          <VueFlow :nodes="nodes" @dragover="onDragOver" @dragleave="onDragLeave">
            <DropzoneBackground
              :style="{
                backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
                transition: 'background-color 0.2s ease',
              }"
            />
          </VueFlow>
        </div>
      </LayoutContent>
    </Layout>
    <template #titleToolbar>
      <a-button type="default" @click="open" preIcon="ant-design:setting-outlined"> 设置 </a-button>
    </template>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { type Connection, VueFlow, useVueFlow } from '@vue-flow/core';
  import DropzoneBackground from './DropzoneBackground.vue';
  import { Layout, LayoutContent, LayoutSider } from 'ant-design-vue';
  import Sidebar from './Sidebar.vue';
  import useDragAndDrop from './useDnD';

  import { useContextMenu } from '@/hooks/web/useContextMenu';
  import { useMessage } from '@/hooks/web/useMessage';

  const [createContextMenu] = useContextMenu();
  const { createMessage } = useMessage();

  // const [register, { openDrawer }] = useDrawer();

  const [innerRegister] = useDrawerInner((_data) => {});

  const { onConnect, addEdges, onEdgeContextMenu, removeEdges, onNodeContextMenu, removeNodes } =
    useVueFlow();

  const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();

  const nodes = ref([]);

  onEdgeContextMenu(({ event, edge }) => {
    createContextMenu({
      event: event as MouseEvent,
      items: [
        {
          label: '编辑',
          icon: 'ant-design:edit-outlined',
          handler: () => {
            createMessage.success('click edit');
          },
        },
        {
          label: '删除',
          icon: 'ant-design:delete-outlined',
          handler: () => {
            removeEdges(edge);
            createMessage.success('删除成功');
          },
        },
      ],
    });
  });

  onNodeContextMenu(({ event, node }) => {
    createContextMenu({
      event: event as MouseEvent,
      items: [
        {
          label: '编辑',
          icon: 'ant-design:edit-outlined',
          handler: () => {
            createMessage.success('click edit');
          },
        },
        {
          label: '删除',
          icon: 'ant-design:delete-outlined',
          handler: () => {
            removeNodes(node);
            createMessage.success('删除成功');
          },
        },
      ],
    });
  });

  onConnect((param: Connection) => {
    addEdges(param);
  });

  const open = () => {};
</script>
<style>
  @import '@vue-flow/core/dist/style.css';
  @import '@vue-flow/core/dist/theme-default.css';
  @import '@vue-flow/controls/dist/style.css';
  @import '@vue-flow/minimap/dist/style.css';
  @import '@vue-flow/node-resizer/dist/style.css';
</style>
<style scoped>
  .dndflow {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 152px);
  }

  .dndflow .vue-flow-wrapper {
    flex-grow: 1;
    height: 100%;
  }
</style>

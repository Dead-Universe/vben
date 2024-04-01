<template>
  <BasicDrawer v-bind="$attrs" @register="innerRegister" :isDetail="true" title="特征工程">
    <Layout>
      <LayoutSider><Sidebar /></LayoutSider>
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

  const { onConnect, addEdges, onEdgeContextMenu, removeEdges } = useVueFlow();

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

  .dndflow {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 152px);
  }

  .dndflow aside {
    padding: 15px 10px;
    border-right: 1px solid #eee;
    background: rgba(16 185 129 / 75%);
    box-shadow: 0 5px 10px #0000004d;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
  }

  .dndflow aside .nodes > * {
    margin-bottom: 10px;
    box-shadow: 5px 5px 10px 2px #00000040;
    font-weight: 500;
    cursor: grab;
  }

  .dndflow aside .description {
    margin-bottom: 10px;
  }

  .dndflow .vue-flow-wrapper {
    flex-grow: 1;
    height: 100%;
  }

  /* @media screen and (min-width: 640px) {
    .dndflow {
      flex-direction: row;
    }

    .dndflow aside {
      min-width: 25%;
    }
  }

  @media screen and (max-width: 639px) {
    .dndflow aside .nodes {
      display: flex;
      flex-direction: row;
      gap: 5px;
    }
  } */
</style>

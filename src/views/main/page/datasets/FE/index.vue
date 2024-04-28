<template>
  <Layout>
    <LayoutSider collapsible collapsedWidth="0" theme="light" width="240">
      <Sidebar />
    </LayoutSider>
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
  <Modal @register="register" />
</template>
<script lang="ts" setup>
  import { Layout, LayoutContent, LayoutSider } from 'ant-design-vue';
  import { type Connection, VueFlow, type GraphNode } from '@vue-flow/core';

  import Sidebar from './Sidebar.vue';
  import Modal from './Modal.vue';
  import DropzoneBackground from './DropzoneBackground.vue';

  import { useContextMenu } from '@/hooks/web/useContextMenu';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';

  import useDragAndDrop from './useDnD';
  import { type Ref, ref } from 'vue';

  const [createContextMenu] = useContextMenu();
  const { createMessage } = useMessage();

  const nodes: Ref<GraphNode[]> = ref([]);

  const {
    onDragOver,
    onDrop,
    onDragLeave,
    isDragOver,
    onEdgeContextMenu,
    removeEdges,
    onNodeContextMenu,
    onConnect,
    removeNodes,
    addEdges,
    toObject,
  } = useDragAndDrop();

  const [register, { openModal: openModal }] = useModal();

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
          label: '设置',
          icon: 'ant-design:edit-outlined',
          handler: () => {
            openModal(true, node);
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
    addEdges({ ...param, animated: true });
  });

  defineExpose({ nodes, toObject });
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
</style>

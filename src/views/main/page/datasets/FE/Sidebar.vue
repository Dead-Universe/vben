<template>
  <div class="aside">
    <div class="description">You can drag these nodes to the pane.</div>

    <div class="nodes">
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')"
        >Input Node</div
      >

      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
        >Default Node</div
      >

      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
        >Output Node</div
      >
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')"
        >Input Node</div
      >

      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
        >Default Node</div
      >

      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
        >Output Node</div
      >
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')"
        >Input Node</div
      >

      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
        >Default Node</div
      >

      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
        >Output Node</div
      >
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')"
        >Input Node</div
      >

      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
        >Default Node</div
      >

      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
        >Output Node</div
      >
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')"
        >Input Node</div
      >

      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
        >Default Node</div
      >

      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
        >Output Node</div
      >
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')"
        >Input Node</div
      >

      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
        >Default Node</div
      >

      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
        >Output Node</div
      >
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')"
        >Input Node</div
      >

      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
        >Default Node</div
      >

      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
        >Output Node</div
      >
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, 'input')"
        >Input Node</div
      >

      <div
        class="vue-flow__node-default"
        :draggable="true"
        @dragstart="onDragStart($event, 'default')"
        >Default Node</div
      >

      <div
        class="vue-flow__node-output"
        :draggable="true"
        @dragstart="onDragStart($event, 'output')"
        >Output Node</div
      >
    </div>
  </div>
</template>
<script setup>
  import useDragAndDrop from './useDnD';

  const { onDragStart } = useDragAndDrop();
</script>
<style scoped>
  .aside {
    width: 100%;
    height: calc(100vh - 152px);
    padding: 15px 10px;
    overflow: auto;
    border-right: 1px solid #eee;
    background: rgba(16 185 129 / 75%);
    box-shadow: 0 5px 10px #0000004d;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
  }

  .aside .description {
    margin-bottom: 10px;
  }

  .aside .nodes > * {
    margin-bottom: 10px;
    box-shadow: 5px 5px 10px 2px #00000040;
    font-weight: 500;
    cursor: grab;
  }
</style>

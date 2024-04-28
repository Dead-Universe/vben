import { type Node, useVueFlow } from '@vue-flow/core';
import { type Ref, ref, watch } from 'vue';

let id = 0;

/**
 * @returns {string} - A unique id.
 */
function getId(): string {
  return `FENode_${id++}`;
}

/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 * @type {{draggedType: Ref<string|undefined>, isDragOver: Ref<boolean>, isDragging: Ref<boolean>}}
 */
const state: {
  draggedType: Ref<string | undefined>;
  isDragOver: Ref<boolean>;
  isDragging: Ref<boolean>;
} = {
  /**
   * The type of the node being dragged.
   */
  draggedType: ref(undefined),
  isDragOver: ref(false),
  isDragging: ref(false),
};

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state;

  const {
    addNodes,
    screenToFlowCoordinate,
    onNodesInitialized,
    updateNode,
    onConnect,
    addEdges,
    onEdgeContextMenu,
    removeEdges,
    onNodeContextMenu,
    removeNodes,
    toObject,
  } = useVueFlow();

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : '';
  });

  function onDragStart(event: DragEvent, type: string, func: string) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type);
      event.dataTransfer.setData('application/func', func);
      event.dataTransfer.effectAllowed = 'move';
    }

    draggedType.value = type;
    isDragging.value = true;

    document.addEventListener('drop', onDragEnd);
  }

  /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
  function onDragOver(event: DragEvent) {
    event.preventDefault();

    if (draggedType.value) {
      isDragOver.value = true;

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
    }
  }

  function onDragLeave() {
    isDragOver.value = false;
  }

  function onDragEnd() {
    isDragging.value = false;
    isDragOver.value = false;
    draggedType.value = undefined;
    document.removeEventListener('drop', onDragEnd);
  }

  /**
   * Handles the drop event.
   *
   * @param {DragEvent} event
   */
  function onDrop(event: DragEvent) {
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    });

    const nodeId = getId();

    const func = event.dataTransfer?.getData('application/func');

    const newNode: Node = {
      id: nodeId,
      type: draggedType.value,
      position,
      data: {
        label: `${func}`,
      },
    };

    /**
     * Align node position after drop, so it's centered to the mouse
     *
     * We can hook into events even in a callback, and we can remove the event listener after it's been called.
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: {
          x: node.position.x - node.dimensions.width / 2,
          y: node.position.y - node.dimensions.height / 2,
        },
      }));

      off();
    });

    addNodes(newNode);
  }

  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
    onConnect,
    addEdges,
    onEdgeContextMenu,
    removeEdges,
    onNodeContextMenu,
    removeNodes,
    toObject,
  };
}

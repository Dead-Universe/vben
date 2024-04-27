<template>
  <div class="aside">
    <CollapseContainer title="特征提取器">
      <Flex vertical gap="middle" align="center" justify="center" class="nodes">
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          Word2Vec
          <BasicHelp
            text="一个用来将单词转换为向量的模型，这些向量在多维空间中捕捉单词的语义信息。"
          />
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          CountVectorizer
          <BasicHelp text="计算文本数据中单词的出现次数，并将其转换为特征向量。" />
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          FeatureHasher
          <BasicHelp text="一种对特征数据进行哈希编码的技术，通常用于高维数据。" />
        </div>
      </Flex>
    </CollapseContainer>
    <CollapseContainer title="特征转换器">
      <Flex vertical gap="middle" align="center" justify="center" class="nodes">
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          Binarizer
          <BasicHelp text="将数值特征二值化。" />
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          PCA
          <BasicHelp text="用于降维的技术，通过保留最重要的特征来减少数据集的复杂性。" />
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          Imputer
          <BasicHelp text="用于处理缺失值，可以使用平均值、中位数或众数来填充。" />
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          Normalizer
          <BasicHelp text="对单个样本进行范数缩放，使之在特定的向量范数（如 L1, L2等）下等于1。" />
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          StandardScaler
          <BasicHelp text="使用均值和标准差来标准化特征。" />
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          MinMaxScaler
          <BasicHelp text="将每个特征缩放到给定的最小值与最大值之间。" />
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          MaxAbsScaler
          <BasicHelp text="按绝对值的最大值缩放数据。" />
        </div>
      </Flex>
    </CollapseContainer>
    <CollapseContainer title="特征选择器">
      <Flex vertical gap="middle" align="center" justify="center" class="nodes">
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          VectorSlicer
          <BasicHelp text="根据索引选择特征子集。" />
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          RFormula
          <BasicHelp text="一个特征转换方式，能够将模型公式转换为特征向量。" />
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          VarianceThresholdSelector
          <BasicHelp text="根据特征的方差选择特征，去除那些方差不满足某个阈值的特征。" />
        </div>
      </Flex>
    </CollapseContainer>
  </div>
</template>
<script lang="ts" setup>
  import useDragAndDrop from './useDnD';
  import { BasicHelp } from '@/components/Basic/index';
  import { Flex } from 'ant-design-vue';

  import { CollapseContainer } from '@/components/Container';

  const { onDragStart } = useDragAndDrop();
</script>
<style scoped>
  .aside {
    width: 100%;
    height: calc(100vh - 152px);
    overflow: auto;
    background-color: #f5f5f5;
  }

  .description {
    color: #000;
    text-align: center;
  }

  .nodes > * {
    width: 200px;
    box-shadow: 2px 2px 4px 2px #00000040;
    font-weight: bold;
    cursor: grab;
  }
</style>

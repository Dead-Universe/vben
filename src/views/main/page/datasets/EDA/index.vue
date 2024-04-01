<template>
  <BasicDrawer v-bind="$attrs" @register="innerRegister" :isDetail="true" title="探索性数据分析">
    <PageWrapper>
      <Chart height="calc(100vh - 184px)" width="100%" ref="chart" />
    </PageWrapper>
    <template #titleToolbar>
      <a-button type="default" @click="open" preIcon="ant-design:setting-outlined"> 设置 </a-button>
    </template>
  </BasicDrawer>
  <Settings @register="register" @set-option="setEChartsOption" />
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawer, useDrawerInner } from '@/components/Drawer';
  import { PageWrapper } from '@/components/Page';
  import Settings from './Settings.vue';
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  import Chart from './Chart.vue';
  import type { EChartsOption } from 'echarts';

  const chart: Ref<any> = ref(null);

  var options: EChartsOption = {};

  var dataset: any = {};

  const [register, { openDrawer }] = useDrawer();

  const [innerRegister] = useDrawerInner((data) => {
    dataset = getDatasetFromBackendById(data.id);
    const axis: any[] = [];
    let i = 0;
    for (const dim of dataset.dimensions) {
      axis.push({
        dim: i++,
        name: dim.name,
        type:
          dim.type === 'int' || dim.type === 'float' || dim.type === 'number'
            ? 'value'
            : dim.type === 'ordinal'
              ? 'category'
              : dim.type === 'time'
                ? 'time'
                : undefined,
      });
    }
    let value = {
      dataset: dataset,
      parallelAxis: axis,
      series: {
        type: 'parallel',
      },
    };
    setEChartsOption(value);
  });

  const getDatasetFromBackendById = (id: any) => {
    // TODO
    console.log(id);
    return {
      dimensions: [
        { name: 'product', type: 'ordinal' },
        { name: '2015', type: 'float' },
        { name: '2016', type: 'float' },
        { name: '2017', type: 'float' },
      ],
      source: [
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1],
      ],
    };
  };

  const setEChartsOption = (value: EChartsOption) => {
    if (!('dataset' in value)) {
      value.dataset = dataset;
    }
    options = value;
    chart.value?.setOptions(options, true);
  };

  const open = () => {
    let value = options;
    if ('dataset' in value) {
      delete value.dataset;
    }
    openDrawer(true, value);
  };
</script>

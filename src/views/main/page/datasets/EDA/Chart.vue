<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { ref, Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';

  interface Props {
    width: string;
    height: string;
  }

  withDefaults(defineProps<Props>(), {
    width: '100%',
    height: '100vh',
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  defineExpose({
    setOptions,
  });
</script>

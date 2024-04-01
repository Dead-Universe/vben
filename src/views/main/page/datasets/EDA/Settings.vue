<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    title="图表设置"
    width="50%"
    showFooter
    @ok="handleOk"
  >
    <PageWrapper>
      <CodeEditor v-model:value="value" :mode="MODE.JSON" style="height: calc(100vh - 181px)" />
    </PageWrapper>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref, defineEmits, type Ref } from 'vue';
  import { CodeEditor, MODE } from '@/components/CodeEditor';
  import { PageWrapper } from '@/components/Page';
  import { message } from 'ant-design-vue';

  import type { EChartsOption } from 'echarts';

  const value: Ref<string> = ref('');

  const [register, { closeDrawer }] = useDrawerInner((data) => setValue(data));

  const emit = defineEmits(['setOption']);

  const handleOk = () => {
    let data = {};
    try {
      data = JSON.parse(value.value);
      emit('setOption', data);
      closeDrawer();
    } catch (e: any) {
      message.error(e.message);
    }
  };

  function setValue(data: EChartsOption) {
    value.value = JSON.stringify(data);
  }
</script>

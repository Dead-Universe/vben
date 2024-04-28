<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="上传数据集"
    defaultFullscreen
    :canFullscreen="false"
    :showCancelBtn="false"
    :showOkBtn="false"
  >
    <PageWrapper title="上传数据集">
      <div class="w-450px mx-auto">
        <Steps :current="current">
          <Steps.Step title="填写数据集信息" />
          <Steps.Step title="上传数据集" />
        </Steps>
      </div>
      <div class="mt-5">
        <Step1 @next="handleStep1Next" v-show="current === 0" />
        <Step2 ref="step2" @prev="handleStepPrev" @next="handleStep2Next" v-show="current === 1" />
      </div>
    </PageWrapper>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { type GraphNode } from '@vue-flow/core';
  import { ref, Ref } from 'vue';
  import Step1 from './Step1.vue';
  import Step2 from './Step2.vue';
  import { PageWrapper } from '@/components/Page';
  import { Steps } from 'ant-design-vue';

  const step2: Ref<any> = ref(null);

  const [register, { closeModal }] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  const current = ref(0);

  function handleStep1Next(step1Values: any) {
    current.value++;
    step2.value ? (step2.value.params = step1Values) : null;
    console.log(step1Values);
  }

  function handleStepPrev() {
    current.value--;
  }

  function handleStep2Next(step2Values: any) {
    closeModal();
    console.log(step2Values);
  }

  async function onDataReceive(data: GraphNode) {
    console.log(data);
  }
</script>

<template>
  <div class="w-120 m-auto">
    <Descriptions>
      <Descriptions.Item v-for="{ field, label } in schemas" :label="label" :key="field">
        {{ params[field] }}
      </Descriptions.Item>
    </Descriptions>
    <BasicUpload
      :maxSize="Number.MAX_SAFE_INTEGER"
      :maxNumber="1"
      :api="uploadApi"
      @change="handleChange"
      :uploadParams="{ type: 'dataset', ...params }"
      resultField="data.url"
      class="my-3"
    />
    <Divider />
    <BasicForm @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { Divider, Descriptions } from 'ant-design-vue';
  import BasicUpload from '@/components/Upload/src/BasicUpload.vue';
  import { schemas } from '@/views/main/page/datasets/data';
  import { ref } from 'vue';
  import { uploadApi } from '@/api/sys/upload';

  const emit = defineEmits(['next', 'prev']);

  const params = ref({});

  const [register] = useForm({
    labelWidth: 80,
    actionColOptions: {
      span: 14,
    },
    resetButtonOptions: {
      text: '上一步',
    },
    submitButtonOptions: {
      text: '完成',
    },
    resetFunc: customResetFunc,
    submitFunc: customSubmitFunc,
  });

  async function customResetFunc() {
    emit('prev');
  }

  const handleChange = (fileList: string[]) => {
    emit('next', fileList);
  };

  async function customSubmitFunc() {
    emit('next', {});
  }

  defineExpose({
    params,
  });
</script>

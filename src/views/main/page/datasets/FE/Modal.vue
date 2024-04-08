<template>
  <BasicModal v-bind="$attrs" @register="register" title="修改属性" @ok="handleOk">
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="modelRef" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      colProps: {
        span: 24,
      },
    },
  ];

  const modelRef = ref({});

  var nodeRef: any = null;
  var nodeData: any = null;
  const [registerForm] = useForm({
    labelWidth: 120,
    schemas,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [register, { closeModal }] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  function onDataReceive(data: any) {
    nodeRef = data;
    nodeData = cloneDeep(data.data);

    // TODO:
    nodeData.t1 = 1;
    nodeData.t2 = 2;

    modelRef.value = { field1: nodeData.t1, field2: nodeData.t2 };
  }

  const cloneDeep = <T,>(target: T): T => {
    if (target === null) {
      return target;
    }
    if (target instanceof Date) {
      return new Date(target.getTime()) as any;
    }
    if (target instanceof Array) {
      const cp = [] as any[];
      (target as any[]).forEach((v) => cp.push(v));
      return cp.map((n: any) => cloneDeep<any>(n)) as any;
    }
    if (typeof target === 'object' && JSON.stringify(target) === '{}') {
      const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
      Object.keys(cp).forEach((k) => {
        cp[k] = cloneDeep<any>(cp[k]);
      });
      return cp as T;
    }
    return target;
  };

  function handleOk(_e: Event) {
    nodeRef ? (nodeRef.data = nodeData) : null;
    closeModal();
  }
</script>

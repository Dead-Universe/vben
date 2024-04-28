<template>
  <BasicModal v-bind="$attrs" @register="register" title="设置属性" @ok="handleOk">
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { cloneDeep } from 'lodash-es';
  import settings from '@/views/main/page/datasets/FE/func';
  import { type GraphNode } from '@vue-flow/core';

  let nodeRef: any = null;
  let [registerForm, { setProps, validate, resetFields, setFieldsValue }] = useForm({});

  const [register, { closeModal }] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  async function onDataReceive(data: GraphNode) {
    nodeRef = data;

    if (nodeRef.data.label !== 'undefined') {
      let key = nodeRef.data.label + 'Settings';
      if (Object.prototype.hasOwnProperty.call(settings, key)) {
        await setProps({
          labelWidth: 140,
          schemas: settings[key],
          showActionButtonGroup: false,
          actionColOptions: {
            span: 24,
          },
        });
        await resetFields();
        await setFieldsValue(nodeRef.data);
      }
    }
  }

  async function handleOk(_e: Event) {
    let values = await validate();
    if (values) {
      nodeRef ? (nodeRef.data = cloneDeep({ label: nodeRef.data.label, ...values })) : null;
      closeModal();
    }
  }
</script>

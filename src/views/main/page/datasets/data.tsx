import { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    required: true,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'description',
    component: 'InputTextArea',
    label: '描述',
    helpMessage: '数据集的详细描述',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'source',
    component: 'Input',
    label: '来源',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'data_type',
    component: 'Input',
    label: '类型',
    colProps: {
      span: 24,
    },
  },
];

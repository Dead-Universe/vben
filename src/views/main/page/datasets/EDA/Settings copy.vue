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
      <BasicTable @register="registerTable" @edit-change="onEditChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction :actions="createActions(record)" />
          </template>
        </template>
        <template #toolbar>
          <a-button type="primary" @click="handleAdd"> 添加 </a-button>
        </template>
      </BasicTable>
    </PageWrapper>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { PageWrapper } from '@/components/Page';
  import { defineEmits, ref } from 'vue';
  import { ActionItem, BasicTable, EditRecordRow, TableAction, useTable } from '@/components/Table';
  import { getBasicColumns, getBasicData } from './tableData';
  import { cloneDeep } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';
  import type { EChartsOption } from 'echarts';

  const [register, { closeDrawer }] = useDrawerInner();

  const { createMessage: msg } = useMessage();

  const emit = defineEmits(['setOption']);

  const setEChartsOption = (value: EChartsOption) => {
    emit('setOption', value);
  };

  const handleOk = () => {
    let options = {
      parallelAxis: [
        { dim: 0, name: 'Price' },
        { dim: 1, name: 'Net Weight' },
        { dim: 2, name: 'Amount' },
        {
          dim: 3,
          name: 'Score',
          type: 'category',
          data: ['Excellent', 'Good', 'OK', 'Bad'],
        },
      ],
      series: {
        type: 'parallel',
        lineStyle: {
          width: 4,
        },
        data: [
          [12.99, 100, 82, 'Good'],
          [9.99, 80, 77, 'OK'],
          [20, 120, 60, 'Excellent'],
        ],
      },
    };
    setEChartsOption(options);
    closeDrawer();
  };

  const columns = getBasicColumns();
  const data = getBasicData();

  const currentEditKeyRef = ref('');

  const [registerTable, { deleteTableDataRecord }] = useTable({
    columns: columns,
    bordered: true,
    actionColumn: {
      width: 160,
      title: 'Action',
      dataIndex: 'action',
    },
    showIndexColumn: false,
    dataSource: data,
    canResize: false,
    showTableSetting: true,
    pagination: false,
  });

  function createActions(record: EditRecordRow): ActionItem[] {
    if (!record.editable) {
      return [
        {
          label: '编辑',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: handleEdit.bind(null, record),
        },
        {
          label: '删除',
          popConfirm: {
            title: '是否删除',
            confirm: handleDelete.bind(null, record),
          },
        },
      ];
    }
    return [
      {
        label: '保存',
        onClick: handleSave.bind(null, record),
      },
      {
        label: '取消',
        popConfirm: {
          title: '是否取消编辑',
          confirm: handleCancel.bind(null, record),
        },
      },
    ];
  }

  function handleAdd() {}

  function handleDelete(record: Recordable) {
    console.log('点击了删除', record.key);
    deleteTableDataRecord(record.key);
  }

  function handleEdit(record: EditRecordRow) {
    currentEditKeyRef.value = record.key;
    record.onEdit?.(true);
  }

  function handleCancel(record: EditRecordRow) {
    currentEditKeyRef.value = '';
    record.onEdit?.(false, false);
  }

  async function handleSave(record: EditRecordRow) {
    // 校验
    msg.loading({ content: '正在保存...', duration: 0, key: 'saving' });
    const valid = await record.onValid?.();
    if (valid) {
      try {
        const data = cloneDeep(record.editValueRefs);
        console.log('data', data);
        //TODO 此处将数据提交给服务器保存
        // ...
        // 保存之后提交编辑状态
        const pass = await record.onEdit?.(false, true);
        if (pass) {
          currentEditKeyRef.value = '';
        }
        msg.success({ content: '数据已保存', key: 'saving' });
      } catch (error) {
        msg.error({ content: '保存失败', key: 'saving' });
      }
    } else {
      msg.error({ content: '请填写正确的数据', key: 'saving' });
    }
  }

  function onEditChange({ column, value, record }) {
    // 本例
    if (column.dataIndex === 'id') {
      record.editValueRefs.name4.value = `${value}`;
    }
    console.log(column, value, record);
  }
</script>

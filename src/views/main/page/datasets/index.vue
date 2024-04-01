<template>
  <PageWrapper :class="prefixCls" title="数据集管理" contentFullHeight fixedHeight>
    <template #headerContent>
      <a-button type="primary" preIcon="ant-design:cloud-upload-outlined">上传</a-button>
    </template>

    <div :class="`${prefixCls}__container`">
      <List item-layout="horizontal" :data-source="list" :loading="initLoading">
        <template #loadMore>
          <div
            v-if="!initLoading && !loading"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-button @click="onLoadMore">加载更多</a-button>
          </div>
        </template>
        <template #renderItem="{ item }">
          <List.Item :key="item.id">
            <template #extra> </template>
            <template #actions>
              <a key="data-analysis" @click="openEDA(item.id)">数据分析</a>
              <a key="feature-engineering" @click="openFE(item.id)">特征工程</a>
              <a key="delete">删除</a>
            </template>
            <Skeleton avatar :title="false" :loading="!!item.loading" active>
              <List.Item.Meta>
                <template #title>
                  {{ item.name }}
                  <a href="https://www.antdv.com/">{{ item.name.last }}</a>
                </template>
                <template #description>
                  {{ item.description }}
                  Ant Design, a design language for background applications, is refined by Ant UED
                  Team
                </template>
                <template #avatar>
                  <Avatar :src="item.picture.large" />
                </template>
              </List.Item.Meta>
            </Skeleton>
          </List.Item>
        </template>
      </List>
    </div>
    <EDA @register="registerEDA" />
    <FE @register="registerFE" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { List, Skeleton, Avatar } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  // import { BasicForm } from '@/components/Form';
  import { PageWrapper } from '@/components/Page';
  import { useDrawer } from '@/components/Drawer';

  // import { defHttp } from '@/utils/http/axios';

  import FE from './FE/Drawer.vue';
  import EDA from './EDA/index.vue';

  const [registerEDA, { openDrawer: openEDADrawer }] = useDrawer();
  const [registerFE, { openDrawer: openFEDrawer }] = useDrawer();

  const prefixCls = 'list-search';
  const count = 10;
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

  const initLoading = ref(true);
  const loading = ref(false);
  const data = ref([]);
  const list = ref([]);

  const onLoadMore = () => {
    loading.value = true;
    let c = [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }));
    list.value = data.value.concat(c as any);
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.value.concat(res.results);
        loading.value = false;
        data.value = newData;
        list.value = newData;
        // nextTick(() => {
        //   // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        //   // In real scene, you can using public method of react-virtualized:
        //   // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        //   window.dispatchEvent(new Event('resize'));
        // });
      });
  };

  const openEDA = (id: number | string) => {
    openEDADrawer(true, { id: id });
  };

  const openFE = (id: number | string) => {
    openFEDrawer(true, { id: id });
  };

  onMounted(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        initLoading.value = false;
        data.value = res.results;
        list.value = res.results;
      });
  });
</script>
<style lang="less" scoped>
  .list-search {
    &__header {
      &-form {
        margin-bottom: -16px;
      }
    }

    &__container {
      padding: 12px;
      background-color: @component-background;
    }
  }
</style>
<style scoped>
  :deep(.vben-page-wrapper-content) {
    overflow-y: auto !important;
  }
</style>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import RawDisplay from '@/components/debug/RawDisplay.vue'

/*
 * 表頭
 *   表頭設定ID
 *   表頭名
 *   表頭種別
 */
const headersSettings = ref([
  {
    id: 1,
    name: '期間1',
    type: '期間1',
  },
  {
    id: 2,
    name: '期間2',
    type: '期間2',
  },
])

/*
 * 表側
 *   表側設定ID
 *   マスタID
 *   表頭種別
 */
const listSettings = ref([
  {
    id: 1,
    masterId: 1,
    type: '指標1',
  },
  {
    id: 2,
    masterId: 2,
    type: '指標2',
  },
])

/*
 * 指標
 *   表頭ID
 *   表側設定ID
 *   指標
 */
const indicators = ref([
  {
    headerId: 1,
    listSettingId: 1,
    indicator: ['指標1-1', '指標1-2'],
  },
  {
    headerId: 2,
    listSettingId: 2,
    indicator: ['指標2-1', '指標2-2'],
  },
])
</script>

<template>
  <main class="detail-setting">
    <div>
      <div>detail setting ver 2</div>
      <div class="buttons">
        <!-- 戻るボタン -->
        <div>
          <button type="button" @click="$emit('cancel')">戻る</button>
        </div>
        <!-- 適用ボタン -->
        <div>
          <button type="button" @click="$emit('apply')">適用</button>
        </div>
      </div>

      <div>D&Dして入れ替えられます.</div>

      <div class="table-drag-area">
        <!-- 表側部分 -->
        <table class="table table-striped">
          <thead>
            <tr>
              <th>/</th>
            </tr>
          </thead>
          <draggable v-model="listSettings" tag="tbody" item-key="id">
            <template #item="{ element }">
              <tr>
                <td>
                  <div>id: {{ element.id }}</div>
                  <div>masterId: {{ element.masterId }}</div>
                  <div>type: {{ element.type }}</div>
                </td>
              </tr>
            </template>
          </draggable>
        </table>

        <!-- 表頭、指標部分 -->
        <table class="table table-striped">
          <draggable
            v-model="headersSettings"
            :item-key="(key) => key"
            tag="thead"
            class="thead-dark"
          >
            <template #item="{ element: header }">
              <th scope="col">
                <div>{{ header }}</div>
              </th>
            </template>
          </draggable>

          <tbody>
            <tr v-for="item in listSettings" :key="item.id">
              <td v-for="header in headersSettings" :key="header">
                <div>
                  {{
                    indicators.find(
                      (indicator) =>
                        indicator.headerId === item.id && indicator.listSettingId === header.id,
                    )
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="debug-area">
      <RawDisplay title="headers" :value="headersSettings" />
      <RawDisplay title="list" :value="listSettings" />
      <RawDisplay title="indicators" :value="indicators" />
    </div>
  </main>
</template>

<style>
.detail-setting {
  display: flex;
  justify-content: space-around;
}
.table-drag-area {
  height: 700px;
  width: 700px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.drag-area {
  width: 500px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

/* テーブル基本設定 */
.table {
  border-collapse: collapse;
  margin-bottom: 1rem;
  color: #212529;
}

/* セルの余白と境界線 */
.table th,
.table td {
  width: 200px;
  height: 200px;
  padding: 0.75rem;
  vertical-align: top;
  border: 1px solid #dee2e6;
}

/* ストライプ行 */
.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

/* ヘッダーのスタイル */
.thead-dark th {
  background-color: #343a40;
  color: #fff;
  border-bottom: 2px solid #454d55;
}

/* ホバー時の効果（任意） */
.table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.075);
}

.debug-area {
  width: 500px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
}
</style>

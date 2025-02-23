<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import RawDisplay from '@/components/debug/RawDisplay.vue'

function onStart(e: Event) {
  console.log('onStart', e)
}

const myList = ref(['A', 'B', 'C'])
const meals = ref(['Hamburger', 'Pizza', 'Spaghetti', 'Tacos', 'Teriyaki Chicken'])
const headers = ref(['no', 'id', 'name', 'sport'])
const list = ref([
  { dummy: 'dummy', id: 1, name: 'Abby', sport: 'basket' },
  { dummy: 'dummy', id: 2, name: 'Brooke', sport: 'foot' },
  { dummy: 'dummy', id: 3, name: 'Courtenay', sport: 'volley' },
  { dummy: 'dummy', id: 4, name: 'David', sport: 'rugby' },
])
</script>

<template>
  <main class="detail-setting">
    <div>
      <div>detail setting</div>
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
      <div class="drag-area">
        <table class="table table-striped">
          <draggable
            @start="onStart"
            v-model="headers"
            :item-key="(key) => key"
            tag="thead"
            class="thead-dark"
            filter=".ignore-elements"
          >
            <template #item="{ element: header }">
              <th scope="col" :class="header === 'no' ? 'ignore-elements' : ''">
                <div>{{ header }}</div>
              </th>
            </template>
          </draggable>

          <draggable v-model="list" tag="tbody" item-key="name">
            <template #item="{ element }">
              <tr>
                <td v-for="header in [...headers]" :key="header">{{ element[header] }}</td>
              </tr>
            </template>
          </draggable>
        </table>
      </div>
    </div>

    <div class="debug-area">
      <RawDisplay title="headers" :value="headers" />
      <RawDisplay title="list" :value="list" />
    </div>
  </main>
</template>

<style>
.detail-setting {
  display: flex;
  justify-content: space-around;
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
  width: 100px;
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
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
}
</style>

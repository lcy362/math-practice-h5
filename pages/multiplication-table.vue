<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('multiplicationTable.title')} | ${t('site.title')}`,
  description: () => t('multiplicationTable.description'),
  ogTitle: () => `${t('multiplicationTable.title')} | ${t('site.title')}`,
  ogDescription: () => t('multiplicationTable.description'),
})

const tableData = computed(() => {
  const rows = []
  for (let i = 1; i <= 9; i++) {
    const cols = []
    for (let j = 1; j <= 9; j++) {
      cols.push({ multiplier: i, multiplicand: j, result: i * j })
    }
    rows.push(cols)
  }
  return rows
})

const highlightRow = ref<number | null>(null)
const highlightCol = ref<number | null>(null)

function onCellHover(row: number, col: number) {
  highlightRow.value = row
  highlightCol.value = col
}

function onCellLeave() {
  highlightRow.value = null
  highlightCol.value = null
}

function isHighlighted(row: number, col: number) {
  return highlightRow.value === row || highlightCol.value === col
}

function isActive(row: number, col: number) {
  return highlightRow.value === row && highlightCol.value === col
}
</script>

<template>
  <div class="multiplication-page">
    <div class="content-card">
      <h1>{{ t('multiplicationTable.title') }}</h1>
      <p class="desc">{{ t('multiplicationTable.intro') }}</p>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th class="corner">×</th>
              <th v-for="j in 9" :key="j" :class="{ highlighted: highlightCol === j }">{{ j }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in tableData" :key="i">
              <th :class="{ highlighted: highlightRow === i + 1 }">{{ i + 1 }}</th>
              <td
                v-for="(cell, j) in row"
                :key="j"
                :class="{ highlighted: isHighlighted(i + 1, j + 1), active: isActive(i + 1, j + 1) }"
                @mouseenter="onCellHover(i + 1, j + 1)"
                @mouseleave="onCellLeave"
              >
                {{ cell.result }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.multiplication-page {
  display: flex;
  justify-content: center;
}

.content-card {
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 640px;

  h1 {
    font-size: 24px;
    margin: 0 0 8px;
    text-align: center;
  }

  .desc {
    color: #666;
    text-align: center;
    margin: 0 0 24px;
  }
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  text-align: center;

  th, td {
    padding: 10px 6px;
    border: 1px solid #eee;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #555;

    &.corner {
      background: #e8e8e8;
    }

    &.highlighted {
      background: #e8f2ff;
      color: #4a90e2;
    }
  }

  td {
    transition: all 0.15s;

    &.highlighted {
      background: #f0f7ff;
    }

    &.active {
      background: #4a90e2;
      color: white;
      font-weight: 700;
      border-radius: 4px;
    }
  }
}
</style>

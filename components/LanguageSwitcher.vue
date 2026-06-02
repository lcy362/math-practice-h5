<script setup lang="ts">
const { locales, locale, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}

function selectLocale(code: string) {
  setLocale(code)
  isOpen.value = false
}

// Close on outside click
function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.lang-switcher')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="lang-switcher">
    <button class="lang-btn" @click="toggle" :aria-label="'Language'">
      <span class="lang-icon">🌐</span>
      <span class="lang-name">{{ locales.find(l => l.code === locale)?.name }}</span>
      <span class="arrow" :class="{ open: isOpen }">▾</span>
    </button>
    <ul v-if="isOpen" class="lang-dropdown">
      <li
        v-for="loc in locales"
        :key="loc.code"
        :class="{ active: loc.code === locale }"
      >
        <NuxtLink :to="switchLocalePath(loc.code)" @click="isOpen = false">
          {{ loc.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.lang-switcher {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    border-color: #4a90e2;
  }
}

.lang-icon {
  font-size: 16px;
}

.arrow {
  font-size: 12px;
  transition: transform 0.2s;

  &.open {
    transform: rotate(180deg);
  }
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 4px 0;
  min-width: 120px;
  z-index: 100;

  li {
    a {
      display: block;
      padding: 8px 16px;
      color: #333;
      text-decoration: none;
      font-size: 14px;

      &:hover {
        background: #f5f5f5;
      }
    }

    &.active a {
      color: #4a90e2;
      font-weight: 600;
    }
  }
}
</style>

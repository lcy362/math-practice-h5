<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <NuxtLink :to="localePath('/')" class="logo-link">
        <img src="/logo.png" alt="Logo" class="logo-img" />
        <h1 class="logo-text">{{ t('home.title') }}</h1>
      </NuxtLink>
      <LanguageSwitcher />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background: white;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #333;
}

.logo-img {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 15px;
  }
}
</style>

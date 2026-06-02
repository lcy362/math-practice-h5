<template>
  <div class="app-wrapper">
    <AppHeader />
    <main class="app-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 16px;
}
</style>

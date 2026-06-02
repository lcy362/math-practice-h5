<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <nav class="footer-links">
        <NuxtLink :to="localePath('/')">{{ t('footer.about') }}</NuxtLink>
        <span class="sep">·</span>
        <NuxtLink :to="localePath('/')">{{ t('footer.privacy') }}</NuxtLink>
      </nav>
      <p class="copyright">{{ t('footer.copyright') }}</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  background: #f8f9fa;
  border-top: 1px solid #eee;
  padding: 24px 16px;
  margin-top: auto;
}

.footer-inner {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.footer-links {
  margin-bottom: 8px;

  a {
    color: #666;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      color: #4a90e2;
    }
  }

  .sep {
    margin: 0 8px;
    color: #ccc;
  }
}

.copyright {
  color: #999;
  font-size: 12px;
  margin: 0;
}
</style>

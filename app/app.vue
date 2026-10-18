<script setup lang="ts">
const notification = shallowRef<{ text: string; id: number } | null>(null)
let notificationId = 0

function notify(text: string) {
  notification.value = { text, id: ++notificationId }
}
</script>

<template>
  <a class="skip-link" href="#main">К содержимому</a>
  <div id="top" class="portfolio">
    <PortfolioNav @notify="notify" />
    <main id="main" class="page-container">
      <PortfolioHero />
      <WorkExperience />
      <PortfolioCases @notify="notify" />
      <PortfolioContacts @notify="notify" />
    </main>
    <footer class="page-container site-footer">
      <p>© 2026 · Все права защищены</p>
      <a href="#top" class="back-to-top">
        <img src="/images/859-7062-imgIcon.svg" alt="" width="14" height="30" />
        <span>наверх</span>
      </a>
    </footer>
    <FeedbackToast :notification="notification" @dismiss="notification = null" />
  </div>
</template>

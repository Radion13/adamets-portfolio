<script setup lang="ts">
import { caseArtwork } from '~/data/caseArtwork'

const artwork = caseArtwork.featured
// Reveal from the left edge toward the phone on the right.
const orderedDoodles = [...artwork.doodles].sort((left, right) => left.hover[0] - right.hover[0])
const caseDialog = useTemplateRef<HTMLDialogElement>('caseDialog')

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === caseDialog.value) caseDialog.value?.close()
}
</script>

<template>
  <button class="case-card featured-card" type="button" aria-haspopup="dialog" aria-label="Посмотреть кейс: раздел «Госуслуги»" @click="caseDialog?.showModal()">
    <span class="featured-surface" data-nav-backdrop>
      <CaseDoodle v-for="(doodle, index) in orderedDoodles" :key="doodle.node" :doodle="doodle" :canvas="artwork.size" :enter-delay="index * 140" />
      <img class="featured-phone" data-nav-backdrop-ignore src="/images/phone-services.png" width="667" height="1020" alt="Раздел «Госуслуги»: документы, налоги, штрафы и другие сервисы" loading="lazy" />
      <span class="feature-copy">
        <span class="feature-title">Раздел «Госуслуги»</span>
        <span class="feature-description">Спроектировал ключевые сценарии работы продукта и с нуля разработал интерфейс.</span>
      </span>
    </span>
  </button>
  <dialog ref="caseDialog" class="case-dialog" aria-labelledby="case-dialog-title" @click="closeOnBackdrop">
    <div class="dialog-content">
      <button class="dialog-close" type="button" aria-label="Закрыть кейс" @click="caseDialog?.close()">×</button>
      <div class="dialog-copy">
        <p class="dialog-eyebrow">Eurasian bank</p>
        <h2 id="case-dialog-title">Раздел «Госуслуги»</h2>
        <p>Раздел «Госуслуги» и «Мои документы» в новом приложении Евразийского банка, разработанные с нуля.</p>
        <h3>Моя роль</h3>
        <p>Спроектировал ключевые сценарии работы продукта и с нуля разработал интерфейс.</p>
        <p>Сервисы: оплаты штрафа и налога, регистрация брака, покупка госномера, регистрация ип, информация об осмс и другие.</p>
      </div>
      <img class="dialog-phone" src="/images/phone-services.png" width="667" height="1020" alt="Интерфейс раздела «Госуслуги» в приложении Eurasian Bank" />
    </div>
  </dialog>
</template>

<style scoped>
.featured-card { --card-motion-duration: 300ms; --card-motion-easing: ease-out; grid-column: 1 / -1; aspect-ratio: 933 / 586; margin-inline-end: 6px; }
.featured-surface { position: absolute; inset: 0; background: #f4f4f5; mask: url('/images/859-7026-imgShape.svg') center / 100% 100% no-repeat; }
.featured-surface::before { content: ''; position: absolute; inset: 0; background: url('/images/cases/featured-card-fill.svg') center / 100% 100% no-repeat; opacity: 0; transition: opacity var(--card-motion-duration) var(--card-motion-easing); }
.featured-card:is(:hover, :focus-visible) .featured-surface::before { opacity: 1; }
.featured-card:is(:hover, :focus-visible) .feature-copy { color: white; }
.featured-phone { position: absolute; z-index: 2; top: 12.97%; left: 49.04%; width: 35.74%; height: auto; pointer-events: none; }
.feature-copy { position: absolute; z-index: 3; top: 63.65%; left: 8.79%; width: 36.66%; display: grid; gap: 1.71cqw; text-align: start; color: var(--text-body); transition: color 300ms ease-out; }
.feature-title { font-size: 3.43cqw; font-weight: 700; line-height: 1.19; }
.feature-description { font-size: 2.572cqw; line-height: 1.21; font-weight: 500; }
.case-dialog { border: 0; border-radius: 36px; padding: 0; width: min(960px, calc(100% - 40px)); max-height: calc(100dvh - 48px); background: var(--background); color: var(--text-body); font-family: var(--font-body); }
.case-dialog::backdrop { background: rgb(24 33 48 / 35%); backdrop-filter: blur(8px); }
.dialog-content { position: relative; display: grid; grid-template-columns: 1fr 0.8fr; align-items: start; gap: 40px; padding: 64px 48px 0; }
.dialog-close { position: absolute; right: 18px; top: 14px; width: 44px; height: 44px; border-radius: 50%; background: var(--nav-surface); font: 32px/1 var(--font-ui); transition: background var(--transition); }
.dialog-close:hover { background: var(--nav-hover); }
.dialog-eyebrow { color: var(--text-secondary); font-size: 24px; }
.dialog-copy h2 { font-size: 40px; margin-block: 8px 24px; }
.dialog-copy h3 { font-size: 28px; margin-block: 24px 12px; }
.dialog-copy > p:not(.dialog-eyebrow) { font-size: 22px; line-height: 1.4; margin-block-end: 20px; }
.dialog-phone { display: block; width: 100%; height: auto; align-self: end; }
@media (max-width: 550px) {
  .featured-card { aspect-ratio: 0.75; margin: 0; border-radius: 48px; overflow: hidden; }
  .featured-card :deep(.case-doodle) { top: 42%; }
  .featured-surface { mask: none; }
  .featured-phone { width: 64%; left: 35%; top: 42%; }
  .feature-copy { top: 8%; left: 8%; width: 82%; gap: 12px; }
  .feature-title { font-size: 8cqw; }
  .feature-description { font-size: 5.8cqw; }
  .dialog-content { grid-template-columns: 1fr; padding: 60px 24px 0; gap: 20px; }
  .dialog-copy h2 { font-size: 32px; }
  .dialog-phone { max-width: 260px; margin-inline: auto; }
}
</style>

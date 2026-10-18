<script setup lang="ts">
import { eurasianBank, upcomingCases } from '~/data/portfolio'

const emit = defineEmits<{ notify: [message: string] }>()
</script>

<template>
  <section id="cases" class="cases" aria-label="Кейсы">
    <SectionHeading title="Кейсы" icon="cases" />
    <CompanyCaseStudy :company="eurasianBank">
      <div class="case-grid">
        <FeaturedCase />
        <button v-for="item in upcomingCases" :key="item.title" class="case-card mini-card" type="button" :aria-label="`${item.title} — кейс скоро появится`" @click="emit('notify', `«${item.title}» — кейс скоро появится.`)">
          <span class="mini-card-heading">{{ item.title }}</span>
          <img class="coming-soon" src="/images/859-7027-imgFrame2147237444.svg" width="92" height="36" alt="Скоро" loading="lazy" />
          <span v-for="(doodle, index) in item.doodles" :key="doodle" class="mini-doodle" :class="index === 0 ? 'mini-doodle--one' : 'mini-doodle--two'" aria-hidden="true"><img :src="`/images/${doodle}`" alt="" loading="lazy" /></span>
          <span class="mini-card-mask">
            <img class="mini-phone" src="/images/phone-documents.png" width="594" height="785" alt="Интерфейс раздела «Все документы» в приложении банка" loading="lazy" />
          </span>
        </button>
      </div>
    </CompanyCaseStudy>
  </section>
</template>

<style scoped>
.cases { margin-block-start: 168px; scroll-margin-block-start: 40px; }
.case-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 16px; padding-block-start: 41px; min-inline-size: 0; }
.mini-card { aspect-ratio: 462 / 522; background: url('/images/859-7027-imgShape.svg') center / 100% 100% no-repeat; text-align: center; }
.mini-card::before { content: ''; position: absolute; inset: 0; background: var(--accent); mask: url('/images/859-7027-imgShape.svg') center / 100% 100% no-repeat; opacity: 0; transition: opacity 450ms ease-out; }
.mini-card:is(:hover, :focus-visible)::before { opacity: 1; }
.mini-card:is(:hover, :focus-visible) .mini-card-heading { color: white; }
.mini-card:is(:hover, :focus-visible) .coming-soon { filter: brightness(0) invert(1); }
.mini-card-heading { position: absolute; top: 7.66%; inset-inline: 12px; font-size: 6.926cqw; font-weight: 700; line-height: 1.19; transition: color 350ms ease-out; }
.coming-soon { position: absolute; top: 16.47%; left: 40.04%; width: 20.016%; height: auto; }
.mini-card-mask { position: absolute; inset: 0; mask: url('/images/859-7027-imgShape.svg') center / 100% 100% no-repeat; }
.mini-phone { position: absolute; top: 24.88%; left: 17.78%; width: 64.3%; height: auto; transition: transform 800ms var(--spring); }
.mini-doodle { position: absolute; width: 18%; transition: transform 800ms var(--spring); }
.mini-doodle img { display: block; width: 100%; height: auto; }
.mini-doodle--one { top: 29.2%; left: 63%; }
.mini-doodle--two { top: 39%; left: 34%; }
.mini-card:is(:hover, :focus-visible) .mini-phone { transform: translateY(-2px); }
.mini-card:is(:hover, :focus-visible) .mini-doodle--one { transform: translate(80%, -40%) rotate(-12deg); }
.mini-card:is(:hover, :focus-visible) .mini-doodle--two { transform: translate(-150%, -95%) rotate(12deg); }
@media (max-width: 850px) {
  .cases { margin-block-start: 104px; }
  .case-grid { padding: 0; gap: 24px 16px; }
}
@media (max-width: 550px) {
  .cases { margin-block-start: 80px; }
  .case-grid { grid-template-columns: 1fr; gap: 24px; }
  .mini-card-heading { font-size: 8cqw; }
  .mini-doodle--one img { width: 62px; height: auto; }
  .mini-doodle--two img { width: 40px; height: auto; }
}
</style>

<script setup lang="ts">
import { contacts } from '~/data/portfolio'

const emit = defineEmits<{ notify: [message: string] }>()
</script>

<template>
  <section id="contacts" class="contacts" aria-labelledby="contacts-title">
    <div class="hand-divider" aria-hidden="true" />
    <div class="contacts-content">
      <img class="contact-doodle" src="/images/contact-doodle.png" width="72" height="72" alt="" loading="lazy" />
      <h2 id="contacts-title">Давайте вместе создадим что-то значимое,<br class="desktop-break" /> напишите мне в:</h2>
      <ul class="contact-list">
        <li v-for="contact in contacts" :key="contact.label">
          <a v-if="contact.href" :href="contact.href" class="contact-button" data-nav-backdrop target="_blank" rel="noopener noreferrer">{{ contact.label }}</a>
          <button v-else class="contact-button" data-nav-backdrop type="button" :aria-label="`${contact.label} — ссылка появится позже`" @click="emit('notify', `Ссылка на ${contact.label} скоро появится.`)">{{ contact.label }}</button>
        </li>
      </ul>
    </div>
    <div class="hand-divider" aria-hidden="true" />
  </section>
</template>

<style scoped>
.contacts { margin-block-start: 104px; scroll-margin-block-start: 32px; }
.contacts-content { display: flex; flex-direction: column; align-items: center; padding-block: 100px 104px; text-align: center; }
.contact-doodle { display: block; width: 72px; height: 72px; transition: transform 450ms var(--spring); }
.contact-doodle:hover { transform: rotate(-12deg); }
h2 { max-width: 1182px; margin-block-start: 20px; padding: 8px; font: 700 54px/1.26 var(--font-hand); }
.contact-list { display: grid; grid-template-columns: repeat(6, minmax(0, 182px)); gap: 16px; justify-content: center; width: 100%; margin-block-start: 52px; padding: 0; list-style: none; }
.contact-button { display: grid; place-items: center; position: relative; width: 100%; aspect-ratio: 182 / 82; background: url('/images/859-7031-imgShape.svg') center / 100% 100% no-repeat; font: 400 40px/1.2 var(--font-hand); color: var(--text-primary); transition: transform 300ms var(--spring), color var(--transition); }
.contact-button::before { content: ''; position: absolute; z-index: -1; inset: 0; background: var(--accent); mask: url('/images/859-7031-imgShape.svg') center / 100% 100% no-repeat; opacity: 0; transition: opacity 300ms ease-out; }
.contact-button { isolation: isolate; }
.contact-button:hover, .contact-button:focus-visible { color: white; }
.contact-button:is(:hover, :focus-visible)::before { opacity: 1; }
@media (max-width: 1100px) { .contact-button { font-size: 32px; } }
@media (max-width: 850px) {
  .contacts { margin-block-start: 80px; }
  .contacts-content { padding-block: 72px; }
  h2 { font-size: 44px; }
  .contact-list { grid-template-columns: repeat(3, minmax(0, 182px)); margin-block-start: 36px; }
  .contact-button { font-size: 36px; }
}
@media (max-width: 550px) {
  .contacts { margin-block-start: 64px; }
  .contacts-content { padding-block: 56px; }
  h2 { font-size: 38px; line-height: 1.15; padding-inline: 0; }
  .desktop-break { display: none; }
  .contact-list { grid-template-columns: repeat(2, minmax(0, 182px)); gap: 12px; margin-block-start: 32px; }
}
</style>

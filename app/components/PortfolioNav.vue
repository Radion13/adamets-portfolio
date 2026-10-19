<script setup lang="ts">
import { resumeUrl } from '~/data/portfolio'

const emit = defineEmits<{ notify: [message: string] }>()
const activeSection = shallowRef<'about' | 'cases' | 'contacts'>('about')
const navigation = useTemplateRef<HTMLElement>('navigation')
const onColor = useNavigationContrast(navigation)

onMounted(() => {
  const cases = document.getElementById('cases')
  const contacts = document.querySelector('#contacts .contact-doodle')
  let frame = 0

  function updateSection() {
    frame = 0
    const activationLine = Math.min(window.innerHeight * 0.35, 240)
    const atPageEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
    if (contacts && (contacts.getBoundingClientRect().top <= activationLine || atPageEnd)) {
      activeSection.value = 'contacts'
    } else if (cases && cases.getBoundingClientRect().top <= activationLine) {
      activeSection.value = 'cases'
    } else {
      activeSection.value = 'about'
    }
  }

  function scheduleUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateSection)
  }

  const resizeObserver = new ResizeObserver(scheduleUpdate)
  resizeObserver.observe(document.body)
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate)
  updateSection()

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)
    resizeObserver.disconnect()
    window.cancelAnimationFrame(frame)
  })
})
</script>

<template>
  <header class="site-header">
    <nav ref="navigation" class="navigation" aria-label="Основная навигация">
      <a href="#top" class="nav-round nav-logo" data-nav-item="logo" :class="{ 'is-active': activeSection === 'about', 'is-on-color': onColor.has('logo') }" :aria-current="activeSection === 'about' ? 'location' : undefined" aria-label="Радион — в начало">
        <img src="/images/859-7065-imgImg.svg" width="42" height="46" alt="" />
      </a>
      <div class="nav-menu">
        <NavMenuLink href="#cases" item="cases" :active="activeSection === 'cases'" :on-color="onColor.has('cases')">кейсы</NavMenuLink>
        <NavMenuLink href="#about" item="about" :on-color="onColor.has('about')">кто я?</NavMenuLink>
        <NavMenuLink href="#contacts" item="contacts" :active="activeSection === 'contacts'" :on-color="onColor.has('contacts')">контакты</NavMenuLink>
      </div>
      <a v-if="resumeUrl" :href="resumeUrl" class="nav-round" data-nav-item="resume" :class="{ 'is-on-color': onColor.has('resume') }" target="_blank" rel="noopener noreferrer" aria-label="Открыть резюме">cv</a>
      <button v-else type="button" class="nav-round" data-nav-item="resume" :class="{ 'is-on-color': onColor.has('resume') }" aria-label="Резюме — скоро" @click="emit('notify', 'Резюме скоро появится здесь.')">cv</button>
    </nav>
  </header>
</template>

<style scoped>
.site-header { position: sticky; top: 32px; z-index: 10; margin-block-start: 32px; }
.navigation { display: flex; align-items: center; justify-content: center; gap: 11px; width: fit-content; margin-inline: auto; font: 400 16px/1.2 var(--font-ui); }
.nav-round, .nav-menu { background: var(--nav-surface); backdrop-filter: blur(10px); border-radius: 124px; }
.nav-round { display: grid; place-items: center; inline-size: 70px; block-size: 72px; flex-shrink: 0; color: var(--text-secondary); transition: background var(--transition), transform var(--transition), color var(--transition); }
.nav-logo img { transition: transform 400ms var(--ease-out), filter 180ms ease-out; }
.nav-logo:not(.is-active):hover img { filter: brightness(0) saturate(100%) invert(23%) sepia(16%) saturate(1000%) hue-rotate(179deg); }
.nav-menu { display: flex; align-items: center; gap: 8px; padding: 16px; }
.nav-logo.is-active img { filter: brightness(0) saturate(100%) invert(31%) sepia(94%) saturate(4562%) hue-rotate(347deg) brightness(100%) contrast(110%); }
.nav-round:hover { color: var(--text-primary); }
.nav-round.is-on-color { --nav-outline-color: #fff; color: #fff; outline-color: currentColor; }
.nav-logo.is-on-color img, .nav-logo.is-on-color:hover img { filter: brightness(0) invert(1); }
@media (max-width: 600px) {
  .site-header { top: 16px; margin-block-start: 20px; }
  .navigation { gap: 6px; font-size: 13px; }
  .nav-round { inline-size: 48px; block-size: 52px; }
  .nav-logo img { inline-size: 31px; block-size: auto; }
  .nav-menu { gap: 0; padding: 4px; }
}
@media (max-width: 360px) {
  .navigation { gap: 4px; font-size: 12px; }
  .nav-round { inline-size: 44px; }
}
</style>

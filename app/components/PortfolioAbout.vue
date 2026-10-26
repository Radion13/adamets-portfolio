<template>
  <section id="about" class="about" aria-labelledby="about-title">
    <div class="hand-divider" aria-hidden="true" />
    <div class="about-content">
      <SectionHeading title="Кто я?" icon="about" title-id="about-title" />
      <p class="about-copy">Молодой талантливый дизайнер, который с детства мечтает стать супергероем из комиксов и покорить мир, но в реальной жизни он — ?</p>
    </div>
  </section>
</template>

<style scoped>
.about { margin-block-start: 104px; scroll-margin-block-start: 32px; }
.about-content { padding-block-start: 97px; }
.about-copy { max-inline-size: 885px; margin: 22px auto 0; font: 400 48px/1.25 var(--font-hand); }
@media (max-width: 850px) {
  .about { margin-block-start: 80px; }
  .about-content { padding-block-start: 65px; }
  .about-copy { font-size: 40px; }
}
@media (max-width: 550px) {
  .about { margin-block-start: 64px; }
  .about-content { padding-block-start: 49px; }
  .about-copy { margin-block-start: 20px; font-size: 32px; }
}
</style>

<template>
  <section id="intro" class="hero" aria-labelledby="intro-title">
    <div class="hero-copy">
      <h1 id="intro-title">Привет, я Радион</h1>
      <p class="intro">Проектирую интерфейсы с 2019 года.<br />Мне нравится создавать дизайн, обеспечивающий качественный и продуманный пользовательский опыт.</p>
      <img class="intro-divider" src="/images/859-6559-imgDivider.svg" alt="" width="625" height="3" />
      <p class="specialties">b2b, b2c, crm, сэд, финтех, фантех</p>
    </div>
    <div class="hero-art">
      <img src="/images/859-6566-imgImage135Vectorized.svg" width="331" height="450" alt="Иллюстрация Радиона в синем худи с чашкой кофе" fetchpriority="high" />
    </div>
  </section>
</template>

<style scoped>
.hero { display: grid; grid-template-columns: minmax(0, 1fr) 31%; gap: 5.8%; margin-block-start: 79px; min-block-size: 472px; scroll-margin-block-start: 48px; }
.hero-copy { padding-block-start: 89px; font-family: var(--font-hand); }
h1 { font-size: clamp(30px, 2.381vw, 36px); line-height: 1.25; font-weight: 400; }
.intro { margin-block-start: 20px; font-size: clamp(35px, 3.175vw, 48px); line-height: 1.25; font-weight: 400; }
.intro-divider { display: block; margin-block: 18.5px; max-inline-size: 100%; block-size: 3px; }
.specialties { font-size: clamp(26px, 2.117vw, 32px); line-height: 1.25; color: var(--text-secondary); }
.hero-art { padding-block-start: 22px; padding-inline-start: 25px; }
.hero-art img { display: block; max-inline-size: 100%; block-size: auto; transform-origin: center bottom; transition: transform 650ms var(--ease-out); }
.hero-art:hover img { transform: translateY(-6px) rotate(2deg); }
@media (max-width: 1000px) {
  .hero { margin-block-start: 64px; min-block-size: 390px; grid-template-columns: minmax(0, 1fr) 30%; gap: 5%; }
  .hero-copy { padding-block-start: 42px; }
  .hero-art { padding-inline-start: 0; padding-block-start: 36px; }
  .intro { font-size: 36px; }
}
@media (max-width: 700px) {
  .hero { grid-template-columns: 1fr; gap: 28px; margin-block-start: 58px; }
  .hero-copy { padding-block-start: 0; }
  h1 { font-size: 30px; }
  .intro { font-size: clamp(32px, 7.5vw, 42px); margin-block-start: 16px; }
  .specialties { font-size: 26px; }
  .intro-divider { margin-block: 18px; }
  .hero-art { justify-self: center; padding: 0; inline-size: 230px; }
}
</style>

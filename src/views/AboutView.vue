<template>
  <div class="about">
    <!-- Page title - only visible on mobile -->
    <h1 class="about__page-title">About</h1>

    <div class="about__content">
      <!-- About DTT section -->
      <div class="about__section">
        <h2 class="about__title">About DTT Real Estate</h2>
        <p class="about__text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consectetur dolore dolores,
          eveniet exercitationem, expedita illum ipsa iure necessitatibus, nesciunt nisi optio quam
          quisquam quo rem repudiandae sunt temporibus ut? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Dolor dolores eveniet laborum modi neque odio q
        </p>
        <p class="about__text about__text--spaced">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi cumque cupiditate
          facere facilis id laborum molestias numquam perspiciatis.
        </p>
      </div>

      <!-- Design and Development section -->
      <div class="about__section">
        <h2 class="about__subtitle">Design and Development</h2>
        <div class="about__dtt">
          <img src="@/assets/images/img_logo_dtt@3x.png" alt="DTT Logo" class="about__dtt-logo" />
          <div class="about__dtt-info">
            <p class="about__dtt-name">By DTT</p>
            <a href="https://www.d-dtt.nl" target="_blank" class="about__dtt-link">www.d-dtt.nl</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * AboutView - displays information about DTT Real Estate
 * and the Design and Development team.
 * This page is accessible via the About link in the navigation header.
 */
</script>

<style scoped>
.about {
  padding: clamp(100px, 10%, 120px) clamp(20px, 20%, 350px);
}

.about__dtt {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.about__section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.about__title {
  font-family: var(--font-primary);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.about__dtt-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.about__dtt-name {
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
}

.about__dtt-logo {
  height: 70px;
}

.about__dtt-link {
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  color: var(--color-hyperlink);
  text-decoration: none;
}

.about__dtt-link:hover {
  text-decoration: underline;
}

.about__content {
  padding-top: var(--spacing-lg);
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.about__subtitle {
  font-family: var(--font-primary);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.about__text {
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
  padding-top: var(--spacing-lg);
}

.about__text--spaced {
  margin-top: var(--spacing-md);
}

.about__page-title {
  display: none;
}

@media (max-width: 768px) {
  .about {
    padding: clamp(16px, 3%, 20px) clamp(16px, 5%, 20px);
  }

  .about__page-title {
    display: block;
    text-align: center;
    font-family: var(--font-primary);
    font-size: var(--font-size-h1-mobile);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-lg);
  }

  .about__title {
    font-size: var(--font-size-h1-mobile);
  }

  .about__content {
    max-width: 100%;
    padding-top: var(--spacing-md);
  }

  .about__subtitle {
    font-size: var(--font-size-h1-mobile);
  }

  .about__dtt-logo {
    height: 40px;
  }

  .about__dtt {
    margin-top: 10px;
  }

  .about__dtt-name {
    font-size: var(--font-size-body-mobile);
  }

  .about__dtt-link {
    font-size: var(--font-size-body-mobile);
  }

  .about__text {
    font-size: var(--font-size-body-mobile);
    padding-top: 10px;
  }

  .about__text--spaced {
    margin-top: 0;
  }
}
</style>

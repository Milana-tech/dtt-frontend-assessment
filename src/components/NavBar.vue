<template>
  <!-- Fixed navigation header displayed on all pages -->
  <nav class="navbar">
    <!-- Desktop: DTT logo and text links -->
    <RouterLink to="/" class="navbar__logo-link">
      <img src="@/assets/images/img_logo_dtt@3x.png" alt="DTT Logo" class="navbar__logo" />
    </RouterLink>

    <ul class="navbar__links">
      <li>
        <RouterLink
          to="/"
          class="navbar__link"
          :class="{
            'navbar__link--active': $route.name === 'houses' || $route.meta.activeNav === 'houses',
          }"
        >
          Houses
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/about"
          class="navbar__link"
          :class="{ 'navbar__link--active': $route.name === 'about' }"
        >
          About
        </RouterLink>
      </li>
    </ul>

    <!-- Mobile: icon links -->
    <div class="navbar__mobile">
      <RouterLink
        to="/"
        class="navbar__mobile-link"
        :class="{
          'navbar__mobile-link--active':
            $route.name === 'houses' || $route.meta.activeNav === 'houses',
        }"
      >
        <img
          src="@/assets/icons/ic_mobile_navigarion_home_active@3x.png"
          alt="Houses"
          class="navbar__mobile-icon"
        />
      </RouterLink>
      <RouterLink
        to="/about"
        class="navbar__mobile-link"
        :class="{ 'navbar__mobile-link--active': $route.name === 'about' }"
      >
        <img
          src="@/assets/icons/ic_mobile_navigarion_info_active@3x.png"
          alt="About"
          class="navbar__mobile-icon"
        />
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
/**
 * NavBar component - a fixed navigation header displayed on all pages.
 * Highlights the currently active page using Vue Router's $route.
 */
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 70px;
  background-color: var(--color-background-2);
  padding: 0 clamp(20px, 20%, 340px);
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.navbar__logo {
  height: 40px;
}

.navbar__links {
  display: flex;
  gap: var(--spacing-xxl);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__link {
  text-decoration: none;
  color: var(--color-tertiary-dark);
  font-family: var(--font-primary);
  font-size: var(--font-size-nav);
  font-weight: var(--font-weight-medium);
}

.navbar__link--active {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.navbar__link:hover {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}

.navbar__mobile {
  display: none;
}

@media (max-width: 768px) {
  .navbar {
    top: auto;
    bottom: 0;
    height: 60px;
    padding: 0 var(--spacing-md);
    gap: 0;
    justify-content: center;
  }

  .navbar__logo-link {
    display: none;
  }

  .navbar__links {
    display: none;
  }

  .navbar__mobile {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .navbar__mobile-icon {
    width: 24px;
    height: 24px;
    opacity: 0.5;
  }

  .navbar__mobile-link--active .navbar__mobile-icon {
    opacity: 1;
  }
}
</style>

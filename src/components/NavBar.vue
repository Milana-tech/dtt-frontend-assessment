<template>
  <!-- Fixed navigation header displayed on all pages -->
  <nav class="navbar">
    <!-- DTT logo that navigates to the houses overview page -->
    <RouterLink to="/">
      <img src="@/assets/images/img_logo_dtt@3x.png" alt="DTT Logo" class="navbar__logo" />
    </RouterLink>

    <!-- Navigation links -->
    <ul class="navbar__links">
      <li>
        <!-- RouterLink automatically gets active class when route matches -->
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
  padding: 0 clamp(20px, 15%, 350px);
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.navbar__logo {
  height: 50px;
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
</style>

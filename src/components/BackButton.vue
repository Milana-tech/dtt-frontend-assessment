<template>
  <!-- Back button that navigates to the previous page or a specified route -->
  <RouterLink :to="to" class="back-button">
    <img src="@/assets/icons/ic_back_grey@3x.png" alt="Back" class="back-button__icon" />
    <span>{{ label }}</span>
  </RouterLink>
</template>

<script setup>
/**
 * BackButton component - reusable back navigation button.
 * Used on detail, create and edit pages to navigate back.
 */
defineProps({
  // The route to navigate to when clicked
  to: {
    type: String,
    default: '/',
  },
  // The label text displayed next to the arrow
  label: {
    type: String,
    default: 'Back to overview',
  },
})
</script>

<style scoped>
.back-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--color-text-primary);
  font-family: var(--font-primary);
  font-size: var(--font-size-back);
  font-weight: var(--font-weight-semibold);
  margin: var(--spacing-xl) 0;
}

.back-button__icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .back-button {
    margin-top: 0;
  }
}
</style>

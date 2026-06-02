<template>
  <!-- Recommended houses section shown on the detail page -->
  <div class="recommended">
    <h2 class="recommended__title">Recommended for you</h2>
    <div class="recommended__list">
      <RouterLink
        v-for="house in recommendedHouses"
        :key="house.id"
        :to="`/house/${house.id}`"
        class="recommended__card"
      >
        <!-- Recommended house image -->
        <img :src="house.image" :alt="house.location.street" class="recommended__image" />

        <!-- Recommended house info -->
        <div class="recommended__info">
          <h3 class="recommended__address">
            {{ house.location.street }} {{ house.location.houseNumber }}
          </h3>
          <p class="recommended__price">&euro; {{ house.price.toLocaleString() }}</p>
          <p class="recommended__location">{{ house.location.zip }} {{ house.location.city }}</p>
          <div class="recommended__details">
            <div class="recommended__detail">
              <img src="@/assets/icons/ic_bed@3x.png" alt="Bedrooms" class="recommended__icon" />
              <span>{{ house.rooms.bedrooms }}</span>
            </div>
            <div class="recommended__detail">
              <img src="@/assets/icons/ic_bath@3x.png" alt="Bathrooms" class="recommended__icon" />
              <span>{{ house.rooms.bathrooms }}</span>
            </div>
            <div class="recommended__detail">
              <img src="@/assets/icons/ic_size@3x.png" alt="Size" class="recommended__icon" />
              <span>{{ house.size }} m<sup>2</sup></span>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
/**
 * RecommendedHouses component - displays a list of recommended house listings.
 * Used on the house detail page to show similar houses based on city and price range.
 */
defineProps({
  // Array of recommended house objects to display
  recommendedHouses: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.recommended {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.recommended__title {
  font-family: var(--font-primary);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.recommended__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-sm);
  width: 100%;
}

.recommended__card {
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: var(--spacing-md);
  background-color: var(--color-background-2);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  text-decoration: none;
  color: inherit;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
}

.recommended__card:hover {
  opacity: 0.8;
}

.recommended__image {
  width: 110px;
  height: 105px;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
}

.recommended__info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.recommended__address {
  font-family: var(--font-primary);
  font-size: var(--font-size-input);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.recommended__price {
  font-family: var(--font-primary);
  font-size: var(--font-size-input);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.recommended__location {
  font-family: var(--font-secondary);
  font-size: var(--font-size-input);
  color: var(--color-tertiary-dark);
  margin: var(--spacing-xs) 0 var(--spacing-sm) 0;
}

.recommended__details {
  display: flex;
  gap: var(--spacing-md);
}

.recommended__detail {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.recommended__icon {
  width: 14px;
  height: 14px;
}

.recommended__detail span {
  font-family: var(--font-secondary);
  font-size: var(--font-size-input);
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .recommended {
    padding: 0 var(--spacing-md);
    padding-bottom: 80px;
  }

  .recommended__image {
    width: 80px;
    height: 80px;
    min-width: 80px;
  }

  .recommended__detail span {
    white-space: nowrap;
  }

  .recommended__title {
    font-size: var(--font-size-h1-mobile);
  }
}
</style>

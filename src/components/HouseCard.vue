<template>
  <!-- The clickable house card that navigates to the house detail page -->
  <RouterLink :to="`/house/${house.id}`" class="house-card">
    <!-- House image -->
    <img :src="house.image" :alt="house.location.street" class="house-card__image" />

    <!-- House information -->
    <div class="house-card__info">
      <!-- Address -->
      <h2 class="house-card__address">
        {{ house.location.street }} {{ house.location.houseNumber }}
      </h2>

      <!-- Price -->
      <p class="house-card__price">&euro; {{ house.price.toLocaleString() }}</p>

      <!-- Postal code and city -->
      <p class="house-card__location">{{ house.location.zip }} {{ house.location.city }}</p>

      <!-- House details icons -->
      <div class="house-card__details">
        <!-- Bedrooms -->
        <div class="house-card__detail">
          <img src="@/assets/icons/ic_bed@3x.png" alt="Bedrooms" class="house-card__icon" />
          <span>{{ house.rooms.bedrooms }}</span>
        </div>

        <!-- Bathrooms -->
        <div class="house-card__detail">
          <img src="@/assets/icons/ic_bath@3x.png" alt="Bathrooms" class="house-card__icon" />
          <span>{{ house.rooms.bathrooms }}</span>
        </div>

        <!-- Size -->
        <div class="house-card__detail">
          <img src="@/assets/icons/ic_size@3x.png" alt="Size" class="house-card__icon" />
          <span>{{ house.size }} m<sup>2</sup> </span>
        </div>
      </div>
    </div>

    <!-- Edit and delete buttons - only visible for owned listings on hover -->
    <div v-if="house.madeByMe" class="house-card__actions">
      <!-- Edit button - navigates to edit page -->
      <RouterLink
        :to="`/house/${house.id}/edit`"
        class="house-card__action-btn"
        @click.prevent.stop
      >
        <img
          src="@/assets/icons/ic_edit@3x.png"
          alt="Edit listing"
          class="house-card__action-icon"
        />
      </RouterLink>

      <!-- Delete button - emits delete event to parent -->
      <button class="house-card__action-btn" @click.prevent.stop="$emit('delete', house.id)">
        <img
          src="@/assets/icons/ic_delete@3x.png"
          alt="Delete listing"
          class="house-card__action-icon"
        />
      </button>
    </div>
  </RouterLink>
</template>

<script setup>
/**
 * HouseCard component - displays a summary of a single house listing.
 * Used in the houses overview page to display each house in the list.
 * Clicking the card navigates to the house detail page.
 * Edit and delete buttons are visible on hover for owned listings only.
 */

defineProps({
  // The house object containing all listing data
  house: {
    type: Object,
    required: true,
  },
})

// Emit delete event to parent component when delete button is clicked
defineEmits(['delete'])
</script>

<style scoped>
.house-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--color-background-2);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  gap: var(--spacing-md);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.house-card__image {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
}

.house-card__info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.house-card__address {
  font-family: var(--font-primary);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.house-card__price {
  font-family: var(--font-primary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.house-card__location {
  font-family: var(--font-secondary);
  font-size: var(--font-size-listing);
  color: var(--color-tertiary-dark);
}

.house-card__details {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-md);
}

.house-card__detail {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.house-card__icon {
  width: 16px;
  height: 16px;
}

.house-card__detail span {
  display: flex;
  font-family: var(--font-secondary);
  font-size: var(--font-size-listing);
  color: var(--color-text-secondary);
}

/* Edit and delete buttons are hidden by default but visible on hover */
.house-card__actions {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  display: flex;
  gap: var(--spacing-md);
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* Show actions when hovering over the card */
.house-card:hover .house-card__actions {
  opacity: 1;
}

.house-card__action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.house-card__action-icon {
  width: 20px;
  height: 20px;
}

.house-card:hover {
  opacity: 0.9;
  cursor: pointer;
}
</style>

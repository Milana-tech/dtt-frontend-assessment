<template>
  <div class="house-detail">
    <!-- Content wrapper with consistent padding -->
    <div class="house-detail__container">
      <!-- Go back button -->
      <BackButton to="/" label="Back to overview" />

      <!-- Loading state -->
      <div v-if="store.isLoading" class="house-detail__loading">
        <p>Loading...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="store.error" class="house-detail__error">
        <p>{{ store.error }}</p>
      </div>

      <!-- House detail content -->
      <div v-else-if="store.selectedHouse" class="house-detail__layout">
        <!-- Left column -->
        <div class="house-detail__left">
          <img
            :src="store.selectedHouse.image"
            :alt="store.selectedHouse.location.street"
            class="house-detail__image"
          />

          <!-- Edit/delete buttons overlay on image - mobile only -->
          <div v-if="store.selectedHouse.madeByMe" class="house-detail__image-actions">
            <RouterLink :to="`/house/${store.selectedHouse.id}/edit`">
              <img
                src="@/assets/icons/ic_edit_white@3x.png"
                alt="Edit listing"
                class="house-detail__action-icon"
              />
            </RouterLink>
            <button @click="showDeleteButton = true" class="house-detail__action-btn">
              <img
                src="@/assets/icons/ic_delete_white@3x.png"
                alt="Delete listing"
                class="house-detail__action-icon"
              />
            </button>
          </div>

          <div class="house-detail__card">
            <div class="house-detail__header">
              <h1 class="house-detail__address">
                {{ store.selectedHouse.location.street }}
                {{ store.selectedHouse.location.houseNumber }}
              </h1>
              <!-- Edit/delete buttons - desktop only -->
              <div v-if="store.selectedHouse.madeByMe" class="house-detail__actions">
                <RouterLink :to="`/house/${store.selectedHouse.id}/edit`">
                  <img
                    src="@/assets/icons/ic_edit@3x.png"
                    alt="Edit listing"
                    class="house-detail__action-icon"
                  />
                </RouterLink>
                <button @click="showDeleteButton = true" class="house-detail__action-btn">
                  <img
                    src="@/assets/icons/ic_delete@3x.png"
                    alt="Delete listing"
                    class="house-detail__action-icon"
                  />
                </button>
              </div>
            </div>

            <p class="house-detail__location">
              <img
                src="@/assets/icons/ic_location@3x.png"
                alt="Location"
                class="house-detail__icon-location"
              />
              {{ store.selectedHouse.location.zip }} {{ store.selectedHouse.location.city }}
            </p>

            <!-- Key details row 1 - price, size, construction year -->
            <div class="house-detail__details">
              <div class="house-detail__detail">
                <img src="@/assets/icons/ic_price@3x.png" alt="Price" class="house-detail__icon" />
                <span>{{ store.selectedHouse.price.toLocaleString() }}</span>
              </div>
              <div class="house-detail__detail">
                <img src="@/assets/icons/ic_size@3x.png" alt="Size" class="house-detail__icon" />
                <span>{{ store.selectedHouse.size }} m<sup>2</sup></span>
              </div>
              <div class="house-detail__detail">
                <img
                  src="@/assets/icons/ic_construction_date@3x.png"
                  alt="Construction year"
                  class="house-detail__icon"
                />
                <span>Built in {{ store.selectedHouse.constructionYear }}</span>
              </div>
            </div>

            <!-- Key details row 2 - bedrooms, bathrooms, garage -->
            <div class="house-detail__details">
              <div class="house-detail__detail">
                <img src="@/assets/icons/ic_bed@3x.png" alt="Bedrooms" class="house-detail__icon" />
                <span>{{ store.selectedHouse.rooms.bedrooms }}</span>
              </div>
              <div class="house-detail__detail">
                <img
                  src="@/assets/icons/ic_bath@3x.png"
                  alt="Bathrooms"
                  class="house-detail__icon"
                />
                <span>{{ store.selectedHouse.rooms.bathrooms }}</span>
              </div>
              <div class="house-detail__detail">
                <img
                  src="@/assets/icons/ic_garage@3x.png"
                  alt="Garage"
                  class="house-detail__icon"
                />
                <span>{{ store.selectedHouse.hasGarage ? 'Yes' : 'No' }}</span>
              </div>
            </div>

            <p class="house-detail__description">{{ store.selectedHouse.description }}</p>
          </div>
        </div>

        <!-- Right column - recommended houses -->
        <div class="house-detail__right">
          <RecommendedHouses :recommended-houses="recommendedHouses" />
        </div>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <DeleteButton
      v-if="showDeleteButton"
      @confirm="handleDelete"
      @cancel="showDeleteButton = false"
    />
  </div>
</template>

<script setup>
/**
 * HouseDetailView - displays detailed information about a single house listing.
 * Shows full house details including description, construction year and garage.
 * Edit and delete buttons are shown only for listings owned by the user.
 * Includes a confirmation dialog before deleting a listing.
 * Shows recommended houses in the right column based on city and price range.
 */
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHousesStore } from '@/stores/houses'
import RecommendedHouses from '@/components/RecommendedHouses.vue'
import BackButton from '@/components/BackButton.vue'
import DeleteButton from '@/components/DeleteButton.vue'

const store = useHousesStore()
const route = useRoute()
const router = useRouter()

// Controls visibility of the delete confirmation modal
const showDeleteButton = ref(false)

/**
 * Returns up to 3 recommended houses based on same city
 * and similar price range (within 50% of current price).
 * Falls back to any other houses if not enough matches found.
 */
const recommendedHouses = computed(() => {
  if (!store.selectedHouse || !store.houses.length) return []

  const current = store.selectedHouse

  const recommended = store.houses.filter((house) => {
    if (house.id === current.id) return false
    const sameCity = house.location.city === current.location.city
    const similarPrice = house.price >= current.price * 0.5 && house.price <= current.price * 1.5
    return sameCity || similarPrice
  })

  if (recommended.length < 3) {
    const others = store.houses.filter(
      (house) => house.id !== current.id && !recommended.find((r) => r.id === house.id),
    )
    return [...recommended, ...others].slice(0, 3)
  }

  return recommended.slice(0, 3)
})

/**
 * Deletes the current house listing and redirects to the overview page.
 * Called when the user confirms deletion in the modal.
 */
async function handleDelete() {
  await store.deleteHouse(store.selectedHouse.id)
  showDeleteButton.value = false
  await router.push('/')
}

// Fetch house details and all houses when the component is mounted
onMounted(() => {
  store.fetchHouseById(route.params.id)
  store.fetchHouses()
})

// Watch for route changes to reload data when navigating between houses
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      store.fetchHouseById(newId)
      store.fetchHouses()
    }
  },
)
</script>

<style scoped>
.house-detail {
  padding-top: clamp(80px, 10%, 100px);
}

/* Content wrapper that controls padding for all child elements */
.house-detail__container {
  padding: 0 clamp(20px, 15%, 350px);
}

.house-detail__container :deep(.back-button) {
  margin: 35px 0 40px 0;
}

/* Two column layout */
.house-detail__layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xxl);
  align-items: start;
}

/* Edit button link - removes default link styling */
.house-detail__actions a {
  display: flex;
  align-items: center;
}

/* Left column */
.house-detail__left {
  display: flex;
  flex-direction: column;
}

.house-detail__image {
  width: 100%;
  max-height: 340px;
  object-fit: cover;
}

.house-detail__image-actions {
  display: none;
}

/* White info card */
.house-detail__card {
  background-color: var(--color-background-2);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.house-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.house-detail__address {
  font-family: var(--font-primary);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.house-detail__actions {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.house-detail__action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.house-detail__action-icon {
  width: 20px;
  height: 20px;
}

.house-detail__location {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-listing);
  color: var(--color-text-secondary);
}

.house-detail__details {
  display: flex;
  gap: var(--spacing-xl);
}

.house-detail__detail {
  display: flex;
  align-items: center;
  font-weight: var(--font-weight-semibold);
  gap: var(--spacing-sm);
}

.house-detail__icon {
  width: 20px;
  height: 20px;
}

.house-detail__icon-location {
  width: 17px;
  height: 20px;
}

.house-detail__detail span {
  font-family: var(--font-secondary);
  font-size: var(--font-size-listing);
  color: var(--color-text-secondary);
}

.house-detail__description {
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Right column */
.house-detail__right {
  position: sticky;
  top: 100px;
}

.house-detail__loading,
.house-detail__error {
  text-align: center;
  font-family: var(--font-secondary);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xl);
}

@media (max-width: 768px) {
  .house-detail {
    padding-top: 0;
  }

  .house-detail__container {
    padding: 0;
  }

  .house-detail__container :deep(.back-button) {
    position: absolute;
    top: var(--spacing-lg);
    left: var(--spacing-md);
    z-index: 10;
    margin: 0;
    color: var(--color-background-2);
  }

  .house-detail__container :deep(.back-button) img {
    filter: brightness(10);
  }

  .house-detail__container :deep(.back-button) span {
    display: none;
  }

  .house-detail__layout {
    grid-template-columns: 1fr;
    gap: 0;
    position: relative;
  }

  .house-detail__left {
    position: relative;
  }

  .house-detail__image {
    max-height: 300px;
    width: 100%;
  }

  .house-detail__image-actions {
    display: flex;
    position: absolute;
    top: var(--spacing-lg);
    right: var(--spacing-md);
    gap: var(--spacing-md);
    z-index: 10;
  }

  .house-detail__image-actions a {
    display: flex;
    align-items: center;
  }

  .house-detail__image-actions .house-detail__action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-right: 20px;
  }

  .house-detail__actions {
    display: none;
  }

  .house-detail__card {
    border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
    margin-top: -20px;
    position: relative;
    padding: var(--spacing-xl) var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }

  .house-detail__detail span {
    white-space: nowrap;
  }

  .house-detail__right {
    position: static;
    padding: 0 var(--spacing-md) 80px;
  }
}
</style>

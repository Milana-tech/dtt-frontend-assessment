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
          <div class="house-detail__card">
            <div class="house-detail__header">
              <h1 class="house-detail__address">
                {{ store.selectedHouse.location.street }}
                {{ store.selectedHouse.location.houseNumber }}
              </h1>
              <div v-if="store.selectedHouse.madeByMe" class="house-detail__actions">
                <!-- Edit button - navigates to edit page -->
                <RouterLink :to="`/house/${store.selectedHouse.id}/edit`">
                  <img
                    src="@/assets/icons/ic_edit@3x.png"
                    alt="Edit listing"
                    class="house-detail__action-icon"
                  />
                </RouterLink>
                <!-- Delete button - opens confirmation dialog -->
                <button @click="showDeleteModal = true" class="house-detail__action-btn">
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
                <span>&euro; {{ store.selectedHouse.price.toLocaleString() }}</span>
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
    <div v-if="showDeleteModal" class="house-detail__modal-overlay">
      <div class="house-detail__modal">
        <h2>Delete listing</h2>
        <div class="house-detail__paragraphs">
          <p>Are you sure you want to delete this listing?</p>
          <p>This action cannot be undone.</p>
        </div>
        <div class="house-detail__modal-buttons">
          <button
            @click="handleDelete"
            class="house-detail__modal-btn house-detail__modal-btn--delete"
          >
            YES, DELETE
          </button>
          <button
            @click="showDeleteModal = false"
            class="house-detail__modal-btn house-detail__modal-btn--cancel"
          >
            GO BACK
          </button>
        </div>
      </div>
    </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHousesStore } from '@/stores/houses'
import RecommendedHouses from '@/components/RecommendedHouses.vue'
import BackButton from '@/components/BackButton.vue'

const store = useHousesStore()
const route = useRoute()
const router = useRouter()

// Controls visibility of the delete confirmation modal
const showDeleteModal = ref(false)

/**
 * Returns up to 3 recommended houses based on same city
 * and similar price range (within 50% of current price).
 * Falls back to any other houses if not enough matches found.
 */
const recommendedHouses = computed(() => {
  if (!store.selectedHouse || !store.houses.length) return []

  const current = store.selectedHouse

  // Filter by same city AND similar price range (within 50% of current price)
  const recommended = store.houses.filter((house) => {
    if (house.id === current.id) return false

    const sameCity = house.location.city === current.location.city
    const similarPrice = house.price >= current.price * 0.5 && house.price <= current.price * 1.5

    return sameCity || similarPrice
  })

  // If not enough results, fill with any other houses
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
  showDeleteModal.value = false
  // Redirect to houses overview after successful deletion
  router.push('/')
}

// Fetch house details and all houses when the component is mounted
onMounted(() => {
  store.fetchHouseById(route.params.id)
  // Always fetch all houses to ensure recommendations are available
  store.fetchHouses()
})
</script>

<style scoped>
.house-detail {
  padding-top: clamp(80px, 10%, 100px);
}

.house-detail__container {
  padding: 0 clamp(20px, 15%, 350px);
}

.house-detail__container :deep {
  margin: 35px 0 40px 0;
}

/* Two column layout */
.house-detail__layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xxl);
  align-items: start;
}

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
  width: 25px;
  height: 25px;
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

.house-detail__modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.house-detail__modal {
  background-color: var(--color-background-2);
  border-radius: var(--border-radius-lg);
  padding: 40px 100px;
  max-width: 600px;
  width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.house-detail__modal h2 {
  font-family: var(--font-primary);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.house-detail__modal p {
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
}

.house-detail__modal-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-md);
}

.house-detail__modal-btn {
  padding: var(--spacing-md) var(--spacing-xl);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: var(--font-size-nav);
  font-weight: var(--font-weight-bold);
}

.house-detail__modal-btn--delete {
  background-color: var(--color-primary);
  color: var(--color-background-2);
}

.house-detail__modal-btn--cancel {
  background-color: var(--color-text-secondary);
  color: var(--color-background-2);
}

.house-detail__loading,
.house-detail__error {
  text-align: center;
  font-family: var(--font-secondary);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xl);
}

.house-detail__paragraphs {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  margin: 25px 20px 40px 20px;
}
</style>

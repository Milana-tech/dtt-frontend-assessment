<template>
  <div class="houses-view">
    <!-- Page header with title and create new listing button -->
    <div class="houses-view__header">
      <h1 class="houses-view__title">Houses</h1>
      <RouterLink to="/house/create" class="houses-view__create-btn">
        <img class="house-view__add-icon" src="@/assets/icons/ic_plus_white@3x.png" alt="Create" />
        <span class="houses-view__create-text">CREATE NEW</span>
      </RouterLink>
    </div>

    <!-- Content wrapper with max width -->
    <div class="houses-view__content">
      <!-- Search and sort controls -->
      <div class="houses-view__controls">
        <div class="houses-view__search">
          <img
            class="houses-view__search-icon"
            src="@/assets/icons/ic_search@3x.png"
            alt="Search button"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for a house"
            class="houses-view__search-input"
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="houses-view__search-clear">
            <img
              class="houses-view__search-clear"
              src="@/assets/icons/ic_clear@3x.png"
              alt="Remove button"
            />
          </button>
        </div>

        <div class="houses-view__sort">
          <button
            class="houses-view__sort-btn"
            :class="{ 'houses-view__sort-btn--active': sortBy === 'price' }"
            @click="sortBy = 'price'"
          >
            Price
          </button>
          <button
            class="houses-view__sort-btn"
            :class="{ 'houses-view__sort-btn--active': sortBy === 'size' }"
            @click="sortBy = 'size'"
          >
            Size
          </button>
        </div>
      </div>

      <!-- Search results count -->
      <p v-if="searchQuery" class="houses-view__results">
        {{ filteredHouses.length }} results found
      </p>

      <!-- Empty search results state -->
      <div v-if="filteredHouses.length === 0 && searchQuery" class="houses-view__empty">
        <img
          src="@/assets/images/img_empty_houses@3x.png"
          alt="No results"
          class="houses-view__empty-image"
        />
        <p>No results found.</p>
        <p>Please try another keyword.</p>
      </div>

      <!-- House listings -->
      <div v-else class="houses-view__list">
        <HouseCard
          v-for="house in filteredHouses"
          :key="house.id"
          :house="house"
          @delete="handleDelete"
        />
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <DeleteModal
      v-if="showDeleteModal"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
/**
 * HousesView - main overview page displaying all available house listings.
 * Includes search functionality and sorting by price or size.
 * House data is fetched from the DTT API via the Pinia store.
 */
import { ref, computed, onMounted } from 'vue'
import { useHousesStore } from '@/stores/houses'
import HouseCard from '@/components/HouseCard.vue'
import DeleteModal from '@/components/DeleteButton.vue'

// Access the houses store
const store = useHousesStore()

// Search query bound to the search input field
const searchQuery = ref('')

// Current sort option - either 'price' or 'size'
const sortBy = ref('price')

// Controls visibility of the delete confirmation modal
const showDeleteModal = ref(false)

// ID of the house to be deleted
const houseToDelete = ref(null)

/**
 * Filters and sorts houses based on the search query and sort option.
 * Filters by street name, city, zip code and price.
 */
const filteredHouses = computed(() => {
  let houses = [...store.houses]

  // Filter houses based on search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    houses = houses.filter(
      (house) =>
        house.location.street.toLowerCase().includes(query) ||
        house.location.city.toLowerCase().includes(query) ||
        house.location.zip.toLowerCase().includes(query) ||
        house.price.toString().includes(query),
    )
  }

  // Sort houses by selected option
  if (sortBy.value === 'price') {
    houses.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'size') {
    houses.sort((a, b) => a.size - b.size)
  }

  return houses
})

// Fetch all houses from the API when the component is mounted
onMounted(() => {
  store.fetchHouses()
})

/**
 * Handles delete event from HouseCard component.
 * Opens confirmation modal before permanently deleting the listing.
 * @param {number} id - The ID of the house to delete.
 */
function handleDelete(id) {
  houseToDelete.value = id
  showDeleteModal.value = true
}

/**
 * Confirms deletion of the house listing.
 * Called when user clicks YES DELETE in the confirmation modal.
 */
async function confirmDelete() {
  await store.deleteHouse(houseToDelete.value)
  showDeleteModal.value = false
  houseToDelete.value = null
}
</script>

<style scoped>
.houses-view {
  padding: clamp(80px, 10%, 110px) clamp(20px, 20%, 350px);
}

.houses-view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
  margin-bottom: var(--spacing-xl);
}

.houses-view__title {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-h1);
  color: var(--color-text-primary);
}

/* Create new listing button */
.houses-view__create-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background-color: var(--color-primary);
  color: var(--color-background-2);
  padding: 10px 15px;
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-family: var(--font-primary);
  font-weight: var(--font-weight-bold);
  letter-spacing: 1px;
}

.houses-view__create-btn:hover {
  opacity: 0.9;
}

.house-view__add-icon {
  width: 16px;
  height: 16px;
}

.houses-view__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  gap: var(--spacing-md);
  max-width: 100%;
}

.houses-view__sort {
  display: flex;
}

.houses-view__search {
  display: flex;
  align-items: center;
  background-color: var(--color-tertiary);
  border-radius: var(--border-radius-sm);
  padding: 10px 15px;
  gap: var(--spacing-sm);
  flex: 1;
  max-width: 350px;
}

.houses-view__search-input {
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-secondary);
  font-size: var(--font-size-input);
  color: var(--color-text-secondary);
  width: 100%;
}

.houses-view__search-input::placeholder {
  color: var(--color-tertiary-dark);
}

.houses-view__search-clear {
  background: none;
  border: none;
  cursor: pointer;
  width: 16px;
  height: 16px;
  color: var(--color-tertiary-dark);
  font-size: var(--font-size-input);
  padding: 0;
  display: flex;
  align-items: center;
}

.houses-view__sort-btn {
  padding: 10px 50px;
  border-radius: var(--border-radius-md);
  border: none;
  cursor: pointer;
  font-family: var(--font-primary);
  background-color: var(--color-tertiary-dark);
  font-weight: var(--font-weight-bold);
  color: var(--color-background-2);
}

.houses-view__sort-btn:first-child {
  border-radius: var(--border-radius-sm) 0 0 var(--border-radius-sm);
}

.houses-view__sort-btn:last-child {
  border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
}

.houses-view__sort-btn--active {
  background-color: var(--color-primary);
}

.houses-view__results {
  font-family: var(--font-primary);
  font-size: var(--font-size-input);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.houses-view__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xl);
  font-family: var(--font-primary);
  font-size: var(--font-size-nav);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-align: center;
}

.houses-view__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.houses-view__search-icon {
  margin-right: 10px;
  width: 16px;
  height: 16px;
}

.houses-view__sort-btn:hover {
  opacity: 0.85;
  cursor: pointer;
}

.houses-view__empty-image {
  width: 270px;
  height: auto;
  margin-bottom: var(--spacing-md);
}

.houses-view__create-text {
  display: inline;
}

@media (max-width: 768px) {
  .houses-view {
    padding: clamp(60px, 10%, 80px) var(--spacing-md) 80px;
  }

  .houses-view__create-text {
    display: none;
  }

  .house-view__add-icon {
    width: 24px;
    height: 24px;
    filter: brightness(0);
  }

  .houses-view__header {
    justify-content: center;
    position: relative;
    margin-top: 0;
  }

  .houses-view__title {
    text-align: center;
    font-size: var(--font-size-h1-mobile);
  }

  .houses-view__create-btn {
    position: absolute;
    right: 0;
    background: none;
    padding: 0;
    border-radius: 0;
  }

  .houses-view__create-btn span {
    display: none;
  }

  .house-view__add-icon {
    width: 24px;
    height: 24px;
    filter: invert(1) brightness(0);
  }

  .houses-view__controls {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .houses-view__search {
    max-width: 100%;
    width: 100%;
  }

  .houses-view__sort {
    width: 100%;
  }

  .houses-view__sort-btn {
    flex: 1;
    padding: 10px 0;
  }
}
</style>

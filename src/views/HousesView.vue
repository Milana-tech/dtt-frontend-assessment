<template>
  <div class="houses-view">
    <!-- Page header with title and create new listing button -->
    <div class="houses-view__header">
      <h2 class="houses-view__title">Houses</h2>
      <RouterLink to="/house/create" class="houses-view__create-btn">
        <img
          class="house-view__add-icon"
          src="@/assets/icons/ic_plus_white@3x.png"
          alt="Upload button"
        />
        CREATE NEW
      </RouterLink>
    </div>

    <!-- Search and sort controls -->
    <div class="houses-view__controls">
      <!-- Search input -->
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
        <!-- Clear button - only visible when search has input -->
        <button v-if="searchQuery" @click="searchQuery = ''" class="houses-view__search-clear">
          X
        </button>
      </div>

      <!-- Sort buttons -->
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
    <p v-if="searchQuery" class="houses-view__results">{{ filteredHouses.length }} results found</p>

    <!-- Empty search results state -->
    <div v-if="filteredHouses.length === 0 && searchQuery" class="houses-view__empty">
      <p>No results found.</p>
      <p>Please try another keyword.</p>
    </div>

    <!-- House listings -->
    <div v-else class="houses-view__list">
      <HouseCard v-for="house in filteredHouses" :key="house.id" :house="house" />
    </div>
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

// Access the houses store
const store = useHousesStore()

// Search query bound to the search input field
const searchQuery = ref('')

// Current sort option - either 'price' or 'size'
const sortBy = ref('price')

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
</script>

<style scoped>
.houses-view {
  padding: 100px clamp(20px, 15%, 250px) var(--spacing-xl);
}

.houses-view__header {
  display: flex;
  margin-top: 45px;
  justify-content: space-between;
  align-items: center;
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
}

.houses-view__search {
  display: flex;
  align-items: center;
  background-color: var(--color-tertiary);
  border-radius: var(--border-radius-sm);
  padding: 10px 15px;
  gap: var(--spacing-sm);
  flex: 1;
  max-width: 400px;
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
  color: var(--color-tertiary-dark);
  font-size: var(--font-size-input);
  padding: 0;
  display: flex;
  align-items: center;
}

.houses-view__sort {
  display: flex;
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
  gap: var(--spacing-md);
}

.houses-view__search-icon {
  margin-right: 10px;
  width: 16px;
  height: 16px;
}
</style>

import { defineStore } from 'pinia'

/**
 * Houses store manages all house listing data and API interactions.
 * This store is the single source of truth for house data across the application.
 */

export const useHousesStore = defineStore('houses', {
  state: () => ({
    // Full list of houses fetched from the API
    houses: [],
    // The currently selected house for the detail page
    selectedHouse: null,
    // Loading state to show spinners while fetching data
    isLoading: false,
    // Error message if an API call fails
    error: null,
  }),

  getters: {
    /**
     * Returns all houses sorted by price (ascending).
     */
    sortedByPrice: (state) => {
      return [...state.houses].sort((a, b) => a.price - b.price)
    },

    /**
     * Returns all houses sorted by size (ascending).
     */
    sortedBySize: (state) => {
      return [...state.houses].sort((a, b) => a.size - b.size)
    },
  },

  actions: {
    /**
     * Fetches all houses from the DTT API and stores them in state.
     */
    async fetchHouses() {
      this.isLoading = true
      this.error = null

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/houses`, {
          headers: {
            'X-Api-Key': import.meta.env.VITE_API_KEY,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch houses')
        }

        // Store the fetched houses in state
        this.houses = await response.json()
      } catch (error) {
        // Store the error message for display in the UI
        this.error = error.message
      } finally {
        // Always stop loading whether the request succeeded or failed
        this.isLoading = false
      }
    },

    /**
     * Fetches a single house by ID from the DTT API.
     * @param {number} id - The ID of the house to fetch.
     */
    async fetchHouseById(id) {
      this.isLoading = true
      this.error = null

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/houses/${id}`, {
          headers: {
            'X-Api-Key': import.meta.env.VITE_API_KEY,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch house details')
        }

        const data = await response.json()
        // API returns an array even for single house, so we take the first item
        this.selectedHouse = data[0]
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Deletes a house listing by ID.
     * @param {number} id - The ID of the house to delete.
     */
    async deleteHouse(id) {
      this.error = null

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/houses/${id}`, {
          method: 'DELETE',
          headers: {
            'X-Api-Key': import.meta.env.VITE_API_KEY,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to delete house')
        }

        // Remove the deleted house from local state so UI updates immediately
        this.houses = this.houses.filter((house) => house.id !== id)
      } catch (error) {
        this.error = error.message
      }
    },
  },
})

<template>
  <div class="house-create">
    <BackButton to="/" label="Back to overview" />
    <h1 class="house-create__title">Create new listing</h1>
    <HouseForm submit-label="POST" @submit="handleSubmit" />
  </div>
</template>

<script setup>
/**
 * HouseCreateView - form page for creating a new house listing.
 * Uses the reusable HouseForm component for form fields and validation.
 * Redirects to the newly created listing detail page on success.
 */
import { useRouter } from 'vue-router'
import { useHousesStore } from '@/stores/houses'
import BackButton from '@/components/BackButton.vue'
import HouseForm from '@/components/HouseForm.vue'

const store = useHousesStore()
const router = useRouter()

/**
 * Handles form submission from HouseForm component.
 * Creates the house listing and uploads the image separately.
 * @param {Object} payload - Contains formData and imageFile from HouseForm.
 */
async function handleSubmit({ formData, imageFile }) {
  const newHouse = await store.createHouse(formData)

  if (newHouse) {
    // Upload the image separately after house is created
    if (imageFile) {
      const imageFormData = new FormData()
      imageFormData.append('image', imageFile)

      await fetch(`${import.meta.env.VITE_API_URL}/houses/${newHouse.id}/upload`, {
        method: 'POST',
        headers: {
          'X-Api-Key': import.meta.env.VITE_API_KEY,
        },
        body: imageFormData,
      })
    }

    // Redirect to the newly created listing detail page
    router.push(`/house/${newHouse.id}`)
  }
}
</script>

<style scoped>
.house-create {
  padding: clamp(100px, 10%, 120px) clamp(20px, 20%, 350px);
  min-height: 100vh;
  position: relative;
  background-image: url('@/assets/images/img_background@3x.png');
  background-size: 70%;
  background-position: right center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.house-create__title {
  font-family: var(--font-primary);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-top: 45px;
  margin-bottom: var(--spacing-xl);
}
</style>

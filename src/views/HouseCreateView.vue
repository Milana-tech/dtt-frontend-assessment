<template>
  <div class="house-create">
    <div class="house-create__header">
      <BackButton to="/" label="" />
      <h1 class="house-create__title">Create new listing</h1>
    </div>
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

.house-create__header {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .house-create {
    background-image: none;
    padding: clamp(80px, 10%, 100px) var(--spacing-md);
  }

  .house-create__header {
    justify-content: center;
    position: relative;
    margin-bottom: var(--spacing-xl);
  }

  .house-create__title {
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
    font-size: var(--font-size-h2);
  }

  .house-create :deep(.back-button) {
    position: absolute;
    left: 0;
    margin: 0;
  }
}
</style>

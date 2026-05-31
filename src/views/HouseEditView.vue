<template>
  <div class="house-edit">
    <BackButton :to="`/house/${route.params.id}`" label="Back to detail" />
    <h1 class="house-edit__title">Edit listing</h1>
    <HouseForm :initial-values="store.selectedHouse" submit-label="SAVE" @submit="handleSubmit" />
  </div>
</template>

<script setup>
/**
 * HouseEditView - form page for editing an existing house listing.
 * Uses the reusable HouseForm component pre-filled with existing house data.
 * Redirects back to the house detail page on successful update.
 */
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHousesStore } from '@/stores/houses'
import BackButton from '@/components/BackButton.vue'
import HouseForm from '@/components/HouseForm.vue'

const store = useHousesStore()
const route = useRoute()
const router = useRouter()

/**
 * Handles form submission from HouseForm component.
 * Updates the house listing and uploads new image if provided.
 * Fetches updated data before redirecting to ensure detail page shows latest values.
 * @param {Object} payload - Contains formData and imageFile from HouseForm.
 */
async function handleSubmit({ formData, imageFile }) {
  const id = Number(route.params.id)

  await store.updateHouse(id, formData)
  if (imageFile) {
    const imageFormData = new FormData()
    imageFormData.append('image', imageFile)

    await fetch(`${import.meta.env.VITE_API_URL}/houses/${route.params.id}/upload`, {
      method: 'POST',
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
      },
      body: imageFormData,
    })
  }

  // Fetch updated house before redirecting so detail page shows latest data
  await store.fetchHouseById(route.params.id)

  // Redirect back to the house detail page after successful update
  await router.push(`/house/${route.params.id}`)
}

// Fetch house details when the component is mounted to pre-fill the form
onMounted(() => {
  store.fetchHouseById(route.params.id)
})
</script>

<style scoped>
.house-edit {
  padding: clamp(100px, 10%, 120px) clamp(20px, 20%, 350px);
  min-height: 100vh;
  position: relative;
  background-image: url('@/assets/images/img_background@3x.png');
  background-size: 70%;
  background-position: right center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.house-edit__title {
  font-family: var(--font-primary);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-top: 45px;
  margin-bottom: var(--spacing-xl);
}
</style>

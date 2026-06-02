<template>
  <div class="house-edit">
    <div class="house-edit__header">
      <BackButton :to="`/house/${route.params.id}`" label="Back to detail" />
      <h1 class="house-edit__title">Edit listing</h1>
    </div>
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
  margin-bottom: var(--spacing-xl);
}

.house-edit__header {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .house-edit {
    padding: clamp(60px, 10%, 80px) var(--spacing-md) 80px;
    background: none;
  }

  .house-edit__header {
    justify-content: center;
    position: relative;
    margin-bottom: var(--spacing-xl);
  }

  .house-edit__title {
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
    font-size: var(--font-size-h2);
  }

  .house-edit :deep(.back-button) {
    position: absolute;
    left: 0;
    margin: 0;
  }

  .house-edit :deep(.back-button) span {
    display: none;
  }
}
</style>

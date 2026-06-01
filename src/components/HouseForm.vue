<template>
  <!-- Reusable house listing form used for both creating and editing listings -->
  <form class="house-form__form" @submit.prevent="handleSubmit">
    <!-- Street name -->
    <div class="house-form__field">
      <label class="house-form__label">Street name*</label>
      <input
        v-model="form.streetName"
        type="text"
        placeholder="Enter the street name"
        class="house-form__input"
        :class="{ 'house-form__input--error': errors.streetName }"
      />
      <p v-if="errors.streetName" class="house-form__error">
        {{ errors.streetName }}
      </p>
    </div>

    <!-- House number and addition -->
    <div class="house-form__row">
      <div class="house-form__field">
        <label class="house-form__label">House number*</label>
        <input
          v-model="form.houseNumber"
          type="number"
          placeholder="Enter house number"
          class="house-form__input"
          :class="{ 'house-form__input--error': errors.houseNumber }"
        />
        <p v-if="errors.houseNumber" class="house-form__error">
          {{ errors.houseNumber }}
        </p>
      </div>

      <div class="house-form__field">
        <label class="house-form__label">Addition (optional)</label>
        <input
          v-model="form.numberAddition"
          type="text"
          placeholder="e.g. A"
          class="house-form__input"
        />
      </div>
    </div>

    <!-- Postal code -->
    <div class="house-form__field">
      <label class="house-form__label">Postal code*</label>
      <input
        v-model="form.zip"
        type="text"
        placeholder="e.g. 1000 AA"
        class="house-form__input"
        :class="{ 'house-form__input--error': errors.zip }"
      />
      <p v-if="errors.zip" class="house-form__error">
        {{ errors.zip }}
      </p>
    </div>

    <!-- City -->
    <div class="house-form__field">
      <label class="house-form__label">City*</label>
      <input
        v-model="form.city"
        type="text"
        placeholder="e.g. Utrecht"
        class="house-form__input"
        :class="{ 'house-form__input--error': errors.city }"
      />
      <p v-if="errors.city" class="house-form__error">
        {{ errors.city }}
      </p>
    </div>

    <!-- Image upload -->
    <div class="house-form__field">
      <label class="house-form__label">Upload picture (PNG or JPG)*</label>
      <div
        class="house-form__image-upload"
        :class="{ 'house-form__image-upload--error': errors.image }"
        @click="triggerImageUpload"
      >
        <!-- Show preview if image selected -->
        <img
          v-if="imagePreview"
          :src="imagePreview"
          alt="House preview"
          class="house-form__image-preview"
        />
        <!-- Show upload placeholder if no image -->
        <div v-else class="house-form__image-placeholder">
          <img
            src="@/assets/icons/ic_plus_grey@3x.png"
            alt="Upload"
            class="house-form__image-icon"
          />
        </div>
        <!-- Clear image button -->
        <button
          v-if="imagePreview"
          type="button"
          @click.stop="clearImage"
          class="house-form__image-clear"
        >
          <img src="@/assets/icons/ic_clear_white@3x.png" alt="Remove image" />
        </button>
      </div>
      <input
        ref="imageInput"
        type="file"
        accept="image/*"
        class="house-form__image-input"
        @change="handleImageChange"
      />
      <p v-if="errors.image" class="house-form__error">
        {{ errors.image }}
      </p>
    </div>

    <!-- Price -->
    <div class="house-form__field">
      <label class="house-form__label">Price*</label>
      <input
        v-model="form.price"
        type="number"
        placeholder="e.g. &euro;150.000"
        class="house-form__input"
        :class="{ 'house-form__input--error': errors.price }"
      />
      <p v-if="errors.price" class="house-form__error">
        {{ errors.price }}
      </p>
    </div>

    <!-- Size and garage -->
    <div class="house-form__row">
      <div class="house-form__field">
        <label class="house-form__label">Size*</label>
        <input
          v-model="form.size"
          type="number"
          placeholder="e.g. 60m2"
          class="house-form__input"
          :class="{ 'house-form__input--error': errors.size }"
        />
        <p v-if="errors.size" class="house-form__error">
          {{ errors.size }}
        </p>
      </div>

      <div class="house-form__field">
        <label class="house-form__label">Garage*</label>
        <select
          v-model="form.hasGarage"
          class="house-form__input house-form__select"
          :class="{ 'house-form__input--error': errors.hasGarage }"
        >
          <option value="" disabled>Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <p v-if="errors.hasGarage" class="house-form__error">
          {{ errors.hasGarage }}
        </p>
      </div>
    </div>

    <!-- Bedrooms and bathrooms -->
    <div class="house-form__row">
      <div class="house-form__field">
        <label class="house-form__label">Bedrooms*</label>
        <input
          v-model="form.bedrooms"
          type="number"
          placeholder="Enter amount"
          class="house-form__input"
          :class="{ 'house-form__input--error': errors.bedrooms }"
        />
        <p v-if="errors.bedrooms" class="house-form__error">
          {{ errors.bedrooms }}
        </p>
      </div>

      <div class="house-form__field">
        <label class="house-form__label">Bathrooms*</label>
        <input
          v-model="form.bathrooms"
          type="number"
          placeholder="Enter amount"
          class="house-form__input"
          :class="{ 'house-form__input--error': errors.bathrooms }"
        />
        <p v-if="errors.bathrooms" class="house-form__error">
          {{ errors.bathrooms }}
        </p>
      </div>
    </div>

    <!-- Construction date -->
    <div class="house-form__field">
      <label class="house-form__label">Construction date*</label>
      <input
        v-model="form.constructionYear"
        type="number"
        placeholder="e.g. 1990"
        class="house-form__input"
        :class="{ 'house-form__input--error': errors.constructionYear }"
      />
      <p v-if="errors.constructionYear" class="house-form__error">
        {{ errors.constructionYear }}
      </p>
    </div>

    <!-- Description -->
    <div class="house-form__field">
      <label class="house-form__label">Description*</label>
      <textarea
        v-model="form.description"
        placeholder="Description"
        class="house-form__input house-form__textarea"
        :class="{ 'house-form__input--error': errors.description }"
      />
      <p v-if="errors.description" class="house-form__error">
        {{ errors.description }}
      </p>
    </div>

    <div class="house-form__button-flex">
      <!-- Submit button -->
      <button type="submit" class="house-form__submit">
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup>
/**
 * HouseForm component - reusable form for creating and editing house listings.
 * Handles form validation, image upload preview and emits submitted data to parent.
 * Used in both HouseCreateView and HouseEditView.
 */
import { ref, watch } from 'vue'

const props = defineProps({
  // Initial values to pre-fill the form when editing an existing listing
  initialValues: {
    type: Object,
    default: null,
  },
  // Submit button label - 'POST' for create, 'SAVE' for edit
  submitLabel: {
    type: String,
    default: 'POST',
  },
})

// Emit submit event with form data and image file to parent
const emit = defineEmits(['submit'])

// Reference to the hidden file input element
const imageInput = ref(null)

// Preview URL for the selected image
const imagePreview = ref(null)

// The actual image file to upload
const imageFile = ref(null)

// Form fields - initialized with empty values
const form = ref({
  streetName: '',
  houseNumber: '',
  numberAddition: '',
  zip: '',
  city: '',
  price: '',
  size: '',
  hasGarage: '',
  bedrooms: '',
  bathrooms: '',
  constructionYear: '',
  description: '',
})

// Validation error messages for each field
const errors = ref({})

/**
 * Watch for initialValues changes and pre-fill form when editing.
 * This handles the case where data loads after component mounts.
 */
watch(
  () => props.initialValues,
  (values) => {
    if (values) {
      form.value = {
        streetName: values.location.street || '',
        houseNumber: values.location.houseNumber || '',
        numberAddition: values.location.numberAddition || '',
        zip: values.location.zip || '',
        city: values.location.city || '',
        price: values.price || '',
        size: values.size || '',
        hasGarage: values.hasGarage !== undefined ? String(values.hasGarage) : '',
        bedrooms: values.rooms.bedrooms || '',
        bathrooms: values.rooms.bathrooms || '',
        constructionYear: values.constructionYear || '',
        description: values.description || '',
      }
      // Show existing image as preview
      if (values.image) {
        imagePreview.value = values.image
      }
    }
  },
  { immediate: true },
)

/**
 * Triggers the hidden file input when the image upload area is clicked.
 */
function triggerImageUpload() {
  imageInput.value.click()
}

/**
 * Handles image file selection and creates a preview URL.
 * @param {Event} event - The file input change event.
 */
function handleImageChange(event) {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    // Create a temporary URL to preview the selected image
    imagePreview.value = URL.createObjectURL(file)
  }
}

/**
 * Clears the selected image and preview.
 */
function clearImage() {
  imageFile.value = null
  imagePreview.value = null
  imageInput.value.value = ''
}

/**
 * Validates all required form fields.
 * Returns true if valid, false if there are errors.
 */
function validateForm() {
  errors.value = {}

  if (!form.value.streetName) errors.value.streetName = 'Required field missing'
  if (!form.value.houseNumber) errors.value.houseNumber = 'Required field missing'
  if (!form.value.zip) errors.value.zip = 'Required field missing'
  if (!form.value.city) errors.value.city = 'Required field missing'
  if (!form.value.price) errors.value.price = 'Required field missing'
  if (!form.value.size) errors.value.size = 'Required field missing'
  if (!form.value.hasGarage) errors.value.hasGarage = 'Required field missing'
  if (!form.value.bedrooms) errors.value.bedrooms = 'Required field missing'
  if (!form.value.bathrooms) errors.value.bathrooms = 'Required field missing'
  if (!form.value.constructionYear) errors.value.constructionYear = 'Required field missing'
  if (!form.value.description) errors.value.description = 'Required field missing'
  // Image is required for create but optional for edit (existing image is kept)
  if (!imageFile.value && !imagePreview.value) errors.value.image = 'Required field missing'

  // Return true if no errors found
  return Object.keys(errors.value).length === 0
}

/**
 * Handles form submission.
 * Validates the form and emits form data and image file to parent.
 */
function handleSubmit() {
  if (!validateForm()) return

  // Build FormData with all house fields
  const formData = new FormData()
  formData.append('streetName', form.value.streetName)
  formData.append('houseNumber', form.value.houseNumber)
  formData.append('numberAddition', form.value.numberAddition)
  formData.append('zip', form.value.zip)
  formData.append('city', form.value.city)
  formData.append('price', form.value.price)
  formData.append('size', form.value.size)
  formData.append('hasGarage', form.value.hasGarage)
  formData.append('bedrooms', form.value.bedrooms)
  formData.append('bathrooms', form.value.bathrooms)
  formData.append('constructionYear', form.value.constructionYear)
  formData.append('description', form.value.description)

  // Emit form data and image file to parent component
  emit('submit', { formData, imageFile: imageFile.value })
}
</script>

<style scoped>
.house-form__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  max-width: 500px;
}

.house-form__row {
  display: flex;
  gap: var(--spacing-md);
}

.house-form__row .house-form__field {
  flex: 1;
}

.house-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.house-form__label {
  font-family: var(--font-primary);
  font-size: var(--font-size-input);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.house-form__input {
  padding: var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-background-2);
  font-family: var(--font-secondary);
  font-size: var(--font-size-input-field);
  color: var(--color-text-secondary);
  outline: none;
  width: 100%;
}

.house-form__input::placeholder {
  color: var(--color-tertiary-dark);
}

.house-form__input--error {
  border: 1px solid var(--color-primary);
}

.house-form__select {
  appearance: none;
  cursor: pointer;
}

.house-form__textarea {
  resize: none;
  height: 120px;
}

.house-form__image-upload {
  width: 120px;
  height: 120px;
  margin-top: 15px;
  border-radius: var(--border-radius-sm);
  border: 2px dashed var(--color-tertiary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.house-form__submit:hover {
  opacity: 0.9;
  cursor: pointer;
}

.house-form__image-upload--error {
  border-color: var(--color-primary);
}

.house-form__image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.house-form__image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.house-form__image-icon {
  width: 30px;
  height: 30px;
}

.house-form__image-clear {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.house-form__image-clear img {
  width: 30px;
  height: 30px;
}

.house-form__image-input {
  display: none;
}

.house-form__error {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-family: var(--font-primary);
  font-size: var(--font-size-error);
  font-style: italic;
  color: var(--color-primary);
}

.house-form__submit {
  background-color: var(--color-primary);
  color: var(--color-background-2);
  border: none;
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  font-family: var(--font-primary);
  font-size: var(--font-size-nav);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  width: 50%;
  letter-spacing: 1px;
  margin-top: var(--spacing-md);
  opacity: 0.5;
}

.house-form__button-flex {
  display: flex;
  justify-content: flex-end;
}

.house-form__image-upload:has(.house-form__image-preview) {
  border: none;
}
</style>

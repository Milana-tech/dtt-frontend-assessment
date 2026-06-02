<script setup>
/**
 * DeleteButton component - reusable confirmation dialog for deleting a listing.
 * Emits 'confirm' when user confirms deletion and 'cancel' when user cancels.
 */
defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div class="house-detail__modal-overlay">
    <div class="house-detail__modal">
      <h2>Delete listing</h2>
      <div class="house-detail__paragraphs">
        <p>Are you sure you want to delete this listing?</p>
        <p>This action cannot be undone.</p>
      </div>
      <div class="house-detail__modal-buttons">
        <button
          class="house-detail__modal-btn house-detail__modal-btn--delete"
          @click="$emit('confirm')"
        >
          YES, DELETE
        </button>
        <button
          class="house-detail__modal-btn house-detail__modal-btn--cancel"
          @click="$emit('cancel')"
        >
          GO BACK
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  padding: var(--spacing-xl) var(--spacing-xxl);
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

.house-detail__paragraphs {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  margin: 25px 20px 40px 20px;
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

@media (max-width: 768px) {
  .house-detail__modal {
    padding: var(--spacing-xl) var(--spacing-lg);
    width: 90%;
    border-radius: var(--border-radius-md);
  }

  .house-detail__modal h2 {
    font-size: var(--font-size-h2);
    white-space: normal;
    word-break: break-word;
  }

  .house-detail__modal p {
    white-space: normal;
    text-align: match-parent;
  }

  .house-detail__modal-buttons {
    width: 100%;
  }

  .house-detail__modal-btn {
    width: 100%;
  }
}
</style>

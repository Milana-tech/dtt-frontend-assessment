import { createRouter, createWebHistory } from 'vue-router'

/**
 * An application router configuration.
 * This defines all available routes and their corresponding view components.
 * Components are lazy-loaded for better performance.
 */

const router = createRouter({
  // createWebHistory enables clean URLs (e.g. /houses instead of /#/houses)
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'houses',
      // Houses overview page is the main landing page of the application
      component: () => import('../views/HousesView.vue'),
    },
    {
      path: '/house/:id',
      name: 'house-detail',
      // Detail page for a single house listing
      component: () => import('../views/HouseDetailView.vue'),
      meta: { activeNav: 'houses' },
    },
    {
      path: '/house/create',
      name: 'house-create',
      // Form page for creating a new house listing
      component: () => import('../views/HouseCreateView.vue'),
      meta: { activeNav: 'houses' },
    },
    {
      path: '/house/:id/edit',
      name: 'house-edit',
      // Form page for editing an existing house listing
      component: () => import('../views/HouseEditView.vue'),
      meta: { activeNav: 'houses' },
    },
    {
      path: '/about',
      name: 'about',
      // About page with information about the app and developer
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router

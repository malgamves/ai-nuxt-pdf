<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <img src="/logo.svg" alt="PDF Viewer Logo" class="h-8 w-8 mr-2" />
          <h1 class="text-xl font-semibold text-gray-900">PDF Viewer</h1>
        </div>
        <nav class="hidden md:flex space-x-4">
          <a href="#" class="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Home</a>
          <a href="https://github.com/sandrien/vue-pdf-embed" target="_blank" 
            class="text-gray-600 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            Documentation
          </a>
        </nav>
        <div class="md:hidden">
          <button @click="isMenuOpen = !isMenuOpen" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden animate-fade-in">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50">Home</a>
        <a href="https://github.com/sandrien/vue-pdf-embed" target="_blank" 
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50">
          Documentation
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false);
</script>
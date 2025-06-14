<template>
  <div class="h-full flex flex-col">
    
    <div class="flex-grow overflow-y-auto relative">
      <ClientOnly>
        <vue-pdf-embed
          :source="source"
          :page="currentPage"
          @rendered="onPdfRendered"
          @loading="loading = true"
          @loaded="handlePdfLoaded"
          @error="handlePdfError"
          class="absolute inset-0 w-full h-full"
        />
      </ClientOnly>
    </div>

    <!-- Navigation Controls -->
    <div class="flex items-center justify-between mt-4 border-t pt-4">
      <div class="flex items-center gap-2">
        <button 
          @click="prevPage" 
          :disabled="currentPage <= 1"
          class="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          Previous
        </button>
        <span class="text-sm">
          Page {{ currentPage }} of {{ pageCount }}
        </span>
        <button 
          @click="nextPage" 
          :disabled="currentPage >= pageCount"
          class="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      
      <label class="cursor-pointer px-3 py-1 border rounded-md hover:bg-gray-50">
        Upload PDF
        <input 
          type="file" 
          class="hidden" 
          accept="application/pdf"
          @change="handleFileUpload"
        >
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const loading = ref(false)
const error = ref(null)
const source = ref(null)
const currentPage = ref(1)
const pageCount = ref(1)

const loadPdf = async (pdfPath) => {
  try {
    loading.value = true
    error.value = null
    source.value = null // Reset source first
    await nextTick() // Wait for the component to update
    source.value = pdfPath
    currentPage.value = 1
  } catch (err) {
    handlePdfError(err)
  }
}

const handlePdfLoaded = (pdf) => {
  loading.value = false
  pageCount.value = pdf.numPages
}

const handlePdfError = (err) => {
  loading.value = false
  error.value = err.message || 'Failed to load PDF'
  console.error('PDF loading error:', err)
}

const retryLoading = () => {
  loadPdf('/sample.pdf')
}

const onPdfRendered = () => {
  loading.value = false
}

const nextPage = () => {
  if (currentPage.value < pageCount.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    const reader = new FileReader()
    reader.onload = (e) => {
      loadPdf(e.target.result)
    }
    reader.readAsDataURL(file)
  } else {
    error.value = 'Please select a valid PDF file'
  }
}

onMounted(() => {
  loadPdf('/sample.pdf')
})
</script>
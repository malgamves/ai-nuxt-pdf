<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-2rem)]">
        <!-- Chat Section -->
        <div class="bg-white rounded-lg shadow-sm p-4 flex flex-col">
          <div class="flex-grow overflow-y-auto mb-4 space-y-4">
            <div v-for="message in messages" :key="message.id" class="flex gap-2">
              <div :class="[
                'rounded-lg p-3 max-w-[80%]',
                message.sender === 'user' ? 'bg-orange-100 ml-auto' : 'bg-blue-100'
              ]">
                {{ message.text }}
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Send a message"
              class="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              @keyup.enter="sendMessage"
            />
            <button
              @click="sendMessage"
              class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>

        <!-- PDF Viewer Section -->
        <div class="bg-white rounded-lg shadow-sm p-4 flex flex-col">
          <div class="flex-grow relative">
            <PdfViewer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

const messages = useStorage('chat-messages', [
  { id: 1, sender: 'ai', text: 'Hi! How can I help you with the PDF?' },
])

const newMessage = ref('')

function sendMessage() {
  if (!newMessage.value.trim()) return
  
  messages.value.push({
    id: Date.now(),
    sender: 'you',
    text: newMessage.value
  })
  
  newMessage.value = ''
}
</script>

<style>
html, body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
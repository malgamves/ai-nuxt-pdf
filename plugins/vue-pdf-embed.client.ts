import { defineNuxtPlugin } from '#app'
import VuePdfEmbed from 'vue-pdf-embed'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VuePdfEmbed', VuePdfEmbed)
})
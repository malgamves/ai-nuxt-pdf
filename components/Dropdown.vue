<template>
    <div>
      <label for="dropdown">{{ label }}</label>
      <select 
        id="dropdown" 
        v-model="selectedOption" 
        @change="handleChange"
        :disabled="loading"
      >
        <option value="" disabled>{{ loading ? 'Loading options...' : 'please' }}</option>
        <option 
          v-for="option in options" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    label: {
      type: String,
      default: 'Select a file'
    },
    apiUrl: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['selection-changed']);
  
  const options = ref([]);
  const selectedOption = ref('');
  const loading = ref(false);
  const error = ref(null);
  
  const fetchOptions = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(props.apiUrl);
      const data = await response.json()
      
      // Transform the API response to match the dropdown format
      options.value = data.response.map(item => ({
        value: item.value,
        text: item.value
      }));
    } catch (err) {
      console.error('Error fetching dropdown options:', err);
      error.value = 'Failed to load options. Please try again.';
    } finally {
      loading.value = false;
    }
  };
  
  const handleChange = () => {
    emit('selection-changed', selectedOption.value);
  };
  
  onMounted(() => {
    fetchOptions();
  });
  </script>
  
  <style scoped>
  .error {
    color: red;
    font-size: 0.8rem;
  }
  </style>
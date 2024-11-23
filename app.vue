<template>
  <div class="min-h-screen bg-custom-main text-gray-300 flex flex-col">
    <header class="bg-custom-main p-4">
      <h1 class="text-2xl font-bold text-gray-100">IMG2Stick</h1>
    </header>
    <div class="w-full h-px dvd-custom"></div>
    <main class="flex-grow flex flex-col md:flex-row">
      <div class="w-full md:w-1/2 p-4 flex flex-col">
        <h2 class="text-xl mb-4 text-gray-200">Upload and Resize</h2>
        <label for="file-upload" class="mb-4 cursor-pointer">
          <div class="p-2 btn-custom-secondary rounded hover:btn-custom-secondary-hov transition-colors">
            Choose File
          </div>
          <input 
            id="file-upload"
            type="file" 
            @change="handleFileUpload" 
            accept="image/*" 
            class="hidden"
          />
        </label>
        <div v-if="imageUrl" class="flex items-center mb-4">
          <input 
            type="range" 
            v-model="scale" 
            min="0.1" 
            max="1" 
            step="0.1" 
            class="w-full accent-gray-600"
          />
          <span class="ml-2 text-gray-400">{{ Math.round(scale * 100) }}%</span>
        </div>
        <button 
          @click="downloadImage" 
          v-if="imageUrl" 
          class="btn-custom-secondary px-4 py-2 rounded transition-colors hover:btn-custom-secondary-hov"
        >
          Download Resized Image
        </button>
      </div>
      
      <!-- Divider (visible only on md and larger screens) -->
      <div class="hidden md:block w-px dvd-custom"></div>
      
      <div class="w-full md:w-1/2 p-4 flex items-center justify-center">
        <div class="bg-orange-500 p-4 rounded-lg shadow-lg" style="width: 240px; height: 135px;">
          <img 
            v-if="imageUrl" 
            :src="imageUrl" 
            alt="M5StickC Plus2 Preview" 
            class="w-full h-full object-contain"
            :style="{ transform: `scale(${scale})` }"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imageUrl = ref(null)
const scale = ref(1)
const originalFile = ref(null)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    originalFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = 240
        canvas.height = 135
        ctx.drawImage(img, 0, 0, 240, 135)
        imageUrl.value = canvas.toDataURL(file.type)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const downloadImage = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.onload = () => {
    canvas.width = Math.round(240 * scale.value)
    canvas.height = Math.round(135 * scale.value)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const link = document.createElement('a')
    link.download = `resized_${originalFile.value.name}`
    link.href = canvas.toDataURL(originalFile.value.type)
    link.click()
  }
  img.src = imageUrl.value
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* Custom color for the range input track */
input[type="range"] {
  -webkit-appearance: none;
  background: transparent;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  background: #4a4a4a;
  border-radius: 4px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #6b7280;
  margin-top: -4px;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #5a5a5a;
}

.bg-custom-main {
  background-color: #0d090b;
}

.btn-custom-secondary {
  background-color: #7a2752;
}

.dvd-custom {
  background-color: #000000;  
}

.btn-custom-secondary-hov {
  background-color: #531631;
}
</style>
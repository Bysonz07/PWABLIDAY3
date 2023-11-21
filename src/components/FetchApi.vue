<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="item in items" :key="item.url">{{ item.name }}</li>
      
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define reactive variables
const title = ref('Fetching Data Example');
const items = ref([]);

// Define a function to fetch data
const fetchData = async () => {
  try {
    console.log("Hello World")
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    if (response.ok) {
      const data = await response.json();
      items.value = data.results;
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// Call fetchData when the component is mounted
onMounted(fetchData);
</script>
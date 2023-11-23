<template>
    <div>
        <p>Counter: {{ counter }}</p>
        <button @click="increment">Increment</button>
        <button @click="fetchData">fetchData</button>
        <h1>{{ title }}</h1>
        <ul>
            <li v-for="item in items" :key="item.url">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Create Broadcast Channel and listen to messages sent to it
const broadcast = new BroadcastChannel('sw-update-channel');

broadcast.onmessage = (event) => {
    if (event.data && event.data.type === 'CRITICAL_SW_UPDATE') {
        // Show "update to refresh" banner to the user.
        const payload = event.data.payload;

        // Log the payload to the console
        console.log(payload);
        //show()
    }
};

// Define reactive variable
const title = ref('Fetching Data Example');
const items = ref([]);

const fetchData = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
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

</script>
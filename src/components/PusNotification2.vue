<template>
    <div>
        <div>
            <p>
                Supported: {{ isSupported }}
            </p>
        </div>

        <div v-if="isSupported">
            <button @click="show()">
                Show Notification
            </button>
        </div>
        <div v-else>
            The Notification Web API is not supported in your browser.
        </div>
    </div>
</template>

<script setup>
import { useWebNotification } from '@vueuse/core'
import { onMounted } from 'vue'

const options = {
    title: 'Hello, world from VueUse!',
    dir: 'auto',
    lang: 'en',
    renotify: true,
    tag: 'test',
}

const {
    isSupported,
    show
} = useWebNotification(options)

onMounted(() => {
    // Create Broadcast Channel and listen to messages sent to it
    const broadcast = new BroadcastChannel('sw-update-channel');

    // listen from service worker
    broadcast.onmessage = (event) => {
        if (event.data && event.data.type === 'CRITICAL_SW_UPDATE') {
            // Show "update to refresh" banner to the user.
            const payload = event.data.payload;

            // Log the payload to the console
            console.log(payload);
            show()
        }
    };
});

</script>
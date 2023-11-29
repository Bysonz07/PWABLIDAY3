<script setup>
import { ref, watchEffect } from 'vue'
import { useDevicesList, useUserMedia } from '@vueuse/core'

const currentCamera = ref('')
const { videoInputs: cameras } = useDevicesList({
    requestPermissions: true,
    onUpdated() {
        if (!cameras.value.find(i => i.deviceId === currentCamera.value))
            currentCamera.value = cameras.value[0]?.deviceId
    },
})

const video = ref()
const { stream, enabled } = useUserMedia({
    constraints: { video: { deviceId: currentCamera } },
})

watchEffect(() => {
    if (video.value)
        video.value.srcObject = stream.value
})

const takePicture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = this.$refs.video.videoWidth;
    canvas.height = this.$refs.video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
    this.capturedImage = canvas.toDataURL('image/png');
    // Stop the camera stream after capturing the image
    this.videoStream.getTracks().forEach(track => track.stop());
}
</script>

<template>
    <div class="flex flex-col gap-4 text-center">
        <div>
            <button @click="enabled = !enabled">
                {{ enabled ? "Stop" : "Start" }}
            </button>
        </div>

        <div>
            <div v-for="camera of cameras" :key="camera.deviceId" class="px-2 py-1 cursor-pointer"
                :class="{ 'text-primary': currentCamera === camera.deviceId }" @click="currentCamera = camera.deviceId">
                {{ camera.label }}
            </div>
        </div>
        <div>
            <video ref="video" muted autoplay controls class="h-100 w-auto" />
        </div>
    </div>
</template>
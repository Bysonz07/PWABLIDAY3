<template>
    <div>
        <input type="file" @change="handleImageUpload" />
        <input type="number" v-model="selectedImageId" placeholder="Enter Image ID" />
        <button @click="loadImageById">Load Image</button>
        <button @click="removeImageById">Remove Image</button>
        <img v-if="imageUrl" :src="imageUrl" alt="Stored Image" />
    </div>
</template>
 
<script>
import { openDB } from 'idb';

export default {
    data() {
        return {
            imageUrl: null,
            selectedImageId: null,
        };
    },
    methods: {
        async handleImageUpload(event) {
            const file = event.target.files[0];

            if (file) {
                try {
                    const db = await openDB('pwaDB', 1, {
                        upgrade(db) {
                            db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
                        },
                    });

                    const reader = new FileReader();
                    reader.onload = async () => {
                        const imageData = reader.result;

                        const transaction = db.transaction('images', 'readwrite');
                        const imageStore = transaction.objectStore('images');

                        const imageObject = { data: imageData, mimeType: file.type };
                        const imageId = await imageStore.add(imageObject);

                        console.log(`Image added with ID: ${imageId}`);
                    };

                    reader.readAsDataURL(file);
                } catch (error) {
                    console.error('Error:', error.message);
                }
            }
        },
        async loadImageById() {
            if (!this.selectedImageId) {
                console.error('Please enter a valid Image ID.');
                return;
            }

            try {
                const db = await openDB('pwaDB', 1);
                const transaction = db.transaction('images', 'readonly');
                const imageStore = transaction.objectStore('images');

                const selectedImage = await imageStore.get(Number(this.selectedImageId));

                if (selectedImage) {
                    this.imageUrl = selectedImage.data;
                } else {
                    console.error('Image not found with ID:', this.selectedImageId);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        },
        async removeImageById() {
            if (!this.selectedImageId) {
                console.error('Please enter a valid Image ID.');
                return;
            }

            try {
                const db = await openDB('pwaDB', 1);
                const transaction = db.transaction('images', 'readwrite');
                const imageStore = transaction.objectStore('images');

                const selectedImage = await imageStore.delete(Number(this.selectedImageId));
                console.log(86, selectedImage)
                this.imageUrl = null;

            } catch (error) {
                console.error('Error:', error.message);
            }
        },
    },
};
</script>
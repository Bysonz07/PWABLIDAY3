<template>
    <div>
        <input type="file" @change="handleFileChange" accept="image/*" />
        <img :src="imageUrl" v-if="imageUrl" alt="Uploaded Image" />
        <button @click="removeImage">RemoveImage</button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            imageUrl: null,
        }
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                this.imageUrl = URL.createObjectURL(file);
                this.saveImageToIndexedDB(e.target.result);
            };

            reader.readAsArrayBuffer(file);
        },
        saveImageToIndexedDB(blob) {
            const request = indexedDB.open("bysonDataBase", 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const objectStore = db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
            };

            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(["images"], "readwrite");
                const objectStore = transaction.objectStore("images");
                const addRequest = objectStore.add({ image: blob });

                addRequest.onsuccess = () => {
                    console.log("Berhasil menambahkan ke IndexedDB");
                };

                transaction.oncomplete = () => {
                    db.close();
                };
            };
        },
        removeImage() {
            const request = indexedDB.open("bysonDataBase", 1)
            request.onerror = (event) => {
                console.error("Error opening database:", event.target.error);
            };

            request.onsuccess = (event) => {
                const db = event.target.result;

                const deleteTransaction = db.transaction("images", "readwrite");
                const deleteObjectStore = deleteTransaction.objectStore("images");

                const deleteRequest = deleteObjectStore.delete(keyToDelete);

                deleteRequest.onsuccess = (event) => {
                    console.log("Data deleted successfully");
                    deletedData.value = "Yes";
                };

                deleteRequest.onerror = (event) => {
                    console.error("Error deleting data", event.target.error);
                    deletedData.value = "No";
                };

                deleteTransaction.oncomplete = () => {
                    console.log("Delete transaction completed");
                    db.close();
                };
            };
        }
    },
};


</script>
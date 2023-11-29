<template>
    <v-app>
        <v-btn @click="showModal = true">Open Modal</v-btn>
        <v-dialog v-model="showModal" max-width="500px">
            <v-card>
                <v-card-title>Add List</v-card-title>
                <v-card-text>
                    <!-- Your modal content goes here -->
                    <v-form @submit.prevent="submitForm" validate-on="submit lazy">
                        <!-- Input Form -->
                        <h2>To Do*</h2>
                        <v-text-field v-model="todoInput" label="Your To Do Task"></v-text-field>

                        <h2>Description</h2>
                        <v-text-field v-model="descInput" label="Your To Do Task"></v-text-field>

                        <h2>Image</h2>

                    </v-form>

                </v-card-text>
                <v-card-actions>
                    <v-btn @click="showModal = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>
<script>
import { ref } from 'vue';
export default {
    setup() {
        const showModal = ref(false);
        const todoInput = ref('');
        const descInput = ref('');
        const submitForm = () => {

        }
        return {
            showModal,
            todoInput,
            descInput
        };
    },
};
</script>
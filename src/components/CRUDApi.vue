<template>
    <div>
        <p>Data added: {{ addedData }}</p>
        <p>Data updated: {{ updatedData }}</p>
        <p>Data deleted: {{ deletedData }}</p>
        <button @click="addData">Add Data</button>
        <button @click="readData">Read Data</button>
        <button @click="updateData">Update Data</button>
        <button @click="deleteData">Delete Data</button>
        <ul>
            <li v-for="customer in customers" :key="customer.ssn">
                {{ customer.name }} - {{ customer.email }}
                {{ customer.blobImg }}
                <div style="float: left;">
                    <img :src="blobImg" />
                </div>
            </li>
        </ul>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
var data = '424D5E070000000000003E00000028000000EF000000390000000100010000000000200700000000000000000000020000000000000000000000FFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0000E00003FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0000E000007FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0000E3FFF80FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0000E7FFFFC3FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0000E7FFFFF8FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0000E7FFFFFE7FFFFFFFFFFFFFFFFFFFFFFFF001FFFFFFFFFFFFFFFFFFFFFFFE0000E7FFFFFF7FFFFFFFFFFFFFFFFFF83FFFC0FE7FFFFFFFFFFFFFFFFFFFFFFE0000E7FFFFFFBFFFFFFFFFFFFFFFFFF01FFF07FF9FFFFFFFFFFFFFFFFFFFFFFE0000C7FFFFFFDFFFFFFFFFFFFFFFFFE0EFFE0FFFE3FFFFFFFFFFFC0FFE007FFE0000C7FFFFFFEFFFFFFFFFFFFFFFFFE3EFFC3FFFFBFFFFFFFFFFE0F7F80FBFFE0000C7FFFFFFEFFFFFFC1FFFFFFFFFE3EFFC7FFFFDFFFFFFFFFFC7FBF03FBFFE0000C7FFFFFFEFFFFFF007FFFFFFE0E3EFFC7FFFFDFFFE01FFFF8FFBF0FFBFFE0000C7FFFFFFEFFFFFE0F7FFFFFF80E3EFFC7FFFFEFFFE307FFF1FFBE3FFBFFE0000C7FFFFFFEFFFFFE3FBFFFFFF0763EFFE7FFFFEFC3E7F77FF1FFBC7FFBFFE0000C7FFFFFFEFFFFFE3FDFFFFFE1F63F7FE7F07FF7800FF70FE3FFDC7FFBFFE0000C7FFFFFFEFFFFFF3FDFFFFFC7F63F7FF3EF9FF78E0FF633E3FFD8FFF7FFE0000C7FFFFFFEFFFFFF3FEFFFFFCFF67F7FF9DFCFF71FFFF63BC3FFD9FFCFFFE0000CFFFFFFFEFFFFFF9FEFFC0F8FF47FBFFC3FCFFB1FFFF63CC7FFB1FF3FFFE0000CFE000FFDFFC03F8FF7E0030FF07F9FFFFFC7FB1FFFF67F47FE73FCFFFFE0000CFDFFEFFDFF830FEFFBC1FB1FC8FFEFFFFFE3FB3FFFF47F4FFDE7FBFFFFE0000CF9FFEFFBFF0FE7E7FBC3FB1FB8FFF7FFFFE3FD3FFFF47F4FFBE7F9FFFFE0000CF1FFC7F7FE1FF3F3FDC7FD3F78FFFBFFFFE3FD3FFFF47F0FF3E7F8FFFFE00008F9FE0FF7FE3FFBF3FDC7FD3F7CFFFDFFFFE3FD3FFFF4FF8FF7E7FC7FFFE00008F8000FEFFE3FFDF9FDC7FD3F3E43FEFFFFE3FD3FFFF4FF8FF7CFFE3FFFE00008FC003FC3FC7FFDF9FDC7FB3F87BBFEFFFFE3FD3FFFF4FF8FF7CFFF3FFFE00008FFEFFF007C7FFEF9FDC7F73FF3FCFEFFFFE3FD3F1FF0FF0FFBCFFF9FFFE00008FFFFFC001C7C3EF1FDC7EFBFF9FF7EFFFFE3FF3F6FF0FF4FFBCFFF9FFFE00008FFFFE21FCC7D9EE1FDC7DF9FFEFFBEFFFFE3FE3F6FF0FF4FFDCFCFCFFFE00008FFFFEC3FF07D8E43FBC7DF9E0F7FC0FFFFE3FD3F67F0FF47FE4FB3EFFFE00008FFFFF47FF87D8F07F7C7DFCEE77FFFFFFFE3FD3F73F0FE47FF2FB9EFFFE00008FFFFF47FFC7D8F0FF007C02EE77FFFFFFFE3FD3F73F0FEE7FFC7B1DFFFE00009FFFFF8FFFC7D0F0FE07FE02F477FFFFFFFC3FD3F73F4C4E7FFD7C3DFFFE00009FFFFF8FFFE7D1E1FE8FFFFCF877FFFFFFFC7FD3F73F41BE3FFD7C3BFFFE00009FFFFF8FC3E3E1E1FD8FFFFE78F7FFFFFFFC7FD3F73F6CFE3FFDBFFBFFFE00009FFFFF8F9BE3F1E3FDCFFFFEBFF7FFFFFFFC7FD3FB3F787F3FFDBFFBFFFE00009E07FF8FB9F3FFE3FDCFFFFEDFEFFFFFFFFC7FD9FB3F783F1FFDDFF7FFFE00009EF9FF8F79F1FFE3FDE7FFFEE79FFFFFFFF87FD9FBBF71DF9FFDEFCFFFFE00009EFDFF0F39F5FFE3FEE7FFFDF87FFFFFFFF8FFDDFB9F73DF9FFDF03FFFFE00001EFDFF4FB9E6FFC9FF381F03FFFFFFFFFFF8FF9DFB9FA3EFCFFBFFFFFFFE00001EF0FEEF91EF7FBCFFCF9F7FFFFFFFFFFFF0FFBE03DFA7EFCFFBFFFFFFFE00001E01FEE7D1EFBF7E7FF78FBFFFFFFFFFFFF1FFBFFFCFA7EFC7FBFFFFFFFE00001E01FEE7C1CFDE7F7FFB8FBFFFFFFFFFFFF1FFBFFFE7A7EFE3F7FFFFFFFE00001FFFFEF7E3CFE1FFBFFB8FBFFFFFFFFFFFF1FFBFFFF027EFF1F7FFFFFFFE00001FFFFCF3FFDFFFFFDFFB8FBFFFFFFFFFFFF3FF7FFFFFF7EFFCEFFFFFFFFE00009FFFF9FBFFDFFFFFEFFBCFBFFFFFFFFFFFF3FF7FFFFFF3EFFF0FFFFFFFFE0000C7FFE7FDFFDFFFFFF7F7CFBFFFFFFFFFFFE3FF7FFFFFF3EFFFFFFFFFFFFE0000F03F9FFEFFDFFFFFF7F7C7BFFFFFFFFFFFE7FF7FFFFFFBDFFFFFFFFFFFFE0000FF807FFEFFBFFFFFF9EFE7BFFFFFFFFFFFE7FF7FFFFFFDBFFFFFFFFFFFFE0000FFFDFFFF7F3FFFFFFE1FF07FFFFFFFFFFFC7FF7FFFFFFE3FFFFFFFFFFFFE0000FFFFFFFF40FFFFFFFFFFFFFFFFFFFFFFFFE7FEFFFFFFFFFFFFFFFFFFFFFE0000FFFFFFFFBFFFFFFFFFFFFFFFFFFFFFFFFFF3F1FFFFFFFFFFFFFFFFFFFFFE0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC0FFFFFFFFFFFFFFFFFFFFFFE0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0000';
// Convert the string to bytes
var bytes = new Uint8Array(data.length / 2);

for (var i = 0; i < data.length; i += 2) {
    bytes[i / 2] = parseInt(data.substring(i, i + 2), 16);
}

// Make a Blob from the bytes
var blob = new Blob([bytes], { type: 'image/bmp' });

const dbName = "the_name";
const customerToAdd = { ssn: "666-66-6666", name: "Alice", age: 28, email: "alice@example.com", blobImg: blob };
const keyToUpdate = "666-66-6666";
const updatedCustomerData = { ssn: "666-66-6666", name: "Alice Updated", age: 30, email: "alice.updated@example.com", blobImg: blob };
const keyToDelete = "666-66-6666";

const addedData = ref(null);
const updatedData = ref(null);
const deletedData = ref(null);
const customers = ref([]);

const addData = () => {
    const request = indexedDB.open(dbName, 2);

    request.onerror = (event) => {
        console.error("Error opening database:", event.target.error);
    };

    request.onupgradeneeded = (event) => {
        const db = event.target.result;

        const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: true });
        objectStore.createIndex("blobImg", "blobImg", { unique: false })


        const addTransaction = db.transaction("customers", "readwrite");
        const customerObjectStore = addTransaction.objectStore("customers");

        const addRequest = customerObjectStore.add(customerToAdd);
        addRequest.onsuccess = (event) => {
            console.log("Data added successfully");
            addedData.value = "Yes";
        };
    };

    request.onsuccess = (event) => {
        const db = event.target.result;

        const addTransaction = db.transaction("customers", "readwrite");
        const customerObjectStore = addTransaction.objectStore("customers");

        const addRequest = customerObjectStore.add(customerToAdd);

        addRequest.onsuccess = (event) => {
            console.log("Data added successfully");
            addedData.value = "Yes";
        };

        addRequest.onerror = (event) => {
            console.error("Error adding data", event.target.error);
            addedData.value = "No";
        };

        addTransaction.oncomplete = () => {
            console.log("Add transaction completed");
            db.close();
        };
    };
};

const readData = () => {
    const request = indexedDB.open(dbName, 2);

    request.onerror = (event) => {
        console.error("Error opening database:", event.target.error);
    };

    request.onsuccess = (event) => {
        const db = event.target.result;

        const readTransaction = db.transaction("customers", "readonly");
        const customerObjectStore = readTransaction.objectStore("customers");

        const customersCursor = customerObjectStore.openCursor();

        customersCursor.onsuccess = (event) => {
            const cursor = event.target.result;

            if (cursor) {
                // customers.value.push(cursor.value);
                console.log('customers.value:', customers.value)
                customers.value.splice(cursor.value.index, 1, cursor.value);
                cursor.continue();
            } else {
                console.log("Data read successfully");
                // customers.value.splice(0, customers.value.length);
                db.close();
            }
        };

        customersCursor.onerror = (event) => {
            console.error("Error reading data", event.target.error);
            db.close();
        };
    };
};

const updateData = () => {
    const request = indexedDB.open(dbName, 2);

    request.onerror = (event) => {
        console.error("Error opening database:", event.target.error);
    };

    request.onsuccess = (event) => {
        const db = event.target.result;

        const updateTransaction = db.transaction("customers", "readwrite");
        const customerObjectStore = updateTransaction.objectStore("customers");

        const updateRequest = customerObjectStore.put(updatedCustomerData);

        updateRequest.onsuccess = (event) => {
            console.log("Data updated successfully");
            updatedData.value = "Yes";
        };

        updateRequest.onerror = (event) => {
            console.error("Error updating data", event.target.error);
            updatedData.value = "No";
        };

        updateTransaction.oncomplete = () => {
            console.log("Update transaction completed");
            db.close();
        };
    };
};

const deleteData = () => {
    const request = indexedDB.open(dbName, 2);

    request.onerror = (event) => {
        console.error("Error opening database:", event.target.error);
    };

    request.onsuccess = (event) => {
        const db = event.target.result;

        const deleteTransaction = db.transaction("customers", "readwrite");
        const deleteObjectStore = deleteTransaction.objectStore("customers");

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
};
</script>
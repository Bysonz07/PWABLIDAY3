<template>
    <div class="container">
        <div class="content" id="red">1</div>
        <div class="content" id="green">2</div>
        <div class="content" id="blue">3</div>
        <div class="content" id="yellow">4</div>
        <div class="content" id="purple">5</div>
        <div class="content" id="grey">6</div>
    </div>
</template>

<script setup>
// You can import and use Vue composition functions here
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
}

.content {
    flex-basis: 100%;
}

@media (min-width: 599px) {
    .content {
        flex-basis: 50%;
    }
}

@media (min-width: 600px) and (max-width: 959px) {
    .content {
        flex-basis: 33.33%;
    }
}

@media (min-width: 960px) {
    .content {
        flex-basis: 20%;
    }
}

#red {
    background-color: red;
}

#green {
    background-color: green;
}

#blue {
    background-color: blue;
}

#yellow {
    background-color: yellow;
}

#purple {
    background-color: purple;
}

#grey {
    background-color: grey;
}
</style>
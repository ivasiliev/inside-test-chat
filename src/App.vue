<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>

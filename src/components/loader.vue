<template>
    <transition name="fade">
        <div class="loading" v-show="show">
            <div>
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p v-if="!!text">{{ text }}</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "loader",
    props: {
        show: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: null
        }
    }
}
</script>

<style scoped>

.loading {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #0d1019;
    text-align: center;
    padding: 20px;
    z-index: 2;
}

p {
    font-size: 12px;
}

.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
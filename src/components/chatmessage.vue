<template>
    <div class="chat-box__message_cont">
        <div class="chat-box__message"
             :class="{own: !message.out}">
            <div class="name" v-if="message.out">{{ out_message_title }}</div>
            <div class="message">
                <span v-html="message.message"></span>
                <div class="time">{{ message.dt.time }}</div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
export default {
    name: "chatmessage",
    props: {
        message: {
            type: Object,
            default: function () {
                return {};
            }
        },
        out_message_title: {
            type: String,
            default: 'Tech support'
        },
    }
}
</script>

<style scoped>

</style>
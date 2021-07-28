<template>
    <div class="chat-box">
        <!-- chat-box__header -->
        <div class="chat-box__header">
            <a href="#" class="back"><i class="icon icon-left"></i></a>
            <h1 class="main-title">{{ main_title }}</h1>
            <div style="width: 12px;" class=""></div>
        </div>
        <!-- /chat-box__header -->
        <!-- chat-box__messages -->
        <div class="chat-box__messages">
            <div class="chat-box__date_block" v-for="(dt, key) in groupedMessages" :key="key">
                <div class="chat-box__separator">
                    {{ dt.title }}
                </div>

                <chatmessage
                    v-for="(curr, index) in dt.list"
                    :key="index"
                    :message="curr"
                    :out_message_title="out_message_title"
                />
            </div>
            <transition name="fade">
                <div class="no_data" v-show="!loading && !messages.length">
                    Для начала диалога введите сообщение и нажмите "Отправить"
                </div>
            </transition>
            <loader :show="loading" :text="loading_text"/>
        </div>
        <!-- /chat-box__messages -->
        <!-- chat-box__form -->
        <form class="chat-box__form main-form" @submit.prevent="sendMessage">
            <textarea class="input-style" rows="7" v-model="user_message"></textarea>
            <div class="row">
                <label class="main-form__item file-field">
                </label>
                <div class="main-form__submit">
                    <button type="submit" class="radius-button standart rounded" :disabled="!user_message || loading">
                        Отправить
                    </button>
                </div>
            </div>
        </form>
        <!-- /chat-box__form -->
    </div>
</template>

<script>
import loader from './loader'
import chatmessage from "./chatmessage";

export default {
    name: "chatbox",
    components: {
        loader,
        chatmessage
    },
    props: {
        main_title: {
            type: String,
            default: 'Default chat title'
        },
        out_message_title: {
            type: String,
            default: 'Tech support'
        },
        socket_url: {
            type: String,
            default: null,
            required: true
        }
    },
    data: function () {
        return {
            loading: true,
            loading_text: 'Соединяемся с сервером...',
            connection: null,
            timer: null,
            timeout: 1000, // 1s timeout before re-connected
            user_name: 'test_user',
            user_message: null,
            messages: [],
            months: [
                'Января',
                'Февраля',
                'Марта',
                'Апреля',
                'Мая',
                'Июня',
                'Июля',
                'Августа',
                'Сентября',
                'Октября',
                'Ноября',
                'Декабря',
            ]
        }
    },
    computed: {
        // Группируем сообщения по датам
        groupedMessages: function () {
            const curr_dt = new Date();
            let main = {};
            this.messages.forEach((msg) => {
                if (!main[msg.dt.date]) {
                    const dt_parts = msg.dt.date.split('-');
                    const year = parseInt(dt_parts[0]) === curr_dt.getFullYear() ? '' : ' ' + dt_parts[0];
                    main[msg.dt.date] = {
                        title: dt_parts[2] + ' ' + this.months[dt_parts[1] - 1] + year,
                        list: []
                    };
                }
                main[msg.dt.date].list.push(msg);
            });
            return main;
        }
    },
    methods: {
        // Отправка сообщения пользователя с фильтрацией ввода
        sendMessage: function () {
            if (!this.user_message) {
                // здесь механика подсказки клиенту, что надо бы набрать сообщение перед отправкой
                return false;
            }
            //console.log(this.connection);
            const curr_message = this.user_message.split('\n').join('<br>');
            this.connection.send(JSON.stringify({
                name: this.user_name,
                message: curr_message
            }));
            this.pushMessage({
                message: curr_message,
                dt: this.getDT(Date.now()),
                out: false
            })
            this.user_message = null;
        },
        // Добавление сообщения в список
        pushMessage: function (message) {
            this.messages.push(message);
        },
        // Устанавливаем соединение с сокетом
        setConnection: function () {
            console.log("Starting connection to WebSocket Server");
            this.connection = new WebSocket(this.socket_url);

            this.connection.onmessage = (event) => {
                //console.log(event);
                let message = JSON.parse(event.data);
                message.dt = this.getDT(Date.now());
                message.out = true;
                this.pushMessage(message);
            }

            this.connection.onopen = (event) => {
                //console.log(event);
                console.log("Successfully connected to the echo websocket server...");
                this.loading = false;
            }

            this.connection.onerror = (event) => {
                //console.log(event);
                console.log("Error connection to the websocket server...");
            }
            this.connection.onclose = (event) => {
                //console.log(event);
                if (event.wasClean) {
                    console.log("Websocket successfully closed");
                    return false;
                }
                console.log("Closed. Try re-connect to the websocket server...");
                setTimeout(() => {
                    this.setConnection();
                }, this.timeout);
            }
        },
        // Принудительно закрываем соедние с сокетом
        closeConnection: function () {
            if (!!this.connection) {
                this.connection.close();
            }
            if (!!this.timer) {
                clearTimeout(this.timer);
            }
        },
        // Функция-утилита
        _addZero: function (n) {
            return n > 9 ? n : '0' + n;
        },
        // Получение объекта даты сообщения
        getDT: function (ms) {
            const dt = new Date(ms);
            return {
                date: dt.getFullYear() + '-' + this._addZero(dt.getMonth() + 1) + '-' + this._addZero(dt.getDate()),
                time: this._addZero(dt.getHours()) + ':' + this._addZero(dt.getMinutes())/* + ':' + this._addZero(dt.getSeconds())*/
            };
        }
    },
    created: function () {
        if (!this.socket_url) {
            console.log("Chat is not started: socket_url not set");
        }
        this.setConnection();
    },
    beforeDestroy() {
        this.closeConnection();
    }
}
</script>

<style>
.no_data {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2;
    background: #0d1019;
}

.chat-box__messages {
    position: relative;
}
</style>
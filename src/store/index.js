import Vue from 'vue'
import Vuex from 'vuex'
import settings from "../settings";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        messages: JSON.parse(localStorage.getItem(settings.messages_pack) || '[]')
    },
    mutations: {
        // Add new message to state
        ADD_MESSAGE: function (state, msg) {
            state.messages.push(msg);
            localStorage.setItem(settings.messages_pack, JSON.stringify(state.messages));
        },
    },
    actions: {// LANG
        addMessage: function ({commit, state}, msg) {
            commit('ADD_MESSAGE', msg);
        },
    },
    getters: {
        // Get saved messages
        getMessages: function (state) {
            return state.messages;
        },
    }
})

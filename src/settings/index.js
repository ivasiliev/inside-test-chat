const settings = {
    // CHAT
    chat: {
        //socket_url: 'ws://skade.cc:38080', // Предоставленный сокет не работает, использую тестовый
        socket_url: 'wss://echo.websocket.org',
    },
    // TOKEN key
    token_key: 'test_c1_public_ut',
    token_expires: 'test_c1_public_ut_exp',
    token_lifetime: 86400000, // 1 day, ms
    sys_message_show_sec: 4,
    // API settings
    api: {
        base_url: process.env.ENDPOINT,
        base_headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Origin': '*'
        },
    },
    hard_lang: 'ru',
    // TEST AUTH
    temp_token: btoa('test_chat_temp_token'),
};

export default settings;
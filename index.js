const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: process.env.IP,
        port: parseInt(process.env.PORT) || 25565,
        username: process.env.USERNAME,
        version: process.env.VERSION || '1.20.1'
    });

    bot.on('spawn', () => {
        console.log('Bot đã vào server, đang chờ hiện bảng đăng nhập...');
        setTimeout(() => {
            if (process.env.PASSWORD) {
                bot.chat(`/login ${process.env.PASSWORD}`);
                console.log('Đã tự động gửi lệnh /login ẩn phía sau màn hình thành công!');
            }
        }, 3000);
    });

    bot.on('end', () => {
        console.log('Mất kết nối! Đang tự động kết nối lại sau 10 giây...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Lỗi kết nối: ', err.message));
}

createBot();

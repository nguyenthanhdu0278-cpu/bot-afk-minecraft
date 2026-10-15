const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: process.env.IP || 'chinmc.com',
        // Ép buộc bot chạy đúng cổng game Minecraft Java mặc định (25565)
        port: 25565, 
        username: process.env.USERNAME,
        version: process.env.VERSION || '1.21.11'
    });

    bot.on('spawn', () => {
        console.log('Bot đã vào server ChinMC thành công, đang chờ hiện bảng đăng nhập...');
        
        // Chờ 3 giây để server hiện bảng auth rồi mới gửi lệnh chat
        setTimeout(() => {
            if (process.env.PASSWORD) {
                bot.chat(`/login ${process.env.PASSWORD}`);
                console.log(`Đã tự động gửi lệnh /login cho tài khoản ${process.env.USERNAME}!`);
            } else {
                console.log('Cảnh báo: Bạn chưa điền biến PASSWORD trong mục Environment của Render!');
            }
        }, 3000);
    });

    // Tự động kết nối lại nếu bị Kick hoặc Server bảo trì / Reset
    bot.on('end', () => {
        console.log('Mất kết nối tới server! Đang tự động kết nối lại sau 10 giây...');
        setTimeout(createBot, 10000);
    });

    // Báo lỗi chi tiết ra màn hình log nếu gặp sự cố kết nối
    bot.on('error', (err) => {
        console.log('Lỗi kết nối Minecraft: ', err.message);
    });
}

createBot();

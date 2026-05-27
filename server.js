const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = '8602446244:AAFuwaWIKnEi1B-y0NdaCunzjZ0xcg2W44s';
const CHAT_ID = '6704226487';

app.post('/sell', async (req, res) => {
  try {
    const {
      server,
      nickname,
      virts,
      price,
      telegram,
      telegramId,
    } = req.body;

    const text = `
💸 НОВАЯ ЗАЯВКА НА ПРОДАЖУ ВИРТОВ

🖥 Сервер: ${server}
🎮 Ник в игре: ${nickname}
👤 Telegram: @${telegram}
🆔 Telegram ID: ${telegramId}
💰 Хочет продать: ${virts}
₽ Нужно выплатить: ${price}₽
    `;

    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text,
      }
    );

    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log('server started');
});
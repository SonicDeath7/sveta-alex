import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

// Telegram Bot details provided by user
const TELEGRAM_BOT_TOKEN = "8465212295:AAEAWwwFoAIV1ACnsbz8cjGNWYAlsFysEqs";
const NOTIFICATION_EMAIL = "darkbeacon71@gmail.com";

// Registered target Chat IDs for notifications (includes user chat ID 226821933)
const REGISTERED_CHAT_IDS = new Set<number | string>([226821933]);

// Helper to send message via Telegram Bot API
async function sendTelegramNotification(bookingData: {
  serviceTitle: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  comment?: string;
  contactMethod?: string;
}) {
  const messageText = 
`<b>💅 НОВАЯ ЗАПИСЬ НА САЙТЕ!</b>\n\n` +
`<b>Клиент:</b> ${bookingData.clientName}\n` +
`<b>Телефон:</b> ${bookingData.clientPhone}\n` +
`<b>Услуга:</b> ${bookingData.serviceTitle}\n` +
`<b>Дата:</b> ${bookingData.date}\n` +
`<b>Время:</b> ${bookingData.timeSlot}\n` +
`<b>Предпочтение связи:</b> ${bookingData.contactMethod || 'не указано'}\n` +
(bookingData.comment ? `<b>Комментарий:</b> ${bookingData.comment}\n` : '') +
`\n<i>Мастер: Светлана Алексеева</i>`;

  let sentStatus = false;
  const targetChatIds = new Set<number | string>(REGISTERED_CHAT_IDS);

  try {
    // Check for recent updates to find any new chat IDs with the bot
    const updatesRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    if (updatesRes.ok) {
      const updatesData = await updatesRes.json();
      if (updatesData.ok && Array.isArray(updatesData.result)) {
        for (const update of updatesData.result) {
          if (update.message?.chat?.id) {
            targetChatIds.add(update.message.chat.id);
            REGISTERED_CHAT_IDS.add(update.message.chat.id);
          }
          if (update.channel_post?.chat?.id) {
            targetChatIds.add(update.channel_post.chat.id);
            REGISTERED_CHAT_IDS.add(update.channel_post.chat.id);
          }
          if (update.callback_query?.message?.chat?.id) {
            targetChatIds.add(update.callback_query.message.chat.id);
            REGISTERED_CHAT_IDS.add(update.callback_query.message.chat.id);
          }
        }
      }
    }

    const chatList = Array.from(targetChatIds);
    console.log(`[Telegram Bot] Sending notification to ${chatList.length} chat(s):`, chatList);

    for (const chatId of chatList) {
      const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML",
        }),
      });

      const resData = await tgRes.json();
      if (resData.ok) {
        sentStatus = true;
        console.log(`[Telegram Bot] Message successfully delivered to chat_id ${chatId}`);
      } else {
        console.error(`[Telegram Bot] Failed to send message to chat_id ${chatId}:`, resData);
      }
    }
  } catch (error) {
    console.error("[Telegram Bot API Error]:", error);
  }

  return { sentStatus, activeChatIds: Array.from(targetChatIds) };
}

// Booking API endpoint
app.post("/api/booking", async (req, res) => {
  try {
    const { serviceTitle, date, timeSlot, clientName, clientPhone, comment, contactMethod } = req.body;

    if (!clientName || !clientPhone || !serviceTitle) {
      return res.status(400).json({
        success: false,
        error: "Заполните имя, телефон и выберите услугу",
      });
    }

    const bookingPayload = {
      serviceTitle,
      date: date || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || '12:00',
      clientName,
      clientPhone,
      comment: comment || '',
      contactMethod: contactMethod || 'telegram',
    };

    console.log("==========================================");
    console.log("📨 НОВАЯ ЗАЯВКА НА ЗАПИСЬ:");
    console.log(`Клиент: ${bookingPayload.clientName} (${bookingPayload.clientPhone})`);
    console.log(`Услуга: ${bookingPayload.serviceTitle}`);
    console.log(`Дата и Время: ${bookingPayload.date} в ${bookingPayload.timeSlot}`);
    console.log(`Уведомление отправлено на почту: ${NOTIFICATION_EMAIL}`);
    console.log("==========================================");

    // Send Telegram Notification
    const tgResult = await sendTelegramNotification(bookingPayload);

    return res.json({
      success: true,
      message: "Заявка успешно принята!",
      notificationSentToTelegram: tgResult.sentStatus,
      emailDispatchedTo: NOTIFICATION_EMAIL,
      bookingDetails: bookingPayload,
    });
  } catch (error: any) {
    console.error("Error processing booking:", error);
    return res.status(500).json({
      success: false,
      error: "Ошибка при сохранении заявки. Попробуйте еще раз.",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

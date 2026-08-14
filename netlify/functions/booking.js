exports.handler = async (event) => {
  // CORS headers for preflight and standard requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const {
      serviceTitle,
      price,
      date,
      timeSlot,
      clientName,
      clientPhone,
      location,
      comment,
      contactMethod,
    } = data;

    if (!clientName || !clientPhone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Имя и телефон обязательны' }),
      };
    }

    // Telegram Bot Credentials
    const botToken = process.env.TELEGRAM_BOT_TOKEN || '8465212295:AAEAWwwFoAIV1ACnsbz8cjGNWYAlsFysEqs';
    const targetChatIds = new Set([
      process.env.TELEGRAM_CHAT_ID || '226821933',
      '592019284',
    ]);

    // Check Telegram for active chats/updates
    try {
      const updatesRes = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
      if (updatesRes.ok) {
        const updatesData = await updatesRes.json();
        if (updatesData.ok && Array.isArray(updatesData.result)) {
          for (const update of updatesData.result) {
            if (update.message?.chat?.id) targetChatIds.add(String(update.message.chat.id));
            if (update.channel_post?.chat?.id) targetChatIds.add(String(update.channel_post.chat.id));
            if (update.callback_query?.message?.chat?.id) targetChatIds.add(String(update.callback_query.message.chat.id));
          }
        }
      }
    } catch (e) {
      console.warn('Could not fetch Telegram updates:', e);
    }

    const messageText = `
<b>💅 НОВАЯ ЗАПИСЬ НА САЙТЕ!</b>

<b>Клиент:</b> ${clientName}
<b>Телефон:</b> ${clientPhone}
<b>Услуга:</b> ${serviceTitle || 'Не указана'}
<b>Стоимость:</b> ${price || 'По прайсу'}
<b>Дата:</b> ${date || 'Ближайшая'}
<b>Время:</b> ${timeSlot || 'По согласованию'}
<b>Способ связи:</b> ${contactMethod || 'telegram'}
${comment ? `<b>Комментарий:</b> ${comment}\n` : ''}
<i>Мастер: Светлана Алексеева</i>
    `.trim();

    let notificationSent = false;

    for (const chatId of targetChatIds) {
      try {
        const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: messageText,
            parse_mode: 'HTML',
          }),
        });
        const resData = await res.json();
        if (resData.ok) {
          notificationSent = true;
        } else {
          console.error(`Failed sending to chatId ${chatId}:`, resData);
        }
      } catch (err) {
        console.error(`Error sending to chatId ${chatId}:`, err);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        notificationSentToTelegram: notificationSent,
        message: 'Заявка успешно принята!',
      }),
    };
  } catch (error) {
    console.error('Serverless function booking error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Внутренняя ошибка сервера. Заявка передана.',
      }),
    };
  }
};

// =====================================================================
// Шаблоны ответов — onlinesim.io / onlineproxy.io
// Редактируй этот файл, чтобы добавлять/менять шаблоны.
// Каждый шаблон: { id, category, title, ru, en, tags, hasServicePlaceholder }
//
// hasServicePlaceholder: true -> в тексте есть {{service}}, сайт покажет
// поле ввода и подставит название сервиса в обе версии текста.
//
// category — один из ключей CATEGORIES ниже.
// =====================================================================

const CATEGORIES = [
  { id: "refunds", name: "Возвраты", icon: "wallet" },
  { id: "sms-issues", name: "СМС не приходит", icon: "message-x" },
  { id: "services", name: "Сервисы (WhatsApp, Telegram и др.)", icon: "apps" },
  { id: "rent", name: "Арендные номера", icon: "calendar-clock" },
  { id: "universal", name: "Универсальные ответы", icon: "infinity" },
  { id: "proxy", name: "Прокси", icon: "shuffle" },
  { id: "topup", name: "Пополнение баланса", icon: "credit-card" },
  { id: "free-numbers", name: "Бесплатные номера", icon: "gift" },
  { id: "account", name: "Удалённый аккаунт / данные", icon: "user-x" },
  { id: "api", name: "API", icon: "code" },
];

const TEMPLATES = [

  // ===================== БЕСПЛАТНЫЕ НОМЕРА =====================
  {
    id: "free-1",
    category: "free-numbers",
    title: "Нюансы бесплатных номеров",
    ru: `Бесплатные номера являются публичными, поэтому возможны следующие нюансы их использования:

— Номер уже используется.
— Многочисленные запросы клиентов могут вызвать временную блокировку доставки СМС отправителем.
— Возникновение ошибки, что номер используется много раз или заблокирован, вызванная чередой непрерывных запросов за короткое время.

В этом случае стоит выбрать другой номер или дождаться обновления номеров. Мы рекомендуем воспользоваться платными номерами, поскольку они предоставляются одному клиенту.

Обновление бесплатных номеров происходит один раз в неделю. О добавлении бесплатных номеров мы сообщаем в группе: https://t.me/onlinesimnews`,
    en: `Free numbers are public, so the number you selected may have already been used on the site you want by someone before you.

Also, because of many attempts by other users, SMS may not come, and an error may appear stating that the number has been used many times or is blocked.

Free numbers are updated once every 2 weeks.

Subscribe to our Telegram group so you don't miss updates on new issues: https://t.me/onlinesimnewsen`,
    tags: ["бесплатные номера", "публичные", "free numbers", "обновление номеров", "занят"],
  },
  {
    id: "free-2",
    category: "free-numbers",
    title: "Как увидеть код на бесплатном номере",
    ru: `Когда на номер приходит SMS, вы можете увидеть код прямо под номером. Рекомендуем обновить страницу, чтобы проверить наличие SMS.`,
    en: `When an SMS arrives to the number, you can see the code right under the number. We recommend refreshing the page to check for new SMS.`,
    tags: ["код", "где увидеть код", "обновить страницу", "sms code"],
  },
  {
    id: "free-3",
    category: "free-numbers",
    title: "WhatsApp сложно зарегистрировать на бесплатный номер",
    ru: `Зарегистрировать WhatsApp на бесплатный номер довольно сложно, так как популярные номера быстро разбирают другие пользователи. Могу предложить платные номера, если вам удобно.

Ознакомиться с ценами на наши услуги можно на главной странице или по ссылке: https://onlinesim.io/#price

Если хотите проверить, работают ли наши бесплатные номера, попробуйте запросить СМС от менее популярного сайта или сервиса.`,
    en: `It's very difficult to register a WhatsApp account using a free number, since popular numbers are quickly snapped up by other users. I can offer paid numbers if you'd like.

You can get acquainted with the prices for our services on the main page or at the link: https://onlinesim.io/#price

If you want to test whether our free numbers are working, try requesting an SMS from a less popular site or service.`,
    tags: ["whatsapp бесплатный номер", "ватсап", "платные номера", "paid numbers"],
  },

  // ===================== АРЕНДНЫЕ НОМЕРА =====================
  {
    id: "rent-1",
    category: "rent",
    title: "Что умеют арендные номера",
    ru: `Номера раздела «Аренда номера» предоставляют возможность приёма СМС и определение цифр номера входящего вызова.`,
    en: `Numbers in the "Number Rent" section provide the ability to receive SMS and identify the caller's phone number on incoming calls.`,
    tags: ["аренда номера", "rent number", "входящий звонок", "определить номер"],
  },
  {
    id: "rent-2",
    category: "rent",
    title: "Список стран для аренды — почему не все",
    ru: `Здравствуйте, в списке стран для арендных номеров находятся только те страны, которые представляется возможным пополнить на данный момент. О сроках добавления новых стран для арендных номеров подсказать не смогу.`,
    en: `Hello, the list of countries for rental numbers only includes those that we are currently able to restock. I'm unable to provide a timeframe for adding new countries for rental numbers.`,
    tags: ["арендные номера страны", "нет страны", "аренда", "rent countries"],
  },
  {
    id: "rent-3",
    category: "rent",
    title: "Other-сервис отключён, альтернатива — Number Rent",
    ru: `Здравствуйте, сервис «Other» работал нестабильно, так как фильтры не работали надёжно. Они могли либо пропускать СМС с запрещённых сайтов, либо блокировать СМС полностью. Возвращать этот сервис мы не планируем.

Есть альтернатива — «Аренда номера». У таких номеров много преимуществ, включая возможность продлить срок аренды, и они могут принимать СМС от любого отправителя, кроме запрещённых (банки, операторы связи, государственные сайты и т.д.).`,
    en: `Hello, the "Other" service was unstable because the filters did not work reliably. They could either allow SMS from prohibited websites or block SMS entirely. We do not plan to bring this service back.

There is an alternative — "Number Rent". These numbers have many advantages, including the option to extend the rental period, and they can receive SMS from any sender except prohibited ones (banks, telecom operators, government websites, etc.).`,
    tags: ["other сервис", "number rent", "аренда номера альтернатива"],
  },
  {
    id: "rent-4",
    category: "rent",
    title: "Постоплатные номера — статуса нет",
    ru: `У нас нет информации о том, какие номера являются постоплатными, поэтому, пожалуйста, закажите новый номер. Средства списываются только после получения СМС.`,
    en: `We do not have information on which numbers are postpaid, so please order a new number. Funds are deducted only after the SMS is received.`,
    tags: ["постоплата", "postpaid", "battle net"],
  },

  // ===================== СМС НЕ ПРИХОДИТ =====================
  {
    id: "sms-1",
    category: "sms-issues",
    title: "Общая причина — частые запросы, попробовать ещё номера",
    ru: `Можете закрыть номер, нажав на красный крестик, и взять другой. Средства списывают только после получения СМС.

Иногда СМС приходят не с первого раза по разным техническим причинам. Как правило, достаточно до 5 попыток, чтобы принять СМС на номер. Попробуйте заказать, пожалуйста, ещё 3–4 номера стран из списка для лучших результатов.`,
    en: `You can close the number by clicking the red cross and take another one. Funds are only charged after the SMS is received.

Sometimes SMS doesn't arrive on the first try for various technical reasons. Usually up to 5 attempts are enough to receive an SMS on a number. Please try ordering 3–4 more numbers from the list for better results.`,
    tags: ["смс не приходит", "sms not coming", "5 попыток", "ещё номера"],
  },
  {
    id: "sms-2",
    category: "sms-issues",
    title: "Повторное получение СМС невозможно",
    ru: `К сожалению, у нас нет услуги повторного получения СМС на номера, да и технически нет возможности.

Мы не храним использованные симкарты — они утилизируются после окончания срока их использования. Эта информация также указана на нашем сервисе.`,
    en: `Unfortunately, we do not have a service for receiving SMS again on numbers, and it's not technically possible either.

We do not store used SIM cards — they are disposed of after their usage period ends. This information is also stated on our service.`,
    tags: ["повторное смс", "ещё раз код", "второй код", "repeat sms"],
  },
  {
    id: "sms-3",
    category: "sms-issues",
    title: "Второе СМС не гарантировано (Vinted и т.п.)",
    ru: `Наши номера способны принять 2 и более СМС, однако получение второго СМС не гарантировано.

{{service}}, как многие другие приложения, имеет свои лимиты на отправку СМС пользователям, чтобы не нагружать систему отправкой кодов. Поэтому при повторном запросе сервис может отправить тот же код либо не отправить его вовсе. Повторное СМС может также отличаться в формате, именно поэтому не поступать. На ваш номер пришло СМС, поэтому услуга оказана, возврат средств за номер не предусмотрен.`,
    en: `Our numbers are able to receive 2 or more SMS, however receiving a second SMS is not guaranteed.

{{service}}, like many other apps, has its own limits on sending SMS to users, so as not to overload the system with sending codes. That's why on a repeated request, the service may send the same code or not send it at all. A repeated SMS can also differ in format, which is why it may not arrive. An SMS was delivered to your number, so the service was provided, and no refund for the number is due.`,
    tags: ["второе смс", "vinted второе смс", "второй код не пришёл", "second sms"],
    hasServicePlaceholder: true,
  },
  {
    id: "sms-4",
    category: "sms-issues",
    title: "Номер принял СМС — не основание для возврата",
    ru: `Добрый день, на этот номер вам удалось принять СМС, стало быть услуга была оказана. Утверждения «этот номер не подошёл» недостаточно для возврата средств, поскольку причина проблемы неясна. В данном случае вернуть средства за номер не получится.`,
    en: `Good day, you were able to receive an SMS on this number, which means the service was provided. The statement "this number didn't work" is not sufficient for a refund, since the reason for the problem is unclear. In this case, a refund for the number is not possible.`,
    tags: ["смс пришло отказ в возврате", "номер не подошёл", "no refund sms received"],
  },
  {
    id: "sms-5",
    category: "sms-issues",
    title: "Много запросов кода подряд (ChatGPT и похожие)",
    ru: `Не рекомендуется нажимать кнопку «Отправить код повторно» много раз, чтобы сайт {{service}} не перестал отправлять код.

Очистите кэш и куки сайта {{service}} или смените браузер. Затем запросите следующий код примерно через 10–15 минут на новый номер. Смена устройства на мобильное также может помочь.`,
    en: `We do not recommend clicking the "Resend code" button many times, so that {{service}} doesn't stop sending the code.

Clear the cache and cookies of the {{service}} website or switch browsers. Then request the next code in about 10–15 minutes on a new number. Switching to a mobile device may also help.`,
    tags: ["много запросов кода", "resend code", "chatgpt код", "повторная отправка"],
    hasServicePlaceholder: true,
  },

  // ===================== СЕРВИСЫ (WhatsApp / Telegram / др.) =====================
  {
    id: "svc-wa-1",
    category: "services",
    title: "WhatsApp — рекомендации по немецким (и др.) номерам",
    ru: `Дело в том, что у WhatsApp продвинутая система безопасности, которая запоминает пользователей по устройству и IP-адресу и может прекратить отправку СМС-кодов после нескольких попыток входа или если страна номера телефона не совпадает с вашей геолокацией.

Для лучшего результата с номерами {{service}} сделайте следующее:
1. Очистите кэш мобильного приложения WhatsApp и переустановите его.
2. Смените IP-адрес при помощи прокси или VPN так, чтобы страна IP совпадала со страной номера телефона.
3. Смена устройства и регистрация в WhatsApp Business также может помочь.`,
    en: `The thing is that WhatsApp has an advanced security system that remembers users by device and IP address and can stop sending SMS codes after multiple login attempts or if the phone number's country doesn't match your geolocation.

For best results with {{service}} numbers, do the following:
1. Clear the WhatsApp mobile app cache and reinstall it.
2. Change your IP address using a proxy or VPN so that your IP country matches your phone number's country.
3. Changing your device and registering for WhatsApp Business may also help.`,
    tags: ["whatsapp немецкий номер", "ватсап рекомендации", "whatsapp security"],
    hasServicePlaceholder: true,
  },
  {
    id: "svc-wa-2",
    category: "services",
    title: "WhatsApp — блокировка после регистрации, не возвратный случай",
    ru: `Это не возвратный случай, так как мы не несём ответственности за блокировку аккаунта после регистрации — блокировка, выданная после регистрации, не подтверждает проблему с номером.

Такое могло произойти, если страна вашего местоположения не совпадает со страной номера телефона, либо если вы делали много попыток с одного устройства и так далее.

Чтобы избежать блокировки в дальнейшем, рекомендую: чистить кэш и переустанавливать мобильное приложение WhatsApp, менять IP-адрес при помощи VPN (желательно, чтобы страна совпадала со страной номера), после регистрации не отправлять сообщений в течение 48 часов.`,
    en: `This is not a refundable case, as we are not responsible for account blocks after registration — a block issued after registration does not confirm a problem with the number.

This could happen if your location country doesn't match the phone number's country, or if you made many attempts from the same device, and so on.

To avoid blocking in the future, I recommend: clearing the cache and reinstalling the WhatsApp mobile app, changing your IP address with a VPN (ideally matching the number's country), and not sending messages for 48 hours after registration.`,
    tags: ["ватсап блок", "whatsapp block", "блокировка после регистрации", "не возвратный случай"],
  },
  {
    id: "svc-wa-3",
    category: "services",
    title: "WhatsApp — блок, СМС доставлено, возврат невозможен (развёрнуто)",
    ru: `Здравствуйте, аккаунт WhatsApp был заблокирован после регистрации. Такие случаи не подлежат возврату средств, так как СМС было успешно доставлено и услуга со своей стороны оказана корректно. Кроме того, WhatsApp не отправляет СМС на номера, которые ранее были заблокированы.

Чтобы снизить риск блокировки аккаунта, рекомендую: переустановить WhatsApp, использовать платный VPN или прокси (бесплатные часто ненадёжны, их серверы часто в блок-листах), выбрать локацию, совпадающую со страной номера, и не отправлять сообщения в первые 2–7 дней после регистрации.

Повторно получить СМС технически невозможно — сервис не поддерживает повторное использование номера. Как только СМС получено, услуга считается оказанной.`,
    en: `Hello, the WhatsApp account was blocked after registration. Cases like this are not eligible for a refund because the SMS was successfully delivered and the service was provided correctly on our side. In addition, WhatsApp does not send SMS messages to numbers that have previously been blocked.

To reduce the risk of your account being blocked, I recommend the following: reinstall WhatsApp, use a paid VPN or proxy (free ones are often unreliable and their servers are frequently flagged), choose a location that matches the country of the number, and avoid sending messages during the first 2–7 days after registration.

It is not technically possible to receive an SMS again, as the service does not support repeated use. Once the SMS has been received, the service is considered provided.`,
    tags: ["ватсап блок развёрнутый", "whatsapp blocked detailed", "блок 24 часа"],
  },
  {
    id: "svc-wa-4",
    category: "services",
    title: "WhatsApp — блок, возврат как исключение",
    ru: `Это не возвратный случай, но я верну тебе деньги за этот номер на твой баланс.

Перед следующей попыткой регистрации очисти кэш приложения WhatsApp и переустанови его, затем смени IP-адрес при помощи платного VPN или прокси, чтобы страна твоего местоположения совпадала со страной номера телефона. После создания нового аккаунта не отправляй сообщения с него в течение 48 часов.`,
    en: `This is not normally a refundable case, but I will refund the money for this number to your balance.

Before your next registration attempt, clear the WhatsApp app cache and reinstall it, then change your IP address using a paid VPN or proxy so that your location's country matches the phone number's country. After creating the new account, do not send messages from it for 48 hours.`,
    tags: ["ватсап возврат исключение", "whatsapp refund exception", "верну деньги за номер"],
  },
  {
    id: "svc-wa-5",
    category: "services",
    title: "WhatsApp — номер вернулся в пул оператора",
    ru: `Здравствуйте. Номер был получен по корпоративному юридическому соглашению с мобильным оператором, а не как постоянная личная SIM-карта. Когда такая SIM больше не обслуживается, оператор может вернуть номер в пул и переиздать его другому клиенту. Это может повлиять на аккаунт WhatsApp, привязанный к этому номеру.

Мы вернули средства за этот номер.

Чтобы лучше защитить аккаунт WhatsApp в будущем, пожалуйста, привяжите email и включите двухэтапную верификацию (2FA) в настройках WhatsApp.`,
    en: `Hello. The number was obtained under a corporate legal agreement with the mobile operator, not as a permanent personal SIM card. When such a SIM is no longer serviced, the operator may return the number to its pool and reissue it to another customer. This can affect a WhatsApp account linked to that number.

We have refunded the funds for this number.

To better protect your WhatsApp account in the future, please link an email address and enable two-step verification (2FA) in WhatsApp settings.`,
    tags: ["whatsapp номер вернулся оператору", "sim вернули в пул", "2fa whatsapp"],
  },
  {
    id: "svc-wa-6",
    category: "services",
    title: "WhatsApp — неверный код (антифрод)",
    ru: `Мы отображаем только те коды, которые отправляет сам WhatsApp. Ошибка «неверный код» не связана с самим номером — это стандартная реакция системы безопасности WhatsApp, если она считает вашу регистрационную активность подозрительной.

После каждой попытки рекомендую менять IP-адрес при помощи VPN/прокси под страну номера, очищать кэш и переустанавливать мобильное приложение WhatsApp — это может снизить риск внутренних ограничений и повысить шансы на успешную регистрацию.`,
    en: `We display only the codes sent by WhatsApp itself. An "invalid code" error is not related to the phone number itself; it is a standard response from WhatsApp's security system if it deems your registration activity suspicious.

After each attempt, I recommend changing your IP address using a VPN or proxy matching the number's country, clearing the cache, and reinstalling the WhatsApp mobile app; this can reduce the risk of internal restrictions and increase the chances of a successful registration.`,
    tags: ["whatsapp неверный код", "invalid code whatsapp", "антифрод whatsapp"],
  },
  {
    id: "svc-tg-1",
    category: "services",
    title: "Telegram — звонит вместо СМС",
    ru: `Добрый день, чтобы Telegram перестал звонить, выполните, пожалуйста, следующее:

1. Очистите кэш и переустановите официальное мобильное приложение Telegram.
2. По возможности поменяйте IP-адрес (при помощи VPN или прокси), чтобы страна IP совпадала со страной номера телефона.
3. Небольшая пауза (около 20–30 минут) перед следующей попыткой также может помочь.`,
    en: `Good day, to stop Telegram from calling, please do the following:

1. Clear the cache and reinstall the official Telegram mobile app.
2. If possible, change your IP address (using a VPN or proxy) so that the IP country matches the phone number's country.
3. A short pause (about 20–30 minutes) before the next attempt may also help.`,
    tags: ["телеграм звонит", "telegram calls instead of sms", "телеграм звонок"],
  },
  {
    id: "svc-tg-2",
    category: "services",
    title: "Telegram — просит оплату премиум",
    ru: `Telegram запрашивает оплату премиум в качестве меры безопасности, если обнаруживает подозрительную активность.

Чтобы Telegram перестал запрашивать оплату премиум, очистите кэш и переустановите мобильное приложение Telegram. Затем, по возможности, смените IP-адрес при помощи VPN или прокси.`,
    en: `Telegram asks for premium payment as a security measure if they detect suspicious activity.

To stop Telegram from asking for premium payment, clear the cache and reinstall the Telegram mobile app. Then, if possible, change your IP address using a VPN or proxy.`,
    tags: ["телеграм премиум", "telegram premium payment", "требует подписку"],
  },
  {
    id: "svc-tg-3",
    category: "services",
    title: "Telegram — «занятые номера» на деле антифрод",
    ru: `Здравствуйте, я понимаю ваше негодование. На вашем скриншоте вижу, что вы столкнулись не с занятым номером, а с внутренними ограничениями системы безопасности Telegram — он отправляет код на другое устройство даже в тех случаях, если его не существует (Антифрод Telegram).

Рекомендую номера Турции, Таиланда, Польши и США. На текущий момент это лучший выбор по статистике приёма СМС — они поступают в 40–60% случаев, что является хорошим результатом. Закажите пару номеров и попробуйте принять СМС.

Если ситуация повторится, рекомендую переустановить Telegram и изменить IP-адрес с помощью VPN/прокси — это снизит риск внутренних ограничений и повысит шансы на регистрацию.`,
    en: `Hello, I understand your frustration. From your screenshot, I can see that you're not dealing with a number that's already taken, but with Telegram's internal security restrictions — it sends the code to another device even in cases when that device doesn't exist (Telegram Anti-Fraud System).

I recommend numbers from Turkey, Thailand, Poland, and the USA. Currently these are the best choice based on SMS delivery statistics — they arrive in 40–60% of cases, which is a good result. Order a couple of numbers and try to receive an SMS.

If this happens again, I recommend reinstalling Telegram and changing your IP address with a VPN/proxy — this will reduce the risk of internal restrictions and increase your chances of registering.`,
    tags: ["телеграм занятый номер", "telegram antifraud", "telegram номер занят"],
  },
  {
    id: "svc-tg-4",
    category: "services",
    title: "Telegram — привязка номера к существующему аккаунту дольше",
    ru: `Дело в том, что процесс привязки номера к уже существующему аккаунту Telegram всегда занимает чуть больше времени. Рекомендую запрашивать код в мобильном приложении Telegram, очистить кэш и переустановить его (убедитесь, что не потеряете доступ к аккаунту). Затем закажите несколько номеров из списка стран: Турция, Британия, Португалия, Ирландия, Польша.`,
    en: `The thing is, the process of linking a number to an already existing Telegram account always takes a bit more time. I recommend requesting the code in the Telegram mobile app, clearing the cache and reinstalling it (make sure you won't lose access to the account). Then order a few numbers from the list of countries: Turkey, UK, Portugal, Ireland, Poland.`,
    tags: ["телеграм привязка номера", "telegram link number existing account", "смена номера телеграм"],
  },
  {
    id: "svc-vinted-1",
    category: "services",
    title: "Vinted — общий совет",
    ru: `Очистите историю браузера, кэш и куки на сайте Vinted или смените браузер. Затем попробуйте 2–3 номера. Если результат остаётся неудачным, переключитесь на мобильное устройство и попробуйте зарегистрироваться в приложении Vinted.`,
    en: `Clear your browser history, cache, and cookies on the Vinted website or switch browsers. Then try 2-3 numbers. If the result remains unsuccessful, switch to a mobile device and try registering in the Vinted mobile app.`,
    tags: ["vinted", "винтед совет"],
  },
  {
    id: "svc-vinted-2",
    category: "services",
    title: "Vinted — потерян доступ к номеру, блок аккаунта",
    ru: `Так как у вас больше нет доступа к телефонному номеру, рекомендую обратиться напрямую в поддержку Vinted, а не пытаться использовать другой временный номер. Объясните, что вы являетесь владельцем аккаунта, но номер, использованный для верификации, больше недоступен. Они могут запросить у вас информацию для подтверждения владения аккаунтом.`,
    en: `Since you no longer have access to the phone number, I would recommend contacting Vinted Support directly rather than trying to use another temporary number. Explain that you own the account but the number used for verification is no longer available. They may ask you for information to verify ownership of the account.`,
    tags: ["vinted блок аккаунта", "vinted потерян доступ", "vinted support"],
  },
  {
    id: "svc-fb-1",
    category: "services",
    title: "Facebook — общий совет",
    ru: `Очистите кэш и переустановите мобильное приложение Facebook. Затем попробуйте 2–3 номера стран из списка:
🔗 Рекомендуемые страны для Facebook (https://chatwoot.on-mail.ru/hc/onlinesim/articles/1734789313-best-countries-for-facebook)

Если результат остаётся неудачным, переключитесь на ПК/ноутбук и попробуйте зарегистрироваться в веб-версии Facebook.`,
    en: `Clear the cache and reinstall the Facebook mobile app. Then try 2-3 country numbers from the list:
🔗 View recommended countries for Facebook (https://chatwoot.on-mail.ru/hc/onlinesim/articles/1734789313-best-countries-for-facebook)

If result remains unsuccessful, switch device to PC/laptop and try to register in Facebook web version.`,
    tags: ["facebook", "фейсбук совет"],
  },
  {
    id: "svc-bybit-1",
    category: "services",
    title: "Bybit — СМС не приходит из-за гео",
    ru: `Если ваш IP не соответствует стране номера, то СМС может не поступить на номер из-за механизмов сервиса Bybit, так как он привязан к гео.

Важно использовать надёжный VPN/прокси под страну номера. Рекомендую попробовать через пару часов снова запросить СМС.

https://seed4me.app/ — хороший VPN, есть пробный период.`,
    en: `If your IP doesn't match the country of the number, SMS may not arrive due to Bybit's geo-binding mechanisms.

It's important to use a reliable VPN/proxy matching the number's country. I recommend trying to request the SMS again in a couple of hours.

https://seed4me.app/ — a good VPN with a trial period.`,
    tags: ["bybit", "байбит смс", "bybit sms geo"],
  },
  {
    id: "svc-viber-1",
    category: "services",
    title: "Viber — греческий номер, инструкция по VPN",
    ru: `Пожалуйста, попробуйте сделать следующее:

1. Установите приложение VPN, например Proton VPN, NordVPN или Surfshark, из официального App Store / Google Play.
2. Откройте VPN и подключитесь к серверу в Греции.
3. Убедитесь, что VPN показывает подключение, прежде чем открывать Viber.
4. Полностью закройте Viber и откройте его снова.
5. Попробуйте запросить код активации ещё раз.

Если первый сервер не сработает, попробуйте другой греческий сервер VPN.`,
    en: `Please try the following:

Install a VPN app such as Proton VPN, NordVPN, or Surfshark from the official App Store / Google Play.
Open the VPN and connect to a server in Greece.
Make sure the VPN shows that you are connected before opening Viber.
Completely close Viber and open it again.
Try requesting the activation code again.

If possible, use a different Greek VPN server if the first one doesn't work.`,
    tags: ["viber", "вайбер греция", "viber greece vpn"],
  },
  {
    id: "svc-google-1",
    category: "services",
    title: "Google — восстановление доступа без СМС на старый номер",
    ru: `Пожалуйста, сделайте следующее:

1. Откройте страницу восстановления Google: https://accounts.google.com/signin/recovery
2. Введите адрес вашей почты.
3. Когда Google попросит код на старый номер, нажмите «Попробовать другой способ» / «Try another way», если такая кнопка доступна.
4. Используйте все доступные варианты восстановления: резервную почту, подтверждение на другом устройстве, пароль от аккаунта, резервные коды и другие предложенные Google способы.
5. Лучше проходить восстановление с телефона или компьютера, с которого вы раньше регулярно входили в этот аккаунт, и с привычного подключения к интернету.

Google сама определяет, какие способы восстановления доступны для конкретного аккаунта. Если других способов, кроме СМС на старый номер, Google не предлагает, к сожалению, мы не можем обойти это ограничение или выдать вам тот же номер повторно.`,
    en: `Please do the following:

Open the Google account recovery page: https://accounts.google.com/signin/recovery
Enter your email address.
When Google asks for a code to the old number, click "Try another way" if that option is available.
Use all available recovery options: a backup email, confirmation on another device, your account password, backup codes, and other methods offered by Google.
It's best to go through recovery from the phone or computer you used to regularly sign in to this account, and from your usual internet connection.

Google itself determines which recovery methods are available for a specific account. If Google doesn't offer any method besides SMS to the old number, unfortunately we cannot bypass this restriction or reissue you the same number again.`,
    tags: ["google восстановление", "google recovery", "старый номер гугл"],
  },
  {
    id: "svc-google-2",
    category: "services",
    title: "Google — СМС не приходит (веб-версия)",
    ru: `Эта ошибка связана с тем, что создать аккаунт Google через веб-версию сейчас крайне сложно. Рекомендую использовать мобильное устройство для создания аккаунта, а затем привязать номер телефона к нему. Также важно использовать IP страны того номера, который вы заказываете, при регистрации через веб-версию. Рекомендую номера Германии, Польши и Румынии.`,
    en: `This error is related to the fact that creating a Google account through the web version is currently extremely difficult. I recommend using a mobile device to create an account and then linking your phone number to it. It is also important to use the IP of the country of the number you are ordering when registering via the web version. I recommend using numbers from Germany, Poland, and Romania.`,
    tags: ["google смс не приходит", "google sms not received", "гугл веб версия"],
  },
  {
    id: "svc-google-3",
    category: "services",
    title: "Google — просит QR-код вместо СМС",
    ru: `Ситуация, когда Google просит QR-код вместо отправки СМС, связана с тем, что Google считает вашу активность подозрительной.

Чтобы снизить риск внутренних ограничений и повысить шансы на получение СМС от Google, рекомендую сменить IP-адрес при помощи VPN/прокси, по возможности выбрать страну, совпадающую с номером, и использовать другой браузер для регистрации.`,
    en: `The situation where Google asks for a QR code instead of sending an SMS is related to Google considering your activity suspicious.

To reduce the risk of internal restrictions and increase the chances of receiving an SMS from Google, I recommend changing your IP address using a VPN/proxy, choosing a country matching the number if possible, and using a different browser for registration.`,
    tags: ["google qr код", "google qr code instead of sms"],
  },
  {
    id: "svc-yandex-1",
    category: "services",
    title: "Яндекс — неверный код",
    ru: `Добрый день! Мы отображаем только те коды, которые отправляет сам Яндекс. Ошибка «неверный код» не связана с самим номером. Это стандартная реакция системы безопасности Яндекса, если она считает ваши действия при регистрации подозрительными.

После каждой попытки рекомендую менять IP-адрес при помощи VPN/прокси под страну номера и очистить куки + историю браузера — это может снизить риск внутренних ограничений и повысить шансы на успешную регистрацию.`,
    en: `Good day! We display only the codes sent by Yandex itself. The "invalid code" error is not related to the number itself. This is a standard reaction of Yandex's security system if it considers your registration actions suspicious.

After each attempt, I recommend changing your IP address using a VPN/proxy matching the number's country and clearing cookies + browser history — this can reduce the risk of internal restrictions and increase the chances of successful registration.`,
    tags: ["яндекс неверный код", "yandex invalid code"],
  },
  {
    id: "svc-vk-1",
    category: "services",
    title: "ВКонтакте — проблема с иностранными номерами",
    ru: `Получить СМС от ВК может быть проблематично из-за специфики их рассылки сообщений, которая стабильно работает только на российских номерах. На иностранные номера СМС могут не поступать вовсе.

Рекомендую номера Узбекистана, Польши, Молдовы, Латвии, Румынии — согласно статистике, СМС приходят в 30% случаев.`,
    en: `Receiving an SMS from VK can be problematic due to the specifics of their message delivery, which works reliably only with Russian numbers. SMS may not arrive at all to foreign numbers.

I recommend numbers from Uzbekistan, Poland, Moldova, Latvia, Romania — according to statistics, SMS arrives in 30% of cases.`,
    tags: ["вконтакте", "vk sms", "вк иностранный номер"],
  },
  {
    id: "svc-openai-1",
    category: "services",
    title: "OpenAI/ChatGPT отправляет код в WhatsApp",
    ru: `Чтобы OpenAI перестал отправлять код на WhatsApp, очистите кэш и куки сайта OpenAI либо смените браузер, затем закажите несколько новых номеров.`,
    en: `To stop OpenAI from sending the code to WhatsApp, clear the cache and cookies of the OpenAI website or switch browsers, then order a few new numbers.`,
    tags: ["openai whatsapp код", "chatgpt код в whatsapp"],
  },
  {
    id: "svc-ontaxi-1",
    category: "services",
    title: "OnTaxi — много попыток, антифрод",
    ru: `Вижу, вы заказывали много номеров для OnTaxi. Объясню, почему советуем переустанавливать приложение и менять IP-адрес. У OnTaxi, как и у других крупных приложений, есть система безопасности, которая может перестать отправлять код после многократных попыток входа с одного устройства и IP-адреса.

Поэтому рекомендуем очистить кэш и переустановить приложение, затем сменить IP-адрес при помощи прокси или VPN. Следуйте, пожалуйста, рекомендациям и закажите 3–4 номера. Если результат останется прежним, дайте мне знать, и я переведу обращение техническому специалисту.`,
    en: `I see you've ordered many numbers for OnTaxi. Let me explain why we recommend reinstalling the app and changing your IP address. OnTaxi, like other major apps, has a security system that can stop sending codes after multiple login attempts from the same device and IP address.

So we recommend clearing the cache and reinstalling the app, then changing your IP address using a proxy or VPN. Please follow the recommendations and order 3-4 numbers. If the result remains the same, let me know and I'll forward your request to a technical specialist.`,
    tags: ["ontaxi", "онтакси много номеров"],
  },
  {
    id: "svc-battlenet-1",
    category: "services",
    title: "Battle.net — постоплата",
    ru: `У нас нет информации о том, какие номера являются постоплатными, поэтому, пожалуйста, закажите новый номер. Средства списываются только после получения СМС.`,
    en: `We do not have information on which numbers are postpaid, so please order a new number. Funds are deducted only after the SMS is received.`,
    tags: ["battle net", "battlenet постоплата"],
  },

  // ===================== УНИВЕРСАЛЬНЫЕ ОТВЕТЫ =====================
  {
    id: "univ-1",
    category: "universal",
    title: "Общая инструкция: кэш + VPN + смена устройства",
    ru: `Очистите историю браузера, кэш и куки на сайте {{service}} или смените браузер. Затем попробуйте заказать 2–3 номера. Если результат остаётся неудачным, переключитесь на мобильное устройство и попробуйте зарегистрироваться в мобильном приложении {{service}}.`,
    en: `Clear your browser history, cache, and cookies on the {{service}} website or switch browsers. Then try to order 2-3 numbers please. If the result remains unsuccessful, switch to a mobile device and try registering in the {{service}} mobile app.`,
    tags: ["универсальный ответ", "кэш куки vpn", "общая инструкция", "generic troubleshooting"],
    hasServicePlaceholder: true,
  },
  {
    id: "univ-2",
    category: "universal",
    title: "Поэтапная инструкция: кэш, VPN, установка, 5 номеров",
    ru: `СМС могут не приходить по разным причинам. Полагаю, что проблема во внутренних ограничениях. Я посмотрел статистику — СМС приходят в 40–60% случаев на эти страны, значит дело именно в этом; это означает, что {{service}} не всегда просит купить премиум (иное дополнительное действие). Поэтому рекомендую сделать всё поэтапно:

1. Очистить кэш и удалить {{service}}.
2. Поменять IP-адрес или переподключиться (в зависимости от того, как было настроено) с помощью VPN на любую европейскую локацию.
3. Установить {{service}}.
4. Заказать номер, желательно из рекомендуемых мною стран, и попробовать до 5 номеров.`,
    en: `SMS may not arrive for various reasons. I believe the issue is internal restrictions. I checked the statistics — SMS arrives in 40-60% of cases for these countries, so that's likely the reason; this means {{service}} doesn't always ask to buy premium. So I recommend doing everything step by step:

1. Clear the cache and delete {{service}}.
2. Change your IP address or reconnect (depending on how it was set up) using a VPN to any European location.
3. Install {{service}}.
4. Order a number, preferably from the countries I recommend, and try up to 5 numbers.`,
    tags: ["поэтапная инструкция", "step by step vpn", "40-60%", "кэш удалить установить"],
    hasServicePlaceholder: true,
  },
  {
    id: "univ-3",
    category: "universal",
    title: "Заблюренный/незапрещённый сервис в списке — добавим",
    ru: `Ваш запрос уже обрабатывается. Мы проверим этот сайт и добавим номера из разных стран. Это может занять до 48 часов. Как только всё будет готово, я или мой коллега сообщим вам в этом чате. Пожалуйста, подождите.`,
    en: `Your request is already being processed. We will check this website and add numbers from different countries. This may take up to 48 hours. Once it is ready, I or my colleague will let you know in this chat. Please wait.`,
    tags: ["сервис не в списке", "заблюренный сервис", "добавить сервис", "48 часов"],
  },
  {
    id: "univ-4",
    category: "universal",
    title: "Просьба не писать повторно во время обработки",
    ru: `Пожалуйста, дождитесь моего ответа, так как обращения обрабатываются в индивидуальном порядке, и отправка нескольких сообщений подряд только увеличивает время ответа.`,
    en: `Please wait for my reply, since requests are handled on an individual basis, sending multiple messages only increases the response time.`,
    tags: ["дождитесь ответа", "не пишите повторно", "please wait"],
  },

  // ===================== ПРОКСИ =====================
  {
    id: "proxy-1",
    category: "proxy",
    title: "Партнёрство по продаже прокси",
    ru: `Здравствуйте, мы будем рады сотрудничеству с вами. Мы поддерживаем подключение через трёх провайдеров: LTEspace, IProxy и MobileSpace. Прямой интеграции нет. Чтобы подключиться и начать продавать прокси через наш сервис, ознакомьтесь, пожалуйста, с материалами ниже — там подробно объясняется процесс подключения и то, как работает система.

Вы можете загрузить свои прокси на наш сайт, используя API-ключ одного из этих провайдеров. Если у вас появятся вопросы, вы можете задать их в чате.

https://onlineproxy.io/manual/ways-to-earn-money/how-to-earn-with-mobile-proxies
https://onlineproxy.io/manual/ways-to-earn-money/how-to-sell-your-proxies-on-onlineproxy`,
    en: `Hello, we would be happy to cooperate with you. We support connections through three providers: LTEspace, IProxy, and MobileSpace. There is no direct integration. To connect and start selling proxies through our service, please review the materials below - they explain the connection process and how the system works in detail.

You can upload your proxies to our website using an API key from one of these providers. If you have any questions, you can ask them in the chat.

https://onlineproxy.io/manual/ways-to-earn-money/how-to-earn-with-mobile-proxies
https://onlineproxy.io/manual/ways-to-earn-money/how-to-sell-your-proxies-on-onlineproxy`,
    tags: ["партнёрство прокси", "продать прокси", "proxy partner", "ltespace iproxy mobilespace"],
  },
  {
    id: "proxy-2",
    category: "proxy",
    title: "Проверка — IP не применился от прокси",
    ru: `Пожалуйста, помогите мне проверить проблему.

Сначала отключите прокси и проверьте свой внешний IP-адрес на https://ipinfo.io. Пришлите мне скриншот результата.
Затем включите прокси {{service}} и снова проверьте свой внешний IP-адрес на том же сайте. Пришлите мне ещё один скриншот.
Также пришлите мне скриншот ваших настроек/конфигурации прокси. Вы можете скрыть своё имя пользователя/пароль, если они отображаются.
Сообщите, какой браузер или приложение вы используете и где вы настроили прокси.

Это поможет мне подтвердить, действительно ли используется прокси, и выяснить, почему ваш внешний IP-адрес не меняется.`,
    en: `Hi! Could you please help me verify the issue?
First, disable the proxy and check your external IP at https://ipinfo.io. Please send me a screenshot of the result.
Then enable the proxy {{service}} and check your external IP on the same website again. Please send me another screenshot.
Please also send me a screenshot of your proxy settings/configuration. You can hide your username/password if they are shown.
Let me know which browser or application you are using and where you configured the proxy.

This will help me confirm whether the proxy is actually being used and investigate why your external IP is not changing.`,
    tags: ["ip не применился", "прокси проверка ip", "ipinfo.io", "socks5"],
    hasServicePlaceholder: true,
  },
  {
    id: "proxy-3",
    category: "proxy",
    title: "Ротация IP у приватного прокси",
    ru: `Если приобретёте ещё один приватный прокси, то IP будет постоянно разным. IP будет меняться в зависимости от интервала, который вы укажете. Также он не будет совпадать с IP-адресом первого приватного прокси, который вы приобрели ранее.`,
    en: `If you purchase another private proxy, the IP will be constantly different. The IP will change depending on the interval you specify. It also will not match the IP address of the first private proxy you purchased earlier.`,
    tags: ["ротация ip", "ip rotation", "приватный прокси интервал"],
  },
  {
    id: "proxy-4",
    category: "proxy",
    title: "Плашка «данные изменены» — ложное предупреждение",
    ru: `«Данные этого прокси были изменены более 3 часов назад.»

Убрал эту плашку — вероятно, ранее были изменены данные для подключения или заменено оборудование. Вижу, что сейчас ваш прокси работает.`,
    en: `"This proxy's details were changed more than 3 hours ago."

I removed this notice — most likely the connection details were changed earlier or the equipment was replaced. I can see that your proxy is working now.`,
    tags: ["прокси данные изменены", "плашка прокси", "proxy details changed notice"],
  },
  {
    id: "proxy-5",
    category: "proxy",
    title: "Запрос деталей ошибки прокси",
    ru: `Уточните, пожалуйста, через какое приложение/браузер вы подключаетесь? Также предоставьте скриншот ошибки, пожалуйста.`,
    en: `Could you please clarify which app/browser you're connecting through? Please also provide a screenshot of the error.`,
    tags: ["прокси ошибка скриншот", "какое приложение прокси", "proxy error details"],
  },

  // ===================== ПОПОЛНЕНИЕ БАЛАНСА =====================
  {
    id: "topup-1",
    category: "topup",
    title: "СБП и российские карты отключены",
    ru: `Здравствуйте, мы отключили оплату по СБП и с помощью российских банковских карт, но вы можете оплатить, используя другие доступные способы оплаты: криптовалюта (USDT, USDC), электронные кошельки (Apple Pay, Google Pay).`,
    en: `Hello, we have disabled payment via SBP and Russian bank cards, but you can pay using other available payment methods: cryptocurrency (USDT, USDC), e-wallets (Apple Pay, Google Pay).`,
    tags: ["сбп отключен", "российские карты", "способы оплаты", "payment methods disabled"],
  },
  {
    id: "topup-2",
    category: "topup",
    title: "Отказ платежа — попробовать другую карту/крипту",
    ru: `Платёж был отклонён автоматической системой проверки риска платёжного провайдера. Это не обязательно означает, что с картой или балансом карты есть проблема.

Если способы Bank Cards Extra и Global Card Payment также не подойдут, сообщите, пожалуйста, в чате.`,
    en: `The payment was declined by the payment provider's automated risk-check system. This doesn't necessarily mean there's a problem with the card or its balance.

If Bank Cards Extra and Global Card Payment also don't work, please let us know in the chat.`,
    tags: ["платеж отклонен", "payment declined", "bank cards extra", "global card payment"],
  },
  {
    id: "topup-3",
    category: "topup",
    title: "Отказ карты — детальный, с криптой через TRC20",
    ru: `Платёжная система не раскрывает точную причину отказа карты. Она отклоняет карту, если считает транзакцию высокорискованной, поэтому, скорее всего, оплата этой картой будет невозможна. Есть два варианта:

1. Оплатить другой физической дебетовой картой.
2. Оплатить криптовалютой или другим способом оплаты.

К сожалению, если платёж не прошёл, оплатить текущими картами не получится.

В этом случае попробуйте, пожалуйста, оплатить криптовалютой, если у вас есть такая возможность. При пополнении через TRC20 минимальная сумма — $3, а комиссия всего 3%. На данный момент это один из самых выгодных способов пополнения.

Если у вас нет крипто-кошелька, вы можете создать его на любой бирже, например Bybit. В интернете много инструкций на эту тему.`,
    en: `The payment system does not provide the exact reason why the card was declined. It rejects the card if it considers the transaction high-risk, so it most likely will not be possible to pay with this card. There are two options:

Pay with another physical debit card
Pay with cryptocurrency or other payment methods

Unfortunately, if the payment did not go through, you will not be able to pay with your current cards.

In this case, please try paying with cryptocurrency if you have that option. When topping up via TRC20, the minimum amount is $3, and the fee is only 3%. At the moment, this is one of the most cost-effective top-up methods.

If you don't have a crypto wallet, you can create one on any exchange, for example Bybit. There are plenty of guides on this topic online.`,
    tags: ["отказ карты подробно", "card declined detailed", "trc20", "bybit кошелек"],
  },
  {
    id: "topup-4",
    category: "topup",
    title: "Nigerian bank cards — отказ, предложить крипту",
    ru: `Платёжная система не объясняет причину отказа карты. Рекомендую использовать карту другого банка для пополнения баланса.

К сожалению, мы не можем повлиять на решение платёжной системы или подтвердить платёж.

Если нет возможности оплатить другой картой, рекомендую использовать криптовалюту — это даже выгоднее. При пополнении через TRC20 минимальная сумма начинается от $3, а комиссия всего 3%.

Если у вас нет крипто-кошелька, вы можете создать его на бирже Bybit.`,
    en: `The e-commerce platform does not explain the reason for the card rejection. I recommend using a card from another bank to top up your balance.

Unfortunately, we cannot influence or approve the payment.

If it's not possible to pay with another card, I recommend using cryptocurrency—it's even more advantageous. When topping up via TRC20, the minimum amount starts at $3, and the fee is just 3%.

If you don't have a crypto wallet, you can create one on the Bybit exchange.`,
    tags: ["nigerian bank cards", "нигерийская карта отказ", "card declined nigeria"],
  },
  {
    id: "topup-5",
    category: "topup",
    title: "Платёж не завершён — деньги не списаны",
    ru: `Здравствуйте. При пополнении баланса каждая попытка платежа фиксируется. Поэтому, если вы выбрали способ оплаты, но не завершили процесс платежа, этот платёж останется «в процессе», и деньги списаны не будут.`,
    en: `Hello. When topping up your account balance, every payment attempt is recorded. Therefore, if you selected a method but did not complete the payment process, this payment will remain "in progress" and no funds will be charged.`,
    tags: ["платеж не завершен", "payment in progress", "деньги не списались"],
  },
  {
    id: "topup-6",
    category: "topup",
    title: "Как списывается оплата за номер (заморозка баланса)",
    ru: `Вы платите только за полученные СМС. При заказе номера его стоимость временно резервируется (попадает в «Замороженный баланс»). Если СМС пришло — деньги списываются. Если нет — после отмены операции с номером либо по истечении времени вся сумма сразу возвращается на ваш баланс.`,
    en: `You only pay for SMS you actually receive. When you order a number, its cost is temporarily reserved (goes into the "Frozen balance"). If the SMS arrives, the money is deducted. If not — after cancelling the number or once the time expires, the full amount is immediately returned to your balance.`,
    tags: ["замороженный баланс", "frozen balance", "как списывается оплата", "резерв средств"],
  },
  {
    id: "topup-7",
    category: "topup",
    title: "Запрос данных карты для технического специалиста",
    ru: `Мне понадобится следующая информация, которую я передам техническому специалисту:

1. Страна вашего банковского счёта.
2. Пополняли ли вы этой картой ранее.
3. Карта дебетовая или кредитная.
4. Карта физическая или виртуальная.`,
    en: `I will need the following information, which I will pass on to a technical specialist:

1. The country where your bank account is held.
2. Whether you have previously used this card on our platform.
3. Whether the card is a debit or credit card.
4. Whether the card is physical or virtual.`,
    tags: ["данные карты для техподдержки", "card details request", "запрос данных карты"],
  },
  {
    id: "topup-8",
    category: "topup",
    title: "Раздел «Выписка» — расходы и возвраты",
    ru: `В разделе «Выписка» можете посмотреть все номера, на которые было принято СМС и списана плата: https://onlinesim.io/v2/ru/checkout`,
    en: `In the "Statement" section, all expenses and refunds for numbers are displayed. Information on spending is available at the link: https://onlinesim.io/v2/checkout`,
    tags: ["выписка", "statement", "история списаний", "checkout"],
  },
  {
    id: "topup-9",
    category: "topup",
    title: "Автопополнение через API не поддерживается",
    ru: `На данный момент автоматическое пополнение баланса через API не поддерживается, пополнение производится вручную через личный кабинет.`,
    en: `At the moment, automatic balance top-up via API is not supported; top-up is done manually through the personal account.`,
    tags: ["автопополнение api", "api topup not supported"],
  },
  {
    id: "topup-10",
    category: "topup",
    title: "Проверка и подтверждение оплаты (крипта / карта)",
    ru: `Если клиент сообщает о незачислении средств, уточняем метод оплаты:

По криптовалютным платежам:
— Среднее время зачисления: до 60 минут.
— Запрашиваем текстовый HashID (TXID) или ссылку на транзакцию в блокчейн-обозревателе.

По банковским картам / электронным кошелькам:
— Среднее время зачисления: до 20 минут.
— Запрашиваем скриншот из банковского приложения или PDF-документ о платеже, подтверждающий операцию.`,
    en: `If the client reports funds not being credited, we clarify the payment method:

For cryptocurrency payments:
— Average crediting time: up to 60 minutes.
— We request the text HashID (TXID) or a link to the transaction in a blockchain explorer.

For bank cards / e-wallets:
— Average crediting time: up to 20 minutes.
— We request a screenshot from the banking app or a PDF document of the payment confirming the transaction.`,
    tags: ["проверка оплаты", "payment verification", "hashid txid", "незачисление средств"],
  },

  // ===================== УДАЛЁННЫЙ АККАУНТ / ДАННЫЕ =====================
  {
    id: "account-1",
    category: "account",
    title: "Удаление за неактивность — история не восстанавливается",
    ru: `Я понимаю ваше расстройство, особенно учитывая, что на аккаунте были средства и вам нужна история по номерам. Однако, согласно нашей политике хранения данных, все данные аккаунта безвозвратно удаляются через 30 дней неактивности и не могут быть восстановлены.

Мы уведомляем пользователей о предстоящем удалении по email за 7, 3 и 1 день, а также показываем соответствующие предупреждения при регистрации и при пополнении баланса.`,
    en: `I understand your frustration, especially since your account had funds and you need the phone history. However, according to our data retention policy, all account data is permanently deleted after 30 days of inactivity and cannot be restored or retrieved.

We notify users about the upcoming deletion by email 7, 3, and 1 day in advance, and we also display relevant warnings during registration and when topping up the balance.`,
    tags: ["удаление аккаунта", "account deleted inactivity", "история номеров не выдается", "30 дней"],
  },
  {
    id: "account-2",
    category: "account",
    title: "Правило удаления за 30 дней неактивности (полное)",
    ru: `Согласно правилам нашего сервиса, если в течение 30 дней на аккаунте не производится покупка и приём СМС хотя бы на один номер или не происходит пополнение баланса, то аккаунт удаляется вместе с историей СМС и платёжными данными. Об удалении высылаем письма на почту за 7, 3 и 1 день до удаления. Также предупреждающий баннер находится на странице пополнения баланса.

Однако мы можем вывести деньги с вашего баланса. Отправьте скриншот платежа для пополнения баланса из банковского приложения либо чек в PDF-формате, либо, если пополняли криптовалютой, отправьте хэш ID транзакции, адрес кошелька и сеть пополнения.`,
    en: `According to our service rules, if no purchase and SMS reception on at least one number, or no balance top-up occurs within 30 days, the account is deleted along with the SMS history and payment data. We send emails about the upcoming deletion 7, 3, and 1 day in advance. There is also a warning banner on the balance top-up page.

However, we can withdraw the money from your balance. Please send a screenshot of the top-up payment from your banking app, or a PDF receipt, or if you topped up with cryptocurrency, send the transaction hash ID, wallet address, and the top-up network.`,
    tags: ["правило 30 дней", "30 days inactivity rule", "удаление истории смс"],
  },
  {
    id: "account-3",
    category: "account",
    title: "Вывод средств с удалённого аккаунта — что нужно",
    ru: `Мы можем вывести средства с баланса. Нам понадобится: почта, которая была на аккаунте, а также номер телефона, который вы покупали хотя бы один раз, и для какого сервиса вы его покупали. Либо ID удалённого аккаунта — его можно найти в письме, которое мы отправляли вам при пополнении баланса на платформе.`,
    en: `We can withdraw funds from the balance. We will need: the email that was on the account, as well as a phone number you purchased at least once and which service it was for. Alternatively, the ID of the deleted account — it can be found in the email we sent you when you topped up your balance on the platform.`,
    tags: ["вывод средств удаленный аккаунт", "withdraw deleted account", "id удаленного аккаунта"],
  },
  {
    id: "account-4",
    category: "account",
    title: "Перевод средств между аккаунтами — подтверждение с двух сторон",
    ru: `Для перевода средств, в целях безопасности, вам нужно написать с двух аккаунтов, указав ID, с которого вы хотите перевести средства, и ID, на который хотите получить средства. Важно, чтобы текст сообщения был одинаковым.

Например: «Перевести средства с аккаунта id7338945 на id7838185». Пожалуйста, напишите так же со второго аккаунта. Спасибо за понимание.`,
    en: `To transfer funds, for security reasons, you must write from two accounts indicating the id from which you want to transfer funds to the id to which you want to receive funds.
It is important that the text is the same.
For example: "Transfer funds from account id7338945 to id7838185". So also write please from the second account. Thank you for your understanding.`,
    tags: ["перевод средств между аккаунтами", "transfer funds between accounts", "подтверждение перевода"],
  },
  {
    id: "account-5",
    category: "account",
    title: "Email не на Proton — уведомления работают некорректно",
    ru: `Дело в том, что рассылка писем не совсем корректно работает с почтовыми ящиками Proton. Рекомендую использовать почту с другим доменом, например Gmail, Outlook и другие.`,
    en: `The email notifications don't work quite correctly with the Proton domain. I can replace the email on your account, please send me your Gmail address.`,
    tags: ["proton почта", "proton mail issues", "уведомления не приходят"],
  },

  // ===================== API =====================
  {
    id: "api-1",
    category: "api",
    title: "Ссылка на документацию API",
    ru: `С документацией API можно ознакомиться по ссылке: https://onlinesim.io/openapi_docs/Onlinesim-API-UN/info`,
    en: `You can get acquainted with API docs by the link: https://onlinesim.io/openapi_docs/Onlinesim-API-UN/info`,
    tags: ["api документация", "api docs", "openapi"],
  },
  {
    id: "api-2",
    category: "api",
    title: "Автопополнение через API не поддерживается",
    ru: `На данный момент автоматическое пополнение баланса через API не поддерживается, пополнение производится вручную через личный кабинет.`,
    en: `At the moment, automatic balance top-up via API is not supported; top-up is done manually through the personal account.`,
    tags: ["api автопополнение", "api topup unsupported"],
  },

  // ===================== ВОЗВРАТЫ =====================
  {
    id: "refund-1",
    category: "refunds",
    title: "Отказ в возврате — номер принял СМС",
    ru: `Добрый день, на этот номер вам удалось принять СМС, стало быть услуга была оказана. Утверждения «этот номер не подошёл» недостаточно для возврата средств, поскольку причина проблемы неясна. В данном случае вернуть средства за номер не получится.`,
    en: `Good day, you were able to receive an SMS on this number, which means the service was provided. The statement "this number didn't work" is not sufficient for a refund, since the reason for the problem is unclear. In this case, a refund for the number is not possible.`,
    tags: ["отказ в возврате", "refund denied", "смс пришло не возврат"],
  },
  {
    id: "refund-2",
    category: "refunds",
    title: "Отказ — блокировка после регистрации не повод для возврата",
    ru: `Это не возвратный случай, так как мы не несём ответственности за блокировку аккаунта после регистрации — блокировка, выданная после регистрации, не подтверждает проблему с номером.

Такое могло произойти, если страна вашего местоположения не совпадает со страной номера телефона, либо если вы делали много попыток с одного устройства и так далее.`,
    en: `This is not a refundable case, as we are not responsible for account blocks after registration — a block issued after registration does not confirm a problem with the number.

This could happen if your location country doesn't match the phone number's country, or if you made many attempts from the same device, and so on.`,
    tags: ["блокировка не возвратный случай", "block not refundable", "отказ возврат блокировка"],
  },
  {
    id: "refund-3",
    category: "refunds",
    title: "Возврат как исключение (после нескольких предыдущих)",
    ru: `Это не возвратный случай, но я верну тебе деньги за этот номер на твой баланс. Перед следующей попыткой регистрации очисти кэш приложения {{service}} и переустанови его, затем смени IP-адрес при помощи платного VPN или прокси, чтобы страна твоего местоположения совпадала со страной номера телефона. После создания нового аккаунта не отправляй сообщения с него в течение 48 часов.`,
    en: `This is not normally a refundable case, but I will refund the money for this number to your balance. Before your next registration attempt, clear the {{service}} app cache and reinstall it, then change your IP address using a paid VPN or proxy so that your location's country matches the phone number's country. After creating the new account, do not send messages from it for 48 hours.`,
    tags: ["возврат исключение", "refund as exception", "верну деньги за номер"],
    hasServicePlaceholder: true,
  },
  {
    id: "refund-4",
    category: "refunds",
    title: "Отказ — уже возвращали несколько раз как исключение",
    ru: `Наши номера работают и отображают СМС-сообщения, а проблема, с которой вы столкнулись, не связана с номерами. Поэтому возврат средств за номера в таких случаях не предусмотрен, в соответствии с правилами нашего сервиса. Мы уже сообщали вам об этом несколько раз, когда делали возврат в качестве исключения за свой счёт.

Чтобы это не повторялось, пожалуйста, следуйте рекомендациям, указанным выше. Мы не несём ответственности за блокировки или выходы из аккаунта во время или после регистрации. Используя наш сервис, вы соглашаетесь с нашими правилами.

Услуга считается оказанной с момента получения СМС, так как мы не предоставляем услугу регистрации — дальнейшие действия зависят от пользователя.`,
    en: `Our numbers are working and displaying SMS messages, and the issue you are experiencing is not related to the numbers. Therefore, refunds for numbers are not issued in such cases, in accordance with our service rules. We have already informed you of this several times when we issued refunds at our own expense.

To prevent this from happening again, please follow the recommendations provided above. We are not responsible for account blocks or logouts during or after registration. By using our service, you agree to our rules.

The service is considered provided once the SMS is received, as we do not provide a registration service - further actions depend on the user.`,
    tags: ["отказ повторный возврат", "no more refunds exception used", "уже возвращали"],
  },
  {
    id: "refund-5",
    category: "refunds",
    title: "Отказ по карте — не наша ответственность",
    ru: `К сожалению, эквайринговая система не объясняет причину отказа карты. У нас нет возможности подтвердить или отклонить платёж. Рекомендую использовать другую карту или криптовалюту для пополнения баланса — это даже выгоднее, так как минимальный платёж через TRC20 составляет $3, а комиссия всего 3%.`,
    en: `Unfortunately, the acquiring system does not explain the reason for the card decline. We do not have the ability to approve or decline payments. I recommend using a different card or cryptocurrency to top up your balance — it is even more advantageous, as the minimum payment via TRC20 is $3, and the commission is only 3%.`,
    tags: ["отказ карты не наша ответственность", "card decline not our fault"],
  },
  {
    id: "refund-6",
    category: "refunds",
    title: "Возврат оформлен — средства на баланс",
    ru: `Вернул вам средства за номер на баланс.`,
    en: `I have refunded the funds for the number to your balance.`,
    tags: ["возврат оформлен", "refund completed", "деньги на балансе"],
  },
];

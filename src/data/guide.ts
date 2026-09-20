import type { IconName } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";

export type GuideTextPart = {
  text: string;
  kind?: "file" | "strong";
};

export type GuideParagraph = string | readonly GuideTextPart[];

export type GuideStepData = {
  id: number;
  title: string;
  description: readonly GuideParagraph[];
  image: string;
  imageAlt: string;
  imageLabel: string;
  icon: IconName;
  showVideo?: boolean;
  action?: {
    label: string;
    href: string | null;
    description?: GuideParagraph;
  };
  warning?: string;
  helpText: GuideParagraph;
  helpHref: string;
  extraHelpLinks?: readonly { label: GuideParagraph; href: string }[];
};

/** Instruction content lives here so it can be revised without changing the UI. */
export const guideSteps: readonly GuideStepData[] = [
  {
    id: 1,
    title: "Проверьте UDID",
    description: ["Нажмите «Проверить UDID» и отправьте свой UDID."],
    action: { label: "Перейти в бота", href: siteConfig.botUrl },
    image: "/images/guide/step-1.webp",
    imageAlt: "Кнопка Проверить UDID и поле отправки UDID в Telegram-боте",
    imageLabel: "Telegram-бот · кнопка «Проверить UDID»",
    icon: "message",
    helpText: "UDID — это идентификатор вашего устройства. Используйте значение, которое вы указывали при регистрации. Если не можете его найти, обратитесь в поддержку.",
    helpHref: "/guide/errors",
  },
  {
    id: 2,
    title: "Получить сертификат",
    description: ["Нажмите «Получить сертификат» в Telegram-боте."],
    image: "/images/guide/step-2.webp",
    imageAlt: "Кнопка Получить сертификат в Telegram-боте",
    imageLabel: "Telegram-бот · кнопка «Получить сертификат»",
    icon: "download",
    helpText: "Нужная кнопка находится в Telegram-боте. Если её нет или бот не отвечает, обратитесь в поддержку.",
    helpHref: "/guide/errors",
  },
  {
    id: 3,
    title: "Установите ESign",
    description: ["Нажмите на ESign и выберите «Установить»."],
    image: "/images/guide/step-3.webp",
    imageAlt: "Выбор ESign и кнопка Установить",
    imageLabel: "ESign · установка на iPhone",
    icon: "phone",
    helpText: "Если ESign не устанавливается, откройте раздел частых ошибок. Если проблема сохраняется, обратитесь в поддержку.",
    helpHref: "/guide/errors#esign-install",
  },
  {
    id: 4,
    title: "Включите режим разработчика",
    description: [
      "После установки ESign откройте настройки iPhone:",
      [{ text: "Настройки → Конфиденциальность и безопасность → Режим разработчика", kind: "strong" }],
      "Включите режим разработчика.",
    ],
    image: "/images/guide/step-4.webp",
    imageAlt: "Режим разработчика в настройках конфиденциальности и безопасности iPhone",
    imageLabel: "Настройки · режим разработчика",
    icon: "settings",
    helpText: "Сначала установите ESign, затем найдите «Режим разработчика» в разделе «Конфиденциальность и безопасность». Если пункта нет, откройте частые ошибки.",
    helpHref: "/guide/errors#developer-mode",
  },
  {
    id: 5,
    title: "Сохраните два файла сертификата",
    description: [
      "Вернитесь в Telegram-бот и сохраните оба файла:",
      [{ text: ".p12", kind: "file" }, { text: " и " }, { text: ".mobileprovision", kind: "file" }],
      [{ text: "В приложении «Файлы» выберите папку в разделе " }, { text: "«На моём iPhone»", kind: "strong" }, { text: ". На iPad этот раздел называется «На моём iPad»." }],
    ],
    image: "/images/guide/step-5.webp",
    imageAlt: "Сохранение файлов .p12 и .mobileprovision в разделе На моём iPhone приложения Файлы",
    imageLabel: "Файлы · раздел «На моём iPhone»",
    icon: "file",
    warning: "Сохраните оба файла в память устройства. Не выбирайте iCloud Drive.",
    helpText: [{ text: "Для следующих шагов нужны оба файла: " }, { text: ".p12", kind: "file" }, { text: " и " }, { text: ".mobileprovision", kind: "file" }, { text: ". При сохранении выберите «Обзор» → «На моём iPhone» (на iPad — «На моём iPad»). Если одного из файлов нет в боте, обратитесь в поддержку." }],
    helpHref: "/guide/errors",
  },
  {
    id: 6,
    title: "Выберите «Импорт»",
    description: ["В ESign откройте меню в правом верхнем углу и выберите «Импорт»."],
    image: "/images/guide/step-6.webp",
    imageAlt: "Меню ESign в правом верхнем углу с пунктом Импорт",
    imageLabel: "ESign · меню импорта",
    icon: "plus",
    helpText: "Откройте меню именно в правом верхнем углу ESign. Если не видите пункт «Импорт», приложите скриншот этого экрана в обращении в поддержку.",
    helpHref: "/guide/errors",
  },
  {
    id: 7,
    title: "Импортируйте оба файла",
    description: [
      [{ text: "Сначала импортируйте файл " }, { text: ".p12", kind: "file" }, { text: "." }],
      [{ text: "После этого импортируйте " }, { text: ".mobileprovision", kind: "file" }, { text: "." }],
    ],
    image: "/images/guide/step-7.webp",
    imageAlt: "Выбор файлов .p12 и .mobileprovision для импорта в ESign",
    imageLabel: "ESign · выбор двух файлов сертификата",
    icon: "download",
    helpText: [{ text: "Импортируйте файлы по очереди: сначала " }, { text: ".p12", kind: "file" }, { text: ", затем " }, { text: ".mobileprovision", kind: "file" }, { text: ". Если появляется ошибка, сохраните её скриншот и откройте частые ошибки." }],
    helpHref: "/guide/errors",
  },
  {
    id: 8,
    title: "Импортируйте сертификат",
    description: [
      [{ text: "Нажмите на файл " }, { text: ".p12", kind: "file" }, { text: " и выберите «Импортировать сертификат»." }],
      [{ text: "Введите пароль " }, { text: "1", kind: "file" }, { text: " и подтвердите импорт." }],
    ],
    image: "/images/guide/step-8.webp",
    imageAlt: "Файл .p12, действие Импортировать сертификат и ввод пароля 1 в ESign",
    imageLabel: "ESign · импорт сертификата с паролем «1»",
    icon: "shield",
    helpText: [{ text: "Название файла может отличаться — выбирайте файл с расширением " }, { text: ".p12", kind: "file" }, { text: ". Если потребуется пароль, введите " }, { text: "1", kind: "file" }, { text: ". Если сертификат не импортируется, откройте частые ошибки." }],
    helpHref: "/guide/errors",
  },
  {
    id: 9,
    title: "Найдите файл приложения",
    description: [
      [{ text: "Найдите " }, { text: ".ipa", kind: "file" }, { text: " файл приложения, которое хотите установить. Его можно найти в интернете или в Telegram-каналах." }],
      "Сохраните файл в приложении «Файлы», в разделе «На моём iPhone» (на iPad — «На моём iPad»).",
    ],
    action: {
      label: "Перейти в канал",
      href: siteConfig.channelUrl,
      description: "Можете найти файлы в нашем Telegram-канале.",
    },
    image: "/images/guide/step-9.webp",
    imageAlt: "IPA-файл нужного приложения и сохранение в Файлы на iPhone",
    imageLabel: "Файлы · сохранение нужного .ipa",
    icon: "file",
    showVideo: false,
    helpText: [{ text: "IPA — это файл приложения для установки. Убедитесь, что файл заканчивается на " }, { text: ".ipa", kind: "file" }, { text: " и сохранён в память устройства. Если не можете найти нужный файл, откройте частые ошибки или напишите в поддержку." }],
    helpHref: "/guide/errors#ipa-files",
  },
  {
    id: 10,
    title: "Импортируйте приложение в ESign",
    description: [
      [{ text: "Вернитесь в ESign и импортируйте сохранённый " }, { text: ".ipa", kind: "file" }, { text: " файл." }],
      "Для этого откройте меню в правом верхнем углу, выберите «Импорт» и найдите файл в приложении «Файлы».",
    ],
    image: "/images/guide/step-10.webp",
    imageAlt: "Выбор сохранённого .ipa файла для импорта в ESign",
    imageLabel: "ESign · импорт .ipa файла",
    icon: "download",
    helpText: "Ищите сохранённый файл в разделе «На моём iPhone» (на iPad — «На моём iPad»). Если он не отображается, проверьте, куда вы сохранили его на предыдущем шаге.",
    helpHref: "/guide/errors#ipa-files",
  },
  {
    id: 11,
    title: "Подпишите приложение",
    description: [
      "После импорта файла перейдите в категорию «Приложения».",
      [{ text: "Нажмите на нужное приложение и выберите " }, { text: "«Подписать»", kind: "strong" }, { text: "." }],
    ],
    warning: "На этом шаге нажмите именно «Подписать». Если сразу выбрать «Установить», приложение не установится правильно.",
    image: "/images/guide/step-11.webp",
    imageAlt: "Категория Приложения в ESign и выбор действия Подписать для нужного приложения",
    imageLabel: "ESign · «Приложения» → «Подписать»",
    icon: "shield",
    helpText: "Сначала нужно подписать приложение сертификатом. Если вы выбрали «Установить» раньше, вернитесь к приложению и выберите «Подписать». При ошибке сохраните скриншот и откройте частые ошибки.",
    helpHref: "/guide/errors#app-install",
  },
  {
    id: 12,
    title: "Установите приложение",
    description: ["Нажмите «Установить», затем ещё раз «Установить» для подтверждения."],
    image: "/images/guide/step-12.webp",
    imageAlt: "Кнопка Установить в ESign и повторное подтверждение установки приложения",
    imageLabel: "ESign · установка и подтверждение",
    icon: "check",
    helpText: "Если установка не начинается, убедитесь, что вы подписали приложение на предыдущем шаге. Если приложение не устанавливается или не открывается, посмотрите частые ошибки или напишите в поддержку.",
    helpHref: "/guide/errors#app-install",
    extraHelpLinks: [{ label: "Приложение вылетает", href: "/guide/errors#app-crashes" }],
  },
];

export const guideDuration = "5–10 минут";

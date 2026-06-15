// Словари локализации для RU, EN, UZ языков
const translations = {
    ru: {
        title: "Korean Study",
        subtitle: "Интерактивный тренажер",
        tab_hangul: "Хангыль",
        tab_vocabulary: "Слова",
        tab_teacher: "Учитель",
        hangul_title: "Корейский алфавит",
        hangul_desc: "Нажмите на карточку буквы, чтобы узнать её произношение и правила чтения.",
        cat_vowels: "Гласные",
        cat_consonants: "Согласные",
        vocab_title: "Тренажер слов",
        vocab_desc: "Повторяйте корейские слова. Кликните по карте, чтобы перевернуть её и узнать перевод.",
        listen_btn: "🔊 Слушать",
        control_prev: "◀ Назад",
        control_next: "Вперед ▶",
        teacher_title: "Ваш преподаватель корейского",
        teacher_bio: "Привет! Я помогу тебе заговорить на корейском легко и без зубрежки. Мои уроки — это интерактивная практика, погружение в культуру и разборы любимых дорам и K-Pop треков.",
        feat_1: "Индивидуальный подход к каждому ученику",
        feat_2: "Современные методики обучения",
        feat_3: "Изучение языка по песням и сериалам",
        book_btn: "Записаться на бесплатный пробный урок",
        booking_alert: "Заявка отправлена!",
        lang_selector_label: "Язык интерфейса"
    },
    en: {
        title: "Korean Study",
        subtitle: "Interactive Trainer",
        tab_hangul: "Hangul",
        tab_vocabulary: "Words",
        tab_teacher: "Teacher",
        hangul_title: "Korean Alphabet",
        hangul_desc: "Click on a letter card to hear its pronunciation and reading rules.",
        cat_vowels: "Vowels",
        cat_consonants: "Consonants",
        vocab_title: "Word Trainer",
        vocab_desc: "Review Korean words. Click the card to flip it and see the translation.",
        listen_btn: "🔊 Listen",
        control_prev: "◀ Prev",
        control_next: "Next ▶",
        teacher_title: "Your Korean Teacher",
        teacher_bio: "Hello! I will help you speak Korean easily without boring memorization. My classes are all about interactive practice, cultural immersion, and analyzing your favorite K-dramas and K-Pop tracks.",
        feat_1: "Individual approach to each student",
        feat_2: "Modern teaching techniques",
        feat_3: "Learning via songs and TV series",
        book_btn: "Book a Free Trial Lesson",
        booking_alert: "Request sent!",
        lang_selector_label: "Interface Language"
    },
    uz: {
        title: "Korean Study",
        subtitle: "Interaktiv trenajor",
        tab_hangul: "Hangul",
        tab_vocabulary: "So'zlar",
        tab_teacher: "O'qituvchi",
        hangul_title: "Koreys alifbosi",
        hangul_desc: "Harfning talaffuzi va o'qish qoidalarini bilish uchun kartani bosing.",
        cat_vowels: "Unlilar",
        cat_consonants: "Undoshlar",
        vocab_title: "So'z yodlash",
        vocab_desc: "Koreyscha so'zlarni takrorlang. Tarjimasini bilish uchun kartani bosing.",
        listen_btn: "🔊 Tinglash",
        control_prev: "◀ Orqaga",
        control_next: "Oldinga ▶",
        teacher_title: "Sizning koreys tili o'qituvchingiz",
        teacher_bio: "Salom! Men sizga koreys tilida yodlashlarsiz va oson gapirishga yordam beraman. Darslarimiz interaktiv amaliyot, madaniyat va sevimli K-drama hamda K-Pop qo'shiqlarini tahlil qilishdan iborat.",
        feat_1: "Har bir talabaga individual yondashuv",
        feat_2: "Zamonaviy o'qitish metodikalari",
        feat_3: "Qo'shiqlar va seriallar orqali til o'rganish",
        book_btn: "Bepul sinov darsiga yozilish",
        booking_alert: "So'rov yuborildi!",
        lang_selector_label: "Interfeys tili"
    }
};

// Инициализация Telegram Web App SDK
const tg = window.Telegram?.WebApp;
let apiBaseUrl = "https://intelnod-korean.loca.lt"; // Адрес нашего безопасного постоянного туннеля на сервере

// Для локального тестирования на сервере или в туннеле:
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    apiBaseUrl = "http://localhost:8000";
}

if (tg) {
    tg.ready();
    tg.expand(); // Разворачиваем окно на максимум
    // Настраиваем цвета темы Telegram
    tg.setHeaderColor('#0b071e');
    tg.setBackgroundColor('#0b071e');
}

// Переменная текущего языка
let currentLang = "ru";

// Функция переключения языков
function changeLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    
    // Переводим все статичные элементы по дата-атрибутам
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    
    // Изменяем язык озвучки Google TTS, если это требуется для перевода слов (описание перевода пойдет на выбранном языке)
    // Сохраняем язык в localStorage
    localStorage.setItem("korean_lang", lang);
}

// Ждем загрузки DOM, чтобы повесить селектор
document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("lang-select");
    if (langSelect) {
        // Подгружаем сохраненный язык
        const savedLang = localStorage.getItem("korean_lang") || "ru";
        langSelect.value = savedLang;
        changeLanguage(savedLang);
        
        langSelect.addEventListener("change", (e) => {
            changeLanguage(e.target.value);
            if (tg?.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('light');
            }
        });
    }
});

// Данные корейского алфавита (Хангыль)
const hangulData = {
    vowels: [
        { char: '아', sound: 'а', rules: 'Буква А' },
        { char: '야', sound: 'я', rules: 'Буква Я' },
        { char: '어', sound: 'о', rules: 'Широкий О' },
        { char: '여', sound: 'ё', rules: 'Широкий Ё' },
        { char: '오', sound: 'о', rules: 'Закрытый О' },
        { char: '요', sound: 'ё', rules: 'Закрытый Ё' },
        { char: '우', sound: 'у', rules: 'Буква У' },
        { char: '유', sound: 'ю', rules: 'Буква Ю' },
        { char: '으', sound: 'ы', rules: 'Буква Ы' },
        { char: '이', sound: 'и', rules: 'Буква И' },
        { char: '애', sound: 'э', rules: 'Буква Э' },
        { char: '에', sound: 'е', rules: 'Буква Е' }
    ],
    consonants: [
        { char: 'ㄱ', sound: 'к / г', rules: 'В начале "К", между гласными "Г"' },
        { char: 'ㄴ', sound: 'н', rules: 'Звук Н' },
        { char: 'ㄷ', sound: 'т / д', rules: 'В начале "Т", между гласными "Д"' },
        { char: 'ㄹ', sound: 'р / ль', rules: 'В начале "Р", в конце слога "ЛЬ"' },
        { char: 'ㅁ', sound: 'м', rules: 'Звук М' },
        { char: 'ㅂ', sound: 'п / б', rules: 'В начале "П", между гласными "Б"' },
        { char: 'ㅅ', sound: 'с / щ', rules: 'Перед "и, е, ё, ю, я" читается как "Щ"' },
        { char: 'ㅇ', sound: 'нъ / -', rules: 'В начале не читается, в конце слога носовой "Н"' },
        { char: 'ㅈ', sound: 'ч / дж', rules: 'В начале "Ч", между гласными "ДЖ"' },
        { char: 'ㅊ', sound: 'чх', rules: 'Придыхательный Ч' },
        { char: 'ㅋ', sound: 'кх', rules: 'Придыхательный К' },
        { char: 'ㅌ', sound: 'тх', rules: 'Придыхательный Т' }
    ]
};

// Динамический массив слов (содержит начальный резервный список)
let vocabularyData = [
    { id: 1, korean: '안녕하세요', transcription: 'an-nyeong-ha-se-yo', russian: 'Здравствуйте', example: 'Пример: 안녕하세요! 만나서 반га워요. (Здравствуйте! Рад встрече.)' },
    { id: 2, korean: '감사합니다', transcription: 'gam-sa-ham-ni-da', russian: 'Спасибо', example: 'Пример: 도와주셔서 감사합니다. (Спасибо, что помогли.)' },
    { id: 3, korean: '사랑해요', transcription: 'sa-rang-hae-yo', russian: 'Я люблю тебя', example: 'Пример: 한국을 사랑해요. (Я люблю Корею.)' },
    { id: 4, korean: '맛있어요', transcription: 'ma-si-sseo-yo', russian: 'Вкусно', example: 'Пример: 이 비빔밥 정말 맛있어요! (Этот пибимпап очень вкусный!)' }
];
let currentWordIndex = 0;

// Функция для безопасной отправки запросов на сервер бота
async function apiFetch(endpoint, options = {}) {
    const headers = options.headers || {};
    
    // Передаем полную строку авторизационных данных Telegram в заголовке
    if (tg?.initData) {
        headers["Authorization"] = `Bearer ${tg.initData}`;
    }
    
    headers["Content-Type"] = "application/json";
    
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        ...options,
        headers
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
}

// Загрузка слов с сервера при старте приложения
async function loadVocabulary() {
    try {
        const data = await apiFetch("/api/words");
        if (data.words && data.words.length > 0) {
            vocabularyData = data.words;
            updateWord();
        }
    } catch (err) {
        console.error("Не удалось загрузить слова со словаря:", err);
        // Резервный список слов, если бэкенд не отвечает
        vocabularyData = [
            { id: 1, korean: '안녕하세요', transcription: 'an-nyeong-ha-se-yo', russian: 'Здравствуйте', example: 'Пример: 안녕하세요! 만나서 반га워요.' }
        ];
        updateWord();
    }
}

// Управление вкладками
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
        
        if (tg?.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    });
});

// Переключение категорий Хангыля
const catBtns = document.querySelectorAll('.cat-btn');
catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderHangul(btn.dataset.cat);

        if (tg?.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    });
});

// Генерация букв Хангыля
const hangulContainer = document.getElementById('hangul-container');

function renderHangul(category) {
    hangulContainer.innerHTML = '';
    const letters = hangulData[category];
    
    letters.forEach(item => {
        const card = document.createElement('div');
        card.className = 'hangul-card';
        card.innerHTML = `
            <div class="hangul-char">${item.char}</div>
            <div class="hangul-sound">${item.sound}</div>
            <div class="hangul-rules">${item.rules}</div>
        `;
        
        card.addEventListener('click', () => {
            document.querySelectorAll('.hangul-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Воспроизводим корейский звук
            speakKorean(item.char);
            
            // Отправляем прогресс на сервер
            sendProgress("click_letter", { letter: item.char });

            if (tg?.HapticFeedback) {
                tg.HapticFeedback.notificationOccurred('success');
            }
        });
        
        hangulContainer.appendChild(card);
    });
}

// Управление флеш-картами слов
const wordCard = document.getElementById('word-card');
const speakBtn = document.getElementById('speak-btn');

wordCard.addEventListener('click', (e) => {
    if (e.target.closest('#speak-btn')) return;
    
    const isFlipped = wordCard.classList.toggle('flipped');
    
    // При перевороте отправляем событие активности (прогресс просмотра)
    if (isFlipped && vocabularyData[currentWordIndex]) {
        sendProgress("word_progress", { 
            word_id: vocabularyData[currentWordIndex].id, 
            level: 3 // Повышаем уровень до 3 (в процессе изучения)
        });
    }

    if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
});

function updateWord() {
    if (vocabularyData.length === 0) return;
    
    const word = vocabularyData[currentWordIndex];
    wordCard.classList.remove('flipped');
    
    setTimeout(() => {
        document.getElementById('front-korean').textContent = word.korean;
        document.getElementById('front-transcription').textContent = `[${word.transcription}]`;
        document.getElementById('back-russian').textContent = word.russian;
        document.getElementById('back-example').textContent = word.example || '';
        document.getElementById('card-counter').textContent = `${currentWordIndex + 1} / ${vocabularyData.length}`;
    }, 150);
}

document.getElementById('next-word-btn').addEventListener('click', () => {
    if (vocabularyData.length === 0) return;
    
    // Если перешли к следующему слову, отметим предыдущее как просмотренное (уровень 2)
    sendProgress("word_progress", { 
        word_id: vocabularyData[currentWordIndex].id, 
        level: 2
    });
    
    currentWordIndex = (currentWordIndex + 1) % vocabularyData.length;
    updateWord();
    if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
});

document.getElementById('prev-word-btn').addEventListener('click', () => {
    if (vocabularyData.length === 0) return;
    currentWordIndex = (currentWordIndex - 1 + vocabularyData.length) % vocabularyData.length;
    updateWord();
    if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
});

// Воспроизведение звука слов
speakBtn.addEventListener('click', () => {
    if (vocabularyData.length === 0) return;
    const koreanText = vocabularyData[currentWordIndex].korean;
    speakKorean(koreanText);
});

function speakKorean(text) {
    try {
        // Кодируем текст для передачи в URL
        const query = encodeURIComponent(text);
        // Используем официальный бесплатный API озвучки от Google Translate
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ko&client=tw-ob&q=${query}`;
        
        const audio = new Audio(ttsUrl);
        audio.play().catch(err => {
            console.warn("Ошибка автовоспроизведения аудио:", err);
        });
    } catch (err) {
        console.error("Не удалось воспроизвести звук:", err);
    }
}

// Отправка прогресса на сервер
async function sendProgress(action, data = {}) {
    try {
        await apiFetch("/api/progress", {
            method: "POST",
            body: JSON.stringify({ action, ...data })
        });
    } catch (err) {
        console.warn("Ошибка сохранения прогресса:", err);
    }
}

// Запись на урок
document.getElementById('book-lesson-btn').addEventListener('click', () => {
    const alertMsg = translations[currentLang]?.booking_alert || "Заявка отправлена!";
    if (tg) {
        tg.sendData(JSON.stringify({
            action: 'book_lesson',
            message: `Пользователь хочет записаться на урок (Выбранный язык: ${currentLang})`
        }));
    } else {
        alert(alertMsg);
    }
});

// Инициализация при старте
renderHangul('vowels');
updateWord();

// Асинхронно загружаем слова из базы данных, не блокируя UI
setTimeout(() => {
    loadVocabulary();
}, 50);

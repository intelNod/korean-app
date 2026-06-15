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
    
    // Сохраняем язык в localStorage
    localStorage.setItem("korean_lang", lang);
    
    // Перерисовываем Хангыль с новым языком, если вкладка активна
    const activeCatBtn = document.querySelector('.cat-btn.active');
    if (activeCatBtn) {
        renderHangul(activeCatBtn.dataset.cat);
    }
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

// Данные корейского алфавита (Хангыль) с локализацией
const hangulData = {
    vowels: [
        { char: '아', sound: { ru: 'а', en: 'a', uz: 'a' }, rules: { ru: 'Буква А', en: 'Letter A', uz: 'A harfi' } },
        { char: '야', sound: { ru: 'я', en: 'ya', uz: 'ya' }, rules: { ru: 'Буква Я', en: 'Letter Ya', uz: 'Ya harfi' } },
        { char: '어', sound: { ru: 'о', en: 'eo', uz: 'o' }, rules: { ru: 'Широкий О', en: 'Broad O', uz: 'Keng O' } },
        { char: '여', sound: { ru: 'ё', en: 'yeo', uz: 'yo' }, rules: { ru: 'Широкий Ё', en: 'Broad Yeo', uz: 'Keng Yo' } },
        { char: '오', sound: { ru: 'о', en: 'o', uz: 'o' }, rules: { ru: 'Закрытый О', en: 'Closed O', uz: 'Yopiq O' } },
        { char: '요', sound: { ru: 'ё', en: 'yo', uz: 'yo' }, rules: { ru: 'Закрытый Ё', en: 'Closed Yo', uz: 'Yopiq Yo' } },
        { char: '우', sound: { ru: 'у', en: 'u', uz: 'u' }, rules: { ru: 'Буква У', en: 'Letter U', uz: 'U harfi' } },
        { char: '유', sound: { ru: 'ю', en: 'yu', uz: 'yu' }, rules: { ru: 'Буква Ю', en: 'Letter Yu', uz: 'Yu harfi' } },
        { char: '으', sound: { ru: 'ы', en: 'eu', uz: 'eu' }, rules: { ru: 'Буква Ы', en: 'Letter Eu', uz: 'Eu harfi' } },
        { char: '이', sound: { ru: 'и', en: 'i', uz: 'i' }, rules: { ru: 'Буква И', en: 'Letter I', uz: 'I harfi' } },
        { char: '애', sound: { ru: 'э', en: 'ae', uz: 'e' }, rules: { ru: 'Буква Э', en: 'Letter Ae', uz: 'E harfi' } },
        { char: '에', sound: { ru: 'е', en: 'e', uz: 'e' }, rules: { ru: 'Буква Е', en: 'Letter E', uz: 'E harfi' } }
    ],
    consonants: [
        { char: 'ㄱ', sound: { ru: 'к / г', en: 'k / g', uz: 'k / g' }, rules: { ru: 'В начале "К", между гласными "Г"', en: 'Initially "K", between vowels "G"', uz: 'Boshida "K", unlilar orasida "G"' } },
        { char: 'ㄴ', sound: { ru: 'н', en: 'n', uz: 'n' }, rules: { ru: 'Звук Н', en: 'Sound N', uz: 'N tovushi' } },
        { char: 'ㄷ', sound: { ru: 'т / д', en: 't / d', uz: 't / d' }, rules: { ru: 'В начале "Т", между гласными "Д"', en: 'Initially "T", between vowels "D"', uz: 'Boshida "T", unlilar orasida "D"' } },
        { char: 'ㄹ', sound: { ru: 'р / ль', en: 'r / l', uz: 'r / l' }, rules: { ru: 'В начале "Р", в конце слога "ЛЬ"', en: 'Initially "R", at the end of syllable "L"', uz: 'Boshida "R", bo\'g\'in oxirida "L"' } },
        { char: 'ㅁ', sound: { ru: 'м', en: 'm', uz: 'm' }, rules: { ru: 'Звук М', en: 'Sound M', uz: 'M tovushi' } },
        { char: 'ㅂ', sound: { ru: 'п / б', en: 'p / b', uz: 'p / b' }, rules: { ru: 'В начале "П", между гласными "Б"', en: 'Initially "P", between vowels "B"', uz: 'Boshida "P", unlilar orasida "B"' } },
        { char: 'ㅅ', sound: { ru: 'с / щ', en: 's / sh', uz: 's / sh' }, rules: { ru: 'Перед "и, е, ё, ю, я" читается как "Щ"', en: 'Before "i, e, yeo, yu, ya" read as "SH"', uz: '"i, e, yo, yu, ya" oldidan "SH" o\'qiladi' } },
        { char: 'ㅇ', sound: { ru: 'нъ / -', en: 'ng / -', uz: 'ng / -' }, rules: { ru: 'В начале не читается, в конце слога носовой "Н"', en: 'Initially silent, at the end nasal "NG"', uz: 'Boshida o\'qilmaydi, oxirida burun "NG"' } },
        { char: 'ㅈ', sound: { ru: 'ч / дж', en: 'ch / j', uz: 'ch / j' }, rules: { ru: 'В начале "Ч", между гласными "ДЖ"', en: 'Initially "CH", between vowels "J"', uz: 'Boshida "CH", unlilar orasida "J"' } },
        { char: 'ㅊ', sound: { ru: 'чх', en: 'ch', uz: 'ch' }, rules: { ru: 'Придыхательный Ч', en: 'Aspirated CH', uz: 'Nafasli CH' } },
        { char: 'ㅋ', sound: { ru: 'кх', en: 'k', uz: 'k' }, rules: { ru: 'Придыхательный К', en: 'Aspirated K', uz: 'Nafasli K' } },
        { char: 'ㅌ', sound: { ru: 'тх', en: 't', uz: 't' }, rules: { ru: 'Придыхательный Т', en: 'Aspirated T', uz: 'Nafasli T' } }
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
            <div class="hangul-sound">${item.sound[currentLang] || item.sound['ru']}</div>
            <div class="hangul-rules">${item.rules[currentLang] || item.rules['ru']}</div>
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
    if ('speechSynthesis' in window) {
        try {
            // Останавливаем предыдущее воспроизведение
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ko-KR'; // Корейский язык
            utterance.rate = 0.85; // Немного замедляем для учеников
            
            window.speechSynthesis.speak(utterance);
        } catch (err) {
            console.error("SpeechSynthesis error:", err);
        }
    } else {
        console.warn("Web Speech API не поддерживается в этом браузере.");
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

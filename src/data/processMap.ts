// ============================================================================
// DATA MODEL — единый источник правды процесса.
// Контент перенесён дословно из legacy/agency_process_map.html.
// Координаты (x/y/w) исходника отброшены: вертикальную раскладку считает CSS.
// Цвета этапов переопределены под светлую высоко-контрастную тему.
// ============================================================================

export type StageId = 'brief' | 'strategy' | 'creator' | 'producer' | 'presenter'
export type LinkKind = 'dataflow' | 'content' | 'synergy'

export interface Stage {
  id: StageId
  name: string
  num: string
  /** насыщенный акцент под белый фон */
  color: string
}

export interface ProcessNode {
  id: string
  stage: StageId
  group: string
  title: string
  desc: string
  options: string[]
}

export interface Link {
  from: string
  to: string
  kind: LinkKind
  label?: string
  /** связь добавлена поверх исходного документа */
  added?: boolean
}

export const STAGES: Stage[] = [
  { id: 'brief', name: 'Брифинг', num: '01', color: '#4f46e5' },
  { id: 'strategy', name: 'Стратег', num: '02', color: '#0284c7' },
  { id: 'creator', name: 'Креатор', num: '03', color: '#db2777' },
  { id: 'producer', name: 'Продюсер', num: '04', color: '#ea580c' },
  { id: 'presenter', name: 'Презентер', num: '05', color: '#059669' },
]

export const NODES: ProcessNode[] = [
  // === STAGE 1: BRIEF ===
  {
    id: 'b_what_is', stage: 'brief', group: 'Задача бизнеса · что есть',
    title: 'Продукт и УТП',
    desc: 'Что физически продаётся, в чём отличие от аналогов, цена.',
    options: ['Продукт', 'УТП', 'Цена', 'Идея бизнеса (что нового)'],
  },
  {
    id: 'b_market_type', stage: 'brief', group: 'Задача бизнеса · что есть',
    title: 'Тип рынка',
    desc: 'Категориальный режим. Определяет всё дальше: тип сигнала, тип сообщения, тип RTB.',
    options: ['FMCG (быстрый сигнал)', 'GLORY (доказательства)', 'LOVEMARK (идентичность)'],
  },
  {
    id: 'b_position', stage: 'brief', group: 'Задача бизнеса · что есть',
    title: 'Позиция на рынке',
    desc: 'Положение в матрице позиционирования и доступность.',
    options: ['Положение в матрице (16 ячеек)', 'Ментальная доступность', 'Физическая доступность'],
  },
  {
    id: 'b_brand_assets', stage: 'brief', group: 'Задача бизнеса · что есть',
    title: 'Бренд-активы',
    desc: 'Что уже есть, на чём строить коммуникацию.',
    options: ['Идея бренда (за что, кроме продаж)', 'Слоган', 'Долгосрочная рекламная идея', 'TOV (тон голоса)'],
  },
  {
    id: 'b_goals', stage: 'brief', group: 'Задача бизнеса · чего хотим',
    title: 'Бизнес-цель',
    desc: 'Что должно измениться в бизнесе. Срок и масштаб.',
    options: ['Рост продаж (срок)', 'Лонч', 'Задавить конкурента', 'Премиализация (доп.)', 'Удержать долю (доп.)'],
  },
  {
    id: 'b_audience', stage: 'brief', group: 'Маркетинг-цель',
    title: 'Аудитория коммуникации',
    desc: 'Кому говорим. Не социодем, а отношение к категории и бренду.',
    options: ['Все', 'Свои (лояльные / ядро)', 'Свичеры / редкие', 'Чужие', 'Новые', 'Сегмент', 'Инфлюенсеры', 'Комьюнити', 'Ритейл', 'Бизнес'],
  },
  {
    id: 'b_competitors', stage: 'brief', group: 'Маркетинг-цель',
    title: 'Конкуренты и их каналы',
    desc: 'С кем боремся за внимание и деньги.',
    options: ['По индустрии (прямые)', 'По функции (заменители)', 'По контексту (за время/деньги)', 'Каналы каждого'],
  },
  {
    id: 'b_change_type', stage: 'brief', group: 'Маркетинг-цель',
    title: 'Тип изменения (цель коммуникации)',
    desc: 'Самый мощный узел этапа. От этого зависит сигнал, режим, каналы и KPI.',
    options: ['Знание', 'Заметность', 'Понимание', 'Рассмотрение', 'Проба', 'Частота', 'Объём покупки', 'Рост цены', 'Рекомендация'],
  },

  // === STAGE 2: STRATEGY ===
  {
    id: 's_barrier', stage: 'strategy', group: 'Проблема поведения',
    title: 'Очевидный барьер',
    desc: 'Первый поверхностный диагноз: что мешает покупке прямо сейчас.',
    options: ['Не видит (шум)', 'Не понимает (сложность)', 'Не доверяет (бренд)', 'Не пробует (мотив)'],
  },
  {
    id: 's_gap', stage: 'strategy', group: 'Проблема поведения',
    title: 'Внутренний разрыв SAY-THINK-DO',
    desc: 'Behaviour Gap: где расходятся слова, мысли и поведение.',
    options: ['SAY-THINK (легализация)', 'THINK-DO (нормализация)', 'SAY-DO (переосмысление)', 'Все три (смена идентичности)'],
  },
  {
    id: 's_insight', stage: 'strategy', group: 'Проблема поведения',
    title: 'Инсайт — почему так думают',
    desc: 'Скрытая правда. В исходнике упомянуты «36 типов секретов» — методика не раскрыта в этом документе, нужна отдельная карта типов.',
    options: ['Тип секрета (1 из 36)', 'Формулировка инсайта', '🚩 Доказательство (источник, цитата)'],
  },
  {
    id: 's_psyche', stage: 'strategy', group: 'Проблема поведения',
    title: 'Психопортрет (Psycheya)',
    desc: 'Глубокий профиль: эволюционная стратегия, нейрохимия, архетип, страхи и мотивы.',
    options: ['Психотип / архетип', 'Слабости и страхи', 'Мотивы (что движет)', 'Отношение к коммуникации', 'Нейрохимический профиль'],
  },
  {
    id: 's_strategy_type', stage: 'strategy', group: 'Стратегия коммуникации',
    title: 'Тип стратегии',
    desc: 'Что именно строит коммуникация: знание, понимание или действие.',
    options: ['Имидж бренда (знание, ценности)', 'Выгода товара (понимание, отличие)', 'Активация продаж (проба, повтор)'],
  },
  {
    id: 's_mode', stage: 'strategy', group: 'Стратегия коммуникации',
    title: 'Режим коммуникации',
    desc: 'Как должна работать реклама. Выводится напрямую из типа разрыва SAY-THINK-DO.',
    options: ['Легализация («это разрешено»)', 'Нормализация («это обычная практика»)', 'Переосмысление («понимать иначе»)', 'Смена идентичности («я такой человек»)'],
  },
  {
    id: 's_signal', stage: 'strategy', group: 'Сообщение',
    title: 'Сигнал по SSS',
    desc: 'Биологический сигнал кампании. Один первичный сигнал — иначе размывается.',
    options: ['🔴 SHIELD — выживание / потеря', '🟡 SNACK — приобретение / выгода', '🟢 SEED — статус / наследие'],
  },
  {
    id: 's_persuasion', stage: 'strategy', group: 'Сообщение',
    title: 'Принцип убеждения (Чалдини)',
    desc: 'Какой языковой механизм работает на этом психотипе и при этом разрыве.',
    options: ['Взаимность', 'Симпатия', 'Социальное доказательство', 'Авторитет', 'Дефицит', 'Последовательность', 'Общность'],
  },
  {
    id: 's_tov', stage: 'strategy', group: 'Сообщение',
    title: 'Личность и тональность',
    desc: 'Как звучит бренд в этой кампании. Должно опираться на TOV из брифа.',
    options: ['Личность (характер)', 'Тональность (эмоция)', 'Регистр (формальность)'],
  },
  {
    id: 's_message', stage: 'strategy', group: 'Сообщение',
    title: 'Основное сообщение / бенефит',
    desc: 'Главная мысль одной фразой. Работает в связке с сигналом и принципом убеждения.',
    options: ['Функциональный бенефит', 'Эмоциональный бенефит', 'Социальный бенефит'],
  },
  {
    id: 's_adapt', stage: 'strategy', group: 'Сообщение',
    title: 'Адаптация к сегменту',
    desc: 'Сообщение разворачивается под каждую аудиторию из брифа.',
    options: ['По сегментам (Свои / Свичеры / Чужие …)', 'По стадии воронки', 'По контексту потребления'],
  },
  {
    id: 's_rtb', stage: 'strategy', group: 'Сообщение',
    title: 'RTB — основания доверять',
    desc: 'Почему верить сообщению. Тип RTB зависит от типа рынка.',
    options: ['Факты / цифры (FMCG)', 'Доказательства / эксперты (GLORY)', 'История / общность (LOVEMARK)'],
  },
  {
    id: 's_channels_priority', stage: 'strategy', group: 'Каналы донесения',
    title: 'Приоритетные каналы',
    desc: 'Каналы определяются режимом коммуникации (режим → набор каналов).',
    options: ['Главный канал', 'Поддерживающие', 'Реактивные / комьюнити'],
  },
  {
    id: 's_channel_brief', stage: 'strategy', group: 'Каналы донесения',
    title: 'Адаптация под канал (бриф)',
    desc: 'Каждому каналу — свой бриф с учётом контекста потребления.',
    options: ['Длительность / формат', 'Контекст внимания', 'Призыв к действию'],
  },
  {
    id: 's_integration', stage: 'strategy', group: 'Каналы донесения',
    title: 'Принципы интеграции',
    desc: 'Как каналы усиливают друг друга, а не повторяют.',
    options: ['Распределение ролей', 'Передача между каналами', 'Единый креативный код'],
  },

  // === STAGE 3: CREATOR ===
  {
    id: 'c_big_idea', stage: 'creator', group: 'Креативная стратегия',
    title: 'Big Idea (360°)',
    desc: 'Центральная идея кампании. В исходнике упомянуты 18 креативных паттернов — конкретный список не приведён.',
    options: ['Паттерн (1 из 18)', 'Формулировка идеи (одно предложение)', 'Мост к сообщению', '🚩 Тест простоты'],
  },
  {
    id: 'c_activations', stage: 'creator', group: 'Креативная стратегия',
    title: 'Идеи активаций',
    desc: 'Зависят от типа изменения. В исходнике упомянуты «виды активаций / маркетинг вовлечения» — типология не раскрыта.',
    options: ['Под Знание (стант, культурный объект)', 'Под Пробу (sampling, демо)', 'Под Частоту (ритуал, программа)', 'Под Рекомендацию (UGC, реферал)', '🚩 Полная таксономия активаций'],
  },
  {
    id: 'c_non_ad', stage: 'creator', group: 'Креативная стратегия',
    title: 'Нерекламные идеи',
    desc: 'Создать что-то полезное вместо коммуникации: продукт, сервис, утилита, культурный объект.',
    options: ['Утилита / сервис', 'Продукт-расширение', 'Культурный объект / событие', 'Бренд-ритуал'],
  },
  {
    id: 'e_carriers', stage: 'creator', group: 'Экзекюшен',
    title: 'Носители',
    desc: 'Конкретные форматы: ролик, OOH, пост, лендинг, упаковка, событие.',
    options: ['Видео (TVC / digital)', 'OOH / DOOH', 'Соцсети', 'Web / лендинг', 'Упаковка / POSM', 'Событие'],
  },
  {
    id: 'e_copy', stage: 'creator', group: 'Экзекюшен',
    title: 'Тексты и запретные формулировки',
    desc: 'Копирайт всех носителей. Запретные формулировки — фразы, которых не может быть в этой кампании.',
    options: ['Заголовки / клеймы', 'Тексты роликов', 'Запретный список', 'Юридические ограничения'],
  },
  {
    id: 'e_design', stage: 'creator', group: 'Экзекюшен',
    title: 'Дизайн и визуальные правила',
    desc: 'Гайдлайны, цвет, типографика, обращение с логотипом.',
    options: ['Цветовая палитра', 'Типографика', 'Композиция / сетка', 'Логотип-правила'],
  },
  {
    id: 'e_materials', stage: 'creator', group: 'Экзекюшен',
    title: 'Материалы (продакшн-листы)',
    desc: 'Что физически нужно произвести: ассеты, тиражи, форматы.',
    options: ['Видео-ассеты', 'Графика / печать', 'POSM / сувениры', 'Веб-ассеты'],
  },
  {
    id: 'e_scenarios', stage: 'creator', group: 'Экзекюшен',
    title: 'Сценарии, рубрики, форматы',
    desc: 'Драматургия: как выглядит сюжет ролика, контент-рубрика, серийный формат.',
    options: ['Сюжет ролика', 'Контент-рубрики', 'Серийный формат', 'Сторилайн кампании'],
  },
  {
    id: 'e_mechanics', stage: 'creator', group: 'Экзекюшен',
    title: 'Механика мотивации (CFR)',
    desc: 'Правила активации: участие, призы, условия. CFR — методика не раскрыта в исходнике.',
    options: ['Условия участия', 'Призы / награды', 'Подтверждение / верификация', '🚩 CFR-протокол (методика)'],
  },

  // === STAGE 4: PRODUCER ===
  {
    id: 'p_priority', stage: 'producer', group: 'Коммуникационный план',
    title: 'Приоритет охвата',
    desc: 'Что важнее: запрос, релевантность, присутствие или охват. Зависит от типа изменения.',
    options: ['Request (закрыть запрос)', 'Relevance (быть в моменте)', 'Residence (постоянное присутствие)', 'Reach (массовый охват)'],
  },
  {
    id: 'p_flights', stage: 'producer', group: 'Коммуникационный план',
    title: 'Флайты и кампании',
    desc: 'Структура запусков во времени.',
    options: ['Лонч-флайт', 'Поддержка', 'Сезонные пики', 'Always-on'],
  },
  {
    id: 'p_calendar', stage: 'producer', group: 'Коммуникационный план',
    title: 'Календарь и план размещения',
    desc: 'Конкретные даты по каждому каналу.',
    options: ['Медиа-сетка', 'Контент-календарь', 'События и активации'],
  },
  {
    id: 'p_cost', stage: 'producer', group: 'Коммуникационный план',
    title: 'Стоимость производства и размещения',
    desc: 'Смета: разработка, продакшн, медиа.',
    options: ['Разработка (агентство)', 'Производство (продакшн)', 'Размещение (медиа)', 'Резерв 10–15%'],
  },
  {
    id: 'p_timing', stage: 'producer', group: 'Коммуникационный план',
    title: 'Тайминг подготовки и запуска',
    desc: 'Обратный отсчёт от даты запуска.',
    options: ['Согласование стратегии', 'Креатив + ревью', 'Продакшн', 'Закупка медиа', 'Лонч-неделя'],
  },
  {
    id: 'p_budget_kpi', stage: 'producer', group: 'Коммуникационный план',
    title: 'Бюджет vs KPI',
    desc: 'Эффективность бюджета. Каждый KPI должен быть привязан к типу изменения из брифа.',
    options: ['Reach', 'Impressions', 'Engagement', 'Trial', 'Conversion', 'Sales', 'Re-purchase'],
  },

  // === STAGE 5: PRESENTER ===
  {
    id: 'pr_tender', stage: 'presenter', group: 'Презентация',
    title: 'Оценка тендерных критериев',
    desc: 'Сверка решения с явными и скрытыми критериями клиента.',
    options: ['Явные критерии (бриф)', 'Скрытые критерии (контекст)', 'Стоп-факторы', 'Усилители'],
  },
  {
    id: 'pr_format', stage: 'presenter', group: 'Презентация',
    title: 'Форматирование документа',
    desc: 'Структура deck: нарратив, ритм слайдов, плотность.',
    options: ['Нарратив (challenge → ответ)', 'Структура слайдов', 'Плотность / ритм', 'Цитируемые блоки'],
  },
  {
    id: 'pr_visuals', stage: 'presenter', group: 'Презентация',
    title: 'ТЗ на иллюстрации',
    desc: 'Промпты и брифы для визуалов (AI или дизайнер).',
    options: ['AI-промпты', 'Мудборды', 'Скетчи / макеты', 'Реф-кадры'],
  },
  {
    id: 'pr_interactive', stage: 'presenter', group: 'Презентация',
    title: 'Интерактивная презентация',
    desc: 'HTML/web-формат для отправки клиенту.',
    options: ['Кликабельные слайды', 'Видео-вставки', 'Ссылки на симуляции'],
  },
  {
    id: 'pr_simulation', stage: 'presenter', group: 'Презентация',
    title: 'Симуляция реализации',
    desc: 'Прототипы носителей, мокапы, демо-ролики — как кампания будет жить в реальности.',
    options: ['Мокапы носителей', 'Демо-ролики', 'Прототипы цифровых продуктов'],
  },
  {
    id: 'pr_packaging', stage: 'presenter', group: 'Презентация',
    title: 'Упаковка решений в агентов / скилы',
    desc: 'Передача проекта в исполнение: что становится переиспользуемым активом.',
    options: ['Бренд-агент', 'Контент-скилы', 'Шаблоны брифов', 'Архив решений'],
  },
]

// ============================================================================
// LINKS
// kind: dataflow (вывод→вход), content (значение→значение), synergy (взаимная согласованность)
// added: true — связь добавлена поверх документа
// ============================================================================

export const LINKS: Link[] = [
  // === BRIEF internal ===
  { from: 'b_market_type', to: 'b_brand_assets', kind: 'synergy', label: 'тип рынка задаёт тип TOV' },
  { from: 'b_audience', to: 'b_change_type', kind: 'dataflow', label: 'аудитория ограничивает тип изменения' },
  { from: 'b_competitors', to: 'b_position', kind: 'dataflow' },
  { from: 'b_goals', to: 'b_change_type', kind: 'dataflow', label: 'бизнес-цель → коммуникационная цель' },

  // Продукт и УТП — связи добавлены (в оригинале узел был сиротой, 0 связей)
  { from: 'b_what_is', to: 'b_position', kind: 'dataflow', label: 'продукт/УТП формирует позицию', added: true },
  { from: 'b_what_is', to: 's_message', kind: 'dataflow', label: 'продукт/УТП → основной бенефит', added: true },
  { from: 'b_what_is', to: 's_rtb', kind: 'content', label: 'УТП = фактические основания доверять (FMCG)', added: true },
  { from: 'b_what_is', to: 'c_big_idea', kind: 'synergy', label: 'Big Idea должна опираться на продукт/УТП', added: true },

  // === BRIEF → STRATEGY ===
  { from: 'b_audience', to: 's_psyche', kind: 'dataflow', label: 'аудитория → психопортрет' },
  { from: 'b_audience', to: 's_adapt', kind: 'dataflow', label: 'сегменты → адаптация' },
  { from: 'b_change_type', to: 's_strategy_type', kind: 'dataflow' },
  { from: 'b_change_type', to: 's_signal', kind: 'dataflow', label: 'цель определяет SSS' },
  { from: 'b_competitors', to: 's_barrier', kind: 'dataflow' },
  { from: 'b_brand_assets', to: 's_tov', kind: 'dataflow', label: 'TOV → тональность сообщения' },
  { from: 'b_market_type', to: 's_rtb', kind: 'dataflow', label: 'тип рынка → тип RTB' },
  { from: 'b_position', to: 's_strategy_type', kind: 'dataflow' },

  { from: 'b_change_type', to: 's_signal', kind: 'content', label: 'Знание/Заметность ⇒ SEED · Проба ⇒ SNACK · Рост цены ⇒ SHIELD', added: true },
  { from: 'b_market_type', to: 's_rtb', kind: 'content', label: 'FMCG⇒цифры · GLORY⇒эксперты · LOVEMARK⇒история', added: true },
  { from: 'b_market_type', to: 's_persuasion', kind: 'content', label: 'GLORY ⇒ Авторитет · LOVEMARK ⇒ Общность · FMCG ⇒ Соцдоказательство', added: true },
  { from: 'b_audience', to: 's_psyche', kind: 'content', label: 'Свои⇒удержание · Чужие⇒переключение · Новые⇒легитимация', added: true },

  // === STRATEGY internal ===
  { from: 's_barrier', to: 's_gap', kind: 'dataflow', label: 'барьер уточняется через разрыв' },
  { from: 's_gap', to: 's_mode', kind: 'dataflow', label: 'тип разрыва → режим' },
  { from: 's_psyche', to: 's_signal', kind: 'dataflow', label: 'психотип → дефолтный сигнал' },
  { from: 's_psyche', to: 's_persuasion', kind: 'dataflow', label: 'психотип + разрыв → Чалдини' },
  { from: 's_gap', to: 's_persuasion', kind: 'dataflow' },
  { from: 's_insight', to: 's_message', kind: 'dataflow', label: 'инсайт → сообщение' },
  { from: 's_signal', to: 's_message', kind: 'dataflow' },
  { from: 's_strategy_type', to: 's_message', kind: 'dataflow' },
  { from: 's_message', to: 's_adapt', kind: 'dataflow' },
  { from: 's_message', to: 's_rtb', kind: 'synergy' },
  { from: 's_tov', to: 's_message', kind: 'synergy' },

  { from: 's_gap', to: 's_mode', kind: 'content', label: 'SAY-THINK⇒Легализация · THINK-DO⇒Нормализация · SAY-DO⇒Переосмысление · все⇒Идентичность', added: true },
  { from: 's_barrier', to: 's_gap', kind: 'content', label: 'Не доверяет⇒SAY-THINK · Не пробует⇒THINK-DO · Не понимает⇒SAY-DO', added: true },
  { from: 's_psyche', to: 's_signal', kind: 'content', label: 'эволюционная стратегия = доминирующий сигнал', added: true },

  { from: 's_mode', to: 's_channels_priority', kind: 'dataflow', label: 'режим → набор каналов' },
  { from: 's_mode', to: 's_channels_priority', kind: 'content', label: 'Легализация⇒авторитеты+PR · Нормализация⇒массовые · Переосмысление⇒сторителлинг · Идентичность⇒комьюнити', added: true },
  { from: 's_adapt', to: 's_channel_brief', kind: 'dataflow' },
  { from: 's_channels_priority', to: 's_integration', kind: 'dataflow' },

  // === STRATEGY → CREATOR ===
  { from: 's_message', to: 'c_big_idea', kind: 'dataflow', label: 'сообщение → Big Idea' },
  { from: 's_signal', to: 'c_big_idea', kind: 'synergy' },
  { from: 's_insight', to: 'c_big_idea', kind: 'dataflow' },
  { from: 'b_change_type', to: 'c_activations', kind: 'dataflow', label: 'тип изменения → тип активации' },
  { from: 'b_change_type', to: 'c_activations', kind: 'content', label: 'Проба⇒sampling · Частота⇒ритуал · Рекомендация⇒UGC/реферал · Знание⇒стант', added: true },
  { from: 's_strategy_type', to: 'c_non_ad', kind: 'dataflow', label: 'имидж-стратегия часто рождает нерекламные идеи' },
  { from: 's_channels_priority', to: 'e_carriers', kind: 'dataflow', label: 'каналы → носители' },
  { from: 's_tov', to: 'e_copy', kind: 'dataflow', label: 'тональность → тексты' },
  { from: 's_message', to: 'e_copy', kind: 'dataflow' },
  { from: 's_persuasion', to: 'e_copy', kind: 'synergy', label: 'Чалдини живёт в формулировках' },

  // === CREATOR internal ===
  { from: 'c_big_idea', to: 'e_carriers', kind: 'dataflow' },
  { from: 'c_big_idea', to: 'e_scenarios', kind: 'dataflow' },
  { from: 'c_big_idea', to: 'e_design', kind: 'synergy' },
  { from: 'c_activations', to: 'e_mechanics', kind: 'dataflow' },
  { from: 'c_activations', to: 'e_scenarios', kind: 'dataflow' },
  { from: 'c_non_ad', to: 'e_carriers', kind: 'dataflow' },
  { from: 'e_carriers', to: 'e_materials', kind: 'dataflow' },
  { from: 'e_design', to: 'e_materials', kind: 'dataflow' },
  { from: 'e_copy', to: 'e_scenarios', kind: 'synergy' },
  { from: 'b_brand_assets', to: 'e_design', kind: 'synergy', label: 'визуал должен попадать в бренд-активы' },

  // === CREATOR → PRODUCER ===
  { from: 'b_change_type', to: 'p_priority', kind: 'dataflow', label: 'тип изменения → приоритет охвата' },
  { from: 'b_change_type', to: 'p_priority', kind: 'content', label: 'Знание⇒Reach · Рассмотрение⇒Relevance · Частота⇒Residence · Проба⇒Request', added: true },
  { from: 'e_materials', to: 'p_cost', kind: 'dataflow' },
  { from: 'e_carriers', to: 'p_calendar', kind: 'dataflow' },
  { from: 's_channels_priority', to: 'p_calendar', kind: 'dataflow' },
  { from: 's_integration', to: 'p_flights', kind: 'dataflow' },
  { from: 'b_goals', to: 'p_timing', kind: 'dataflow', label: 'срок цели → тайминг' },
  { from: 'b_change_type', to: 'p_budget_kpi', kind: 'dataflow', label: 'тип изменения → KPI' },
  { from: 'b_change_type', to: 'p_budget_kpi', kind: 'content', label: 'Знание⇒Reach/Impr · Проба⇒Trial · Частота⇒Re-purchase · Рекомендация⇒Engagement', added: true },
  { from: 'p_priority', to: 'p_flights', kind: 'dataflow' },
  { from: 'p_flights', to: 'p_calendar', kind: 'dataflow' },
  { from: 'p_calendar', to: 'p_timing', kind: 'dataflow' },
  { from: 'p_calendar', to: 'p_cost', kind: 'dataflow' },
  { from: 'p_cost', to: 'p_budget_kpi', kind: 'synergy' },

  // === PRODUCER → PRESENTER ===
  { from: 'b_goals', to: 'pr_tender', kind: 'dataflow', label: 'бизнес-цель = критерий тендера' },
  { from: 'p_budget_kpi', to: 'pr_tender', kind: 'synergy' },
  { from: 'c_big_idea', to: 'pr_format', kind: 'dataflow', label: 'Big Idea = ось нарратива' },
  { from: 's_insight', to: 'pr_format', kind: 'dataflow', label: 'инсайт = ось драматургии' },
  { from: 'e_design', to: 'pr_visuals', kind: 'dataflow' },
  { from: 'e_carriers', to: 'pr_simulation', kind: 'dataflow' },
  { from: 'e_scenarios', to: 'pr_simulation', kind: 'dataflow' },
  { from: 'pr_format', to: 'pr_interactive', kind: 'dataflow' },
  { from: 'pr_visuals', to: 'pr_interactive', kind: 'dataflow' },
  { from: 'pr_interactive', to: 'pr_packaging', kind: 'dataflow' },

  // === SYNERGIES (cross-stage, double-check) ===
  { from: 'b_brand_assets', to: 's_tov', kind: 'synergy', label: 'TOV должен совпадать' },
  { from: 'b_brand_assets', to: 'e_copy', kind: 'synergy' },
  { from: 's_tov', to: 'e_copy', kind: 'synergy', label: 'тональность × тексты × бренд-голос' },
  { from: 's_signal', to: 'p_budget_kpi', kind: 'synergy', label: 'KPI должен мерить выбранный сигнал', added: true },
  { from: 's_insight', to: 'pr_tender', kind: 'synergy', label: 'инсайт = главный аргумент тендера', added: true },
  { from: 'b_competitors', to: 's_signal', kind: 'content', label: 'если конкурент бьёт SHIELD — мы можем взять SNACK или SEED', added: true },
  { from: 'b_position', to: 's_strategy_type', kind: 'content', label: 'позиция в матрице → имидж/выгода/активация', added: true },
]

// ============================================================================
// ROUTES — пресет-пути
// ============================================================================
export type RouteId = 'all' | 'launch' | 'attack' | 'frequency' | 'trust' | 'premium'

export interface RouteMeta {
  id: RouteId
  name: string
  /** null = все узлы (полный процесс) */
  nodes: string[] | null
}

export const ROUTES: RouteMeta[] = [
  { id: 'all', name: 'Полный процесс', nodes: null },
  { id: 'launch', name: 'Лонч нового продукта', nodes: ['b_what_is', 'b_market_type', 'b_goals', 'b_audience', 'b_change_type', 's_barrier', 's_psyche', 's_strategy_type', 's_signal', 's_message', 's_channels_priority', 'c_big_idea', 'c_activations', 'e_carriers', 'e_copy', 'p_priority', 'p_flights', 'p_calendar', 'p_budget_kpi', 'pr_format', 'pr_simulation'] },
  { id: 'attack', name: 'Атака на конкурента', nodes: ['b_competitors', 'b_position', 'b_goals', 'b_change_type', 's_barrier', 's_gap', 's_insight', 's_strategy_type', 's_signal', 's_message', 's_persuasion', 's_channels_priority', 'c_big_idea', 'e_copy', 'p_priority', 'p_flights', 'p_budget_kpi', 'pr_tender'] },
  { id: 'frequency', name: 'Рост частоты у лояльных', nodes: ['b_audience', 'b_change_type', 'b_brand_assets', 's_psyche', 's_gap', 's_mode', 's_signal', 's_message', 's_tov', 'c_activations', 'e_mechanics', 'e_scenarios', 'p_priority', 'p_flights', 'p_calendar', 'p_budget_kpi'] },
  { id: 'trust', name: 'Завоевать доверие новых', nodes: ['b_market_type', 'b_audience', 'b_change_type', 's_barrier', 's_gap', 's_insight', 's_psyche', 's_mode', 's_signal', 's_persuasion', 's_message', 's_rtb', 's_channels_priority', 'c_big_idea', 'e_copy', 'p_priority', 'p_budget_kpi'] },
  { id: 'premium', name: 'Премиализация / рост цены', nodes: ['b_market_type', 'b_brand_assets', 'b_position', 'b_change_type', 's_psyche', 's_strategy_type', 's_signal', 's_tov', 's_message', 's_rtb', 'c_big_idea', 'c_non_ad', 'e_design', 'e_copy', 'p_priority', 'p_budget_kpi', 'pr_visuals'] },
]

// === helpers ===
export const LINK_KIND_LABEL: Record<LinkKind, string> = {
  dataflow: 'поток данных',
  content: 'связь по содержанию',
  synergy: 'синергия',
}

export const nodeById = (id: string): ProcessNode | undefined =>
  NODES.find((n) => n.id === id)

/** порядок этапов для вертикальной раскладки */
export const STAGE_ORDER: StageId[] = STAGES.map((s) => s.id)

/** количество связей (вход+выход) у каждого узла */
export const DEGREE: Record<string, number> = (() => {
  const d: Record<string, number> = {}
  for (const l of LINKS) {
    d[l.from] = (d[l.from] || 0) + 1
    d[l.to] = (d[l.to] || 0) + 1
  }
  return d
})()

/** есть ли у узла «висящая» опция (требует методики) */
export const hasHangingOption = (n: ProcessNode): boolean =>
  n.options.some((o) => o.startsWith('🚩'))

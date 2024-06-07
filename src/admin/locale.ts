export default {
  properties: {
    createdAt: 'Дата создания',
    updatedAt: 'Дата обновления',
    'isActive.true': 'Да',
    'isActive.false': 'Нет',
    'enabled.true': 'Да',
    'enabled.false': 'Нет',
    firstName: 'Имя',
    name: 'Имя',
    lastName: 'Фамилия',
    length: 'Длина',
    from: 'От',
    to: 'До',
    true: 'Да',
    false: 'Нет',
    select: 'Выбрать',
    title: 'Название',
    type: 'Тип',
    content: 'Содержание',
    img: 'Фото',
    price: 'Цена',
    upload: 'Перетащите файл',
    description: 'Описание',
    describe: 'Описание',
    devMode: "Режим разработки",
    isComplete: "Завершено",
    login: "Логин",
    password: "Пароль",
    role: "Роль",
    image: "Изображение",
    position: "Позиция",
    isShow: "Доступен",
    amount: "Количество",
    endAt: "Заканчивается",
    comment: "Комментарий",
    lastname: "Фамилия",
    birthday: "День рождения",
    companyName: "Название компании",
    developers: "Разработчики",
    developer: "Разработчик",
    workplan: "План работ",
    status: "Статус",
    category: "Категория",
    categories: "Категории",
    customer: "Клиент",
    services: "Услуги",
    isPrepay: "Предоплата",
    stage: "Этап проекта",
    orderCount: "Кол-во заказов",
    order: "Заказ",
    sum: "Сумма",
  },
  labels: {
    navigation: 'Навигация',
    pages: 'Страницы',
    selectedRecords: 'Выбрано ({{selected}})',
    filters: 'Фильтры',
    adminVersion: 'Сборка: {{version}}',
    appVersion: 'Версия: {{version}}',
    dashboard: 'Управление',
    User: 'Пользователи',
    Message: "Сообщения",
    Administrator: "Администраторы",
    Category: "Категории",
    Customer: "Клиенты",
    Developer: "Разработчики",
    Document: "Документы",
    Expense: "Расходы",
    Income: "Доходы",
    Order: "Заказы",
    Service: "Услуги",
    Stage: "Этапы проектов"
  },
  resources: {
    Incident: {
      properties: {
        createdAt: "День"
      }
    },
    Order: {
      properties: {
        name: "Название"
      }
    }
  },
  actions: {
    new: 'Создать',
    edit: 'Изменить',
    show: 'Показать',
    delete: 'Удалить',
    bulkDelete: 'Удалить выбранное',
    list: 'Записей',
  },
  buttons: {
    save: 'Сохранить',
    addNewItem: 'Добавить новую запись',
    filter: 'Фильтр',
    applyChanges: 'Применить изменения',
    resetFilter: 'Сбросить',
    confirmRemovalMany: 'Подтвердить удаление {{count}} записи',
    confirmRemovalMany_plural: 'Подтвердить удаление {{count}} записей',
    logout: 'Выйти',
    login: 'Войти',
    seeTheDocumentation: 'Просмотр: <1>документации</1>',
    createFirstRecord: 'Создать первую запись',
    cancel: 'Отменить',
    confirm: 'Подтвердить',
    contactUs: 'Поддержка',
  },
  components: {
    DropZone: {
      placeholder: 'Перетащите файл сюда, или кликните для выбора',
      acceptedSize: 'Макс. размер: {{maxSize}}',
      acceptedType: 'Мин. размер: {{mimeTypes}}',
      unsupportedSize: 'Файл {{fileName}} слишком большой',
      unsupportedType:
        'Файл {{fileName}} имеет неподдерживаемый тип: {{fileType}}',
    },
    LanguageSelector: {
      availableLanguages: {
        en: 'English',
        ru: 'Русский',
      },
    },
    Login: {
      welcomeHeader: 'Приветствую',
      welcomeMessage:
        'вас в нашей системе учета, войдите в свой аккаунт, чтобы приступить к работе.',
      properties: {
        email: 'Логин',
        password: 'Пароль',
      },
      loginButton: 'Выполнить вход',
    },
  },
  messages: {
    successfullyBulkDeleted: 'Успешно удалена {{count}} запись',
    successfullyBulkDeleted_plural: 'Успешно удалены {{count}} записи',
    successfullyDeleted: 'Успешно удалена данная запись',
    successfullyUpdated: 'Успешно обновлена данная запись',
    thereWereValidationErrors: 'Есть ошибки валидации - проверьте их ниже',
    forbiddenError:
      'Вы не можете выполнить действие {{actionName}} над {{resourceId}}',
    anyForbiddenError: 'Вы не можете выполнить данное действие',
    successfullyCreated: 'Успешно создана новая запись',
    bulkDeleteError:
      'Произошла ошибка при удалении записей. Подробности смотрите в консоли',
    errorFetchingRecords:
      'Произошла ошибка при получении записей. Подробности смотрите в консоли',
    errorFetchingRecord:
      'Произошла ошибка при получении записи. Подробности смотрите в консоли',
    noRecordsSelected: 'Вы не выбрали ни одной записи',
    theseRecordsWillBeRemoved: 'Следующая запись будет удалена',
    theseRecordsWillBeRemoved_plural: 'Следующие записи будут удалены',
    pickSomeFirstToRemove: 'Чтобы удалить записи, сначала выберите их',
    error404Resource:
      'Ресурс с данным идентификатором: {{resourceId}} не найден',
    error404Action:
      'Ресурс с данным идентификатором: {{resourceId}} не имеет действия с именем: {{actionName}} или у вас нет прав на его использование!',
    error404Record:
      'Ресурс с данным идентификатором: {{resourceId}} не имеет записи с идентификатором: {{recordId}} или у вас нет прав на её использование!',
    seeConsoleForMore:
      'Смотрите консоль для получения дополнительной информации...',
    noActionComponent:
      'Вы должны реализовать компонент действия для вашего Действия',
    noRecordsInResource: 'В этом ресурсе нет записей',
    noRecords: 'Нет записей',
    confirmDelete: 'Вы действительно хотите удалить этот элемент?',
    welcomeOnBoard_title: 'Добро пожаловать на борт!',
    welcomeOnBoard_subtitle:
      'Теперь вы один из нас! Мы подготовили для вас несколько советов для начала:',
    addingResources_title: 'Управление разработчиками',
    addingResources_subtitle:
      'Добавляйте новых разработчиков, занимающихся проектами, с возможностью изменения и удаления старых',
    customizeResources_title: 'Просмотр заказов',
    customizeResources_subtitle:
      'Заказы клиентов, их статус, время оформления и изменения',
    customizeActions_title: 'Настройка действий',
    customizeActions_subtitle:
      'Изменение существующих действий и добавление новых',
    writeOwnComponents_title: 'Создание компонентов',
    writeOwnComponents_subtitle:
      'Как изменить внешний вид и ощущение от AdminJS',
    customDashboard_title: 'Пользовательская панель управления',
    customDashboard_subtitle:
      'Как изменить этот вид и добавить новые страницы в боковую панель',
    roleBasedAccess_title: 'Управление доступом на основе ролей',
    roleBasedAccess_subtitle:
      'Создание пользовательских ролей и разрешений в панели администрирования',
    community_title: 'Присоединяйтесь к сообществу в Slack',
    community_subtitle:
      'Общайтесь с создателями AdminJS и другими пользователями AdminJS',
    foundBug_title: 'Нашли ошибку? Нужно улучшение?',
    foundBug_subtitle: 'Напишите разработчику в Telegram',
    needMoreSolutions_title: 'Нужны более продвинутые решения?',
    needMoreSolutions_subtitle:
      'Мы готовы предоставить вам красивый UX/UI дизайн и программное обеспечение на заказ (не только) на основе лучших технологий',
    invalidCredentials: 'Неверный адрес электронной почты и/или пароль',
    keyPlaceholder: 'КЛЮЧ',
    valuePlaceholder: 'ЗНАЧЕНИЕ',
    initialKey: 'Ключ-{{number}}',
    keyInUse: 'Ключи объектов должны быть уникальны',
    keyValuePropertyDefaultDescription:
      'Все значения хранятся в виде текста. Ключи должны быть уникальны, дублирующиеся ключи не будут сохранены.',
    keyValuePropertyWithLocalesDescription:
      "Укажите напротив каждой локали соответствующий перевод",
    pageNotFound_title: 'Страница не найдена',
    pageNotFound_subtitle:
      'Страница <strong>"{{pageName}}"</strong> не существует',
    componentNotFound_title: 'Не указан компонент',
    componentNotFound_subtitle:
      'Вы должны указать компонент, который будет отображать этот элемент',
  },
};

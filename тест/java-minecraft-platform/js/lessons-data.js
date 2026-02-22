// ============================================
// Данные уроков — Java Minecraft Platform
// Расширенная программа: 50+ уроков
// ============================================

export const LessonsData = {
    // ==================== MODULE 1: JAVA BASICS (1-10) ====================
    1: {
        id: 1,
        title: 'Переменные и типы данных',
        description: 'Изучи основы Java: переменные, примитивные типы и строки',
        xp: 15,
        skill: 'basics',
        theory: `
            <h4>📦 Что такое переменная?</h4>
            <p><strong>Переменная</strong> — это именованная область памяти для хранения значения. Представь её как коробку с подписью, внутри которой лежит что-то ценное.</p>
            
            <div class="info-box">
                <p>💡 <strong>Аналогия:</strong> Переменная — как ячейка в Minecraft с табличкой. На табличке написано имя (например, "Дерево"), а внутри лежит предмет (значение).</p>
            </div>
            
            <h4>🔧 Объявление переменной</h4>
            <p>В Java 21 можно использовать два способа:</p>
            
            <pre class="code-example"><code>// Способ 1: Явное указание типа (классический)
int age = 16;
String name = "Steve";
double health = 20.0;
boolean isAlive = true;

// Способ 2: Ключевое слово var (Java 10+)
var level = 30;           // компилятор сам поймёт, что это int
var speed = 0.5;          // это будет double
var playerName = "Alex";  // это будет String</code></pre>
            
            <h4>📊 Примитивные типы данных</h4>
            <p>В Java есть 8 примитивных типов. Вот основные:</p>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Тип</th>
                        <th>Описание</th>
                        <th>Пример</th>
                        <th>Размер</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>int</code></td>
                        <td>Целые числа</td>
                        <td><code>42, -10, 0</code></td>
                        <td>32 бита</td>
                    </tr>
                    <tr>
                        <td><code>double</code></td>
                        <td>Дробные числа</td>
                        <td><code>3.14, -0.5, 2.0</code></td>
                        <td>64 бита</td>
                    </tr>
                    <tr>
                        <td><code>boolean</code></td>
                        <td>Логический тип</td>
                        <td><code>true, false</code></td>
                        <td>1 бит</td>
                    </tr>
                    <tr>
                        <td><code>char</code></td>
                        <td>Один символ</td>
                        <td><code>'A', '5', '§'</code></td>
                        <td>16 бит</td>
                    </tr>
                </tbody>
            </table>
            
            <h4>💬 Тип String (строки)</h4>
            <p><code>String</code> — это не примитивный тип, а класс, но используется он очень часто:</p>
            
            <pre class="code-example"><code>String playerName = "Notch";
String greeting = "Привет, мир!";
var serverIp = "127.0.0.1";  // тоже String</code></pre>
            
            <h4>⚡ Именование переменных</h4>
            <p>В Java приняты следующие правила:</p>
            <ul>
                <li>Имя должно начинаться с буквы, <code>$</code> или <code>_</code></li>
                <li>Нельзя начинать с цифры</li>
                <li>Используй <strong>camelCase</strong>: <code>playerHealth</code>, <code>maxItemCount</code></li>
                <li>Имена чувствительны к регистру: <code>health</code> ≠ <code>Health</code></li>
            </ul>
            
            <div class="info-box warning">
                <p>⚠️ <strong>Важно:</strong> В Java принято давать переменным осмысленные имена. <code>int x = 5;</code> — плохо, <code>int playerCount = 5;</code> — хорошо.</p>
            </div>
            
            <h4>🎯 Пример из мира Minecraft</h4>
            <pre class="code-example"><code>// Характеристики игрока
var playerName = "Steve";
var playerHealth = 20.0;      // полных сердец
var playerLevel = 30;
var isFlying = false;
var hungerLevel = 18;

// Характеристики предмета
var itemName = "Diamond Sword";
var itemDamage = 7.0;
var itemDurability = 1561;  // прочность алмазного меча</code></pre>
            
            <h4>✅ Итог</h4>
            <p>Ты изучил основы переменных в Java. Теперь ты можешь:</p>
            <ul>
                <li>Объявлять переменные с явным типом и через <code>var</code></li>
                <li>Использовать основные типы: <code>int</code>, <code>double</code>, <code>boolean</code>, <code>char</code>, <code>String</code></li>
                <li>Давать переменным понятные имена</li>
            </ul>
        `,
        codeExample: `var playerName = "Steve";
var playerHealth = 20.0;
var playerLevel = 30;
var isFlying = false;`,
        starterCode: `// TODO: Объяви переменную playerName со значением "Steve"

// TODO: Объяви переменную playerHealth со значением 20.0

// TODO: Объяви переменную playerLevel со значением 30

// TODO: Объяви переменную isFlying со значением false
`,
        task: `<h4>📝 Твоё задание</h4>
<div class="task-requirements">
    <ol>
        <li>Создай <code>playerName = "Steve"</code></li>
        <li>Создай <code>playerHealth = 20.0</code></li>
        <li>Создай <code>playerLevel = 30</code></li>
        <li>Создай <code>isFlying = false</code></li>
    </ol>
</div>`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['playerName', 'playerHealth', 'playerLevel', 'isFlying'],
            forbiddenStrings: []
        }
    },
    
    2: {
        id: 2,
        title: 'Операторы и выражения',
        description: 'Арифметические, сравнения и логические операторы',
        xp: 20,
        skill: 'basics',
        theory: `
            <h4>📦 Что такое операторы?</h4>
            <p><strong>Операторы</strong> — это символы, которые выполняют действия над значениями. Представь их как инструменты в инвентаре Minecraft: каждый инструмент делает что-то своё.</p>
            
            <div class="info-box">
                <p>💡 <strong>Аналогия:</strong> Операторы — как верстаки в Minecraft. Положил доски (операнды) → получил палки (результат). <code>2 + 3 = 5</code>: положил 2 и 3, получил 5.</p>
            </div>
            
            <h4>🔧 Арифметические операторы</h4>
            <p>Используются для математических вычислений:</p>
            
            <table class="data-table">
                <thead>
                    <tr><th>Оператор</th><th>Описание</th><th>Пример</th><th>Результат</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>+</code></td><td>Сложение</td><td><code>10 + 5</code></td><td><code>15</code></td></tr>
                    <tr><td><code>-</code></td><td>Вычитание</td><td><code>10 - 5</code></td><td><code>5</code></td></tr>
                    <tr><td><code>*</code></td><td>Умножение</td><td><code>10 * 5</code></td><td><code>50</code></td></tr>
                    <tr><td><code>/</code></td><td>Деление</td><td><code>10 / 5</code></td><td><code>2</code></td></tr>
                    <tr><td><code>%</code></td><td>Остаток</td><td><code>10 % 3</code></td><td><code>1</code></td></tr>
                </tbody>
            </table>
            
            <pre class="code-example"><code>// Пример из Minecraft
int diamondBlocks = 64;
int chests = 5;
int diamondsPerChest = diamondBlocks / chests;  // 12 алмазов в сундук
int remaining = diamondBlocks % chests;  // 4 алмаза останется</code></pre>
            
            <h4>⚡ Операторы сравнения</h4>
            <p>Сравнивают два значения и возвращают <code>true</code> или <code>false</code>:</p>
            
            <table class="data-table">
                <thead>
                    <tr><th>Оператор</th><th>Описание</th><th>Пример</th><th>Результат</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>==</code></td><td>Равно</td><td><code>10 == 10</code></td><td><code>true</code></td></tr>
                    <tr><td><code>!=</code></td><td>Не равно</td><td><code>10 != 5</code></td><td><code>true</code></td></tr>
                    <tr><td><code>&gt;</code></td><td>Больше</td><td><code>10 &gt; 5</code></td><td><code>true</code></td></tr>
                    <tr><td><code>&lt;</code></td><td>Меньше</td><td><code>5 &lt; 10</code></td><td><code>true</code></td></tr>
                    <tr><td><code>&gt;=</code></td><td>Больше или равно</td><td><code>10 &gt;= 10</code></td><td><code>true</code></td></tr>
                    <tr><td><code>&lt;=</code></td><td>Меньше или равно</td><td><code>5 &lt;= 10</code></td><td><code>true</code></td></tr>
                </tbody>
            </table>
            
            <pre class="code-example"><code>// Проверка здоровья игрока
double playerHealth = 15.0;
boolean isAlive = playerHealth > 0;  // true
boolean needsHealing = playerHealth < 10.0;  // false</code></pre>
            
            <h4>🎯 Логические операторы</h4>
            <p>Комбинируют несколько условий:</p>
            
            <pre class="code-example"><code>// И (&&) — ОБА условия должны быть true
boolean hasPermission = true;
boolean isOnline = true;
boolean canExecute = hasPermission && isOnline;  // true

// ИЛИ (||) — ХОТЯ БЫ ОДНО условие true
boolean hasSword = false;
boolean hasBow = true;
boolean canFight = hasSword || hasBow;  // true

// НЕ (!) — ИНВЕРТИРУЕТ значение
boolean isBanned = false;
boolean canJoin = !isBanned;  // true</code></pre>
            
            <div class="info-box warning">
                <p>⚠️ <strong>Важно:</strong> <code>&&</code> требует чтобы ОБА условия были true. <code>||</code> требует чтобы ХОТЯ БЫ ОДНО было true.</p>
            </div>
            
            <h4>✅ Итог</h4>
            <p>Ты изучил все основные операторы Java:</p>
            <ul>
                <li>Арифметические: <code>+ - * / %</code></li>
                <li>Сравнения: <code>== != &gt; &lt; &gt;= &lt;=</code></li>
                <li>Логические: <code>&& || !</code></li>
            </ul>
        `,
        codeExample: `var damage = 10;
var armor = 3;
var finalDamage = damage - armor;  // 7

var health = 20.0;
var isAlive = health > 0;  // true`,
        starterCode: `// TODO: Создай переменную damage = 10

// TODO: Создай переменную armor = 3

// TODO: Создай переменную finalDamage = damage - armor

// TODO: Создай переменную health = 15.0

// TODO: Создай переменную isAlive = health > 0
`,
        task: `<h4>📝 Твоё задание</h4>
<div class="task-requirements">
    <ol>
        <li>Создай <code>damage = 10</code></li>
        <li>Создай <code>armor = 3</code></li>
        <li>Создай <code>finalDamage = damage - armor</code></li>
        <li>Создай <code>health = 15.0</code></li>
        <li>Создай <code>isAlive = health > 0</code></li>
    </ol>
</div>`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['damage', 'armor', 'finalDamage', 'health', 'isAlive'],
            forbiddenStrings: []
        }
    },
    
    3: {
        id: 3,
        title: 'Условные конструкции (if/else)',
        description: 'Принимай решения в коде с помощью if/else',
        xp: 25,
        skill: 'basics',
        theory: `
            <h4>📦 Что такое условные конструкции?</h4>
            <p><strong>if/else</strong> позволяют выполнять разный код в зависимости от условий. Это как развилка в игре: если здоровье > 0 — играем дальше, иначе — Game Over.</p>
            
            <div class="info-box">
                <p>💡 <strong>Аналогия:</strong> Представь дверь с замком. <strong>ЕСЛИ</strong> у тебя есть ключ — дверь открывается. <strong>ИНАЧЕ</strong> — остаёшься снаружи. Код работает так же!</p>
            </div>
            
            <h4>🔧 Простой if</h4>
            <p>Выполняет код, только если условие истинно:</p>
            
            <pre class="code-example"><code>var playerHealth = 15.0;

if (playerHealth > 0) {
    System.out.println("Игрок жив!");
}

if (playerHealth <= 0) {
    System.out.println("Игрок погиб!");
}</code></pre>
            
            <h4>⚡ if/else</h4>
            <p>Выбор из двух вариантов — выполняется ТОЛЬКО один блок:</p>
            
            <pre class="code-example"><code>var playerHealth = 5.0;

if (playerHealth > 10) {
    System.out.println("Здоровье в порядке");
} else {
    System.out.println("Нужно полечиться!");
}
// Выведет: "Нужно полечиться!"</code></pre>
            
            <div class="info-box warning">
                <p>⚠️ <strong>Важно:</strong> Условие проверяется сверху вниз. Как только найдено истинное условие — выполняется его блок и проверка прекращается.</p>
            </div>
            
            <h4>🎯 if/else if/else</h4>
            <p>Множественный выбор — как лестница условий:</p>
            
            <pre class="code-example"><code>var hunger = 12;

if (hunger >= 18) {
    System.out.println("Сыт");
} else if (hunger >= 10) {
    System.out.println("Голоден");
} else if (hunger >= 4) {
    System.out.println("Очень голоден");
} else {
    System.out.println("Умирает от голода!");
}
// Выведет: "Голоден"</code></pre>
            
            <h4>💡 Тернарный оператор</h4>
            <p>Короткая запись if/else для простых случаев:</p>
            
            <pre class="code-example"><code>// Длинная версия
String status;
if (health > 10) {
    status = "Здоров";
} else {
    status = "Ранен";
}

// Короткая версия (тернарный оператор)
String status = health > 10 ? "Здоров" : "Ранен";</code></pre>
            
            <h4>✅ Итог</h4>
            <p>Ты научился использовать условные конструкции:</p>
            <ul>
                <li><code>if</code> — выполнить если условие истинно</li>
                <li><code>if/else</code> — выбрать из двух вариантов</li>
                <li><code>if/else if/else</code> — множественный выбор</li>
                <li><code>условие ? да : нет</code> — тернарный оператор</li>
            </ul>
        `,
        codeExample: `if (playerHealth > 10) {
    System.out.println("Здоров");
} else if (playerHealth > 0) {
    System.out.println("Нужно лечиться");
} else {
    System.out.println("Мёртв");
}`,
        starterCode: `var playerHealth = 5.0;

// TODO: Напиши if/else конструкцию:
// Если health > 10 → выведи "Здоров"
// Если health > 0 → выведи "Нужно лечиться"  
// Иначе → выведи "Мёртв"

`,
        task: `<h4>📝 Твоё задание</h4>
<div class="task-requirements">
    <ol>
        <li>Проверь <code>health > 10</code> → "Здоров"</li>
        <li>Проверь <code>health > 0</code> → "Нужно лечиться"</li>
        <li>Иначе → "Мёртв"</li>
    </ol>
</div>`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['if', 'else', 'System.out.println'],
            forbiddenStrings: []
        }
    },
    
    4: {
        id: 4,
        title: 'Цикл for',
        description: 'Повторяй действия заданное количество раз',
        xp: 25,
        skill: 'basics',
        theory: `
            <h4>📦 Что такое циклы?</h4>
            <p><strong>Циклы</strong> позволяют выполнять один и тот же код много раз. Это как автоматическая ферма в Minecraft: один раз построил — работает много раз.</p>
            
            <div class="info-box">
                <p>💡 <strong>Аналогия:</strong> Представь что тебе нужно выдать 10 алмазов игроку. Без цикла: 10 строк кода. С циклом: 3 строки. Цикл — это конвейер который делает одно и то же действие много раз.</p>
            </div>
            
            <h4>🔧 Цикл for</h4>
            <p>Используется когда известно количество повторений:</p>
            
            <pre class="code-example"><code>// Выдать 5 алмазов
for (int i = 0; i < 5; i++) {
    player.addItem(DIAMOND, 1);
    System.out.println("Выдан алмаз #" + (i + 1));
}

// Разобрать по частям:
// int i = 0     — начать с 0
// i < 5         — продолжать пока меньше 5
// i++           — увеличивать i на 1 после каждой итерации</code></pre>
            
            <h4>⚡ Компоненты цикла for</h4>
            <table class="data-table">
                <thead>
                    <tr><th>Часть</th><th>Описание</th><th>Пример</th></tr>
                </thead>
                <tbody>
                    <tr><td>Инициализация</td><td>Запускается один раз в начале</td><td><code>int i = 0</code></td></tr>
                    <tr><td>Условие</td><td>Проверяется перед каждой итерацией</td><td><code>i < 5</code></td></tr>
                    <tr><td>Инкремент</td><td>Выполняется после каждой итерации</td><td><code>i++</code></td></tr>
                </tbody>
            </table>
            
            <pre class="code-example"><code>// Примеры из Minecraft

// Счётчик игроков
for (int i = 0; i < 10; i++) {
    System.out.println("Игрок #" + i);
}

// Обратный отсчёт
for (int i = 10; i > 0; i--) {
    System.out.println("До старта: " + i);
}

// Шаг 2 (каждый второй)
for (int i = 0; i < 20; i += 2) {
    System.out.println("Чётное: " + i);
}</code></pre>
            
            <h4>🎯 Улучшенный for (for-each)</h4>
            <p>Для перебора коллекций и массивов:</p>
            
            <pre class="code-example"><code>String[] players = {"Steve", "Alex", "Notch"};

// Обычный for
for (int i = 0; i < players.length; i++) {
    System.out.println(players[i]);
}

// Улучшенный for (проще!)
for (String player : players) {
    System.out.println(player);
}</code></pre>
            
            <div class="info-box warning">
                <p>⚠️ <strong>Важно:</strong> Не забудь условие выхода из цикла! <code>for (int i = 0; i >= 0; i++)</code> — бесконечный цикл, программа зависнет.</p>
            </div>
            
            <h4>✅ Итог</h4>
            <p>Ты научился использовать циклы:</p>
            <ul>
                <li><code>for (int i = 0; i < n; i++)</code> — классический цикл</li>
                <li><code>for (Type item : collection)</code> — для массивов</li>
                <li><code>i--</code> — обратный отсчёт</li>
                <li><code>i += 2</code> — шаг 2</li>
            </ul>
        `,
        codeExample: `// Вывести числа от 1 до 10
for (int i = 1; i <= 10; i++) {
    System.out.println("Число: " + i);
}`,
        starterCode: `// TODO: Напиши цикл for, который выведет числа от 1 до 10

// Подсказка: for (int i = 1; i <= 10; i++) { ... }

`,
        task: `<h4>📝 Твоё задание</h4>
<div class="task-requirements">
    <ol>
        <li>Создай цикл <code>for</code> от 1 до 10</li>
        <li>Выведи каждое число через <code>System.out.println</code></li>
    </ol>
</div>`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['for', 'int i', 'System.out.println'],
            forbiddenStrings: []
        }
    },
    
    5: {
        id: 5,
        title: 'Цикл while',
        description: 'Повторяй действия пока условие истинно',
        xp: 25,
        skill: 'basics',
        theory: `
            <h4>📦 Что такое цикл while?</h4>
            <p><strong>while</strong> выполняет код пока условие истинно. В отличие от for, здесь не нужно знать количество повторений заранее.</p>
            
            <div class="info-box">
                <p>💡 <strong>Аналогия:</strong> Представь что ты ешь суп. <strong>ПОКА</strong> в тарелке есть суп — продолжаешь есть. Когда суп кончился — останавливаешься. while работает так же!</p>
            </div>
            
            <h4>🔧 Синтаксис while</h4>
            <pre class="code-example"><code>// Пока здоровье меньше максимума
while (health < 20.0) {
    health += 1.0;
    System.out.println("Лечение: " + health);
}

// Разобрать по частям:
// while (условие) { код }
// Если условие true — выполняем код и проверяем снова
// Если false — выходим из цикла</code></pre>
            
            <h4>⚡ while vs for</h4>
            <table class="data-table">
                <thead>
                    <tr><th>Цикл</th><th>Когда использовать</th><th>Пример</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>for</code></td><td>Знаешь количество повторений</td><td>Выдать 10 алмазов</td></tr>
                    <tr><td><code>while</code></td><td>Не знаешь количество</td><td>Ждать пока игрок подключится</td></tr>
                </tbody>
            </table>
            
            <pre class="code-example"><code>// Примеры из Minecraft

// Ждать пока игрок не подключится
while (!player.isOnline()) {
    System.out.println("Ждём игрока...");
    Thread.sleep(1000);
}

// Бесконечный цикл (опасно!)
while (true) {
    // Выполняется вечно, пока не будет break
    System.out.println("Работает...");
}

// Выход из цикла по условию
int attempts = 0;
while (true) {
    if (attempts >= 3) break;
    attempts++;
}</code></pre>
            
            <h4>🎯 Операторы break и continue</h4>
            <pre class="code-example"><code>// break — прерывает цикл
for (int i = 0; i < 10; i++) {
    if (i == 5) break;  // выходим из цикла
    System.out.println(i);  // выведет 0,1,2,3,4
}

// continue — пропускает текущую итерацию
for (int i = 0; i < 5; i++) {
    if (i == 2) continue;  // пропускаем 2
    System.out.println(i);  // выведет 0,1,3,4
}</code></pre>
            
            <div class="info-box warning">
                <p>⚠️ <strong>Важно:</strong> Бесконечный цикл <code>while (true)</code> без <code>break</code> заморозит программу! Всегда предусматривай условие выхода.</p>
            </div>
            
            <h4>✅ Итог</h4>
            <p>Ты научился использовать циклы:</p>
            <ul>
                <li><code>while (условие)</code> — пока условие истинно</li>
                <li><code>break</code> — выйти из цикла</li>
                <li><code>continue</code> — пропустить итерацию</li>
                <li><code>while (true)</code> — бесконечный цикл</li>
            </ul>
        `,
        codeExample: `int count = 0;
while (count < 5) {
    System.out.println("Счёт: " + count);
    count++;
}`,
        starterCode: `// TODO: Выведи числа от 0 до 4 через while

int count = 0;
// while (count < 5) { ... }

`,
        task: `<h4>📝 Твоё задание</h4>
<div class="task-requirements">
    <ol>
        <li>Создай цикл <code>while</code> с условием <code>count < 5</code></li>
        <li>Выведи <code>count</code> через <code>System.out.println</code></li>
        <li>Увеличивай <code>count++</code> в конце цикла</li>
    </ol>
</div>`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['while', 'System.out.println'],
            forbiddenStrings: []
        }
    },

    6: {
        id: 6,
        title: 'Методы (функции)',
        description: 'Создавай переиспользуемый код с помощью методов',
        xp: 30,
        skill: 'basics',
        theory: `
            <h4>📦 Что такое метод?</h4>
            <p><strong>Метод</strong> — это именованный блок кода, который выполняет определённую задачу. Методы можно вызывать много раз из разных мест программы.</p>
            
            <div class="info-box">
                <p>💡 <strong>Аналогия:</strong> Метод — как команда в Minecraft. Ты пишешь <code>/give Steve diamond 1</code> и команда выполняет действие. Не нужно каждый раз писать весь код заново. Или как рецепт крафта: один раз выучил — используешь много раз.</p>
            </div>
            
            <h4>🔧 Структура метода</h4>
            <pre class="code-example"><code>// Модификатор + тип возврата + имя + параметры
public static int add(int a, int b) {
    return a + b;
}

// Вызов метода
var result = add(5, 3);  // result = 8</code></pre>
            
            <h4>⚡ Компоненты метода</h4>
            <table class="data-table">
                <thead>
                    <tr><th>Часть</th><th>Описание</th><th>Пример</th></tr>
                </thead>
                <tbody>
                    <tr><td><code>public</code></td><td>Кто может вызывать</td><td>public = все</td></tr>
                    <tr><td><code>static</code></td><td>Принадлежит классу</td><td>можно вызвать без объекта</td></tr>
                    <tr><td><code>int</code></td><td>Тип возвращаемого значения</td><td>что вернёт метод</td></tr>
                    <tr><td><code>add</code></td><td>Имя метода</td><td>как называем</td></tr>
                    <tr><td><code>int a, int b</code></td><td>Параметры</td><td>что передаём внутрь</td></tr>
                </tbody>
            </table>
            
            <h4>🎯 Методы без возврата (void)</h4>
            <p>Используют ключевое слово <code>void</code> — ничего не возвращают:</p>
            
            <pre class="code-example"><code>public static void greetPlayer(String name) {
    System.out.println("Привет, " + name + "!");
}

// Вызов
greetPlayer("Steve");  // выведет: Привет, Steve!
greetPlayer("Alex");   // выведет: Привет, Alex!</code></pre>
            
            <h4>💡 Возврат значения (return)</h4>
            <pre class="code-example"><code>// Метод возвращает результат
public static int multiply(int a, int b) {
    return a * b;  // возвращаем результат
}

// Использование
var result = multiply(6, 7);  // result = 42
System.out.println(multiply(3, 4));  // выведет 12</code></pre>
            
            <div class="info-box warning">
                <p>⚠️ <strong>Важно:</strong> Если метод объявлен с типом возврата (не void), он ОБЯЗАН вернуть значение через <code>return</code>.</p>
            </div>
            
            <h4>✅ Итог</h4>
            <p>Ты научился создавать методы:</p>
            <ul>
                <li><code>public static void name()</code> — без возврата</li>
                <li><code>public static int name()</code> — с возвратом числа</li>
                <li><code>return значение</code> — вернуть результат</li>
                <li>Параметры — передать данные в метод</li>
            </ul>
        `,
        codeExample: `public static void greet(String name) {
    System.out.println("Привет, " + name + "!");
}

// Вызов
greet("Steve");`,
        starterCode: `// TODO: Создай метод greet, который принимает имя (String name)
// и выводит "Привет, [имя]!"

// Подсказка: public static void greet(String name) { ... }

`,
        task: `<h4>📝 Твоё задание</h4>
<div class="task-requirements">
    <ol>
        <li>Создай метод <code>greet(String name)</code></li>
        <li>Выведи сообщение: <code>"Привет, " + name + "!"</code></li>
    </ol>
</div>`,
        validation: {
            requiredClasses: [],
            requiredMethods: ['greet'],
            requiredStrings: ['public static void', 'String name', 'System.out.println'],
            forbiddenStrings: []
        }
    },
    
    7: {
        id: 7,
        title: 'Массивы',
        description: 'Храни коллекции данных одного типа',
        xp: 25,
        skill: 'basics',
        theory: `
            <h4>🔧 Массивы</h4>
            <pre class="code-example"><code>int[] numbers = {1, 2, 3, 4, 5};
String[] names = new String[3];

for (int num : numbers) {
    System.out.println(num);
}</code></pre>
        `,
        codeExample: `String[] players = {"Steve", "Alex", "Notch"};
for (String player : players) {
    System.out.println(player);
}`,
        starterCode: `// TODO: Создай массив из 3 имён
// TODO: Выведи каждый элемент через цикл
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['String[]', 'for'],
            forbiddenStrings: []
        }
    },
    
    8: {
        id: 8,
        title: 'Классы и объекты',
        description: 'Основы объектно-ориентированного программирования',
        xp: 35,
        skill: 'basics',
        theory: `
            <h4>🔧 Классы</h4>
            <pre class="code-example"><code>public class Player {
    String name;
    int health;
    
    public void attack() {
        System.out.println(name + " атакует!");
    }
}

Player p = new Player();
p.name = "Steve";
p.attack();</code></pre>
        `,
        codeExample: `public class Player {
    String name;
    int health;
}`,
        starterCode: `// TODO: Создай класс Player с полями name и health
`,
        validation: {
            requiredClasses: ['Player'],
            requiredMethods: [],
            requiredStrings: ['String name', 'int health'],
            forbiddenStrings: []
        }
    },
    
    9: {
        id: 9,
        title: 'Конструкторы',
        description: 'Инициализация объектов при создании',
        xp: 30,
        skill: 'basics',
        theory: `
            <h4>🔧 Конструктор</h4>
            <pre class="code-example"><code>public class Player {
    String name;
    
    public Player(String name) {
        this.name = name;
    }
}

Player p = new Player("Steve");</code></pre>
        `,
        codeExample: `public class Player {
    String name;
    
    public Player(String name) {
        this.name = name;
    }
}`,
        starterCode: `// TODO: Добавь конструктор к классу Player
`,
        validation: {
            requiredClasses: ['Player'],
            requiredMethods: [],
            requiredStrings: ['public Player'],
            forbiddenStrings: []
        }
    },
    
    10: {
        id: 10,
        title: 'Наследование',
        description: 'Создавай иерархии классов',
        xp: 35,
        skill: 'basics',
        theory: `
            <h4>🔧 extends</h4>
            <pre class="code-example"><code>public class Entity {
    int x, y, z;
}

public class Player extends Entity {
    String name;
}</code></pre>
        `,
        codeExample: `public class Entity {
    int x, y, z;
}

public class Player extends Entity {
    String name;
}`,
        starterCode: `// TODO: Создай класс Entity с координатами
// TODO: Создай класс Player который наследует Entity
`,
        validation: {
            requiredClasses: ['Entity', 'Player'],
            requiredMethods: [],
            requiredStrings: ['extends'],
            forbiddenStrings: []
        }
    },
    
    // ==================== MODULE 2: ADVANCED JAVA (11-20) ====================
    11: {
        id: 11,
        title: 'Интерфейсы',
        description: 'Контракты для классов',
        xp: 35,
        skill: 'basics',
        theory: `
            <h4>🔧 interface</h4>
            <pre class="code-example"><code>public interface Damageable {
    void takeDamage(int amount);
}

public class Player implements Damageable {
    public void takeDamage(int amount) {
        System.out.println("Получено " + amount + " урона");
    }
}</code></pre>
        `,
        codeExample: `public interface Damageable {
    void takeDamage(int amount);
}`,
        starterCode: `// TODO: Создай интерфейс Damageable с методом takeDamage
`,
        validation: {
            requiredClasses: [],
            requiredMethods: ['takeDamage'],
            requiredStrings: ['interface'],
            forbiddenStrings: []
        }
    },
    
    12: {
        id: 12,
        title: 'Абстрактные классы',
        description: 'Базовые классы с абстрактными методами',
        xp: 35,
        skill: 'basics',
        theory: `
            <h4>🔧 abstract</h4>
            <pre class="code-example"><code>public abstract class Entity {
    abstract void move();
}

public class Player extends Entity {
    void move() {
        System.out.println("Игрок движется");
    }
}</code></pre>
        `,
        codeExample: `public abstract class Entity {
    abstract void move();
}`,
        starterCode: `// TODO: Создай абстрактный класс Entity с методом move
`,
        validation: {
            requiredClasses: ['Entity'],
            requiredMethods: ['move'],
            requiredStrings: ['abstract'],
            forbiddenStrings: []
        }
    },
    
    13: {
        id: 13,
        title: 'Перечисления (enum)',
        description: 'Фиксированный набор констант',
        xp: 25,
        skill: 'basics',
        theory: `
            <h4>🔧 enum</h4>
            <pre class="code-example"><code>public enum Difficulty {
    PEACEFUL, EASY, NORMAL, HARD
}

Difficulty diff = Difficulty.HARD;</code></pre>
        `,
        codeExample: `public enum Difficulty {
    PEACEFUL, EASY, NORMAL, HARD
}`,
        starterCode: `// TODO: Создай enum Difficulty с 4 уровнями сложности
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['enum', 'Difficulty'],
            forbiddenStrings: []
        }
    },
    
    14: {
        id: 14,
        title: 'Исключения (try/catch)',
        description: 'Обработка ошибок в коде',
        xp: 30,
        skill: 'basics',
        theory: `
            <h4>🔧 try/catch</h4>
            <pre class="code-example"><code>try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Ошибка: " + e);
}</code></pre>
        `,
        codeExample: `try {
    int result = 10 / 0;
} catch (Exception e) {
    System.out.println("Ошибка!");
}`,
        starterCode: `// TODO: Обработай деление на ноль через try/catch
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['try', 'catch'],
            forbiddenStrings: []
        }
    },
    
    15: {
        id: 15,
        title: 'Коллекции: ArrayList',
        description: 'Динамические списки',
        xp: 35,
        skill: 'basics',
        theory: `
            <h4>🔧 ArrayList</h4>
            <pre class="code-example"><code>ArrayList<String> list = new ArrayList<>();
list.add("Steve");
list.add("Alex");

for (String name : list) {
    System.out.println(name);
}</code></pre>
        `,
        codeExample: `ArrayList<String> players = new ArrayList<>();
players.add("Steve");
players.add("Alex");`,
        starterCode: `// TODO: Создай ArrayList<String> для имён
// TODO: Добавь 2 имени
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['ArrayList', 'add'],
            forbiddenStrings: []
        }
    },
    
    16: {
        id: 16,
        title: 'Коллекции: HashMap',
        description: 'Пары ключ-значение',
        xp: 35,
        skill: 'basics',
        theory: `
            <h4>🔧 HashMap</h4>
            <pre class="code-example"><code>HashMap<String, Integer> scores = new HashMap<>();
scores.put("Steve", 100);
scores.put("Alex", 150);

int score = scores.get("Steve");</code></pre>
        `,
        codeExample: `HashMap<String, Integer> scores = new HashMap<>();
scores.put("Steve", 100);`,
        starterCode: `// TODO: Создай HashMap<String, Integer>
// TODO: Добавь 2 пары ключ-значение
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['HashMap', 'put'],
            forbiddenStrings: []
        }
    },
    
    17: {
        id: 17,
        title: 'Stream API',
        description: 'Функциональная обработка коллекций',
        xp: 40,
        skill: 'basics',
        theory: `
            <h4>🔧 Stream</h4>
            <pre class="code-example"><code>list.stream()
    .filter(s -> s.startsWith("S"))
    .map(String::toUpperCase)
    .forEach(System.out::println);</code></pre>
        `,
        codeExample: `list.stream()
    .filter(s -> s.length() > 3)
    .forEach(System.out::println);`,
        starterCode: `// TODO: Отфильтруй список через stream().filter()
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['stream()', 'filter'],
            forbiddenStrings: []
        }
    },
    
    18: {
        id: 18,
        title: 'Lambda выражения',
        description: 'Анонимные функции',
        xp: 35,
        skill: 'basics',
        theory: `
            <h4>🔧 Lambda</h4>
            <pre class="code-example"><code>// Вместо:
list.forEach(s -> System.out.println(s));

// Можно:
list.forEach(System.out::println);</code></pre>
        `,
        codeExample: `list.forEach(name -> System.out.println(name));`,
        starterCode: `// TODO: Используй lambda для вывода списка
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['->'],
            forbiddenStrings: []
        }
    },
    
    19: {
        id: 19,
        title: 'Generics',
        description: 'Обобщённые типы',
        xp: 35,
        skill: 'basics',
        theory: `
            <h4>🔧 Generics</h4>
            <pre class="code-example"><code>public class Box<T> {
    private T value;
    
    public void set(T value) {
        this.value = value;
    }
    
    public T get() {
        return value;
    }
}</code></pre>
        `,
        codeExample: `public class Box<T> {
    private T value;
}`,
        starterCode: `// TODO: Создай универсальный класс Box<T>
`,
        validation: {
            requiredClasses: ['Box'],
            requiredMethods: [],
            requiredStrings: ['<T>'],
            forbiddenStrings: []
        }
    },
    
    20: {
        id: 20,
        title: 'Аннотации',
        description: 'Метаданные для кода',
        xp: 30,
        skill: 'basics',
        theory: `
            <h4>🔧 Аннотации</h4>
            <pre class="code-example"><code>@Override
public void onEnable() { }

@Deprecated
public void oldMethod() { }

@SuppressWarnings("unchecked")
public void method() { }</code></pre>
        `,
        codeExample: `@Override
public String toString() {
    return "Player";
}`,
        starterCode: `// TODO: Переопредели метод toString с @Override
`,
        validation: {
            requiredClasses: [],
            requiredMethods: ['toString'],
            requiredStrings: ['@Override'],
            forbiddenStrings: []
        }
    },
    
    // ==================== MODULE 3: BUKKIT API BASICS (21-30) ====================
    21: {
        id: 21,
        title: 'Введение в Bukkit API',
        description: 'Основы API для плагинов',
        xp: 25,
        skill: 'basics',
        theory: `
            <h4>📦 Bukkit API</h4>
            <p>API для разработки плагинов на Minecraft сервер.</p>
            
            <pre class="code-example"><code>var server = Bukkit.getServer();
var players = Bukkit.getOnlinePlayers();
var world = Bukkit.getWorld("world");</code></pre>
        `,
        codeExample: `var players = Bukkit.getOnlinePlayers();
for (Player player : players) {
    player.sendMessage("Привет!");
}`,
        starterCode: `// TODO: Получи всех игроков и отправь сообщение
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['Bukkit.getOnlinePlayers()'],
            forbiddenStrings: []
        }
    },
    
    22: {
        id: 22,
        title: 'JavaPlugin — основа плагина',
        description: 'Главный класс плагина',
        xp: 30,
        skill: 'events',
        theory: `
            <h4>🔧 JavaPlugin</h4>
            <pre class="code-example"><code>public class MyPlugin extends JavaPlugin {
    @Override
    public void onEnable() {
        getLogger().info("Включён!");
    }
    
    @Override
    public void onDisable() {
        getLogger().info("Выключен!");
    }
}</code></pre>
        `,
        codeExample: `public class MainPlugin extends JavaPlugin {
    @Override
    public void onEnable() {
        getLogger().info("Плагин включен!");
    }
}`,
        starterCode: `// TODO: Создай класс MainPlugin extends JavaPlugin
// TODO: Переопредели onEnable()
`,
        validation: {
            requiredClasses: ['MainPlugin'],
            requiredMethods: ['onEnable'],
            requiredStrings: ['JavaPlugin'],
            forbiddenStrings: []
        }
    },
    
    23: {
        id: 23,
        title: 'plugin.yml',
        description: 'Конфигурация плагина',
        xp: 25,
        skill: 'basics',
        theory: `
            <h4>📝 plugin.yml</h4>
            <pre class="code-example"><code>name: MyPlugin
version: 1.0.0
main: com.example.MainPlugin
api-version: '1.21'
authors: [YourName]
description: Мой плагин</code></pre>
        `,
        codeExample: `name: MyPlugin
version: 1.0.0
main: com.example.MainPlugin
api-version: '1.21'`,
        starterCode: `# TODO: Заполни plugin.yml для своего плагина
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['name:', 'main:', 'api-version:'],
            forbiddenStrings: []
        }
    },
    
    24: {
        id: 24,
        title: 'Логирование в плагине',
        description: 'Вывод сообщений в консоль',
        xp: 20,
        skill: 'basics',
        theory: `
            <h4>🔧 getLogger()</h4>
            <pre class="code-example"><code>getLogger().info("Информация");
getLogger().warning("Предупреждение");
getLogger().severe("Ошибка!");</code></pre>
        `,
        codeExample: `getLogger().info("Плагин загружен!");
getLogger().warning("Что-то не так!");`,
        starterCode: `// TODO: Выведи 3 сообщения разного уровня
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['getLogger().info'],
            forbiddenStrings: []
        }
    },
    
    25: {
        id: 25,
        title: 'События: основы',
        description: 'Система событий Bukkit',
        xp: 35,
        skill: 'events',
        theory: `
            <h4>🔧 Listener</h4>
            <pre class="code-example"><code>public class MyListener implements Listener {
    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent e) {
        Player p = e.getPlayer();
        p.sendMessage("Добро пожаловать!");
    }
}</code></pre>
        `,
        codeExample: `public class PlayerListener implements Listener {
    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent e) {
        e.getPlayer().sendMessage("Привет!");
    }
}`,
        starterCode: `// TODO: Создай Listener для PlayerJoinEvent
`,
        validation: {
            requiredClasses: ['PlayerListener'],
            requiredMethods: ['onPlayerJoin'],
            requiredStrings: ['Listener', '@EventHandler'],
            forbiddenStrings: []
        }
    },
    
    26: {
        id: 26,
        title: 'Регистрация Listener',
        description: 'Подключение обработчиков событий',
        xp: 30,
        skill: 'events',
        theory: `
            <h4>🔧 Регистрация</h4>
            <pre class="code-example"><code>@Override
public void onEnable() {
    getServer().getPluginManager()
        .registerEvents(new MyListener(), this);
}</code></pre>
        `,
        codeExample: `getServer().getPluginManager()
    .registerEvents(new PlayerListener(), this);`,
        starterCode: `// TODO: Зарегистрируй Listener в onEnable()
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['registerEvents'],
            forbiddenStrings: []
        }
    },
    
    27: {
        id: 27,
        title: 'PlayerJoinEvent',
        description: 'Событие входа игрока',
        xp: 30,
        skill: 'events',
        theory: `
            <h4>🔧 PlayerJoinEvent</h4>
            <pre class="code-example"><code>@EventHandler
public void onPlayerJoin(PlayerJoinEvent e) {
    Player p = e.getPlayer();
    p.sendMessage("§aДобро пожаловать!");
    e.setJoinMessage("Игрок присоединился!");
}</code></pre>
        `,
        codeExample: `@EventHandler
public void onPlayerJoin(PlayerJoinEvent e) {
    e.getPlayer().sendMessage("§aДобро пожаловать!");
}`,
        starterCode: `// TODO: Обработай вход игрока с сообщением
`,
        validation: {
            requiredClasses: [],
            requiredMethods: ['onPlayerJoin'],
            requiredStrings: ['PlayerJoinEvent', 'sendMessage'],
            forbiddenStrings: []
        }
    },
    
    28: {
        id: 28,
        title: 'PlayerQuitEvent',
        description: 'Событие выхода игрока',
        xp: 30,
        skill: 'events',
        theory: `
            <h4>🔧 PlayerQuitEvent</h4>
            <pre class="code-example"><code>@EventHandler
public void onPlayerQuit(PlayerQuitEvent e) {
    e.setQuitMessage("Игрок ушёл :(");
}</code></pre>
        `,
        codeExample: `@EventHandler
public void onPlayerQuit(PlayerQuitEvent e) {
    Bukkit.broadcast("Игрок вышел!");
}`,
        starterCode: `// TODO: Обработай выход игрока
`,
        validation: {
            requiredClasses: [],
            requiredMethods: ['onPlayerQuit'],
            requiredStrings: ['PlayerQuitEvent'],
            forbiddenStrings: []
        }
    },
    
    29: {
        id: 29,
        title: 'BlockBreakEvent',
        description: 'Разрушение блоков',
        xp: 35,
        skill: 'events',
        theory: `
            <h4>🔧 BlockBreakEvent</h4>
            <pre class="code-example"><code>@EventHandler
public void onBlockBreak(BlockBreakEvent e) {
    if (e.getBlock().getType() == Material.DIAMOND_ORE) {
        e.getPlayer().sendMessage("Алмаз найден!");
    }
}</code></pre>
        `,
        codeExample: `@EventHandler
public void onBlockBreak(BlockBreakEvent e) {
    if (e.getBlock().getType() == Material.DIAMOND_ORE) {
        e.setCancelled(true);
    }
}`,
        starterCode: `// TODO: Отмени разрушение алмазной руды
`,
        validation: {
            requiredClasses: [],
            requiredMethods: ['onBlockBreak'],
            requiredStrings: ['BlockBreakEvent', 'Material.DIAMOND_ORE'],
            forbiddenStrings: []
        }
    },
    
    30: {
        id: 30,
        title: 'PlayerInteractEvent',
        description: 'Взаимодействие игрока',
        xp: 35,
        skill: 'events',
        theory: `
            <h4>🔧 PlayerInteractEvent</h4>
            <pre class="code-example"><code>@EventHandler
public void onInteract(PlayerInteractEvent e) {
    if (e.getAction() == Action.RIGHT_CLICK_BLOCK) {
        e.getPlayer().sendMessage("Клик по блоку!");
    }
}</code></pre>
        `,
        codeExample: `@EventHandler
public void onInteract(PlayerInteractEvent e) {
    if (e.getItem() != null) {
        e.getPlayer().sendMessage("Предмет в руке!");
    }
}`,
        starterCode: `// TODO: Обработай клик игрока с предметом
`,
        validation: {
            requiredClasses: [],
            requiredMethods: ['onInteract'],
            requiredStrings: ['PlayerInteractEvent'],
            forbiddenStrings: []
        }
    },
    
    // ==================== MODULE 4: COMMANDS (31-40) ====================
    31: {
        id: 31,
        title: 'CommandExecutor',
        description: 'Создание команд',
        xp: 35,
        skill: 'commands',
        theory: `
            <h4>🔧 CommandExecutor</h4>
            <pre class="code-example"><code>public class HelloCommand implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender s, Command c, 
                            String l, String[] args) {
        s.sendMessage("Привет!");
        return true;
    }
}</code></pre>
        `,
        codeExample: `public class HelloCommand implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender sender, Command cmd, 
                            String label, String[] args) {
        sender.sendMessage("Привет!");
        return true;
    }
}`,
        starterCode: `// TODO: Создай команду HelloCommand
`,
        validation: {
            requiredClasses: ['HelloCommand'],
            requiredMethods: ['onCommand'],
            requiredStrings: ['CommandExecutor'],
            forbiddenStrings: []
        }
    },
    
    32: {
        id: 32,
        title: 'Регистрация команд',
        description: 'Подключение команд к плагину',
        xp: 30,
        skill: 'commands',
        theory: `
            <h4>🔧 Регистрация</h4>
            <pre class="code-example"><code>@Override
public void onEnable() {
    getCommand("hello").setExecutor(new HelloCommand());
}</code></pre>
        `,
        codeExample: `getCommand("hello").setExecutor(new HelloCommand());`,
        starterCode: `// TODO: Зарегистрируй команду в onEnable()
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['getCommand', 'setExecutor'],
            forbiddenStrings: []
        }
    },
    
    33: {
        id: 33,
        title: 'Аргументы команд',
        description: 'Обработка параметров команды',
        xp: 35,
        skill: 'commands',
        theory: `
            <h4>🔧 Аргументы</h4>
            <pre class="code-example"><code>if (args.length >= 1) {
    String name = args[0];
    sender.sendMessage("Привет, " + name + "!");
} else {
    sender.sendMessage("Укажи имя!");
}</code></pre>
        `,
        codeExample: `if (args.length >= 1) {
    sender.sendMessage("Привет, " + args[0] + "!");
} else {
    sender.sendMessage("Нужен аргумент!");
}`,
        starterCode: `// TODO: Обработай аргументы команды
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['args.length'],
            forbiddenStrings: []
        }
    },
    
    34: {
        id: 34,
        title: 'TabCompleter',
        description: 'Автодополнение команд',
        xp: 40,
        skill: 'commands',
        theory: `
            <h4>🔧 TabCompleter</h4>
            <pre class="code-example"><code>public class MyCompleter implements TabCompleter {
    public List<String> onTabComplete(...) {
        return Arrays.asList("Steve", "Alex");
    }
}</code></pre>
        `,
        codeExample: `public class MyCompleter implements TabCompleter {
    @Override
    public List<String> onTabComplete(CommandSender s, Command c, 
                                      String l, String[] args) {
        return Arrays.asList("option1", "option2");
    }
}`,
        starterCode: `// TODO: Создай TabCompleter с 2 вариантами
`,
        validation: {
            requiredClasses: [],
            requiredMethods: ['onTabComplete'],
            requiredStrings: ['TabCompleter'],
            forbiddenStrings: []
        }
    },
    
    35: {
        id: 35,
        title: 'Permissions',
        description: 'Проверка прав доступа',
        xp: 35,
        skill: 'commands',
        theory: `
            <h4>🔧 Permissions</h4>
            <pre class="code-example"><code>if (!sender.hasPermission("plugin.admin")) {
    sender.sendMessage("Нет прав!");
    return true;
}</code></pre>
        `,
        codeExample: `if (!sender.hasPermission("myplugin.use")) {
    sender.sendMessage("§cНет доступа!");
    return true;
}`,
        starterCode: `// TODO: Проверь права перед выполнением
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['hasPermission'],
            forbiddenStrings: []
        }
    },
    
    36: {
        id: 36,
        title: 'Console CommandSender',
        description: 'Команды из консоли',
        xp: 30,
        skill: 'commands',
        theory: `
            <h4>🔧 ConsoleSender</h4>
            <pre class="code-example"><code>if (!(sender instanceof Player)) {
    sender.sendMessage("Только для игроков!");
    return true;
}
Player p = (Player) sender;</code></pre>
        `,
        codeExample: `if (!(sender instanceof Player)) {
    sender.sendMessage("Только игроки!");
    return true;
}`,
        starterCode: `// TODO: Проверь что sender это игрок
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['instanceof Player'],
            forbiddenStrings: []
        }
    },
    
    37: {
        id: 37,
        title: 'Broadcast',
        description: 'Сообщения всем игрокам',
        xp: 25,
        skill: 'commands',
        theory: `
            <h4>🔧 Broadcast</h4>
            <pre class="code-example"><code>Bukkit.broadcastMessage("§6Важное объявление!");
getServer().broadcast("Текст", "chat");</code></pre>
        `,
        codeExample: `Bukkit.broadcastMessage("§6Всем игрокам!");`,
        starterCode: `// TODO: Отправь сообщение всем игрокам
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['broadcastMessage'],
            forbiddenStrings: []
        }
    },
    
    38: {
        id: 38,
        title: 'Команды с подкомандами',
        description: 'Сложные команды',
        xp: 40,
        skill: 'commands',
        theory: `
            <h4>🔧 Подкоманды</h4>
            <pre class="code-example"><code>switch (args[0].toLowerCase()) {
    case "give" -> handleGive(sender, args);
    case "take" -> handleTake(sender, args);
    default -> sender.sendMessage("Неизвестная подкоманда!");
}</code></pre>
        `,
        codeExample: `if (args[0].equals("give")) {
    // логика give
} else if (args[0].equals("take")) {
    // логика take
}`,
        starterCode: `// TODO: Реализуй подкоманды give/take
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['args[0]'],
            forbiddenStrings: []
        }
    },
    
    39: {
        id: 39,
        title: 'Cooldown команд',
        description: 'Задержка между использованиями',
        xp: 40,
        skill: 'commands',
        theory: `
            <h4>🔧 Cooldown</h4>
            <pre class="code-example"><code>HashMap<UUID, Long> cooldowns = new HashMap<>();

if (cooldowns.containsKey(sender.getUniqueId())) {
    sender.sendMessage("Подожди!");
    return true;
}
cooldowns.put(sender.getUniqueId(), System.currentTimeMillis());</code></pre>
        `,
        codeExample: `HashMap<UUID, Long> cd = new HashMap<>();
if (cd.containsKey(sender.getUniqueId())) {
    sender.sendMessage("Жди!");
    return true;
}`,
        starterCode: `// TODO: Реализуй cooldown для команды
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['HashMap', 'getUniqueId'],
            forbiddenStrings: []
        }
    },
    
    40: {
        id: 40,
        title: 'Команды в plugin.yml',
        description: 'Декларация команд',
        xp: 25,
        skill: 'commands',
        theory: `
            <h4>📝 plugin.yml</h4>
            <pre class="code-example"><code>commands:
    hello:
        description: Приветствие
        usage: /hello
        permission: plugin.hello
    admin:
        description: Админ команда
        aliases: [a, adm]</code></pre>
        `,
        codeExample: `commands:
    hello:
        description: Приветствие
        usage: /hello`,
        starterCode: `# TODO: Опиши команду в plugin.yml
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['commands:', 'description:', 'usage:'],
            forbiddenStrings: []
        }
    },
    
    // ==================== MODULE 5: STORAGE & CONFIG (41-50) ====================
    41: {
        id: 41,
        title: 'config.yml — основы',
        description: 'Чтение конфигурации',
        xp: 30,
        skill: 'storage',
        theory: `
            <h4>🔧 Чтение</h4>
            <pre class="code-example"><code>var config = getConfig();
String msg = config.getString("message");
int max = config.getInt("maxPlayers");
boolean debug = config.getBoolean("debug");</code></pre>
        `,
        codeExample: `var config = getConfig();
String prefix = config.getString("prefix");`,
        starterCode: `// TODO: Прочитай 3 значения из конфига
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['getConfig()', 'config.getString'],
            forbiddenStrings: []
        }
    },
    
    42: {
        id: 42,
        title: 'Запись в config.yml',
        description: 'Сохранение настроек',
        xp: 35,
        skill: 'storage',
        theory: `
            <h4>🔧 Запись</h4>
            <pre class="code-example"><code>config.set("message", "Новое");
try {
    config.save(new File(getDataFolder(), "config.yml"));
} catch (IOException e) {
    e.printStackTrace();
}</code></pre>
        `,
        codeExample: `config.set("key", "value");
config.save(new File(getDataFolder(), "config.yml"));`,
        starterCode: `// TODO: Запиши значение и сохрани конфиг
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['config.set', 'config.save'],
            forbiddenStrings: []
        }
    },
    
    43: {
        id: 43,
        title: 'Вложенные конфиги',
        description: 'Секции в config.yml',
        xp: 35,
        skill: 'storage',
        theory: `
            <h4>🔧 Вложенность</h4>
            <pre class="code-example"><code># config.yml
messages:
    welcome: "Добро пожаловать!"
    goodbye: "Пока!"

String msg = config.getString("messages.welcome");</code></pre>
        `,
        codeExample: `String msg = config.getString("messages.welcome");
int price = config.getInt("prices.diamond");`,
        starterCode: `# messages:
#   welcome: "Привет!"
# prices:
#   diamond: 100
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['getString'],
            forbiddenStrings: []
        }
    },
    
    44: {
        id: 44,
        title: 'FileConfiguration API',
        description: 'Работа с файлами настроек',
        xp: 35,
        skill: 'storage',
        theory: `
            <h4>🔧 FileConfiguration</h4>
            <pre class="code-example"><code>saveDefaultConfig();
reloadConfig();
FileConfiguration cfg = getConfig();</code></pre>
        `,
        codeExample: `saveDefaultConfig();
reloadConfig();`,
        starterCode: `// TODO: Загрузи дефолтный конфиг
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['saveDefaultConfig'],
            forbiddenStrings: []
        }
    },
    
    45: {
        id: 45,
        title: 'YAMLConfiguration',
        description: 'Прямая работа с YAML',
        xp: 40,
        skill: 'storage',
        theory: `
            <h4>🔧 YAML</h4>
            <pre class="code-example"><code>YamlConfiguration yaml = new YamlConfiguration();
yaml.set("key", "value");
yaml.save(new File("data.yml"));</code></pre>
        `,
        codeExample: `YamlConfiguration yaml = new YamlConfiguration();
yaml.set("player." + uuid + ".score", 100);`,
        starterCode: `// TODO: Создай YAML файл с данными
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['YamlConfiguration'],
            forbiddenStrings: []
        }
    },
    
    46: {
        id: 46,
        title: 'Сохранение данных игрока',
        description: 'Персистентность',
        xp: 40,
        skill: 'storage',
        theory: `
            <h4>🔧 Данные игрока</h4>
            <pre class="code-example"><code>UUID uuid = player.getUniqueId();
config.set("players." + uuid + ".score", 100);
config.set("players." + uuid + ".level", 5);</code></pre>
        `,
        codeExample: `UUID uuid = player.getUniqueId();
config.set("players." + uuid + ".name", player.getName());`,
        starterCode: `// TODO: Сохрани данные игрока по UUID
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['getUniqueId()', 'config.set'],
            forbiddenStrings: []
        }
    },
    
    47: {
        id: 47,
        title: 'SQLite — основы',
        description: 'Локальная база данных',
        xp: 45,
        skill: 'storage',
        theory: `
            <h4>🔧 SQLite</h4>
            <pre class="code-example"><code>Connection conn = DriverManager.getConnection(
    "jdbc:sqlite:plugins/MyPlugin/data.db"
);
Statement stmt = conn.createStatement();
stmt.execute("CREATE TABLE IF NOT EXISTS players (uuid TEXT, score INT)");</code></pre>
        `,
        codeExample: `Connection conn = DriverManager.getConnection("jdbc:sqlite:data.db");
Statement stmt = conn.createStatement();`,
        starterCode: `// TODO: Подключись к SQLite и создай таблицу
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['DriverManager.getConnection', 'Statement'],
            forbiddenStrings: []
        }
    },
    
    48: {
        id: 48,
        title: 'MySQL — подключение',
        description: 'Удалённая база данных',
        xp: 45,
        skill: 'storage',
        theory: `
            <h4>🔧 MySQL</h4>
            <pre class="code-example"><code>Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb",
    "user", "password"
);</code></pre>
        `,
        codeExample: `Connection conn = DriverManager.getConnection(
    "jdbc:mysql://host:3306/db", "user", "pass"
);`,
        starterCode: `// TODO: Подключись к MySQL
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['jdbc:mysql'],
            forbiddenStrings: []
        }
    },
    
    49: {
        id: 49,
        title: 'PreparedStatement',
        description: 'Безопасные SQL запросы',
        xp: 45,
        skill: 'storage',
        theory: `
            <h4>🔧 PreparedStatement</h4>
            <pre class="code-example"><code>PreparedStatement ps = conn.prepareStatement(
    "INSERT INTO players VALUES (?, ?)"
);
ps.setString(1, uuid.toString());
ps.setInt(2, score);
ps.executeUpdate();</code></pre>
        `,
        codeExample: `PreparedStatement ps = conn.prepareStatement("SELECT * FROM players WHERE uuid = ?");
ps.setString(1, uuid.toString());
ResultSet rs = ps.executeQuery();`,
        starterCode: `// TODO: Создай PreparedStatement для SELECT
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['PreparedStatement', 'setString'],
            forbiddenStrings: []
        }
    },
    
    50: {
        id: 50,
        title: 'Connection Pool',
        description: 'Пул подключений',
        xp: 50,
        skill: 'storage',
        theory: `
            <h4>🔧 HikariCP</h4>
            <pre class="code-example"><code>HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://...");
config.setMaximumPoolSize(10);
HikariDataSource ds = new HikariDataSource(config);

try (Connection conn = ds.getConnection()) {
    // работа с БД
}</code></pre>
        `,
        codeExample: `HikariDataSource ds = new HikariDataSource(config);
try (Connection conn = ds.getConnection()) {
    // используем подключение
}`,
        starterCode: `// TODO: Настрой пул подключений HikariCP
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['HikariDataSource', 'getConnection'],
            forbiddenStrings: []
        }
    },
    
    // ==================== MODULE 6: GUI & ITEMS (51-60) ====================
    51: {
        id: 51,
        title: 'ItemStack — предметы',
        description: 'Создание и модификация предметов',
        xp: 35,
        skill: 'gui',
        theory: `
            <h4>🔧 ItemStack</h4>
            <pre class="code-example"><code>ItemStack diamond = new ItemStack(Material.DIAMOND, 10);
ItemStack sword = new ItemStack(Material.DIAMOND_SWORD);

player.getInventory().addItem(diamond);</code></pre>
        `,
        codeExample: `ItemStack item = new ItemStack(Material.DIAMOND_SWORD, 1);
player.getInventory().addItem(item);`,
        starterCode: `// TODO: Создай ItemStack алмазного меча и выдай игроку
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['ItemStack', 'Material'],
            forbiddenStrings: []
        }
    },
    
    52: {
        id: 52,
        title: 'ItemMeta — метаданные',
        description: 'Название и описание предмета',
        xp: 35,
        skill: 'gui',
        theory: `
            <h4>🔧 ItemMeta</h4>
            <pre class="code-example"><code>ItemMeta meta = item.getItemMeta();
meta.setDisplayName("§6Легендарный меч");
meta.setLore(Arrays.asList("§7Урон: +10", "§7Прочность: 100"));
item.setItemMeta(meta);</code></pre>
        `,
        codeExample: `ItemMeta meta = item.getItemMeta();
meta.setDisplayName("§6Мой предмет");
item.setItemMeta(meta);`,
        starterCode: `// TODO: Установи название предмета
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['getItemMeta', 'setDisplayName'],
            forbiddenStrings: []
        }
    },
    
    53: {
        id: 53,
        title: 'Enchantments',
        description: 'Зачарование предметов',
        xp: 35,
        skill: 'gui',
        theory: `
            <h4>🔧 Зачарование</h4>
            <pre class="code-example"><code>item.addEnchantment(Enchantment.SHARPNESS, 5);
item.addEnchantment(Enchantment.UNBREAKING, 3);</code></pre>
        `,
        codeExample: `item.addEnchantment(Enchantment.SHARPNESS, 5);`,
        starterCode: `// TODO: Добавь зачарование на предмет
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['addEnchantment', 'Enchantment'],
            forbiddenStrings: []
        }
    },
    
    54: {
        id: 54,
        title: 'Inventory — инвентари',
        description: 'Создание инвентарей',
        xp: 40,
        skill: 'gui',
        theory: `
            <h4>🔧 Inventory</h4>
            <pre class="code-example"><code>Inventory inv = Bukkit.createInventory(null, 27, "Меню");
player.openInventory(inv);</code></pre>
        `,
        codeExample: `Inventory inv = Bukkit.createInventory(null, 9, "Меню");
player.openInventory(inv);`,
        starterCode: `// TODO: Создай инвентарь 3x3 и открой игроку
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['createInventory', 'openInventory'],
            forbiddenStrings: []
        }
    },
    
    55: {
        id: 55,
        title: 'InventoryClickEvent',
        description: 'Обработка кликов в инвентаре',
        xp: 40,
        skill: 'gui',
        theory: `
            <h4>🔧 Клик</h4>
            <pre class="code-example"><code>@EventHandler
public void onClick(InventoryClickEvent e) {
    if (e.getView().getTitle().equals("Меню")) {
        e.setCancelled(true);
        // обработка
    }
}</code></pre>
        `,
        codeExample: `@EventHandler
public void onClick(InventoryClickEvent e) {
    if (e.getView().getTitle().equals("Меню")) {
        e.setCancelled(true);
    }
}`,
        starterCode: `// TODO: Отмени клики в своём инвентаре
`,
        validation: {
            requiredClasses: [],
            requiredMethods: ['onClick'],
            requiredStrings: ['InventoryClickEvent'],
            forbiddenStrings: []
        }
    },
    
    56: {
        id: 56,
        title: 'GUI меню',
        description: 'Интерактивные меню',
        xp: 45,
        skill: 'gui',
        theory: `
            <h4>🔧 GUI</h4>
            <pre class="code-example"><code>Inventory gui = Bukkit.createInventory(null, 27, "Магазин");
gui.setItem(10, new ItemStack(Material.DIAMOND));
gui.setItem(11, new ItemStack(Material.GOLD_INGOT));
player.openInventory(gui);</code></pre>
        `,
        codeExample: `Inventory gui = Bukkit.createInventory(null, 9, "Меню");
gui.setItem(0, new ItemStack(Material.STONE));
player.openInventory(gui);`,
        starterCode: `// TODO: Создай GUI с 3 предметами
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['createInventory', 'setItem'],
            forbiddenStrings: []
        }
    },
    
    57: {
        id: 57,
        title: 'Sign — таблички',
        description: 'Редактирование табличек',
        xp: 35,
        skill: 'gui',
        theory: `
            <h4>🔧 Sign</h4>
            <pre class="code-example"><code>Sign sign = (Sign) block.getState();
sign.setLine(0, "§6Магазин");
sign.setLine(1, "Алмазы");
sign.setLine(2, "100$");
sign.update();</code></pre>
        `,
        codeExample: `Sign sign = (Sign) block.getState();
sign.setLine(0, "Текст");
sign.update();`,
        starterCode: `// TODO: Установи текст на табличке
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['Sign', 'setLine', 'update'],
            forbiddenStrings: []
        }
    },
    
    58: {
        id: 58,
        title: 'Hopper & Chest',
        description: 'Работа с контейнерами',
        xp: 35,
        skill: 'gui',
        theory: `
            <h4>🔧 Контейнеры</h4>
            <pre class="code-example"><code>Chest chest = (Chest) block.getState();
Inventory inv = chest.getInventory();
inv.addItem(new ItemStack(Material.DIAMOND));</code></pre>
        `,
        codeExample: `Chest chest = (Chest) block.getState();
chest.getInventory().addItem(item);`,
        starterCode: `// TODO: Добавь предмет в сундук
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['Chest', 'getInventory'],
            forbiddenStrings: []
        }
    },
    
    59: {
        id: 59,
        title: 'Armor Stand',
        description: 'Стойки для брони',
        xp: 40,
        skill: 'gui',
        theory: `
            <h4>🔧 ArmorStand</h4>
            <pre class="code-example"><code>ArmorStand stand = location.spawn(ArmorStand.class);
stand.setCustomName("§6Страж");
stand.setCustomNameVisible(true);
stand.setHelmet(new ItemStack(Material.DIAMOND_HELMET));</code></pre>
        `,
        codeExample: `ArmorStand stand = loc.spawn(ArmorStand.class);
stand.setCustomName("NPC");
stand.setCustomNameVisible(true);`,
        starterCode: `// TODO: Создай стойку для брони с именем
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['ArmorStand', 'setCustomName'],
            forbiddenStrings: []
        }
    },
    
    60: {
        id: 60,
        title: 'Head & Skulls',
        description: 'Головы игроков',
        xp: 35,
        skill: 'gui',
        theory: `
            <h4>🔧 Skull</h4>
            <pre class="code-example"><code>ItemStack head = new ItemStack(Material.PLAYER_HEAD);
SkullMeta meta = (SkullMeta) head.getItemMeta();
meta.setOwningPlayer(player);
head.setItemMeta(meta);</code></pre>
        `,
        codeExample: `ItemStack head = new ItemStack(Material.PLAYER_HEAD);
SkullMeta meta = (SkullMeta) head.getItemMeta();
meta.setOwningPlayer(targetPlayer);`,
        starterCode: `// TODO: Создай голову игрока
`,
        validation: {
            requiredClasses: [],
            requiredMethods: [],
            requiredStrings: ['PLAYER_HEAD', 'SkullMeta'],
            forbiddenStrings: []
        }
    }
};

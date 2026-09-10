/* =====================================================
   CogniCare NER
   Complete Application JavaScript
===================================================== */


/* =====================================================
   STORED DATA
===================================================== */

let score =
    Number(localStorage.getItem("cogniScore")) || 0;


let gamesPlayed =
    Number(localStorage.getItem("cogniGames")) || 0;


let difficulty =
    Number(localStorage.getItem("cogniDifficulty")) || 1;


let reminders =
    JSON.parse(
        localStorage.getItem("cogniReminders")
    ) || [];


let selectedItems = [];


/* =====================================================
   START APPLICATION
===================================================== */

function startApp() {

    let name =
        document
        .getElementById("patientName")
        .value
        .trim();


    if(name === "") {

        name = "Friend";

    }


    localStorage.setItem(
        "patientName",
        name
    );


    document
        .getElementById("loginScreen")
        .classList.add("hidden");


    document
        .getElementById("mainApp")
        .classList.remove("hidden");


    document
        .getElementById("welcomeName")
        .innerText =
        "Good Morning, " + name + "! 👋";


    updateDashboard();

    displayReminders();

}


/* =====================================================
   SCREEN NAVIGATION
===================================================== */

function showScreen(screenName) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const selected =
        document.getElementById(screenName);


    if(selected) {

        selected.classList.add("active");

    }


    updateDashboard();

    displayReminders();

    window.scrollTo(0,0);

}


/* =====================================================
   LANGUAGE
===================================================== */

const translations = {

    en: {
        welcome:
            "Welcome 👋",

        text:
            "Let's keep your mind active today."
    },


    ta: {
        welcome:
            "வரவேற்கிறோம் 👋",

        text:
            "இன்று உங்கள் மூளையை சுறுசுறுப்பாக வைத்திருப்போம்."
    },


    hi: {
        welcome:
            "स्वागत है 👋",

        text:
            "आज अपने दिमाग को सक्रिय रखें।"
    },


    te: {
        welcome:
            "స్వాగతం 👋",

        text:
            "ఈరోజు మీ మెదడును చురుకుగా ఉంచుదాం."
    },


    kn: {
        welcome:
            "ಸ್ವಾಗತ 👋",

        text:
            "ಇಂದು ನಿಮ್ಮ ಮನಸ್ಸನ್ನು ಚುರುಕಾಗಿ ಇಡೋಣ."
    },


    mr: {
        welcome:
            "स्वागत आहे 👋",

        text:
            "आज आपले मन सक्रिय ठेवूया."
    },


    as: {
        welcome:
            "স্বাগতম 👋",

        text:
            "আজি আপোনাৰ মনটো সক্ৰিয় ৰাখোঁ।"
    },


    brx: {
        welcome:
            "फैजा जायो 👋",

        text:
            "CogniCare NER"
    },


    kha: {
        welcome:
            "Khublei 👋",

        text:
            "CogniCare NER"
    },


    grt: {
        welcome:
            "Namaste 👋",

        text:
            "CogniCare NER"
    },


    lus: {
        welcome:
            "Chibai 👋",

        text:
            "CogniCare NER"
    },


    trp: {
        welcome:
            "Khulumkha 👋",

        text:
            "CogniCare NER"
    }

};


function changeLanguage() {

    const language =
        document
        .getElementById("language")
        .value;


    const data =
        translations[language];


    if(!data)
        return;


    document
        .getElementById("welcomeText")
        .innerText =
        data.text;


    /*
       Save selected language locally.
    */

    localStorage.setItem(
        "cogniLanguage",
        language
    );

}


/* =====================================================
   OPEN GAMES
===================================================== */

function openGame(type) {

    showScreen("game");


    if(type === "story") {

        storyGame();

    }

    else if(type === "market") {

        marketGame();

    }

    else if(type === "voice") {

        voiceGame();

    }

}


/* =====================================================
   GAME 1
   MY VILLAGE, MY STORY
===================================================== */

function storyGame() {

    document
        .getElementById("gameContent")
        .innerHTML = `

        <div class="game-box">

            <h1>
                🏡 My Village, My Story
            </h1>

            <p>
                Listen carefully and remember
                the story.
            </p>

            <div class="story">

                Rina went to the garden
                in the morning.

                She saw a
                <b>cow</b> near a
                <b>tree</b> and carried a
                <b>basket</b> home.

            </div>


            <button
                class="primary"
                onclick="storyQuestion()">

                I Remember →
                Ask Question

            </button>

        </div>

    `;

}


function storyQuestion() {

    document
        .getElementById("gameContent")
        .innerHTML = `

        <div class="game-box">

            <h2>
                🧠 Question
            </h2>

            <div class="story">

                Where was the cow?

            </div>


            <button
                class="answer"
                onclick="storyAnswer(false)">

                🏠 Near the house

            </button>


            <button
                class="answer"
                onclick="storyAnswer(true)">

                🌳 Near the tree

            </button>


            <button
                class="answer"
                onclick="storyAnswer(false)">

                🛒 Near the market

            </button>


            <div id="result"></div>

        </div>

    `;

}


function storyAnswer(correct) {

    if(correct) {

        increaseScore(10);


        document
            .getElementById("result")
            .innerHTML =

            "<h3>✅ Correct! Great memory!</h3>";

    }

    else {

        document
            .getElementById("result")
            .innerHTML =

            "<h3>💡 Good try! Keep practising.</h3>";

    }


    finishGame();

}


/* =====================================================
   GAME 2
   MARKET BASKET MEMORY
===================================================== */

function marketGame() {

    selectedItems = [];


    document
        .getElementById("gameContent")
        .innerHTML = `

        <div class="game-box">

            <h1>
                🧺 Market Basket Memory
            </h1>

            <p>
                Remember these items carefully.
            </p>


            <div class="story">

                🍚 Rice<br>
                🍌 Banana<br>
                🥕 Vegetable

            </div>


            <button
                class="primary"
                onclick="showMarket()">

                I Remember →

            </button>

        </div>

    `;

}


function showMarket() {

    document
        .getElementById("gameContent")
        .innerHTML = `

        <div class="game-box">

            <h2>
                🧺 Build Your Basket
            </h2>

            <p>
                Select the three items
                you remember.
            </p>


            <div class="items">


                <button
                    class="item"
                    onclick="selectItem(this,'rice')">

                    🍚 Rice

                </button>


                <button
                    class="item"
                    onclick="selectItem(this,'banana')">

                    🍌 Banana

                </button>


                <button
                    class="item"
                    onclick="selectItem(this,'vegetable')">

                    🥕 Vegetable

                </button>


                <button
                    class="item"
                    onclick="selectItem(this,'milk')">

                    🥛 Milk

                </button>


                <button
                    class="item"
                    onclick="selectItem(this,'apple')">

                    🍎 Apple

                </button>


                <button
                    class="item"
                    onclick="selectItem(this,'oil')">

                    🫙 Oil

                </button>

            </div>


            <br>


            <button
                class="primary"
                onclick="checkBasket()">

                Check Basket

            </button>


            <div id="basketResult"></div>

        </div>

    `;

}


function selectItem(button,item) {

    button.classList.toggle("selected");


    if(selectedItems.includes(item)) {

        selectedItems =
            selectedItems.filter(
                x => x !== item
            );

    }

    else {

        selectedItems.push(item);

    }

}


function checkBasket() {

    const required = [

        "rice",
        "banana",
        "vegetable"

    ];


    const correct =
        required.every(
            item =>
            selectedItems.includes(item)
        );


    const extra =
        selectedItems.some(
            item =>
            !required.includes(item)
        );


    if(correct && !extra) {

        increaseScore(10);


        document
            .getElementById("basketResult")
            .innerHTML =

            "<h3>✅ Perfect shopping memory!</h3>";

    }

    else {

        document
            .getElementById("basketResult")
            .innerHTML =

            "<h3>💡 Good try! Check your basket.</h3>";

    }


    finishGame();

}


/* =====================================================
   GAME 3
   VOICE MEMORY JOURNEY
===================================================== */

function voiceGame() {

    document
        .getElementById("gameContent")
        .innerHTML = `

        <div class="game-box">

            <h1>
                🎤 Voice Memory Journey
            </h1>


            <p>
                Remember these three things:
            </p>


            <div class="story">

                💧 Water<br>
                💊 Medicine<br>
                🌳 Garden

            </div>


            <button
                class="mic"
                onclick="startVoiceMemory()">

                🎤

            </button>


            <div
                id="voiceGameResult"
                class="voice-result">

                Tap the microphone and
                tell me what you remember.

            </div>

        </div>

    `;

}


function startVoiceMemory() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    const result =
        document.getElementById(
            "voiceGameResult"
        );


    if(!SpeechRecognition) {

        result.innerHTML =
            "🎤 Voice recognition is not supported in this browser.";

        return;

    }


    const recognition =
        new SpeechRecognition();


    const language =
        document
        .getElementById("language")
        .value;


    const voiceLanguages = {

        en: "en-IN",

        ta: "ta-IN",

        hi: "hi-IN",

        te: "te-IN",

        kn: "kn-IN",

        mr: "mr-IN",

        as: "as-IN"

    };


    recognition.lang =
        voiceLanguages[language] ||
        "en-IN";


    recognition.interimResults =
        false;


    recognition.continuous =
        false;


    result.innerText =
        "🎤 Listening...";


    recognition.start();


    recognition.onresult =
        function(event) {

            const spoken =
                event
                .results[0][0]
                .transcript;


            result.innerHTML =
                "You said:<br><br><b>" +
                escapeHTML(spoken) +
                "</b>";


            checkVoiceMemory(
                spoken.toLowerCase()
            );

        };


    recognition.onerror =
        function() {

            result.innerText =
                "Please try speaking again.";

        };

}


function checkVoiceMemory(answer) {

    let matches = 0;


    if(
        answer.includes("water") ||
        answer.includes("தண்ணீர்")
    ) {

        matches++;

    }


    if(
        answer.includes("medicine") ||
        answer.includes("மருந்து")
    ) {

        matches++;

    }


    if(
        answer.includes("garden") ||
        answer.includes("தோட்டம்")
    ) {

        matches++;

    }


    const result =
        document.getElementById(
            "voiceGameResult"
        );


    if(matches >= 2) {

        increaseScore(10);


        result.innerHTML +=
            "<br><br>✅ Excellent recall!";

    }

    else {

        result.innerHTML +=
            "<br><br>💡 Good try! Keep practising.";

    }


    finishGame();

}


/* =====================================================
   VOICE MEMORY ASSISTANT
===================================================== */

function startAssistantListening() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    const status =
        document.getElementById(
            "assistantStatus"
        );


    const heard =
        document.getElementById(
            "assistantHeard"
        );


    if(!SpeechRecognition) {

        status.innerText =
            "Voice recognition is not supported.";

        speak(
            "Sorry. Voice recognition is not supported in this browser."
        );

        return;

    }


    const recognition =
        new SpeechRecognition();


    const language =
        document
        .getElementById("language")
        .value;


    const voiceLanguages = {

        en: "en-IN",

        ta: "ta-IN",

        hi: "hi-IN",

        te: "te-IN",

        kn: "kn-IN",

        mr: "mr-IN",

        as: "as-IN"

    };


    recognition.lang =
        voiceLanguages[language] ||
        "en-IN";


    recognition.interimResults =
        false;


    recognition.continuous =
        false;


    status.innerText =
        "🎤 Listening...";


    recognition.start();


    recognition.onresult =
        function(event) {

            const text =
                event
                .results[0][0]
                .transcript;


            heard.innerText =
                text;


            status.innerText =
                "🤖 Understanding...";


            processAssistantCommand(text);

        };


    recognition.onerror =
        function() {

            status.innerText =
                "Please try again.";

        };


    recognition.onend =
        function() {

            if(
                status.innerText ===
                "🎤 Listening..."
            ) {

                status.innerText =
                    "Tap the microphone";

            }

        };

}


/* =====================================================
   UNDERSTAND VOICE COMMAND
===================================================== */

function processAssistantCommand(text) {

    const lower =
        text.toLowerCase();


    let task =
        extractTask(text);


    let time =
        extractTime(text);


    let date =
        extractDate(text);


    /*
       If no obvious reminder words are present,
       still allow a natural "remember this" command.
    */

    const isReminder =
        lower.includes("remind") ||
        lower.includes("remember") ||
        lower.includes("medicine") ||
        lower.includes("water") ||
        lower.includes("appointment") ||
        lower.includes("call");


    if(!isReminder) {

        document
            .getElementById("assistantStatus")
            .innerText =
            "I heard you.";


        document
            .getElementById("aiUnderstanding")
            .innerText =
            "I heard your message, but I could not identify a reminder.";


        speak(
            "I heard you, but I could not identify a reminder."
        );

        return;

    }


    if(task === "") {

        task = text;

    }


    const reminder = {

        id: Date.now(),

        task: task,

        time: time || "No specific time",

        date: date || "Today",

        originalText: text,

        created:
            new Date()
            .toLocaleString()

    };


    reminders.push(reminder);


    saveReminders();


    displayReminders();


    document
        .getElementById("assistantStatus")
        .innerText =
        "✅ Reminder saved";


    document
        .getElementById("aiUnderstanding")
        .innerHTML = `

        <b>Intent:</b> Reminder<br>

        <b>Task:</b>
        ${escapeHTML(task)}<br>

        <b>Date:</b>
        ${escapeHTML(reminder.date)}<br>

        <b>Time:</b>
        ${escapeHTML(reminder.time)}

    `;


    speak(
        "Okay. I have saved your reminder."
    );

}


/* =====================================================
   EXTRACT TASK
===================================================== */

function extractTask(text) {

    let task = text;


    /*
       Remove common reminder phrases.
    */

    task =
        task.replace(
            /remind me to/gi,
            ""
        );


    task =
        task.replace(
            /remind me/gi,
            ""
        );


    task =
        task.replace(
            /remember to/gi,
            ""
        );


    task =
        task.replace(
            /please/gi,
            ""
        );


    /*
       Remove time expressions.
    */

    task =
        task.replace(
            /\bat\s+\d{1,2}(:\d{2})?\s*(am|pm)?/gi,
            ""
        );


    task =
        task.replace(
            /\btomorrow\b/gi,
            ""
        );


    task =
        task.replace(
            /\btoday\b/gi,
            ""
        );


    task =
        task.trim();


    /*
       Capitalize first letter.
    */

    if(task.length > 0) {

        task =
            task.charAt(0).toUpperCase() +
            task.slice(1);

    }


    return task;

}


/* =====================================================
   EXTRACT TIME
===================================================== */

function extractTime(text) {

    const match =
        text.match(
            /\b(\d{1,2})(?::(\d{2}))?\s*(AM|PM|am|pm)\b/
        );


    if(match) {

        return match[0];

    }


    const timeWords = {

        morning: "Morning",

        afternoon: "Afternoon",

        evening: "Evening",

        night: "Night"

    };


    const lower =
        text.toLowerCase();


    for(const word in timeWords) {

        if(lower.includes(word)) {

            return timeWords[word];

        }

    }


    return "";

}


/* =====================================================
   EXTRACT DATE
===================================================== */

function extractDate(text) {

    const lower =
        text.toLowerCase();


    if(lower.includes("tomorrow")) {

        return "Tomorrow";

    }


    if(lower.includes("today")) {

        return "Today";

    }


    return "Today";

}


/* =====================================================
   QUICK REMINDER
===================================================== */

function quickReminder(task) {

    const reminder = {

        id: Date.now(),

        task: task,

        time: "No specific time",

        date: "Today",

        originalText:
            "Quick reminder: " +
            task,

        created:
            new Date()
            .toLocaleString()

    };


    reminders.push(reminder);


    saveReminders();


    displayReminders();


    document
        .getElementById("assistantStatus")
        .innerText =
        "✅ Reminder saved";
        document
        .getElementById("aiUnderstanding")
        .innerHTML = `

        <b>Intent:</b> Reminder<br>

        <b>Task:</b>
        ${escapeHTML(task)}<br>

        <b>Date:</b>
        ${escapeHTML(reminder.date)}<br>

        <b>Time:</b>
        ${escapeHTML(reminder.time)}

    `;


    speak(
        "Okay. I have saved your reminder."
    );

}


/* =====================================================
   EXTRACT TASK
===================================================== */

function extractTask(text) {

    let task = text;


    /*
       Remove common reminder phrases.
    */

    task =
        task.replace(
            /remind me to/gi,
            ""
        );


    task =
        task.replace(
            /remind me/gi,
            ""
        );


    task =
        task.replace(
            /remember to/gi,
            ""
        );


    task =
        task.replace(
            /please/gi,
            ""
        );


    /*
       Remove time expressions.
    */

    task =
        task.replace(
            /\bat\s+\d{1,2}(:\d{2})?\s*(am|pm)?/gi,
            ""
        );


    task =
        task.replace(
            /\btomorrow\b/gi,
            ""
        );


    task =
        task.replace(
            /\btoday\b/gi,
            ""
        );


    task =
        task.trim();


    /*
       Capitalize first letter.
    */

    if(task.length > 0) {

        task =
            task.charAt(0).toUpperCase() +
            task.slice(1);

    }


    return task;

}


/* =====================================================
   EXTRACT TIME
===================================================== */

function extractTime(text) {

    const match =
        text.match(
            /\b(\d{1,2})(?::(\d{2}))?\s*(AM|PM|am|pm)\b/
        );


    if(match) {

        return match[0];

    }


    const timeWords = {

        morning: "Morning",

        afternoon: "Afternoon",

        evening: "Evening",

        night: "Night"

    };


    const lower =
        text.toLowerCase();


    for(const word in timeWords) {

        if(lower.includes(word)) {

            return timeWords[word];

        }

    }


    return "";

}


/* =====================================================
   EXTRACT DATE
===================================================== */

function extractDate(text) {

    const lower =
        text.toLowerCase();


    if(lower.includes("tomorrow")) {

        return "Tomorrow";

    }


    if(lower.includes("today")) {

        return "Today";

    }


    return "Today";

}


/* =====================================================
   QUICK REMINDER
===================================================== */

function quickReminder(task) {

    const reminder = {

        id: Date.now(),

        task: task,

        time: "No specific time",

        date: "Today",

        originalText:
            "Quick reminder: " +
            task,

        created:
            new Date()
            .toLocaleString()

    };


    reminders.push(reminder);


    saveReminders();


    displayReminders();


    document
        .getElementById("assistantStatus")
        .innerText =
        "✅ Reminder saved";


    document
        .getElementById("aiUnderstanding")
        .innerHTML = `

        <b>Intent:</b> Reminder<br>

        <b>Task:</b>
        ${escapeHTML(task)}<br>

        <b>Date:</b>
        Today

    `;


    speak(
        "Okay. I have saved your reminder for " +
        task
    );

}


/* =====================================================
   SAVE REMINDERS
===================================================== */

function saveReminders() {

    localStorage.setItem(
        "cogniReminders",
        JSON.stringify(reminders)
    );

}


/* =====================================================
   DISPLAY REMINDERS
===================================================== */

function displayReminders() {

    const list =
        document.getElementById(
            "assistantReminderList"
        );


    if(!list)
        return;


    list.innerHTML = "";


    if(reminders.length === 0) {

        list.innerHTML = `

            <div class="reminder">

                <div>
                    No reminders yet.
                </div>

            </div>

        `;

    }


    reminders.forEach(
        reminder => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "reminder";


            item.innerHTML = `

                <div>

                    <strong>
                        🔔 ${escapeHTML(
                            reminder.task
                        )}
                    </strong>


                    <span>

                        📅 ${escapeHTML(
                            reminder.date
                        )}

                        &nbsp;&nbsp;

                        ⏰ ${escapeHTML(
                            reminder.time
                        )}

                    </span>


                    <small>

                        <br>
                        Added:
                        ${escapeHTML(
                            reminder.created
                        )}

                    </small>

                </div>


                <button
                    class="delete"
                    onclick="deleteReminder(${reminder.id})">

                    🗑️

                </button>

            `;


            list.appendChild(item);

        }
    );


    const count =
        document.getElementById(
            "reminderCount"
        );


    if(count) {

        count.innerText =
            reminders.length +
            " reminder(s) stored locally.";

    }

}


/* =====================================================
   DELETE REMINDER
===================================================== */

function deleteReminder(id) {

    reminders =
        reminders.filter(
            reminder =>
            reminder.id !== id
        );


    saveReminders();


    displayReminders();


    speak(
        "Reminder deleted."
    );

}


/* =====================================================
   TEXT TO SPEECH
===================================================== */

function speak(text) {

    if(
        !("speechSynthesis" in window)
    )
        return;


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    const language =
        document
        .getElementById("language")
        ?.value || "en";


    const speechLanguages = {

        en: "en-IN",

        ta: "ta-IN",

        hi: "hi-IN",

        te: "te-IN",

        kn: "kn-IN",

        mr: "mr-IN",

        as: "as-IN"

    };


    speech.lang =
        speechLanguages[language] ||
        "en-IN";


    /*
       Slower speech is more suitable
       for the elderly-focused prototype.
    */

    speech.rate =
        0.85;


    speech.pitch =
        1;


    window.speechSynthesis
        .speak(speech);

}


/* =====================================================
   SCORE
===================================================== */

function increaseScore(points) {

    score += points;


    localStorage.setItem(
        "cogniScore",
        score
    );

}


/* =====================================================
   GAME COMPLETION
===================================================== */

function finishGame() {

    gamesPlayed++;


    localStorage.setItem(
        "cogniGames",
        gamesPlayed
    );


    /*
       Demonstration adaptive difficulty.
    */

    if(score >= 20) {

        difficulty = 2;

    }


    if(score >= 50) {

        difficulty = 3;

    }


    localStorage.setItem(
        "cogniDifficulty",
        difficulty
    );


    updateDashboard();

}


/* =====================================================
   CAREGIVER DASHBOARD
===================================================== */

function updateDashboard() {

    const scoreElement =
        document.getElementById("score");


    const gamesElement =
        document.getElementById(
            "gamesPlayed"
        );


    const levelElement =
        document.getElementById("level");


    const progress =
        document.getElementById(
            "progressBar"
        );


    const trend =
        document.getElementById("trend");


    if(scoreElement) {

        scoreElement.innerText =
            score;

    }


    if(gamesElement) {

        gamesElement.innerText =
            gamesPlayed;

    }


    if(levelElement) {

        levelElement.innerText =
            difficulty;

    }


    if(progress) {

        const percentage =
            Math.min(score,100);


        progress.style.width =
            percentage + "%";

    }


    if(trend) {

        if(score >= 50) {

            trend.innerText =
                "📈 Positive performance trend.";

        }

        else if(score >= 20) {

            trend.innerText =
                "🙂 Performance is improving.";

        }

        else {

            trend.innerText =
                "🌱 Keep practising regularly.";

        }

    }


    const aiText =
        document.getElementById("aiText");


    if(aiText) {

        if(difficulty === 1) {

            aiText.innerText =
                "The user is currently at the basic activity level.";

        }

        else if(difficulty === 2) {

            aiText.innerText =
                "Good performance detected. Activity difficulty can be increased.";

        }

        else {

            aiText.innerText =
                "Higher performance level detected in this prototype.";

        }

    }


    const count =
        document.getElementById(
            "reminderCount"
        );


    if(count) {

        count.innerText =
            reminders.length +
            " reminder(s) stored locally.";

    }

}


/* =====================================================
   OFFLINE SUPPORT
===================================================== */

function registerOfflineSupport() {

    if(
        !("serviceWorker" in navigator)
    )
        return;


    navigator.serviceWorker
        .register("./sw.js")
        .then(
            () => {

                console.log(
                    "CogniCare offline support enabled."
                );

            }
        )
        .catch(
            error => {

                console.log(
                    "Offline support error:",
                    error
                );

            }
        );

}


/* =====================================================
   ONLINE / OFFLINE STATUS
===================================================== */

function updateConnection() {

    const status =
        document.getElementById(
            "connectionStatus"
        );


    if(!status)
        return;


    if(navigator.onLine) {

        status.innerText =
            "● Online • Sync Available";

    }

    else {

        status.innerText =
            "● Offline Mode";

    }

}


window.addEventListener(
    "online",
    updateConnection
);


window.addEventListener(
    "offline",
    updateConnection
);


/* =====================================================
   HTML SECURITY
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(text);


    return div.innerHTML;

}


/* =====================================================
   APPLICATION STARTUP
===================================================== */

window.addEventListener(
    "load",
    function() {

        registerOfflineSupport();

        updateConnection();

        updateDashboard();

        displayReminders();


        /*
           Restore previously selected language.
        */

        const savedLanguage =
            localStorage.getItem(
                "cogniLanguage"
            );


        if(savedLanguage) {

            const language =
                document.getElementById(
                    "language"
                );


            if(language) {

                language.value =
                    savedLanguage;

            }

        }

    }
);
/* ==========================================
   CogniCare NER
   Prototype JavaScript
========================================== */


/* ================= DATA ================= */

let score =
    Number(localStorage.getItem("cogniScore")) || 0;

let gamesPlayed =
    Number(localStorage.getItem("cogniGames")) || 0;

let difficulty =
    Number(localStorage.getItem("cogniDifficulty")) || 1;


/* ================= START APP ================= */

function startApp() {

    let name =
        document.getElementById("patientName").value.trim();

    if(name === "") {

        name = "Friend";

    }

    localStorage.setItem(
        "patientName",
        name
    );

    document.getElementById("loginScreen")
        .classList.add("hidden");

    document.getElementById("mainApp")
        .classList.remove("hidden");

    document.getElementById("welcomeName")
        .innerText =
        "Good Morning, " + name + "! 👋";

    updateDashboard();

}


/* ================= SCREEN ================= */

function showScreen(name) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    document
        .getElementById(name)
        .classList.add("active");

    updateDashboard();

    window.scrollTo(0,0);

}


/* ================= LANGUAGE ================= */

const translations = {

    en: {
        welcome: "Welcome 👋",
        text: "Let's keep your mind active today."
    },

    ta: {
        welcome: "வரவேற்கிறோம் 👋",
        text: "இன்று உங்கள் மூளையை சுறுசுறுப்பாக வைத்திருப்போம்."
    },

    hi: {
        welcome: "स्वागत है 👋",
        text: "आज अपने दिमाग को सक्रिय रखें।"
    },

    te: {
        welcome: "స్వాగతం 👋",
        text: "ఈరోజు మీ మెదడును చురుకుగా ఉంచుదాం."
    },

    kn: {
        welcome: "ಸ್ವಾಗತ 👋",
        text: "ಇಂದು ನಿಮ್ಮ ಮನಸ್ಸನ್ನು ಚುರುಕಾಗಿ ಇಡೋಣ."
    },

    mr: {
        welcome: "स्वागत आहे 👋",
        text: "आज आपले मन सक्रिय ठेवूया."
    },

    as: {
        welcome: "স্বাগতম 👋",
        text: "আজি আপোনাৰ মনটো সক্ৰিয় ৰাখোঁ।"
    },

    brx: {
        welcome: "फैजा जायो 👋",
        text: "नोंथांनि मोजां मोनखौ गोसार।"
    },

    kha: {
        welcome: "Khublei 👋",
        text: "To sumar ia ka jingmut jong phi."
    },

    grt: {
        welcome: "Namaste 👋",
        text: "Let's keep your mind active today."
    },

    lus: {
        welcome: "Chibai 👋",
        text: "Kan ngaihtuahna chu kan ti chak leh ang."
    },

    trp: {
        welcome: "Khulumkha 👋",
        text: "Let's keep your mind active today."
    }

};


function changeLanguage() {

    let language =
        document.getElementById("language").value;

    let data =
        translations[language];

    if(!data)
        return;

    document.getElementById("welcome")
        ?.replaceChildren(
            document.createTextNode(data.welcome)
        );

    document.getElementById("welcomeText")
        .innerText =
        data.text;

}


/* ================= OPEN GAME ================= */

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


/* ==========================================
   GAME 1
   MY VILLAGE, MY STORY
========================================== */

function storyGame() {

    document.getElementById("gameContent")
        .innerHTML = `

        <div class="game-box">

            <h1>
                🏡 My Village, My Story
            </h1>

            <p>
                Listen carefully and remember the story.
            </p>

            <div class="story">

                Rina went to the garden in the morning.
                She saw a <b>cow</b> near a
                <b>tree</b> and carried a
                <b>basket</b> home.

            </div>

            <button class="primary"
                    onclick="storyQuestion()">

                I Remember → Ask Question

            </button>

        </div>

    `;

}


function storyQuestion() {

    document.getElementById("gameContent")
        .innerHTML = `

        <div class="game-box">

            <h2>
                🧠 Question
            </h2>

            <div class="story">

                Where was the cow?

            </div>

            <button class="answer"
                    onclick="storyAnswer(false)">

                🏠 Near the house

            </button>

            <button class="answer"
                    onclick="storyAnswer(true)">

                🌳 Near the tree

            </button>

            <button class="answer"
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

        document.getElementById("result")
            .innerHTML =
            "<h3>✅ Correct! Great memory!</h3>";

    }

    else {

        document.getElementById("result")
            .innerHTML =
            "<h3>💡 Good try! Keep practising.</h3>";

    }

    finishGame();

}


/* ==========================================
   GAME 2
   MARKET BASKET MEMORY
========================================== */

let selectedItems = [];


function marketGame() {

    selectedItems = [];

    document.getElementById("gameContent")
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

            <button class="primary"
                    onclick="showMarket()">

                I Remember →

            </button>

        </div>

    `;

}


function showMarket() {

    document.getElementById("gameContent")
        .innerHTML = `

        <div class="game-box">

            <h2>
                🧺 Build Your Basket
            </h2>

            <p>
                Select the three items you remember.
            </p>

            <div class="items">

                <button class="item"
                        onclick="selectItem(this,'rice')">

                    🍚 Rice

                </button>

                <button class="item"
                        onclick="selectItem(this,'banana')">

                    🍌 Banana

                </button>

                <button class="item"
                        onclick="selectItem(this,'vegetable')">

                    🥕 Vegetable

                </button>

                <button class="item"
                        onclick="selectItem(this,'milk')">

                    🥛 Milk

                </button>

                <button class="item"
                        onclick="selectItem(this,'apple')">

                    🍎 Apple

                </button>

                <button class="item"
                        onclick="selectItem(this,'oil')">

                    🫙 Oil

                </button>

            </div>

            <button class="primary"
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
            x => selectedItems.includes(x)
        );

    const extra =
        selectedItems.some(
            x => !required.includes(x)
        );


    if(correct && !extra) {

        increaseScore(10);

        document.getElementById("basketResult")
            .innerHTML =
            "<h3>✅ Perfect shopping memory!</h3>";

    }

    else {

        document.getElementById("basketResult")
            .innerHTML =
            "<h3>💡 Check your basket again.</h3>";

    }

    finishGame();

}


/* ==========================================
   GAME 3
   VOICE MEMORY JOURNEY
========================================== */

function voiceGame() {

    document.getElementById("gameContent")
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

            <button class="mic"
                    onclick="startVoice()">

                🎤

            </button>

            <div id="voiceResult"
                 class="voice-result">

                Tap the microphone and tell me
                what you remember.

            </div>

        </div>

    `;

}


function startVoice() {

    const result =
        document.getElementById("voiceResult");


    if(!("webkitSpeechRecognition" in window)) {

        result.innerHTML =
            "🎤 Voice recognition is not available in this browser.";

        return;

    }


    const recognition =
        new webkitSpeechRecognition();


    const selectedLanguage =
        document.getElementById("language")
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
        voiceLanguages[selectedLanguage] ||
        "en-IN";


    recognition.start();


    result.innerHTML =
        "🎤 Listening...";


    recognition.onresult =
        function(event) {

            const spoken =
                event.results[0][0]
                    .transcript;

            result.innerHTML =
                "You said:<br><br><b>" +
                spoken +
                "</b>";

            checkVoiceMemory(
                spoken.toLowerCase()
            );

        };


    recognition.onerror =
        function() {

            result.innerHTML =
                "Please try speaking again.";

        };

}


function checkVoiceMemory(answer) {

    let matches = 0;


    if(
        answer.includes("water") ||
        answer.includes("தண்ணீர்")
    )
        matches++;


    if(
        answer.includes("medicine") ||
        answer.includes("மருந்து")
    )
        matches++;


    if(
        answer.includes("garden") ||
        answer.includes("தோட்டம்")
    )
        matches++;


    if(matches >= 2) {

        increaseScore(10);

        document.getElementById("voiceResult")
            .innerHTML +=
            "<br><br>✅ Excellent recall!";

    }

    else {

        document.getElementById("voiceResult")
            .innerHTML +=
            "<br><br>💡 Good try! Keep practising.";

    }


    finishGame();

}


/* ==========================================
   SCORE
========================================== */

function increaseScore(points) {

    score += points;

    localStorage.setItem(
        "cogniScore",
        score
    );

}


/* ==========================================
   GAME COMPLETION
========================================== */

function finishGame() {

    gamesPlayed++;

    localStorage.setItem(
        "cogniGames",
        gamesPlayed
    );


    /*
       Prototype adaptive difficulty.

       Higher score = harder activities.
    */

    if(score >= 20)
        difficulty = 2;

    if(score >= 50)
        difficulty = 3;


    localStorage.setItem(
        "cogniDifficulty",
        difficulty
    );


    updateDashboard();

}


/* ==========================================
   DASHBOARD
========================================== */

function updateDashboard() {

    const scoreElement =
        document.getElementById("score");

    const gamesElement =
        document.getElementById("gamesPlayed");

    const levelElement =
        document.getElementById("level");

    const progress =
        document.getElementById("progressBar");

    const trend =
        document.getElementById("trend");


    if(scoreElement)
        scoreElement.innerText = score;


    if(gamesElement)
        gamesElement.innerText =
            gamesPlayed;


    if(levelElement)
        levelElement.innerText =
            difficulty;


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

}


/* ==========================================
   OFFLINE-FIRST
========================================== */

function registerOfflineSupport() {

    if(!("serviceWorker" in navigator))
        return;


    navigator.serviceWorker
        .register("./sw.js")
        .then(() => {

            console.log(
                "CogniCare offline support enabled."
            );

        })
        .catch(error => {

            console.log(
                "Offline support error:",
                error
            );

        });

}


/* ==========================================
   CONNECTION STATUS
========================================== */

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


/* ==========================================
   STARTUP
========================================== */

window.addEventListener(
    "load",
    function() {

        registerOfflineSupport();

        updateConnection();

        updateDashboard();

    }
);
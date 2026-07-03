// =====================================
// EduBot - Smart Campus Assistant
// script.js - Part 1
// =====================================

// Get Elements
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const themeBtn = document.getElementById("themeBtn");
const welcomeUser = document.getElementById("welcomeUser");

// Welcome User
const studentName = localStorage.getItem("studentName") || "Student";
welcomeUser.innerHTML = "👋 Welcome, " + studentName;

// Dark Mode
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Enter Key
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// Quick Reply
function quickReply(text) {
    userInput.value = text;
    sendMessage();
}

// User Message
function addUserMessage(message) {

    chatBox.innerHTML += `
    <div class="user">
        ${message}
    </div>
    `;

    scrollChat();
}

// Bot Message
function addBotMessage(message) {

    chatBox.innerHTML += `
    <div class="bot">
        ${message}
    </div>
    `;

    scrollChat();
    speak(message.replace(/<[^>]+>/g, ""));
}

// Scroll
function scrollChat() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send Message
function sendMessage() {

    const msg = userInput.value.trim();

    if (msg === "") return;

    addUserMessage(msg);

    userInput.value = "";

    setTimeout(() => {
        botReply(msg.toLowerCase());
    }, 700);
}

// Voice Output
function speak(text) {

    if ("speechSynthesis" in window) {

        let speech = new SpeechSynthesisUtterance();

        speech.text = text;
        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;

        speechSynthesis.speak(speech);
    }
}

// Voice Input
function startVoice() {

    if (!("webkitSpeechRecognition" in window)) {
        alert("Voice Recognition is not supported.");
        return;
    }

    let recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function (event) {

        userInput.value = event.results[0][0].transcript;

        sendMessage();
    };
}
// =====================================
// script.js - Part 2
// Bot Reply Function
// =====================================

function botReply(msg) {

    let reply = "";

    // Greeting

    if (msg.includes("hi") || msg.includes("hello")) {

        reply = `
        👋 Hello <b>${studentName}</b>

        <br><br>

        Welcome to EduBot.

        <br><br>

        I can help you with

        <br>

        📊 Attendance

        <br>

        🎓 CGPA

        <br>

        💼 Placement

        <br>

        📚 Subjects

        <br>

        📖 Library

        <br>

        ❓ Interview
        `;

    }

    // Attendance

    else if (msg.startsWith("attendance")) {

        let data = msg.match(/\d+/g);

        if (data && data.length >= 2) {

            let present = Number(data[0]);

            let total = Number(data[1]);

            let percent = ((present / total) * 100).toFixed(2);

            reply = `
            <b>📊 Attendance Result</b>

            <br><br>

            Present Days : ${present}

            <br>

            Total Days : ${total}

            <br>

            Attendance : <b>${percent}%</b>

            <br><br>

            ${percent >= 75 ?
            "✅ Eligible for Semester Exam"
            :
            "❌ Attendance Shortage"}

            `;

        }

        else {

            reply = `
            📊 Attendance Calculator

            <br><br>

            Type like this

            <br><br>

            present days = 82 
            <br>
            Total days = 90

            <br><br>

            (Present Days) =
             (Total Days)
            `;

        }

    }

    // CGPA

    else if (msg.startsWith("cgpa")) {

        let gpa = msg.match(/\d+(\.\d+)?/g);

        if (gpa && gpa.length > 0) {

            let total = 0;

            gpa.forEach(function(item) {

                total += Number(item);

            });

            let cgpa = (total / gpa.length).toFixed(2);

            let percentage = (cgpa * 9.5).toFixed(2);

            reply = `
            <b>🎓 CGPA Result</b>

            <br><br>

            CGPA : <b>${cgpa}</b>

            <br>

            Percentage : <b>${percentage}%</b>

            `;

        }

        else {

            reply = `
            🎓 CGPA Calculator

            <br><br>

            Example

            <br><br>

             CGPA=Number of Semesters / Sum of all Semester GPAs​<br><br>
             8.2+8.5+8.8+9.1/4<br><br>
             ​434.6<br><br>
             ​8.65

            `;

        }

    }

    // Placement

    else if (msg.includes("placement")) {

        reply = `
        <b>💼 Placement Preparation</b>

        <br><br>

        ✅ Aptitude

        <br>

        ✅ Java

        <br>

        ✅ SQL

        <br>

        ✅ HTML CSS JavaScript

        <br>

        ✅ Resume

        <br>

        ✅ Mock Interview
        `;

    }

    // Interview

    else if (msg.includes("interview")) {

        reply = `
        <b>❓ Top Interview Questions</b>

        <br><br>

        • Tell me about yourself

        <br>

        • Why should we hire you?

        <br>

        • Strengths

        <br>

        • Weaknesses

        <br>

        • Explain your project
        `;

    }
        // Subjects

    else if (msg.includes("subject") || msg.includes("subjects")) {

        reply = `
        <b>📚 CSE Subjects</b>

        <br><br>

        • Java Programming

        <br>

        • Database Management System

        <br>

        • Computer Networks

        <br>

        • Artificial Intelligence

        <br>

        • Web Technology

        <br>

        • Operating System
        `;

    }

    // Library

    else if (msg.includes("library")) {

        reply = `
        <b>📖 Library Details</b>

        <br><br>

        🕘 Opening Time : 9:00 AM

        <br>

        🕠 Closing Time : 5:30 PM

        <br><br>

        Available Books

        <br>

        📘 Programming

        <br>

        📗 AI

        <br>

        📙 DBMS

        <br>

        📕 Networking
        `;

    }

    // Bus Timing

    else if (msg.includes("bus")) {

        reply = `
        <b>🚌 College Bus Timing</b>

        <br><br>

        Morning : 8:15 AM

        <br>

        Evening : 4:45 PM
        `;

    }

    // College Timing

    else if (msg.includes("college")) {

        reply = `
        <b>🏫 College Timing</b>

        <br><br>

        Monday - Friday

        <br><br>

        🕘 9:00 AM

        <br>

        🕟 4:30 PM
        `;

    }

    // Thank You

    else if (msg.includes("thank")) {

        reply = `
        😊 You're Welcome!

        <br><br>

        Happy Learning ❤️
        `;

    }

    // Bye

    else if (msg.includes("bye")) {

        reply = `
        👋 Goodbye

        <br><br>

        Have a Nice Day 😊
        `;

    }

    // Default Reply

    else {

        reply = `
        ❌ Sorry!

        <br><br>

        I didn't understand your question.

        <br><br>

        Try asking:

        <br><br>

        📊 attendance 80 %

        <br>

        🎓 cgpa CGPA=Number of SemestersSum of all Semester GPAs​

        <br>

        💼 placement

        <br>

        ❓ interview

        <br>

        📚 subjects

        <br>

        📖 library

        <br>

        🚌 bus

        <br>

        🏫 college
        `;

    }

    addBotMessage(reply);

}
// ========================
// Clear Chat
// ========================

function clearChat(){

chatBox.innerHTML="";

}

// ========================
// Logout
// ========================

function logout(){

localStorage.clear();

window.location.href="login.html";

}
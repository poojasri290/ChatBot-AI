// ================================
// EduBot Login Script
// ================================

function login() {

    let name = document.getElementById("studentName").value.trim();

    let roll = document.getElementById("rollNo").value.trim();

    let dept = document.getElementById("department").value;

    // Validation

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (roll === "") {
        alert("Please enter your roll number.");
        return;
    }

    if (dept === "") {
        alert("Please select your department.");
        return;
    }

    // Save Data

    localStorage.setItem("studentName", name);
    localStorage.setItem("rollNo", roll);
    localStorage.setItem("department", dept);

    // Success Message

    alert("Login Successful!");

    // Redirect

    window.location.href = "index.html";
}

// Auto Login

window.onload = function () {

    let name = localStorage.getItem("studentName");

    if (name != null) {

        window.location.href = "index.html";

    }

};
// Getting and submit data from form contact
function submitData() {
    let name = document.getElementById("input-name").value;
    let email = document.getElementById("input-email").value;
    let phoneNumber = document.getElementById("input-number").value;
    let subject = document.getElementById("input-subject").value;
    let message = document.getElementById("input-message").value;

    if (name === "" || email === "" || phoneNumber === "" || subject === "" || message === "") {
        return alert("Form must be filled")
    } else if (!hasOnlyDigit(phoneNumber)) {
        return alert("Phone number must be valid number")
    }

    let emailReceiver = "daniperianto007@gmail.com"
    let a = document.createElement("a");
    a.href = ` https://mail.google.com/mail/?view=cm&fs=1&to=${emailReceiver}&su=${subject}&body=Halo, nama saya ${name}, ${message}. Tolong hubungi saya di nomor ${phoneNumber} atau email saya di ${email}.`;
    a.target = "_blank";
    a.click();
}

// Check if string contains only number or not
function hasOnlyDigit(number) {
    return /^[0-9]+$/.test(number)
}
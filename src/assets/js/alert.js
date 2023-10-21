const notifier = require("node-notifier");

const alert = function (message) {
    notifier.notify({
        title: "Alert!",
        message: message,
        appID: "Personal Web"
    })
}

const notification = function (message) {
    notifier.notify({
        title: "Notification",
        message: message,
        appID: "Personal Web"
    })
}

module.exports = { alert, notification };
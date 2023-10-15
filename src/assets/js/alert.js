const notifier = require("node-notifier");

const alert = function (message) {
    notifier.notify({
        title: "Alert!",
        message: message,
        appID: "Add Project"
    })
}

module.exports = alert;
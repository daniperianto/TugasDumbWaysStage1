const IDNdateParser = function (date) {
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getYear() + 1900; // for some reason year start from 1900;
    let dayInString = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"];

    return `${day} ${dayInString[month]} ${year}`;
}

module.exports = IDNdateParser;
var emails = ["demo@demo.com", "ademo@dsemo.com", "zopa@yahoo.com", "abzon@yahoo.com", "gamog@yahoo.com", "kevin.dam@gmail.com",
    "joem@gmail.com", "hsmld@yahoo.com","ahsmld@yahoo.com","basmld@yahoo.com", "kammld@yahoo.com", "henld@yahoo.com"];

function IsC(value) {
    var firstChar = value.substr(0, 3);
    if (firstChar.toLowerCase() == "css")
        return true;
    else
        return false;
}



function filteringEmails(word, emails) {

    var test = [];

    if (word.length != 0) {

        for (var n = 0; n < emails.length; n++) {

            var firstCh = emails[n].substring(0, word.length);

            if (firstCh.toLowerCase() === word.toLowerCase()) {

                test.push(emails[n]);
            }
        }
    }
    return test;
}

var tt = filteringEmails("a", emails);


for (var t = 0; t < tt.length; t++) {

    document.write(tt[t] + "\n");

}





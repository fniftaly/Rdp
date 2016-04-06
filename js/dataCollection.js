/*GLOBAL VARIABLES*/
var str = "";

var services = {
    keyCodes: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105],
    emails: [],
    valcode: [],
    customer: [],
    phone: [],
    phone_to_email: [],
    bdlist:[],
    merchant_id: function () {
        return $('#mrtID').val();
    },
    business_id: function () {
        return $('#clbID').val();
    },
    phoneReq: function () {
        $('#pReq').val('');
    },
    couponCodeReset: function (placeholder) {

        $('#inputError2').attr('placeholder', placeholder);
    },
    strToNumber: function (str) {
        var numb = str.match(/\d/g);
        numb = numb.join("");
        return numb;
    }

};
services.data = 0;
services.month = function () {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
};
services.placeHolderForEmail = "Enter first 3 letters of email";

services.placeHolderForCoupon = "Type Coupon Code";

services.local = {registiration: "Customer Registration",
    reg_form_name: "Registration Form",
    regPopUp: "System has detected that your email address is not registered for this location. " +
            "We recommend you register your email address, first name, last name and birth day and month to get loyalty program gifts and other rewards from us",
    phone: "ENTER PHONE NUMBER",
    header: "Redeem Rewards",
    couponCode: "TYPE COUPON CODE",
    badcoupon: "Invalid coupon",
    redeemed: "Reward redeemed on ",
    nomatch: 'NO MATTCHING #',
    nomatchemail: 'No matching email',
    marked: "Reward marked as redeem",
    expired: 'Reward expired on ',
    notredeemable: "No redeemable reward",
    bd: "Birthday: ",
    bdnot: "Birthday: Not known",
    per_rwd_aday: "Thanks for checking in again today. We give one reward per day."}; //Hаграда просрочень

var w = screen.width;
var h = screen.height;



function overlay() {
    var docHeight = $(document).height();
    $("body").append("<div id='overlay'></div>");
    $("#overlay").height(docHeight);
    $('#user_info').css('z-index', '5555');
}


/**
 *  filtering emails
 *  from text field
 */
services.filteringEmails = function (word, emails) {

    var filtered = [];

    if (word.length != 0) {

        for (var n = 0; n < emails.length; n++) {

            var firstCh = emails[n].substring(0, word.length);

            if (firstCh.toLowerCase() === word.toLowerCase()) {

                filtered.push(emails[n]);
            }
        }
    }
    return filtered;
};

Date.prototype.toMysqlFormat = function () {
    function pad(n) {
        return n < 10 ? '0' + n : n;
    }
    return this.getFullYear() + "-" + pad(1 + this.getMonth()) + "-" +
            pad(this.getDate()) + " " + pad(this.getHours()) + ":" +
            pad(this.getMinutes()) + ":" + pad(this.getSeconds());
};
services.TimeNow = new Date().toMysqlFormat();


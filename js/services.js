var Month = services.month();
var latestRdm = 0;
services.mrName = function (info) {
    $.ajax({
        type: 'POST',
        url: "src/phpfiles/merchantName.php",
        data: info,
        success: function (data) {
            if (data === "ERROR 500" || data === "NO CONNECTION")
            {
                $('#comp_name').text(data).css('color', '#FF6633');
                $('#mrtID').val('');
                $('#clbID').val('');
            }
            else
            {
                var arr = JSON.parse(data);
                $('#comp_name').text(arr['business_name']);
                $('#mrtID').val(arr['merchant_id']);
                $('#clbID').val(arr['business_id']);
            }
        }
    });
};
/**
 * 
 * @param {type} info
 * @returns {undefined}
 * 
 */
services.emailRequest = function (info) {
    $.ajax({
        type: 'POST',
        url: "src/phpfiles/emailRequest.php",
        data: info,
        async: false,
        success: function (data) {
            if (data !== "NODATA")
            {
                services.phone = null;
                var arr = JSON.parse(data);
                services.emails = arr['allemails'];
                services.valcode = arr['valcode'];
                services.customer = arr['name'];
                services.phone = arr['phone'];
                services.phone_to_email = arr['em_to_pn'];
                services.birth_day_month = arr['birth_day_month'];
                services.cust_id = arr['cust_id'];
                services.bdlist = arr['bd'];
            }
        }
    });
};

/*
 * @param {type} info
 * @returns {undefined}
 * test lines
 */

services.rwdRedemtion = function (info) {
    var clientTime = services.TimeNow;
//    info = info + "&clientTeim="+clientTime;
    $.ajax({
        type: 'POST',
        url: "src/phpfiles/redemtion.php",
        data: info,
        success: function (data) {
            if (!data)
            {
                defaultDisplay(services.local.badcoupon);
            }
            else
            {
                /**
                 *  Reward is not expired and is not redeemed
                 *  it can be redeemed
                 *  <div id="user_info">
                 <table>
                 <tr><td id="top_tr"><span id="rwd_text"></span></td></tr>
                 <tr><td id="client_name"></td></tr>
                 <tr><td id="rwd_type"></td></tr>
                 <tr><td id="tr_redeem_rdm"><button id="redeem_rdm">Redeem</button></td></tr>
                 <tr><td id="tr_cancel"><button id="close_info_popup">Cancel</button></td></tr>             
                 </table>
                 </div>
                 */
                var info = JSON.parse(data);
//                alert(JSON.stringify(info));
                if (info['redeem'] === null && info['exp_date'] > clientTime) {
                    /*check for the latest redemtion  .....*/
                    var rdmLast = $.xResponse("src/phpfiles/lastRedemtion.php",
                            {'couponcode': $('#inputError2').val(), 'businessId': $('#clbID').val()});
                    if (rdmLast != 0) {
                        defaultDisplay(services.local.per_rwd_aday);
                    }
                    else
                    {
                        displayRwd(info);
                    }
                } else {
                    /**
                     *  Reward is expired
                     *  <div id="user_info">
                     <table>
                     <tr><td id="top_tr"><span id="rwd_text"></span></td></tr>
                     <tr><td id="redeemed_response">Reward is expired</td></tr>
                     <tr><td id="client_name"></td></tr>
                     <tr><td id="rwd_type"></td></tr>
                     <tr><td id="tr_redeem_ok"><button id="redeem_ok">OK</button></td></tr>
                     </table>
                     </div>
                     */
                    if (info['redeem'] === null && info['exp_date'] < clientTime) {
                        displayExprd(info);
                    }
                    /**
                     * Redeemed
                     *<div id="user_info">
                     <table>
                     <tr><td id="top_tr"><span id="rwd_text"></span></td></tr>
                     <tr><td id="redeemed_response">Reward redeemed on ...</td></tr>
                     <tr><td id="client_name"></td></tr>
                     <tr><td id="rwd_type"></td></tr>
                     <tr><td id="tr_redeem_ok"><button id="redeem_ok">OK</button></td></tr>
                     </table>
                     </div>
                     */
                    else if (info['redeem'] !== null) {
                        displayRedeemed(info);
                    }
                }
            }
            str = '';
//            console.log("redemtion");
        }
    });
};

$.extend({
    xResponse: function (url, data) {
        // local var
        var theResponse = null;
        // jQuery ajax
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            dataType: "html",
            async: false,
            success: function (respText) {
                theResponse = respText;
            }
        });
        // Return the response text
        return theResponse;
    }
});

services.updateReward = function (code) {
    var id = "code=" + code;
    $.ajax({
        type: 'POST',
        url: "src/phpfiles/updatereward.php",
        data: id,
        success: function (data) {
            if (data == 0)
            {
                $('#coupon_type').text(code + ' redeeming is failed');
                $('#clear_input').css('display', 'none');
                str = '';
                $('#inputError2').val('');
            }
            else
            {
                $('#clear_input').css('display', 'none');
                setTimeout(function () {
                    $('#inputError2').val('');
                    str = '';
                    $('#clear_input').css('display', 'none');
                }, 3000);
            }

        }
    });
};

services.dateFormat = function (data) {

    var indx = data.indexOf(" ");

    var y_d_m = data.substring(0, indx);

    var arr = y_d_m.split('-');

    var short_y = arr[0].substring(2);

    var dataFormat = arr[2] + " " + Month[arr[1] - 1] + " " + short_y;

    return dataFormat;
};


function resetPopUpFields() {
    $('#user_info table td').css('display', 'none');
//    $('#user_info table td').text('');
}
function displayPopUp(w, h) {
    $('#user_info').fadeIn();
    var obw = w / 2 - $('#user_info').width() / 2;
    var obh = h / 3- $('#user_info').height() / 3;
    $('#user_info').css({'top': obh, 'left': obw});
}
function displayPopUpIn() {
    $('#user_info').fadeIn('fast');
    var _w = $('.container').width();
    var _h = $('.container').height();
    var _offset = $('.container').offset();

    var obw = _offset.left + (_w / 1.80 - $('#user_info').width() / 2);
    var obh = _h / 3 - $('#user_info').height() / 3;
    $('#user_info').css({'top': obh, 'left': obw});
}

function defaultDisplay(textType) {
    resetPopUpFields();
    $('#top_tr').css({'background': '#31b0d5', 'color': 'black', 'text-align': 'center', 'height': 'auto', 'display': 'block'});
    $('#rwd_text').text(textType).css({'margin': '10px', 'color': 'black'});
    

    $('#tr_redeem_cancel_ok').css('display', 'block');
    displayPopUpIn();
    setTimeout(function () {
        $('#clear_input').css('display', 'none');
    }, 3000);
}
function defaultNotRedeemAble(textType,info,bdm) {
    resetPopUpFields();
    $('#top_tr').css({'background': '#31b0d5', 'color': 'black', 'text-align': 'center', 'height': 'auto', 'display': 'block'});
    $('#rwd_text').text(textType).css({'margin': '10px', 'color': 'black'});
    
    $('#client_name').text(info).css('display', 'block');
    
    $('#rwd_type').text(bdm).css('display', 'block');

    $('#tr_redeem_cancel_ok').css('display', 'block');
    
    displayPopUpIn();
    
    setTimeout(function () {
        $('#clear_input').css('display', 'none');
    }, 3000);
}


function displayRwd(info) {
    resetPopUpFields();
    var dmt = '';
    $('#rwd_type_desc').css({'background': '#31b0d5',
        'height': '30px', 'text-align': 'center', 'display': 'block', 'color': 'white', 'margin': 'auto'});

    $('#rwd_txt_desc').text(info['descr']).css({'color': 'white', 'padding': '5px', 'font-size': '16px', 'background': '#31b0d5'});

    $('#client_name').text(info['fname'] + " " + info['lname']).css('display', 'block');

    $('#top_tr').css({'background': '#E0EAF4', 'display': 'block', 'text-align': 'center', 'height': 'auto'});

    $('#rwd_text').text(info['dtext']).css({'margin': '10px', 'color': 'black'});

    if (info['day'] === '' || Month[info['month'] - 1] === '') {
        dmt = services.local.bdnot;
    } else {
        dmt = services.local.bd + info['day'] + " " + Month[info['month'] - 1];
    }

    $('#rwd_type').text(dmt).css('display', 'block');
    $('#tr_redeem_rdm').css('display', 'block');
    $('#tr_cancel').css('display', 'block');
    displayPopUpIn();
}

function displayRedeemed(info) {
    resetPopUpFields();
    var dmt = '';
    $('#rwd_type_desc').css({'background': '#31b0d5',
        'height': '30px', 'text-align': 'center', 'display': 'block', 'color': 'white', 'margin': 'auto'});

    $('#rwd_txt_desc').text(info['descr']).css({'color': 'white', 'padding': '5px', 'font-size': '16px', 'background': '#31b0d5'});
    $('#client_name').text(info['fname'] + " " + info['lname']).css('display', 'block');
    
    if (info['day'] === '' || Month[info['month'] - 1] === '') {
        dmt = services.local.bdnot;
    } else {
        dmt = services.local.bd + info['day'] + " " + Month[info['month'] - 1];
    }
    
    $('#rwd_type').text(dmt).css('display', 'block');

    $('#top_tr').css({'background': 'red', 'color': 'white', 'height': 'auto', 'display': 'block', 'text-align': 'center'});
    $('#rwd_text').text(services.local.redeemed + services.dateFormat(info['redeem'])).css({'margin': '10px'});

    $('#tr_redeem_cancel_ok').css('display', 'block');
    displayPopUpIn();
//    setTimeout(function () {
//        $('#inputError2').val('');
//        str = '';
//        $('#clear_input').css('display', 'none');
//        $('#user_info').fadeOut('slow');
//        $('#tr_redeem_cancel_ok').css('display', 'none');
//        $('#overlay').remove();
//    }, 6000);
}
function displayExprd(info) {
    resetPopUpFields();
    var dm = '';
    $('#rwd_type_desc').css({'background': '#31b0d5',
        'height': '30px', 'text-align': 'center', 'display': 'block', 'color': 'white', 'margin': 'auto'});
    $('#rwd_txt_desc').text(info['descr']).css({'color': 'white', 'padding': '5px', 'font-size': '16px', 'background': '#31b0d5'});


    $('#client_name').text(info['fname'] + " " + info['lname']).css('display', 'block');

    if (info['day'] === undefined || Month[info['month'] - 1] === undefined) {
        dm = services.local.bdnot;
    } else {
        dm = services.local.bd + info['day'] + " " + Month[info['month'] - 1];
    }

    $('#rwd_type').text(dm).css('display', 'block');
//    
    $('#top_tr').css({'background': 'red', 'color': 'white', 'height': 'auto', 'display': 'block', 'text-align': 'center'});
    $('#rwd_text').text(services.local.expired + services.dateFormat(info['exp_date'])).css({'margin': '10px'});

    $('#tr_redeem_cancel_ok').css('display', 'block');
    displayPopUpIn();
}
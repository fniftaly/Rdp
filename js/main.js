
$(document).ready(function (e) {
    str = "";
    $('#clear_input').css('display', 'none');
    $('#coupon_type').text(services.local.header);
    $('#inputError2').attr('placeholder', services.placeHolderForCoupon);
    var phlng = 9;
    var count = 0;

    if (screen.width > 1200) {
        $('#inputError2').removeAttr('readonly');
        $('#inputError2').focus();
    }
    var iVal = "";
    var sCode = "";


    $('#inputError2').on('keydown keyup', function (e) { /// 12345

        var arr = services.keyCodes;

        if ($('#pReq').val() === '') {
            if ($.inArray(e.keyCode, arr) != -1)
            {

                iVal = $(this).val();

                $('#inputError2').css("color", "blue");
                if (iVal !== "") {
                    $('#clear_input').css('display', 'block');
                }

                if (iVal.length == 4)
                {
                    iVal = iVal.concat('-');
                    $(this).val(iVal);
                }
                if (iVal.length === 9) {
                    $('#inputError2').blur();
                    sCode = iVal;
                    iVal = '';
                    var rwdid = sCode;
                    var mrtID = $('#mrtID').val();
                    var clbID = $('#clbID').val();
                    if (rwdid.length === 9 && mrtID !== "" && clbID !== "") {
                        var info = "merchant_id=" + mrtID + "&business_id=" + clbID + "&couponid=" + rwdid;
                        services.rwdRedemtion(info);
                        overlay();
                    }
                }
                if (iVal.length > 9) {
                    e.preventDefault();
                    $(this).val('');
                    $(this).val(str);
                    iVal = '';
                }

            }
            else {
                $(this).val('');
                if (iVal !== '')
                    $(this).val(iVal);
                $(this).val(str);
            }
        }
    });
    if (screen.width > 1200) {
        $('#btns td .btn_d').on('click', function (e) {
            if ($('#pReq').val() !== "phone_req") {
                var vl = $(this).text();
                if (str.length < phlng) {
                    if (str.length === 4) {
                        str = str.concat('-');
                        str = str.concat(vl);
                    }
                    else {
                        str = str.concat(vl);
                    }
                    if (str.length <= phlng)
                        $('#inputError2').val(str);
                    count++;
                }
                $('#inputError2').css("color", "blue");
                if (str !== "") {
                    $('#clear_input').css('display', 'block');
                }
                /*sending coupon code to the server*/
                var rwdid = $('#inputError2').val();
                var mrtID = $('#mrtID').val();
                var clbID = $('#clbID').val();
                if (rwdid.length === 9 && mrtID !== "" && clbID !== "") {
                    $('#inputError2').blur();
                    var info = "merchant_id=" + mrtID + "&business_id=" + clbID + "&couponid=" + rwdid;
//                alert(info);
                    services.rwdRedemtion(info);
                    overlay();
                }
                /*end of server response*/
                e.preventDefault();
            }
        });
    }
    else {
        $('#btns td .btn_d').on('touchstart', function (e) {
            if ($('#pReq').val() !== "phone_req") {
                var vl = $(this).text();
                if (str.length < phlng) {
                    if (str.length === 4) {
                        str = str.concat('-');
                        str = str.concat(vl);
                    }
                    else {
                        str = str.concat(vl);
                    }
                    if (str.length <= phlng)
                        $('#inputError2').val(str);
                    count++;
                }
                $('#inputError2').css("color", "blue");
                if (str !== "") {
                    $('#clear_input').css('display', 'block');
                }
                /*sending coupon code to the server*/
                var rwdid = $('#inputError2').val();
                var mrtID = $('#mrtID').val();
                var clbID = $('#clbID').val();
                if (rwdid.length === 9 && mrtID !== "" && clbID !== "") {
                    $('#inputError2').blur();
                    var info = "merchant_id=" + mrtID + "&business_id=" + clbID + "&couponid=" + rwdid;
                    services.rwdRedemtion(info);
                    overlay();
                }
                /*end of server response*/
                e.preventDefault();
            }
        });
    }
    var phlength = 0;
    /**
     * 
     * 
     */
    if (screen.width > 1200) {
        $('#btns td button#strbckw').on('click', function () {
            str = $('#inputError2').val();
            phlength = str.length - 1;
            str = str.substring(0, phlength);
            $('#inputError2').val(str);
            $('#inputError2').css("color", "blue");
            if (str === "") {
                $('#clear_input').css('display', 'none');
            }
        });
    } else {
        $('#btns td button#strbckw').on('touchstart', function () {
            phlength = str.length - 1;
            str = str.substring(0, phlength);
            $('#inputError2').val(str);
            $('#inputError2').css("color", "blue");
            if (str === "") {
                $('#clear_input').css('display', 'none');
            }
        });
    }
    $('#clear_input').on('touchstart click', function () {
        str = '';
        $('#inputError2').focus();
        $('#inputError2').val('');
        $(this).css('display', 'none');
    });
    $('#close_info_popup').click(function () {
        $('#overlay').remove();
        str = '';
        $('#inputError2').val('');
//        services.couponCodeReset(services.local.couponCode);
//        services.phoneReq();
        $('#clear_input').css('display', 'none');
        $('#user_info').fadeOut('3000');
        $('#tr_cancel').css('display', 'none');
        if (screen.width > 1200)
            $('#inputError2').focus();
    });
    $('#redeem_rdm').click(function () {
        $('#redeemed_response').text(services.local.marked).css({'padding-left': '30px', 'padding-right': '30px'});
        $('#tr_redeem_rdm').css('display', 'none');
        $('#tr_cancel').css('display', 'none');
        $('#redeemed_response').css('display', 'block');
        $('#tr_redeem_ok').css('display', 'block');
        if (screen.width > 1200)
            $('#inputError2').focus();
    });

    $('#redeem_ok').click(function () {
        $('#overlay').remove();
        var rwdid = $('#inputError2').val();
        $('#tr_redeem_rdm').css('display', 'none');
        $('#tr_cancel').css('display', 'none');
        $('#redeemed_response').css('display', 'none');
        $('#tr_redeem_ok').css('display', 'none');
        if ($('#pReq').val() === 'phone_req') {
            var client_phone = services.strToNumber(rwdid);
            var email = services.phone_to_email[client_phone];
            console.log(email);
            var coupon_code = services.valcode[email];
            services.updateReward(coupon_code[0]);
        } else {
            services.updateReward(rwdid);
        }
        var b_id = "businessId=" + services.business_id() + "&clientTime=" + services.TimeNow;
        services.emailRequest(b_id);
        $('#user_info').css('display', 'none');
        str = '';
        $('#inputError2').val('');
        $('#clear_input').css('display', 'none');
        if (screen.width > 1200)
            $('#inputError2').focus();
    });


    $('#cancel_redeem_ok').click(function () {
        $('#overlay').remove();
        $('#user_info').css('display', 'none');
        str = '';
        $('#inputError2').val('');
//        services.couponCodeReset(services.local.couponCode);
//        services.phoneReq();
        $('#clear_input').css('display', 'none');
        if (screen.width > 1200)
            $('#inputError2').focus();

    });
    $('#coupon_code').click(function () {
        $('#overlay').remove();
        str = '';
        $('#inputError2').val('');
        services.couponCodeReset(services.local.couponCode);
        services.phoneReq();
        $('#clear_input').css('display', 'none');
        if (screen.width > 1200)
            $('#inputError2').focus();

    });



    var URLID = getMerchantCode();
    var info = "merchant_id=" + URLID;
    services.mrName(info);

});

function getMerchantCode() {
    var query = location.href;
    var pos = location.href.indexOf("?");
//    alert(query.substr(pos + 2));
    return query.substr(pos + 2);
}

function overlay() {
    var docHeight = $(document).height();
    $("body").append("<div id='overlay'></div>");
    $("#overlay").height(docHeight);
    $('#user_info').css('z-index', '5555');
}


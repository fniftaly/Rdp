
$(document).ready(function () {
    var str = "";

    $('#phone_ver').on('click', function () {

        $('#pReq').val('phone_req');

        $('#inputError2').attr('placeholder', services.local.phone);

        $('#inputError2').val('');

        $('#inputError2').focus();

        str = "";

         var clientTime = services.TimeNow;


        var data = "businessId=" + services.business_id() + "&clientTime=" + clientTime;
        
        if (services.phone.length === 0) {
            services.emailRequest(data);
        }
    });

    var _w = $('.container').width();
    var _h = $('.container').height();
    var _offset = $('.container').offset();
    $('#clear_input').css('display', 'none');
    var phlng = 12;
    if (screen.width > 1200) {
        $('#inputError2').removeAttr('readonly');
        $('#inputError2').focus();
    }
    var iVal = "";

    $('#inputError2').on('keydown keyup', function (e) {
//        alert(e.keyCode);
        var arr = services.keyCodes;
        if ($('#pReq').val() === 'phone_req') {
            if ($.inArray(e.keyCode, arr) != -1)
            {
                iVal = $(this).val();

                if (iVal.length === 1) {
                    $('#clear_input').css('display', 'block');
                }

                if (iVal.substring(0, 1) === '0')
                {
                    $(this).val('');
                } else if (iVal.substring(0, 1) === '1') {
                    phlng = 14;

                    if (iVal.substring(3, 2) === '0') {
                        iVal = iVal.substring(0, 1);
                    }
                    if (iVal.length == 1 || iVal.length == 5 || iVal.length == 9) {
                        iVal = iVal.concat('-');
                        $(this).val(iVal);
                    }
                    if (iVal.length == phlng) {
                        $('#inputError2').blur();
                        str = iVal;
                        $(this).val(str);
                        var numb = getNumbersFromString(str);
                        rdmByPhone(numb.substring(1));
                    }
                } else {
                    phlng = 12;
                    if (iVal.length == 3 || iVal.length == 7) {
                        iVal = iVal.concat('-');
                        $(this).val(iVal);
                    }
                    if (iVal.length == phlng) {
                        $('#inputError2').blur();
                        str = iVal;
                        $(this).val(str);
                        var numb = getNumbersFromString(str);
                        rdmByPhone(numb);
                    }

                }
                $('#inputError2').css("color", "blue");
            }
            else {
                $(this).val('');
                if (iVal !== '')
                    $(this).val(iVal);
                $(this).val(str);
            }
        }
    });


    $('#btns td .btn_d').on('touchstart', function () {
        var p_rwd = null, numb = null;
        if ($('#pReq').val() === "phone_req") {
            var vl = $(this).text();
            var edit = true;
            if (str.length < phlng) {

                if (str.substring(0, 1) == 1) {

                    phlng = 14;
                    if (str.substring(3, 2) === '0') {
                        str = str.substring(0, 1);
                    }
                    if ((str.length == 1 || str.length == 5 || str.length == 9) && edit)
                    {
                        str = str.concat('-');
                        str = str.concat(vl);
                    }
                    else {
                        str = str.concat(vl);
                    }
                    if (str.length === 14) {
                        var numb = getNumbersFromString(str);
                        rdmByPhone(numb.substring(1));
                    }

                }
                else {
                    phlng = 12;
                    if (str.length == 3 || str.length == 7) {
                        str = str.concat('-');
                        str = str.concat(vl);
                    }
                    else {
                        str = str.concat(vl);
                    }
                    if (str.length === 12) {
                        var numb = getNumbersFromString(str);
                        rdmByPhone(numb);
                    }
                }
                $('#inputError2').val(str);

                if (str.length === 1) {
                    $('#clear_input').css('display', 'block');
                }
            }
            $('#inputError2').css("color", "blue");
//            e.preventDefault();
        }
    });

    var phlength = 0;
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
        $('#pReq').val('');
        $('#inputError2').attr('placeholder', services.local.couponCode);
    });

    $('#r_submit').click(function () {
        overlay();
        var top = _offset.left + _w / 10;
        $('#user_register p.alert').text(services.local.regPopUp);
        $('#user_register').css({'left': top, 'top': _h / 5, 'display': 'block',
            'width': _w / 1.16, 'z-index': 5556});
    });
    /*
     * <@table id="register_alert">
     * <@button id="register_cancel">CANCEL</button>
     */
    $('#register_cancel').click(function () {
        $('#user_register').css('display', 'none');
        $('#overlay').remove();
    });
    /*
     * <@table id="register_alert">
     * <@button id="register_ok">OK</button></td>
     */
    $('#register_ok').click(function () {
        $('#register_alert').css('display', 'none');
        $('#register_form').css({'display': 'block', 'padding': '20px'});
        $('#register_form p.reg_form_title').text(services.local.reg_form_name);
    });
    /*
     * <@table id="register_form">
     * <@button id="register_form_cancel">Cancel</button>
     */
    $('#register_form_cancel').click(function () {
        $('#user_register').css('display', 'none');
        $('#overlay').remove();
    });
    /*
     * <@table id="register_form">
     * <@button id="register_submit">Submit</button> 
     */
    $('#register_submit').click(function () {

    });
});

function getNumbersFromString(str) {
    var numb = str.match(/\d/g);
    numb = numb.join("");
    return numb;
}

function rdmByPhone(numb) {
    console.log(services.phone);
    var email = null;  var cName=null; var bdm=null;
    
    if (services.phone[numb]) {
        var p_rwd_list = services.phone[numb];
        
        email = services.phone_to_email[numb];
        
        p_rwd = (services.bdlist[email])?services.bdlist[email][0]:p_rwd_list[0];
        
        var rdmLast = $.xResponse("src/phpfiles/lastRedemtion.php",
                {'couponcode': p_rwd, 'businessId': services.business_id()});
        if (rdmLast == 0) {
            var info = "merchant_id=" + services.merchant_id() +
                    "&business_id=" + services.business_id() + "&couponid=" + p_rwd +
                    "&cust_email=" + services.phone_to_email[numb];
            if (services.rwdRedemtion(info)) {
                overlay();
            }
        } else {

            email = services.phone_to_email[numb];

            cName = services.customer[email];

            notredeemable = services.local.per_rwd_aday;

            bdm = services.local.bd + services.birth_day_month[email];

            defaultNotRedeemAble(notredeemable, cName, bdm);

            setTimeout(function () {
                $('#phone_ver').trigger("click");
            }, 8000);

        }
    }
    else {
        if (services.phone_to_email[numb]) {

            email = services.phone_to_email[numb];

            cName = services.customer[email];

            notredeemable = services.local.notredeemable;

            bdm = services.local.bd + services.birth_day_month[email];

            defaultNotRedeemAble(notredeemable, cName, bdm);
        }
        else {
            defaultDisplay("Phone number not found. Try again.");//

        }
        setTimeout(function () {
            $('#phone_ver').trigger("click");
        }, 4000);
        str = '';
    }
}

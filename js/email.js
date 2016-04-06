var filterArray = [];

$(document).ready(function () {

    $('div.container site-container').css('background', 'white');

    $('#rwd_coupon').attr('placeholder', services.placeHolderForEmail);

    $('#no_matching_email').text(services.local.nomatchemail);

    $('#rwd_coupon').on('touchstart', function () {
        $(this).attr('placeholder', '');
    });

    $('#rwd_coupon').on('keyup', function () {

        var sBool = false;

        var li = "";

        var val = $(this).val();

        if (val !== '') {

            filterArray = services.filteringEmails(val, services.emails);

            sBool = true;

        } else
        {
            sBool = false;
        }

        if (filterArray.length !== 0) {
            for (var f = 0; f < filterArray.length; f++) {

                li += "<li><span class='cust-name' style='color:blue; font-weight:bold' data-email='" + filterArray[f] + "'>" +
                        services.customer[filterArray[f]] + "</span><br>\n\
                    <span class='cust-email'>(" + filterArray[f] + ")</span></li>";

            }

            $('#emails_list').html(li);
            $('#error_page').css('display', 'none');
        }
        else {
            if (filterArray.length === 0 && sBool)
                $('#error_page').css('display', 'block');
            $('#rwd_coupon').blur();
            $('#emails_list').empty();
        }
    });

    $('#error_page button').on('click', function () {
        
        $('#error_page').css({'display':'none'})
        
       $('#rwd_coupon').attr('placeholder', services.placeHolderForEmail);

        $('#btns').css('display', "none");
//
        $('#rwd_coupon').val('');

        $('#rwd_coupon').attr('placeholder', services.placeHolderForEmail);

        $('#email_div').css({'display': 'inherit'});

        $('#emails_list').empty();
    });

    var reward_coupon = 0;

    $('#emails_list').on('click', function (e) {
        
        services.TimeNow = new Date().toMysqlFormat();

        var target = $(e.target);

        if (target.is("li span.cust-name")) {

            var dataEmail = target.attr('data-email');

            $('#rwd_coupon').val(dataEmail);

            var rewards = services.valcode[dataEmail];

            /*verify if the customer already made a redemtion today....*/
            if (rewards !== undefined) {
                
                reward_coupon = (services.bdlist[dataEmail])?services.bdlist[dataEmail][0]:rewards[0];
                
                var rdmLast = $.xResponse("src/phpfiles/lastRedemtion.php",
                        {'couponcode': reward_coupon, 'businessId': $('#clbID').val()});

                if (rdmLast == 0) {

                    $('#inputError2').val(reward_coupon);

                    if ($('#inputError2').val() !== '' && $('#inputError2').val().length == 9) {

                        $('#inputError2').blur();

                        var rwdid = reward_coupon;
                        var mrtID = $('#mrtID').val();
                        var clbID = $('#clbID').val();

                        if (rwdid.length === 9 && mrtID !== "" && clbID !== "") {

                            var info = "merchant_id=" + mrtID + "&business_id=" + clbID + "&couponid=" + rwdid + "&cust_email=" + dataEmail;
                            if (services.rwdRedemtion(info)) {
                                overlay();
                            }
                        }

                    }
                } else {
                    var cName = services.customer[dataEmail];

                    var notredeemable = services.local.per_rwd_aday;

                    var bdm = services.local.bd + (services.birth_day_month[dataEmail]=="unknown")?services.local.bdnot:
                            services.birth_day_month[dataEmail];

                    defaultNotRedeemAble(notredeemable, cName, bdm);
                }
            } else if (rewards === undefined) {

                var cName = services.customer[dataEmail];

                var notredeemable = services.local.notredeemable;

                var bdm = services.local.bd + (services.birth_day_month[dataEmail]=="unknown")?services.local.bdnot:
                            services.birth_day_month[dataEmail];

                defaultNotRedeemAble(notredeemable, cName, bdm);
            }
            else {

                $('#btns').css('display', "inline-table");

                $('#email_div').css('display', "none");

                defaultDisplay(services.local.per_rwd_aday);
            }
        }
        else if (target.is("span.cust-email")) {
            target.blur();
            target.unbind('click');
        }

    });

    $("#rwd_coupon").focus(function () {

        $('#emails_list').empty();

        $('#error_page').css('display', 'none');

    });


    $('#btn_back').on('click', function () {

        $('#rwd_coupon').attr('placeholder', services.placeHolderForEmail);

        $('#btns').css('display', "none");
//
        $('#rwd_coupon').val('');

        $('#rwd_coupon').attr('placeholder', services.placeHolderForEmail);

        $('#email_div').css({'display': 'inherit'});

        $('#emails_list').empty();

    });

    $('#empage').click(function () {
        
        var clientTime = services.TimeNow;

        var bId = $('#clbID').val();

        var data = "businessId=" + bId + "&clientTime=" + clientTime;
        
        if (services.emails.length == 0)
        {
            services.emailRequest(data); // temporary use this condition

        }
        $('#btns').css('display', "none");

        $('#rwd_coupon').val('');

        $('#inputError2').val('');

        $('#emails_list').empty();

        $('#error_page').css('display', 'none');

        $('#rwd_coupon').attr('placeholder', services.placeHolderForEmail);

        $('#pReq').val('');

        $('#inputError2').attr('placeholder', services.local.couponCode);

        $('#email_div').css({'display': 'inherit'});

        $('#buttons').css({'display': 'inherit'});

    });

    $('#phone_back').on('click', function () {

        $('#rwd_coupon').attr('placeholder', services.placeHolderForEmail);

        $('#inputError2').attr('placeholder', services.local.phone);

        $('#inputError2').focus();

        $('#pReq').val('phone_req');

        $('#btns').css('display', "inline-table");
//
        $('#rwd_coupon').val('');

        $('#email_div').css({'display': 'none'});

        $('#emails_list').empty();
    });
    $('#coupon_back').on('click', function () {

        $('#rwd_coupon').attr('placeholder', services.placeHolderForEmail);

        $('#inputError2').attr('placeholder', services.local.couponCode).focus();

        $('#inputError2').focus();

        $('#pReq').val('');

        $('#btns').css('display', "inline-table");
//
        $('#rwd_coupon').val('');

        $('#email_div').css({'display': 'none'});

        $('#emails_list').empty();
    });
});


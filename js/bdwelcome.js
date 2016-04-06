$(document).ready(function () {
    /*Dear text first line*/
    $('#dear').click(function () {

        $(this).css('display', 'none');

        $('#dear_txt').css('display', 'inline').focus().val($(this).text());

    });
    $('#dear').hover(
            function () {
                $(this).css({'color': 'red', 'cursor': 'pointer'});
            },
            function () {
                $(this).css({'color': 'black', 'cursor': 'default'});
            }
    );


    $('#dear_txt').blur(function () {

        if ($(this).val() === '') {
            return;
        }
        else {
            $(this).css('display', 'none');
            $('#dear').css('display', 'inline').text($(this).val());
        }
    });


    /*Happy birthday Second line*/
    $('#happy_birthday').click(function () {
        $(this).css('display', 'none');
        $('#happy_birthday_txt').css('display', 'inline').focus().val($(this).text());
    });

    $('#happy_birthday').hover(
            function () {
                $(this).css({'color': 'red', 'cursor': 'pointer'});
            },
            function () {
                $(this).css({'color': 'black', 'cursor': 'default'});
            }
    );

    $('#happy_birthday_txt').blur(function () {

        if ($(this).val() === '') {
            return;
        }
        else {
            $(this).css('display', 'none');
            $('#happy_birthday').css('display', 'inline').text($(this).val());
        }

    });

    /*Enjoy text birthday Third line*/

    $('#enjoy').click(function () {

        $(this).css('display', 'none');

        $('#enjoy_txt').css('display', 'inline').focus().val($(this).text());
    });

    $('#enjoy').hover(
            function () {
                $(this).css({'color': 'red', 'cursor': 'pointer'});
            },
            function () {
                $(this).css({'color': 'black', 'cursor': 'default'});
            }
    );

    $('#enjoy_txt').blur(function () {

        if ($(this).val() === '') {
            return;
        }
        else {
            $(this).css('display', 'none');
            $('#enjoy').css('display', 'inline').text($(this).val());
        }
    });

    /*Expired info here*/

    $('#expired').click(function () {

        $(this).css('display', 'none');

        $('#expired_txt').css('display', 'inline').focus().val($(this).text());
    });


    $('#expired').hover(
            function () {
                $(this).css({'color': 'red', 'cursor': 'pointer'});
            },
            function () {
                $(this).css({'color': 'black', 'cursor': 'default'});
            }
    );
    $('#expired_txt').blur(function () {

        if ($(this).val() === '') {
            return;
        }
        else {
            $(this).css('display', 'none');
            $('#expired').css('display', 'inline').text($(this).val());
        }
    });

    $('#description').click(function () {

        $(this).css('display', 'none');

        $('#description_txt').css('display', 'inline').focus().val($(this).text());
    });

    $('#description').hover(
            function () {
                $(this).css({'color': 'red', 'cursor': 'pointer'});
            },
            function () {
                $(this).css({'color': 'black', 'cursor': 'default'});
            }
    );

    $('#description_txt').blur(function () {

        if ($(this).val() === '') {
            return;
        }
        else {
            $(this).css('display', 'none');
            $('#description').css('display', 'inline').text($(this).val());
        }
    });
});


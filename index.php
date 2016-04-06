<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Rewards processing</title>
        <script src="js/vendor/jquery-1.11.2.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(document).ready(function () {
                $.ajax({
                    type: "POST",
                    url: "Rdm_ajax.php",
                    data: "rewards=update",
                    success: function (data2) {
                        var data = JSON.parse(data2);
                        var str = "";
                        for (var $val = 0; $val < data.length; $val++) {
                            str += "<tr><td>" + data[$val] + "</td>" + "<td><input type='checkbox' id='R" + data[$val] + "'></td><td><input type='checkbox' id='E" + data[$val] + "'></td></tr>";
                        }
                        $('#rewards').append(str);
                    }
                });

                $('#rewards').on('change', function (e) {
                 if(e.target.nodeName !== 'INPUT'){
                     return;
                 }
                 else{
                    var id = e.target.id;
                    if (id !== null && id !== "") {
                        var code = id.substring(1);

                        $.ajax({
                            type: "POST",
                            url: "Rdm_ajax.php",
                            data: "rewards=" + id,
                            success: function (data) {
                                $("#R" + code).attr('disabled', 'false');
                                $("#E" + code).attr('disabled', 'false');
                            }
                        });
                    }
                 }
                });
            });


        </script>
        <style>
            table td{text-align: center; width:100px}
        </style>
    </head>
    <body>
        <div id="contents">
            <table id="rewards">
                <thead>
                    <tr><th>Rewards</th><th>Redeem</th><th>Expired</th></tr>
                </thead>
            </table>
            <input type="hidden" id="business_id" name="business_id" value="123223" />
        </div>
    </body>
</html>

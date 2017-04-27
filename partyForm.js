$(document).ready(function (){
    validate();
    $('#leaderName, #member2, #member3, #member4, #member5').change(validate);
});

function validate(){
    if ($('#leaderName').val().length   >   0   &&
        $('#member2').val().length  >   0   &&
        $('#member3').val().length    >   0 &&
        $('#member4').val().length  >   0   &&
        $('#member5').val().length    >   0){
        $("input[type=button]").prop("disabled", false);
    }
    else {
        $("input[type=button]").prop("disabled", true);
    }
}
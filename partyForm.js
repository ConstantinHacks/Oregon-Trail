// global variables for option selection
var PARTYMEMBER = 0;
var completed = 0;

$(document).ready(function (){
  validate();
  // initially focuses on party leader input
  $('#leaderName').focus();
  $('#leaderName, #member2, #member3, #member4, #member5').change(validate);
  // if focus leaves current partymember, force focus back to input, effectively locking the cursor until input accepted
  $('#leaderName').focusout(function(){$(currMember(PARTYMEMBER)).focus()});
  $('#member2').focusout(function(){$(currMember(PARTYMEMBER)).focus()});
  $('#member3').focusout(function(){$(currMember(PARTYMEMBER)).focus()});
  $('#member4').focusout(function(){$(currMember(PARTYMEMBER)).focus()});
  $('#member5').focusout(function(){$(currMember(PARTYMEMBER)).focus()});

  $(document).keypress(function(key)
  {
    // having trouble checking if the input box doesn't contain a null value
    if(key.which == 13 /*&& $(currMember(PARTYMEMBER).value) != ""*/)
    {
      PARTYMEMBER++;
      $(currMember(PARTYMEMBER)).focus();
    }
  });

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
    //PARTYMEMBER++;
  }
}
function currMember(member)
{
  switch(member)
  {
    case 0:
      return "#leaderName";
    case 1: 
      return "#member2";
    case 2: 
      return "#member3";
    case 3: 
      return "#member4";
    case 4: 
      return "#member5";

  }
}
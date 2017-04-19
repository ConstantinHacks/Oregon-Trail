

$(document).keypress(function(key)
{
  if(key.which == 13)
  {
    alert("selection was " + document.getElementById("userInput").value);
  } 
});

$(document).ready(function()
{
    $("#notificationLink").click(function(e)
    {
        e.preventDefault();
        $("#notificationContainer").fadeToggle(300);
        $("#notification_count").fadeOut("slow");
        return false;
    });

//Document Click
    $(document).click(function()
    {
        $("#notificationContainer").hide();
    });
//Popup Click
    $("#notificationContainer").click(function()
    {
        return false
    });

});

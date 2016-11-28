/**
 * Created by Ruotian on 11/19/2016.
 */
$(window).scroll(function() {
    $(".slideanim").each(function(){
        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
            $(this).addClass("slide");
        }
    });
});
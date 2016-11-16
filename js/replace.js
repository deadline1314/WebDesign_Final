/**
 * Created by Ruotian on 11/14/2016.
 */
$(document).ready(function(){
    var checkedValue = null;
    $("#foodTag").click(function(){
        checkedValue = $("#foodTag").attr("title");
        //console.log(checkedValue);
        if(checkedValue !== null){
            setLocalStorage(checkedValue);
        }
    });
    $("#sportTag").click(function(){
        checkedValue = $("#sportTag").attr("title");
        //console.log(checkedValue);
        if(checkedValue !== null){
            setLocalStorage(checkedValue);
        }
    });
    $("#talkTag").click(function(){
        checkedValue = $("#talkTag").attr("title");
        //console.log(checkedValue);
        if(checkedValue !== null){
            setLocalStorage(checkedValue);
        }
    });
});

function setLocalStorage(checkedValue) {
    if(typeof(Storage) !== "undefined") {
        localStorage.setItem("role", checkedValue);
    }else{
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage";
    }
}

function pageOnload() {
    setTimeout(function() {
        if($(document).scrollLeft() !== 0)
            $("body").animate({srollLeft : 0}, "slow");
    });
    var role_intent = localStorage.getItem("role");

    var blockId = "#" + role_intent;

    //$("body").find(blockId).addClass("selectedSection");
    var container = $("body").find(blockId);
    //console.log(container);
    $("#interests").prepend(container);

}

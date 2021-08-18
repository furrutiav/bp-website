var hyper = 0;
var n_attributes = 1;

btnkbest = document.getElementById("kbest")
btnlasso = document.getElementById("lasso")

var kbest = function() {
    hyper = 0;
    btnkbest.style.backgroundColor = "#212529"
    btnlasso.style.backgroundColor = "#e7e7e7"
    btnkbest.style.color = "#ffffff"
    btnlasso.style.color = "#000000"
}
var lasso = function() {
    hyper = 1;
    btnlasso.style.backgroundColor = "#212529"
    btnkbest.style.backgroundColor = "#e7e7e7"
    btnlasso.style.color = "#ffffff"
    btnkbest.style.color = "#000000"
}

$(document).ready(function(){
    $("select.atrib").change(function(){
        n_attributes = parseInt($(this).children("option:selected").val());
    });
});
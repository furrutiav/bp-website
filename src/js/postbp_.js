
function postImage() {
    var bp = document.getElementById("bp")
    var apiurl = "https://bp-solver.herokuapp.com/"
    var bp64= getBase64Image(bp)

    post(bp64, apiurl)
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  function post(bp64, apiurl) {
    $.ajax
    ({
        type: "POST",
        url: apiurl,
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        data: JSON.stringify({ "test": bp64 }),
        success: function (data) {
            let perceptron = data.TEST.models.perceptron
            let svm = data.TEST.models.svm
            let nb = data.TEST.models.NB
            let dummy = data.TEST.models.dummy
            let dt = data.TEST.models["Decision-Tree"]
            let solution = data.TEST.solution
            let scores = "Perceptron: " + perceptron + "<br>" + "SVM: " + svm + "<br>" + "NB: " + nb + "<br>" + "Dummy: " + dummy + "<br>" + "Decision Tree: " + dt;
            let atributos = "Atributos: "
            for (let i in solution){
                atributos = atributos + solution[i] + " ";
            }
            let array1 = [perceptron,svm,nb,dummy,dt]
            let max = Math.max(...array1)
            $('#scores').html(scores)
            $('#atributos').html(atributos)
            $('#score').html(max)

        }
    })
}


function postImage() {
    var bp = document.getElementById("bp")
    var apiurl = "https://bp-solver.herokuapp.com/"
    var bp64= decodeURIComponent(getBase64Image(bp))

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
        data: JSON.stringify({"image": bp64, "selection": hyper, "n_att": n_attributes}),
        success: function (data) {
            let perceptron = data.solved.models.Perceptron
            let svm = data.solved.models.SVC
            let nb = data.solved.models.GaussianNB
            let dummy = data.solved.models.DummyClassifier
            let dt = data.solved.models.DecisionTreeClassifier
            let solution = data.solved.solution
            let scores = "Perceptron: " + perceptron + "<br>" + "SVC: " + svc + "<br>" + "GaussianNB: " + nb + "<br>"  + "<br>" + "DecisionTreeClassifier: " + dt + "DummyClassifier: " + dummy;
            let atributos = "Atributos: "
            for (let i in solution){
                atributos = atributos + "/ " + solution[i] ;
            }
            let array1 = [perceptron,svm,nb,dt,dummy]
            let max = Math.max(...array1)
            $('#scores').html(scores)
            $('#atributos').html(atributos)
            $('#score').html(max)

        }
    })
}

var loadFile = function(event) {
	var image = document.getElementById('bp');
	image.src = URL.createObjectURL(event.target.files[0]);
};
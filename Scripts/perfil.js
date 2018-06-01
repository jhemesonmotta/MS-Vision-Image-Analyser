GlobalFlag = false;
var tags = [];
var qtdFotos = 0;
var i = 0;

function caller(){
    var fotos = ["https://www.thefamouspeople.com/profiles/images/jon-bon-jovi-3.jpg", "https://http2.mlstatic.com/kit-lenco-e-braceletes-rock-axl-rose-fantasia-D_NQ_NP_896605-MLB25066521650_092016-F.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/GunsNRoses160617-41_%2835234982562%29.jpg/1200px-GunsNRoses160617-41_%2835234982562%29.jpg"];
    qtdFotos = fotos.length;

    for(var foto of fotos){
         processImage(foto);
    }
}

function processImage(sourceImageUrl) {

    document.querySelector("#corpoInteiro").style.display = "none";
    document.querySelector("#loader").style.display = "block";

    var subscriptionKey = "4dfab9a68a1e4a4ba92d3fa91996c4b5";
    var uriBase ="https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

    // Request parameters.
    var params = {
        "visualFeatures": "Tags,Categories,Description,Color",
        "details": "",
        "language": "en",
    };

    // Make the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader(
                "Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    .done(function(data) {
        i ++;
        for(var temp of data.tags){
            tags.push(temp);
        }
        if(i == qtdFotos){
            // função que os agrupará e retornará as 5 tags mais recorrentes com a porcentagem de chances desta aparecer em fotos outras fotos desta "lista"
                // ex.: futuras fotos desta pessoa

            document.querySelector("#corpoInteiro").style.display = "block";
            document.querySelector("#loader").style.display = "none";
        }
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " :
            errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" :
            jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
}
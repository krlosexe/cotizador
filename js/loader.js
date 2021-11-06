function loaderPage(option) {

  var preLoader = document.getElementsByClassName("page-loader-wrapper");

  switch (option) {

    case "show":
    case 1:

        loader  = preLoader[0];
        loader.style.display ="block";

      break;


      case "hide":
      case 2:
    
        for (let loader of preLoader) {

          loader.style.display = "none";
    
        }

      break;

    default:

      console.log('Introdujo una opción invalida')
      
      break;
  }
  
}


function miniLoader(elemet,option) {

  var miniLoader = document.getElementById(`${elemet}`).nextElementSibling;

  switch (option) {

    case "show":
    case 1:

        lminiLoader.style.display = "inline";

      break;


      case "hide":
      case 2:

         miniLoader.style.display = "none";
    
      break;

    default:

      console.log('Introdujo una opción invalida')
      
      break;
  }
  
}

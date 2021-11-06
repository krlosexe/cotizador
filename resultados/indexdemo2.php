<!DOCTYPE html>
<html lang="es" >
<head>
  <meta charset="UTF-8">
  <title>Resultado de la cotización</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->  
  <link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="vendor/perfect-scrollbar/perfect-scrollbar.css">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="css/util.css">
  <link rel="stylesheet" type="text/css" href="css/main.css">
<!--===============================================================================================-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src='https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.5.0/lottie.js'></script>
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css'><link rel="stylesheet" href="./css/loader/style.css">


 <style>
      
      .checked {
        color: orange;
      }
      label{
     color: #547fff;
    font-size: 15px;
    font-weight: bold;
      }
      button{
      	background-color: #547fff !important;
      }
      .titulito [data-title] {	  
		  position: relative;
		  cursor: help;
		}

		.titulito [data-title]:hover::before {
		  content: attr(data-title);
		  position: absolute;
		  bottom: 0px;
		  padding: 3px 6px;
		  border-radius: 2px;
		  background: #000;
		  color: #fff;
		  font-size: 12px;
		  font-family: sans-serif;
		  white-space: nowrap;
		  z-index: 100
		}
		.titulito [data-title]:hover::after {
		  content: '';
		  position: absolute;
		  bottom: 0px;
		  left: 8px;
		  color: #fff;
		  border: 8px solid transparent;	
		  border-bottom: 8px solid #000;
		  z-index: 100
		}
		.titulito span{
			margin-left: 13px;
			font-size:20px;

		}
		.row .cell{
			width: 250px;
		}
     

    </style>
<body style="background: url('images/resultado.svg') no-repeat left center !important; background-size: 30% !important; ">
</head>
<body>
<!-- partial:index.partial.html -->


  <div class="limiter">
    <div class="container-table100">
      <div class="animation_home lottie"></div>
      <div class="wrap-table100">
          <div class="table">

            <div class="row header">
              <div class="cell">
                Aseguradora             
              </div>
              <div class="cell">
                Daños a terceros
              </div>
              <div class="cell">
                Perdida total
              </div>
              <div class="cell">
                Perdida parcial
              </div>
              <div class="cell">
                Coberturas básicas
              </div>
              <div class="cell">
                Precio
              </div>
            </div>



            <div class="row">
              <div class="cell" >
                 <img src="images/sura.svg" alt="" width="50" height="50">
                 <label> Auto Básico</label>       
              </div>
              <div class="cell" data-title="Daños a terceros">
                Hasta $640 millones
              </div>
              <div class="cell" data-title="Perdida total">
                No cubre
              </div>
              <div class="cell" data-title="Perdida parcial">
                No cubre
              </div>
              <div class="cell titulito">
                <span class="fa fa-car" data-title="Vehículo de remplazo"></span>
                <span class="fa fa-key " data-title="Remplazo de llaves"></span>        
                <span class="fa fa-id-card " data-title="Conductor elegido"></span>        
                <span class="fa fa-gavel checked" data-title="Asistencia juridica"></span>             
              </div>
              <div class="cell" data-title="Precio">
              	<center>
              	<P style="color:#557fff; font-size: 20px;">
                  $628.514
                </P>
                <br>
                <a href="../detalle/indexdemo.html" style="text-decoration: none"><button class="btn btn-primary  btn-block" type="submit">Solicitar</button></a>
              	</center>
                
              </div>
            </div>
            


            <div class="row">
              <div class="cell" data-title="Full Name">
                 <img src="images/sura.svg" alt="" width="50" height="50">
                 <label> Plan Autos Global</label>       
              </div>
              <div class="cell" data-title="Age">
                Hasta $2.040 millones
              </div>
              <div class="cell" data-title="Job Title">
                100% del valor asegurado
              </div>
              <div class="cell" data-title="Location">
                $1.995.000
              </div>
              <div class="cell titulito">
                <span class="fa fa-car checked" data-title="Vehículo de remplazo"></span>
                <span class="fa fa-key checked" data-title="Remplazo de llaves"></span>        
                <span class="fa fa-id-card checked" data-title="Conductor elegido"></span>        
                <span class="fa fa-gavel checked" data-title="Asistencia juridica"></span>            
              </div>
              <div class="cell" data-title="Location">
              	<center>
              	<P style="color:#557fff; font-size: 20px;">
                  $2.421.661
                </P>
                <br>
                 <a href="../detalle/indexdemo1.html" style="text-decoration: none"><button class="btn btn-primary  btn-block" type="submit">Solicitar</button></a>
              	</center>
                
              </div>
            </div>



            <div class="row">
              <div class="cell" data-title="Aseguradora">
                 <img src="images/sura.svg" alt="" width="50" height="50">
                 <label> Clásico</label>       
              </div>
              <div class="cell" data-title="Age">
                Hasta 1.440 millones
              </div>
              <div class="cell" data-title="Job Title">
                100% del valor asegurado
              </div>
              <div class="cell" data-title="Location">
                $987.000
              </div>
              <div class="cell titulito">
                 <span class="fa fa-car checked" data-title="Vehículo de remplazo"></span>
                <span class="fa fa-key checked" data-title="Remplazo de llaves"></span>        
                <span class="fa fa-id-card checked" data-title="Conductor elegido"></span>        
                <span class="fa fa-gavel checked" data-title="Asistencia juridica"></span>           
              </div>
              <div class="cell" data-title="Location">
              	<center>
              	<P style="color:#557fff; font-size: 20px;">
                  $2.037.062
                </P>
                <br>
                 <a href="../detalle/indexdemo2.html" style="text-decoration: none"><button class="btn btn-primary  btn-block" type="submit">Solicitar</button></a>
              	</center>
                
              </div>
            </div>



            

          </div>
      </div>
    </div>
  </div>




<!--===============================================================================================-->  
  <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
  <script src="vendor/bootstrap/js/popper.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
  <script src="vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
  <script src="js/main.js"></script>
  <script>
        var loader = document.getElementsByClassName("animation_home");

        function loadBMAnimation(loader) {
            var animation = bodymovin.loadAnimation({
                container: loader,
                renderer: "svg",
                loop: true,
                autoplay: true,
                path: "https://assets3.lottiefiles.com/packages/lf20_n7DAEZ.json"
            });
        }
        for (var i = 0; i < loader.length; i++) {
            loadBMAnimation(loader[i]);
        }
    </script>

<!-- partial -->
  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js'></script><script  src="./js/loader/script.js"></script>

</body>
</html>

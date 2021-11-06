<!DOCTYPE html>
<html>
   <head>
      <meta http-equiv="Content-Type" content="text/html">
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
      <title>Cotizar seguro de vehículo</title>
      <link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' rel='stylesheet'>
      <link href='css/style.css' rel='stylesheet'>
      <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css' rel='stylesheet'>
      <script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
      <script type='text/javascript' src='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>
      <script type='text/javascript' src='js/step.js'></script>
      <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
      <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>
      <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>
      <style type="text/css">
         label {
         display: inline-block;
         font-size: 13px;
         padding-bottom: 0em;
         color: #547fff;
         }
         .form-control {        
         border: 1px solid #ced4da00;
         background-color: #f5f5ff;
         }
         .select2-container--default .select2-selection--single {
         background-color: #fff;
         border: 1px solid #ced4da00;
         border-radius: 4px;
         letter-spacing: 1.4px;
         height: 40px;
         background-color: #f5f5ff;
         }
  
         h5 {
            color: #323255;
            font-family: "Nunito", Sans-serif;
            font-weight: 600;
            text-transform: none;
            letter-spacing: 1px;
        }
         
         .select2-container--default .select2-selection--single .select2-selection__rendered {
            color: #4b5258;
            margin-left: 5px;
            line-height: 38px;
        }
        html {
    overflow-x: hidden;
}

/* Estilos spinner */
         #cover-spin {
             position:fixed;
             width:100%;
             left:0;right:0;top:0;bottom:0;
             background-color: rgb(255 255 255 / 94%);
             z-index:9999;
             display:none;
         }
         

         @-webkit-keyframes spin {
            from {-webkit-transform:rotate(0deg);}
            to {-webkit-transform:rotate(360deg);}
         }

         @keyframes spin {
            from {transform:rotate(0deg);}
            to {transform:rotate(360deg);}
         }

         #cover-spin::after {
             content:'';
             display:block;
             position:absolute;
             left:48%;top:40%;
             width:40px;height:40px;
             border-style:solid;
             border-color:black;
             border-top-color:transparent;
             border-width: 4px;
             border-radius:50%;
             -webkit-animation: spin .8s linear infinite;
             animation: spin .8s linear infinite;
         }

      </style>
   </head>
   <header>
  <div style="background-color: #f6f7fb; padding-left: 20px;  padding-right: 20px; padding-top: 15px; padding-bottom:15px; text-align:center">
   <span><a href="https://chseguros.com.co/seguro-para-carro/"><img src="https://chseguros.com.co/wp-content/uploads/2021/09/nuevologo-1.svg" width="240"></a></span> 
  </div>
</header> 
   <body>
     
      <div id="cover-spin"></div>
   
      <div id ="page-loader-wrapper" class="page-loader-wrapper" style="display:none;">
           <div class="loadercontenedor">
        <div class="loader">
            <!-- <div class="preloader">
                <div class="spinner-layer pl-white">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div> -->

            <img src="img/load.gif" alt="" width="30%">
            <p style="color: #323255">Estamos cotizando el mejor seguro para ti, por favor espera unos segundos...</p>


            <p class="progress-view" style="color: #323255">faf</p>
            </div>
        </div>
    
    </div>
    <div class="container-fluid px-1 py-5 mx-auto">
         <div class="row d-flex justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-7">
               <div class="card b-0">
                  <ul id="progressbar" class="text-center">
                     <li class="active step0" id="step1"></li>
                     <li class="step0" id="step2"></li>
                     <li class="step0" id="step3"></li>
                     <li class="step0" id="step4"></li>
                  </ul>

                  <fieldset class="show" style="visibility:hidden">
                     <div class="form-card">
                        <center>
                           <h5 class="sub-heading">Número de placa</h5>
                           <br>
                        </center>
                        <center><input name='placa' id="placa" placeholder='FHP843' required value="<?= $_GET["placa"]?>" class="placa" autocomplete="off" onkeypress="return check(event)"></center>


                        <center>
                           <label for="next1" style="font-size: 20px;" class="next" id="cerokm" onclick="cerokm()">¿ Es 0 Km ?</label>
                          <!-- <input type="checkbox" class="form-control" id="cero_km">-->
                       </center>

                        <button class="btn-block btn-primary mt-3 mb-1 next" id="next1">Siguiente<span class="fa fa-long-arrow-right"></span></button>
                     </div>
                  </fieldset>
                  <fieldset>
                     <div class="form-card">
                        <center>
                           <h5 class="sub-heading mb-4">Información del vehículo</h5>
                        </center>
                        <div class="row">
                           <div class="col-md-6 mb-3">
                              <div class="form-group">
                                 <label for="clasevehiculo">Clase de vehículo</label>
                                 <select class="form-control" id="clasevehiculo" name="clasevehiculo" onblur="validate1(2)">
                                    <option value="">Seleccionar</option>
                                 </select>
                                 <div class="wrapper-smalloader">
                                    <div class="smalloader"></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-md-6 mb-3">
                              <div class="form-group">
                                 <label for="fasecoldaMarcas">Marcas</label>
                                 <select class="form-control" id="fasecoldaMarcas" name="fasecoldaMarcas" onblur="validate1(4)">
                                    <option value="">Seleccionar</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col-md-6 mb-3">
                              <div class="form-group">
                                 <label for="modelo">Modelo</label>
                                 <select class="form-control" id="modelo" name="modelo" onblur="validate1(1)">
                                    <option value="">Seleccionar</option>
                                 </select>
                                 <div class="wrapper-smalloader">
                                    <div class="smalloader"></div>
                                 </div>
                              </div>
                           </div>
                           <div class="col-md-6 mb-3">
                              <div class="form-group">
                                 <label for="fasecoldaLineas">Referencia</label>
                                 <select class="form-control" id="fasecoldaLineas" name="fasecoldaLineas" onblur="validate1(5)">
                                    <option value="">Seleccionar</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col-md-6 mb-3">
                              <div class="form-group">
                                 <label for="tiposservicio">Tipo de servicio</label>
                                 <select class="form-control" id="tiposservicio" name="tiposservicio" onblur="validate1(3)">
                                    <option value="">Seleccionar</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-md-6 mb-3">
                              <div class="form-group">
                                 <label for="ciudadescirculacion">Ciudades de Circulación</label>
                                 <select class="form-control" id="ciudadescirculacion" name="ciudadescirculacion" onblur="validate1(6)">
                                    <option value="">Seleccionar</option>
                                 </select>
                              </div>
                           </div>
                        </div>


                       
                        <button id="next2" class="btn-block btn-primary mt-3 mb-1 next mt-4" onclick="validate1(0)">Siguiente<span class="fa fa-long-arrow-right"></span></button> <button class="btn-block btn-secondary mt-3 mb-1 prev"><span class="fa fa-long-arrow-left"></span>Atrás</button>
                     </div>
                  </fieldset>
                  
                  <fieldset>
           
                     <div class="form-card">
                        <center>
                        <h5 class="sub-heading mb-4">Sobre ti</h5>
                        </center>
                        <div class="row">
                           <div class="col-md-6 mb-3">
                              <div class="form-group"> 
                                 <label class="form-control-label">Nombre</label> 
                                 <input type="text" id="cname" name="cname" placeholder="Pepito" class="form-control" onblur="validate2(1)" onkeypress="return check(event)"> 
                              </div>
                           </div>
                           <div class="col-md-6 mb-3">
                              <div class="form-group"> 
                                 <label class="form-control-label">Apellido</label> 
                                 <input type="text" id="capellido" name="capellido" placeholder="Gónzalez" class="form-control" onblur="validate2(2)" onkeypress="return check(event)"> 
                              </div>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col-md-6 mb-3">
                              <div class="form-group">
                                 <label for="planesFiltrados">Tipo de Documento</label>
                                 <select class="form-control" id="tipoDocumento" name="tipoDocumento" onblur="validate2(3)">
                                    <option value="">Seleccionar</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-md-6 mb-3">
                              <div class="form-group"> 
                                 <label class="form-control-label">Número de documento</label> 
                                 <input type="text" id="numeroDoc" name="numeroDoc" placeholder="Ej: 1036728323" class="form-control" onblur="validate2(4)" onkeypress="return check(event)"> 
                              </div>
                           </div>
                        </div>


                        <div class="row">
                           <div class="col-md-6 mb-3">
                              <div class="form-group"> 
                                 <label class="form-control-label">Número de Teléfono</label> 
                                 <input type="text" id="number_phone" name="number_phone" placeholder="Ej: 3227673200" class="form-control" onblur="validate2(4)" onkeypress="return check(event)"> 
                              </div>
                           </div>

                           <div class="col-md-6 mb-3">
                              <div class="form-group"> 
                                 <label class="form-control-label">Correo</label> 
                                 <input type="email" id="correo" name="correo" placeholder="micorreo@mail.com" class="form-control" onblur="validate2(5)" onkeypress="return check(event)"> 
                              </div>
                           </div>
                        </div>



                        <div class="row">
                           <div class="col-md-6 mb-3">
                              <div class="form-group">
                                 <label for="planesFiltrados">¿Has tenido algún accidente en tu vehículo en los últimos dos años?</label>
                                 <select class="form-control" id="valid_discount" name="valid_discount">
                                    <option value="">Seleccionar</option>
                                    <option value="Si">Si</option>
                                    <option value="No">No</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                       <center><a href="https://chseguros.com.co/politica-privacidad/" TARGET="_blank"><label style="font-weight: 600;">Al dar en "cotizar ahora" estás aceptando nuestra política de tratamiento de datos</label>   </a></center> 
                      <button id="next3" class="btn-block btn-primary mt-3 mb-1 next mt-4">Cotizar ahora<span class="fa fa-long-arrow-right"></span></button> 
                      <button class="btn-block btn-secondary mt-3 mb-1 prev"><span class="fa fa-long-arrow-left"></span>Atrás</button>
                     </div>
             
                  </fieldset>
               </div>
            </div>
         </div>
      </div>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
      <script src="js/cotizacion/filterSelectPais.js"></script>
      <script src="js/loader.js"></script>
      <script src="js/cotizacion/index.js" type="module"></script>
      <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>
      <script>


            localStorage.setItem("ceroKm", false)
           //$("#cover-spin").show()

           $("#input").keydown(function (event) { 
                var e = event || window.event;
                var key = e.keyCode || e.which;
                console.log(key)
                if ( key === 219
                    || key === 221 
                    || key === 56 
                    || key === 57 
                    || key === 52 
                    || key === 48 
                    || key === 49 
                    || key === 50 
                    || key === 54 
                    || key === 55 
                    || key === 51 
                    || key === 53) {

                    e.preventDefault();
                }
           });



           function check(e) {
                  tecla = (document.all) ? e.keyCode : e.which;

                  //Tecla de retroceso para borrar, siempre la permite
                  if (tecla == 8) {
                     return true;
                  }

                  // Patron de entrada, en este caso solo acepta numeros y letras
                  patron = /[A-Za-z0-9@.]/;
                  tecla_final = String.fromCharCode(tecla);
                  return patron.test(tecla_final);
               }

            function cerokm(){
               localStorage.setItem("ceroKm", true)
	         }


      </script>


      <script>
    

  </script>

   </body>
</html>
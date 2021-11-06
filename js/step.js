function validate1(val) {

   v1 = document.getElementById("modelo");
   v2 = document.getElementById("clasevehiculo");
   v3 = document.getElementById("tiposservicio");
   v4 = document.getElementById("fasecoldaMarcas");
   v5 = document.getElementById("fasecoldaLineas");
   v6 = document.getElementById("ciudadescirculacion");
   
   flag1 = true;
   flag2 = true;
   flag3 = true;
   flag4 = true;
   flag5 = true;
   flag6 = true;
               
   if(val>=1 || val==0) {
      if(v1.value == "") {
         v1.style.borderColor = "red";
         flag1 = false;
      }
      else {
         v1.style.borderColor = "green";
         flag1 = true;
      }
   }

   if(val>=2 || val==0) {
      if(v2.value == "") {
         v2.style.borderColor = "red";
         flag2 = false;
      }
      else {
         v2.style.borderColor = "green";
         flag2 = true;
      }
   }

   if(val>=3 || val==0) {
      if(v3.value == "") {
         v3.style.borderColor = "red";
         flag3 = false;
      }
      else {
         v3.style.borderColor = "green";
         flag3 = true;
      }
   }

   if(val>=4 || val==0) {
      if(v4.value == "") {
         v4.style.borderColor = "red";
         flag4 = false;
      }
      else {
         v4.style.borderColor = "green";
         flag4 = true;
      }
   }

   if(val>=5 || val==0) {
      if(v5.value == "") {
         v5.style.borderColor = "red";
         flag5 = false;
      }
      else {
         v5.style.borderColor = "green";
         flag5 = true;
      }
   }

   if(val>=6 || val==0) {
      if(v6.value == "") {
         v6.style.borderColor = "red";
         flag6 = false;
      }
      else {
         v6.style.borderColor = "green";
         flag6 = true;
      }
   }
   


   flag = flag1 && flag2 && flag3 && flag4 && flag5 && flag6;
            
   return flag;
}
         
function validate2(val) {
      v1 = document.getElementById("cname");
      v2 = document.getElementById("capellido");
      v3 = document.getElementById("tipoDocumento");
      v4 = document.getElementById("numeroDoc");
      v5 = document.getElementById("correo");

      flag1 = true;
      flag2 = true;
      flag3 = true;
      flag4 = true;
      flag5 = true;
          
      if(val>=1 || val==0) {
         if(v1.value == "") {
            v1.style.borderColor = "red";
            flag1 = false;
         }
         else {
            v1.style.borderColor = "green";
            flag1 = true;
         }
      }

      if(val>=2 || val==0) {
         if(v2.value == "") {
            v2.style.borderColor = "red";
            flag2 = false;
         }
         else {
            v2.style.borderColor = "green";
            flag2 = true;
         }
      }

      if(val>=3 || val==0) {
         if(v3.value == "") {
            v3.style.borderColor = "red";
            flag3 = false;
         }
         else {
            v3.style.borderColor = "green";
            flag3 = true;
         }
      }

      if(val>=4 || val==0) {

         if(v4.value == ""){
            v4.style.borderColor = "red";
            flag4 = false;
         }
         else {
            v4.style.borderColor = "green";
            flag4 = true;
         }

         if(v3.value == "C" || v3.value == "A"){
            if(v4.value.length < 10 && isNaN(v4.value) ){
               v4.style.borderColor = "red";
               flag1 = false
            }else{
               v4.style.borderColor = "green";
               flag1 = true;
            }
         }

      }

      if(val>=5 || val==0) {
         let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

         if(v5.value == "" || !regexEmail.test(v5.value)) {
            v5.style.borderColor = "red";
            flag5 = false;
         }
         else {
            v5.style.borderColor = "green";
            flag5 = true;
         }
      }


      
      flag = flag1 && flag2 && flag3 && flag4 && flag5;
      
      return flag;
}
         

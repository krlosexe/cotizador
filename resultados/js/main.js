
/*
    *Normalizar a un string omitiendo acentos*
*/
function str_norm(str){
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
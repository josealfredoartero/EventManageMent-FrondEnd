const imageBase64 = (fileImage,name , setImage) => {
    // convertidor de imagen a base64
    let reader = new FileReader();
    let file = fileImage;
    reader.readAsDataURL(file);
    reader.onload = function () {
      let imgs = { img: "", file: "", name: "" };
      // insertar las imagenes obtenidas por el formulario al json imgs
      imgs.img = reader.result;
      imgs.file = file;
      imgs.name = name;
      // insertar  el json imgs al arreglo imagenes
      setImage(image => [...image, imgs]);
    };
}

const UrlApi = "http://127.0.0.1:8000/api/";

const api = "http://127.0.0.1:8000";


export {imageBase64, UrlApi, api}
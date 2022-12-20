import React from "react";

import { Container, File } from "../elements/style";
import { imageBase64 } from "../hooks/encodeBase64";

const InputFile = ({images, setImages, multiple=null}) => {

  const handlerImages = (e) => {
    //lista de todas la imagenes seleccionadas en el input de agregar imagen
    let files = e.target.files;
    let imagenes = [...images];
    //for por cada imagen agregada
    for (let index = 0; index < files.length; index++) {
      let namefile = files[index].name;
      let existe = false;
      if (imagenes.length !== 0) {
        imagenes.forEach((element) => {
          if (element.name === namefile) {
            existe = true;
          }

        });
      }
      if (existe) {
        break;
      }
      imageBase64(files[index], namefile , setImages)
    }
  };

  return (
    <Container>
      <File type="file" onChange={handlerImages} multiple={multiple} accept="image/png,image/jpeg"/>
      {
        console.log(images)
      }
    </Container>

  );
};

export default InputFile;

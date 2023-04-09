
import { BORRAR_IMAGEN } from '../php/consultas';
export async function borrarimagenarchivo(id, nombre, carpeta) {

    try {
        await fetch(BORRAR_IMAGEN, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'content-type': 'multipart/form-data'
            },
            body: JSON.stringify({
                id: id,
                nombre, nombre,
                carpeta: carpeta
            })
        })
            .then((response) => response.json())
            .then(responseJson => {

                return responseJson;
                //this.setState({ isLoading: false });
            }).catch((error) => {
                return "error";
                //this.setState({ isLoading: false });
            });
    } catch (error) {
        //console.log('error al borrar la imagen: ', error);
        return "error";
    }
}
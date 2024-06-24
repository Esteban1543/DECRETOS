
/*
📌 Funcion para realizar solicitudes POST a la API
*/
import { ResponsePatch } from "./Types"
import axios from "axios"

export const solicitudPatch = async (url: string, formData?: ResponsePatch) => {
  // console.log(formData)
  try {
    const response = await axios.patch(url, formData, {
      validateStatus: (status) => { return status < 500 }
    })
    console.log(response)
    return response.data
  }
  catch (error) {
    console.log(`✖️ Solicitud de Datos errada en ${url}`)
    return error
  }
}

/*
📌 Funcion para realizar solicitudes POST a la API
*/

import axios from "axios"

export const solicitudPost = async ({ url, formData }: { url: string, formData: object }) => {
  // console.log(formData)
  try {
    const response = await axios.post(url, formData, {
      validateStatus: (status) => { return status < 500 }
    })
    // console.log(response)
    return response.data
  }
  catch (error) {
    console.log(`✖️ Solicitud de Datos errada en ${url} `)
    return error
  }
}
import axios from "axios"

//📌 Funcion para realizar solicitudes POST a la API
export const solicitudPost = async (url, formData) => {
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
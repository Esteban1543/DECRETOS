import conexion from "../conection/conexion.js";

class ActasModel {
    static async createActa(id_digitador, datosEncabezado, decretosAnexados, fechaFormato) {
        const { 
            juzgado,
            juez,
            ciudad,
            origen,
            radicado,
            demandante,
            demandado,
            proceso,
            cod_folio
        } = datosEncabezado;

        const { 
            id_tipo_embargo,
            tipo,
            descripcion,
            dataInputs
        } = decretosAnexados

        try {
            const [acta_embargo] = await conexion.query(`
                INSERT INTO acta_embargo SET ?
            `, {
                id_acta: radicado,
                fk_id_usuario: id_digitador,
                fecha_registro: fechaFormato
            })
    
            const [historial_decretos] = await conexion.query(`
                INSERT INTO historial_decretos SET ?    
            `, {
                fkp_historial_decretos: radicado,
                fk_proceso: proceso,
                demandante: demandante,
                demandado: demandado,
                provincia: cod_folio,
                fk_origen: origen,
                fk_ciudad: ciudad
            })
    
            for (const decretos in dataInputs) {
                const [datos_decretos] = await conexion.query(`
                    INSERT INTO datos_decretos(fkp_id_datos_decreto, fk_embargo, datos_decretos) 
                        VALUES (?, ?, JSON_OBJECT(?))   
                `, [radicado, tipo, decretos])
            }

            return {
                status: true,
                message: "✅ Se creo la acta correctamente",
            }
        }catch(error){
            return {
                status: false,
                error: `⛔ Se genero un error interno con la base de datos`,
                type: String(error)
            }
        }
    }
}

export default ActasModel
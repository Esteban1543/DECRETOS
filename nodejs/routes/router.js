const { Router } = require('express');

const router = Router();

// ENDPOINTS

// AUTENTIFICACION

const { 
    Autentificiacion 
    } = require('../controllers/Autentificacion.js')

router.post('/Autentificiacion', Autentificiacion)

// FACTURACION

const { 
    CrearClienteDevolverFactura,
    CrearFactura,
    IngresarDatosFactura,
    GenerarAbonoFactura
    } = require('../controllers/Facturacion.js')

router.post('/CrearClienteDevolverFactura', CrearClienteDevolverFactura)

router.post('/CrearFactura', CrearFactura)

router.post('/IngresarDatosFactura', IngresarDatosFactura)

router.post('/GenerarAbonoFactura', GenerarAbonoFactura)


// INFORMES

const {
    InformeFacturasClientes,
    InformeClientesCompras,
    InformeVendedorVentas,
    InformeVendedores,
    VentasPorVendedorFechas,
    InformeFactura,
    InformeFacturaSaldadas,
    InformeVentasMes
    } = require('../controllers/Informes.js')

router.get('/InformeFacturasClientes/:fecha_inicio/:fecha_fin', InformeFacturasClientes)

router.post('/InformeClientesCompras/:fk_cliente', InformeClientesCompras)

router.post('/InformeVendedorVentas/:fk_vendedor', InformeVendedorVentas)

router.get('/InformeVendedores/:fecha_inicio/:fecha_fin', InformeVendedores)

router.get('/VentasPorVendedorFechas/:fecha_inicio/:fecha_fin', VentasPorVendedorFechas)

router.post('/InformeFactura', InformeFactura)

router.get('/InformeFacturaSaldadas/:fecha_inicio/:fecha_fin', InformeFacturaSaldadas)

router.get('/InformeVentasMes', InformeVentasMes)


// PERSONAS

const {
    Usuarios,
    Clientes,
    ZonaVentas,
    TipoIdentificacion,
    CrearUsuario,
    CrearCliente,
    EditarCliente,
    BuscarClienteIdentificacion,
    BuscarClienteNombre,
    BorrarPersona,
    ActivarPersona
    } = require('../controllers/Personas.js')

router.get('/Usuarios', Usuarios)

router.get('/Clientes', Clientes)

router.get('/ZonaVentas', ZonaVentas)

router.get('/TipoIdentificacion', TipoIdentificacion)

router.post('/CrearUsuario', CrearUsuario)

router.post('/CrearCliente', CrearCliente)

router.post('/EditarCliente', EditarCliente)

router.post('/BuscarClienteIdentificacion', BuscarClienteIdentificacion)

router.post('/BuscarClienteNombre', BuscarClienteNombre)

router.post('/BorrarPersona/:id_persona', BorrarPersona)

router.post('/ActivarPersona/:id_persona', ActivarPersona)


// PRODUCTOS

const {
    Productos,
    Categorias,
    CrearProducto
    } = require('../controllers/Productos.js')

router.get('/Productos', Productos)

router.get('/Categorias', Categorias)

router.post('/CrearProducto', CrearProducto)


// DIGITAL

const { 
    CrearFacturaPdf, 
    EnviarFacturaGmail 
    } = require('../controllers/Digital.js');

router.get('/CrearFacturaPdf/:numFactura', CrearFacturaPdf)

router.post('/EnviarFacturaGmail', EnviarFacturaGmail)



// EXPORTACION
module.exports = router;

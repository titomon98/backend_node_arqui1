
const tiposClienteRoutes = require('./tiposCliente');
const clientesRoutes = require('./clientes');
const productosRoutes = require('./productos');
const ventasRoutes = require('./ventas');
const comprasRoutes = require('./compras');


module.exports = (app) => {
    app.use('/tiposCliente', tiposClienteRoutes);
    app.use('/clientes', clientesRoutes);
    app.use('/productos', productosRoutes);
    app.use('/ventas', ventasRoutes);
    app.use('/compras', comprasRoutes);
};
createVenta(req, res) {
    const datos = req.body;

    Productos.findByPk(datos.id_productos)
        .then(producto => {
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            const precio = producto.precio;
            const subtotal = precio * datos.cantidad;
            const iva = subtotal * 0.12;

            Clientes.findByPk(datos.id_clientes, {
                include: Tipo_clientes
            })
            .then(cliente => {
                if (!cliente) {
                    return res.status(404).json({ error: 'Cliente no encontrado' });
                }

                const descuento = cliente.tipo_cliente.descuento;
                const totalConDescuento = (subtotal + iva) * (1 - descuento);

                const datos_ventas = {
                    fecha_venta: new Date(),
                    total: totalConDescuento,
                    id_clientes: datos.id_clientes
                };

                Ventas.create(datos_ventas)
                    .then(venta => {
                        const datos_detalle = {
                            id_ventas: venta.id,
                            id_productos: datos.id_productos,
                            cantidad: datos.cantidad,
                            precio: precio,
                            subtotal: subtotal
                        };

                        Detalle_ventas.create(datos_detalle)
                            .then(detalle => {
                                // Restar la cantidad del producto
                                const nuevaCantidad = producto.cantidad - datos.cantidad;
                                producto.update({ cantidad: nuevaCantidad })
                                    .then(() => {
                                        res.status(201).json({
                                            venta: venta,
                                            detalle: detalle
                                        });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        return res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
                                    });
                            })
                            .catch(error => {
                                console.log(error);
                                return res.status(500).json({ error: 'Error al insertar detalle de venta' });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).json({ error: 'Error al insertar venta' });
                    });
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ error: 'Error al consultar el cliente' });
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error al consultar el producto' });
        });
},

const { MongoClient } = require('mongodb');


async function consultarRangoAmount() {
    const uri = 'mongodb://localhost:27017';
    const cliente = new MongoClient(uri);

    try {

        await cliente.connect();


        const baseDatos = cliente.db('Sakila');


        const coleccion = baseDatos.collection('payment');


        const resultado = await coleccion.aggregate([
            {
                $group: {
                    _id: null,
                    cantidadMinima: { $min: '$amount' },
                    cantidadMaxima: { $max: '$amount' }
                }
            }
        ]).toArray();

        if (resultado.length > 0) {
            console.log('Rango de cantidades:');
            console.log(`Cantidad Mínima: ${resultado[0].cantidadMinima}`);
            console.log(`Cantidad Máxima: ${resultado[0].cantidadMaxima}`);
        } else {
            console.log('No se encontraron resultados.');
        }

    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
    } finally {

        await cliente.close();
    }
}


consultarRangoAmount();
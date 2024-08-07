document.getElementById('checkout-pay').addEventListener('click', async () => {
    try {
        // Realizar la solicitud POST
        const response = await fetch('/pay/create_preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            // No necesitas enviar 'res' en el cuerpo de la solicitud
        });

        // Verificar que la respuesta sea exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Mostrar los datos en la consola
        console.log(data);

        // Redirigir al usuario a la URL de pago (si es necesario)
        if (data.result && data.result.init_point) {
            window.location.href = data.result.init_point;
        }
    } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
    }
});




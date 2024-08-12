import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'TEST-6236905547231165-080614-a3dc462ecda06d4d402c722f8f90db79-98646771' });
const preference = new Preference(client);
const payment = new Payment(client);

export const crearPago = async (req, res) => {
   try {
      const result = await preference.create({
         body: {
            items: [
               {
                  title: 'Resultados de analisis',
                  quantity: 1,
                  unit_price: 2000,
                  currency_id: 'ARS'
               }
            ],
            back_urls: {
               success: 'https://integracion-nodejs-mercado-pago.onrender.com/pay/success',
               failure: 'https://integracion-nodejs-mercado-pago.onrender.com/pay/failure',
               pending: 'https://integracion-nodejs-mercado-pago.onrender.com/pay/pending'
            },
            notification_url: 'https://integracion-nodejs-mercado-pago.onrender.com/pay/webhook',
            auto_return: 'approved',
            use_points_for_discount: true,
            external_reference: 'ref-123456789'
         }
      });

      res.send({
         message: 'Datos de pago obtenidos',
         result
      });
   } catch (error) {
      console.error('Error al crear el pago:', error);
      res.status(500).send('Error al crear el pago');
   }
};



export const success = (req, res) => {
   console.log('Pago exitoso', req.query);
   res.send('Pago exitoso');
};

export const failed = (req, res) => {
   console.log('Pago fallido');
   res.send('Pago fallido');
};

export const pending = (req, res) => {
   console.log('Pago pendiente');
   res.send('Pago pendiente');
};

export const webhook = async (req, res) => {
   try {
      const { data } = req.body; // Asegúrate de que estás usando `req.body` y no `req.query`

      if (data && data.id) {
         // Usar el método `get` en lugar de `findById`
         const paymentDetails = await payment.get(data.id);
         console.log('Detalles del pago:', paymentDetails);

         if (paymentDetails.status === 'approved') {
            // Lógica adicional si el pago está aprobado
         }
      } else {
         console.log('No se encontró ID de pago en el webhook');
      }

      res.send('Webhook recibido');
   } catch (error) {
      console.error('Error al procesar el webhook:', error);
      res.status(500).send('Error al procesar el webhook');
   }
};

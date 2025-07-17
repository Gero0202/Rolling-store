/**
 *  🔒 Rutas relacionadas al flujo de pagos con Mercado Pago
 *  Comentadas para evitar interacción real en el entorno de prueba
 *  🔒 Rutas relacionadas al flujo de pagos con Mercado Pago
 *  📝 Están completamente implementadas pero desactivadas en este entorno por motivos de seguridad y demostración.
 *  💡 Activarlas solo en entornos seguros o de producción
 *  Define las rutas para la creacion de preferencias de pago, el manejo de webhooks
 * y los redireccionamientos post-pago (exito, fallo, pendiente), aplicando las politicas de acceso.
 */

// import CustomRouter from "./custom.router.js";
// import { createPreference, receivewebhook, success, failure, pending } from "../controllers/mp.controllers.js";

// class MpRouter extends CustomRouter{
//     constructor(){
//         super()


//         🧾 Crea la preferencia de pago para iniciar el Checkout Pro
//          this.create("/create-preference", ["user", "admin"], createPreference)
        

//         📬 Endpoint público que recibe notificaciones (webhooks) de Mercado Pago
//         this.create("/webhook", ["public"], receivewebhook)
     
//         ✅ Ruta para redirigir al usuario si el pago fue exitoso
//         💡 Comentada temporalmente por seguridad, activarla en producción
//          this.read("/checkout/success", ["user", "admin"], success)
//        
//         ⚠️ Ruta de fallo de pago (no se usa frecuentemente)
//         💡 Comentada por seguridad / entorno de desarrollo
//          this.read("/checkout/failure", ["user", "admin"] , failure )


//         ⏳ Ruta para pagos pendientes de confirmación
//         💡 Comentada temporalmente para evitar confusiones en testing
//         this.read("/checkout/pending", ["user", "admin"], pending)

//     }
// }

// const mpRouter = new MpRouter()
// export default mpRouter.getRouter()
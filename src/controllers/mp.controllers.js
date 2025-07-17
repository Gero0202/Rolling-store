/**
 * 💸 Controladores para la gestion integral del flujo de pagos con Mercado Pago.
 * Incluye la creacion de preferencias, y el manejo de los resultados (exito, fallo, pendiente)
 * y notificaciones (webhooks) de las transacciones.
 */


// import { payment, preference } from "../config/mp.config.js";
// import { totalToPayService } from "../services/carts.service.js";
// import { mapMpStatusToOrderState } from "../helpers/mpStatusMapper.helper.js";
// import { saveOrderService } from "../services/orders.service.js";
// import { updatedCartStateService } from "../services/carts.service.js";
// import { validateSignature } from "../utils/validateSignature.js";
// import Order from "../dao/mongo/models/order.model.js";


// 💳 Crea una preferencia de pago en Mercado Pago (Checkout Pro)
// 📦 Los productos se toman del carrito del usuario logueado
// 🛑 Actualmente desactivado por motivos de seguridad en entorno demo
// const createPreference = async (req, res) => {
//     const uid = req.user.user_id
//     if (!uid) return res.status(401).json({ error: "Usuario no autenticado" });

//     const cartData = await totalToPayService(uid)

//     if (!cartData || !cartData[0]) return res.json404("Carrito vacio")

//     const { products, total, email } = cartData[0]

//     if (!products?.length) return res.json400("Carrito vacio")

//     const preferenceData = {
//         items: products.map(p => ({
//             id: p.product_id,
//             title: p.title,
//             quantity: p.quantity,
//             unit_price: p.price,
//             currency_id: "ARS"
//         })),
//         payer: { email },
//         metadata: { user_id: uid },
//         back_urls: {
//             success: `${process.env.FRONT_URL}/mercadopago/checkout/success`,
//             failure: `${process.env.FRONT_URL}/mercadopago/checkout/failure`,
//             pending: `${process.env.FRONT_URL}/mercadopago/checkout/pending`
//         },
//         notification_url: `${process.env.BACK_URL}/mercadopago/webhook`,
//         auto_return: "approved"
//     }
//     const result = await preference.create({ body: preferenceData })

//     if (!result.id) {
//         return res.status(500).json({ error: "No se pudo crear la preferencia" });
//     }
//     res.json200({ id: result.id })
// }


// 📬 Webhook que recibe notificaciones automaticas de Mercado Pago
// 🔐 Incluye validacion de firma digital y actualizacion del estado del pedido
// 🛑 Actualmente desactivado por motivos de seguridad en entorno demo
// const receivewebhook = async (req, res) => {

//     try {
//         const result = validateSignature(req)

//         if (result.ignored) {
//             console.log(`🔕 Tipo de webhook ignorado: ${result.type}`)
//             return res.status(200).send("Tipo ignorado")
//         }

//         if (!result.valid) {
//             console.warn("⚠️", result.reason)
//             return res.status(403).send(result.reason)
//         }

//         console.log("✅ Firma válida. Procesando...")

//         const resultMp = await payment.get({ id: result.dataId })
//         const paymentData = resultMp.body || resultMp

//         console.log("💬 Notificación recibida. Payment ID:", result.dataId)
//         console.log("PAYMENT DATA", paymentData)

//         const userId = paymentData.metadata?.user_id
//         if (!userId) return res.json400("Falta user_id en metadata")

//         const mpStatus = paymentData.status
//         const mpStatusDetail = paymentData.status_detail
//         const internalStatus = mapMpStatusToOrderState(mpStatus, mpStatusDetail)


//         if (internalStatus === "paid") {
//             await saveOrderService(userId, paymentData)
//         }

//         await updatedCartStateService(userId, internalStatus)
//         res.status(200).send("Webhook recibido correctamente")
//     } catch (error) {
//         console.error("Error en el webhook: ", error.message)
//         res.status(500).send("Error en el webhook")
//     }

// }


// ✅ Renderiza la vista de exito de pago (checkout/success)
// 🔄 Si no se ha creado aun la orden, muestra pantalla de "pago pendiente"
// const success = async (req, res) => {
//     const paymentId = req.query.payment_id

//     if (!paymentId) return res.json400("Falta el id de pago")

//     const result = await payment.get({ id: paymentId })

//     if (!result) {
//         console.error("No se pudo obtener el detalle del pago de Mercado Pago para ID:", paymentId);
//         return res.status(500).send("Error al obtener detalles del pago.");
//     }

//     const existingOrder = await Order.findOne({ mp_payment_id: paymentId }).populate("user_id")

//     if (!existingOrder) {
//         return res.status(202).render("pending", {
//             title: "Pago en proceso",
//             message: "Estamos procesando tu pago. Si ya paso mas de 1 minuto y no se reflejo, por favor contactanos"
//         })
//     }

//     const paymentData = {
//         id: result.id,
//         status: result.status,
//         status_detail: result.status_detail,
//         payer_email: result.payer.email || "No disponible",
//         user_email: existingOrder.user_id?.email,
//         transaction_amount: result.transaction_amount,
//         payment_method_id: result.payment_method_id,
//         payment_type_id: result.payment_type_id,
//         external_reference: result.external_reference,
//         date_created: result.date_created
//     }

//     return res.status(200).render("success", {
//         title: "Pago exitoso",
//         payment: paymentData
//     })
// }

// ❌ Renderiza la vista cuando el pago falla
// const failure = (req, res) => {
//     res.render("failure");
// };

// ⏳ Renderiza la vista cuando el pago queda en estado "pendiente"
// const pending = (req, res) => {
//     res.render("pending");
// };

// export { createPreference, receivewebhook, success, failure, pending }



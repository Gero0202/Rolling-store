/**
 * 🔐 validateSignature.js
 * 
 * Utilidad para validar la firma HMAC-SHA256 enviada por Mercado Pago en los webhooks.
 * Asegura que la notificacion recibida provenga realmente de Mercado Pago, comparando
 * la firma (`x-signature`) con una generada localmente usando el secreto de Webhooks.
 * 
 * Devuelve un objeto con:
 * - valid: boolean → si la firma es valida
 * - ignored: boolean → si el tipo de notificacion no es de interes (por ejemplo, "merchant_order")
 * - reason: string → motivo del rechazo o de la omision
 * - dataId: string → id del pago (si es valido)
 * 
 * 👉 Usado en: controller de webhook (`receivewebhook`) para evitar procesar notificaciones maliciosas o irrelevantes.
 */


// import crypto from "crypto"

// export const validateSignature = (req) => {
//   const signatureHeader = req.headers["x-signature"]
//   const requestId = req.headers["x-request-id"]
//   const dataId = req.query["data.id"] || req.query.id || req.body?.data?.id
//   const type = req.query.type || req.query.topic || req.body?.type

//   if (type !== "payment") {
//     return { valid: false, ignored: true, reason: "Tipo ignorado", type }
//   }

//   if (!signatureHeader || !requestId || !dataId || !type) {
//     return { valid: false, ignored: false, reason: "Faltan datos para validar firma" }
//   }

//   if (!signatureHeader.includes("ts=") || !signatureHeader.includes("v1=")) {
//     return { valid: false, ignored: false, reason: "Formato de firma inválido" }
//   }

//   const [tsPart, v1Part] = signatureHeader.split(",")
//   const ts = tsPart.split("=")[1]
//   const v1 = v1Part.split("=")[1]
//   const template = `id:${dataId};request-id:${requestId};ts:${ts};`

//   const secret = process.env.MP_WEBHOOK_SECRET
//   const hmac = crypto.createHmac("sha256", secret)
//   hmac.update(template)
//   const generated = hmac.digest("hex")

//   if (generated !== v1) {
//     return { valid: false, ignored: false, reason: "Firma inválida" }
//   }

//   return { valid: true, ignored: false, dataId }
// }

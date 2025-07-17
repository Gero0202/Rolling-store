// 🛒 Servicio para crear y guardar una orden de compra
// 1️⃣ Obtiene el carrito y total a pagar para un usuario dado (totalToPayService)
// 2️⃣ Si el carrito está vacío, no se guarda la orden (prevención 🚨)
// 3️⃣ Prepara los productos con sus detalles para la orden
// 4️⃣ Construye el objeto `orderData` con info del usuario, items, total y datos de pago
// 5️⃣ Guarda la orden usando el repositorio (saveOrderRepo)
// Este flujo centraliza la lógica de creación de la orden, listo para ser usado por controladores (mp.controller)🚀

// import { totalToPayService } from "./carts.service.js";
// import { saveOrderRepo } from "../repositories/orders.rep.js";

// export const saveOrderService = async(userId, paymentData) =>{
//     const cart = await totalToPayService(userId)

//      console.log("Resultado de totalToPayService (cart):", cart);
    
//     if(!cart.length) {
//         console.log("🚨 El carrito está vacío, no se guarda la orden.");
//         return 
//     }

//     const { products, total } = cart[0] 

//     const items = products.map(p => ({
//         product_id: p.product_id,
//         title: p.title,
//         quantity: p.quantity,
//         price: p.price,
//         subtotal: p.total
//     }))

//     const orderData = {
//         user_id: userId,
//         items,
//         total,
//         status: "paid",
//         mp_payment_id: paymentData.id,
//         mp_status: paymentData.status,
//         mp_merchant_order: paymentData.order?.id || null
//     }

//     return await saveOrderRepo(orderData)

// }
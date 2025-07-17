/**
 * 📦 Gestor de Órdenes (OrdersManager) para la persistencia en MongoDB.
 * ✨ Esta clase extiende nuestra base 'Manager' para interactuar específicamente con el modelo 'Order'.
 *     Guarda una nueva orden en la base de datos.
 * 🛒 Toma los datos de una orden, crea una nueva instancia del modelo 'Order'
 *  y la persiste en MongoDB, devolviendo la orden guardada con su ID y otros detalles.
 */

// import Manager from "./manager.mongo.js";
// import Order from "./models/order.model.js";

// class OrdersManager extends Manager{
//     constructor(){
//         super(Order)
//     }

//     saveOrder = async(orderData) =>{
//         const order = new Order(orderData)
//         return await order.save()
//     }
// }

// export const ordersManager = new OrdersManager()
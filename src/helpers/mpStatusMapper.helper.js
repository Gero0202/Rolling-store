/**
 * Traduce el estado de pago de Mercado Pago a un estado interno de tu sistema.
 * @param {string} mpStatus - El estado principal (status) de Mercado Pago.
 * @param {string} mpStatusDetail - El detalle del estado (status_detail), opcional.
 * @returns {string} Estado interno como: "paid", "reserved", "cancelled"
 */


// export function mapMpStatusToOrderState(mpStatus, mpStatusDetail = "") {
//   switch (mpStatus) {
//     case "approved":
//       return "paid"; 

//     case "in_process":
//     case "pending":
//     case "in_mediation":
//       return "reserved"; 

//     case "rejected":
//     case "cancelled":
//     case "refunded":
//     case "charged_back":
//       return "cancelled";

//     default:
//       console.warn(`Estado MP desconocido: ${mpStatus} - ${mpStatusDetail}`);
//       return "reserved"; 
//   }
// }

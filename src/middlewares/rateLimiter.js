import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5,
  message: "Demasiados intentos de login. Intenta de nuevo mas tarde.",
  standardHeaders: true,
  legacyHeaders: false,
})

export const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, 
    message: 'Demasiados intentos de registro, por favor, intentalo de nuevo despues de 15 minutos.',
    statusCode: 429,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({ error: true, message: options.message });
    }
});

export const verifyLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutos
  max: 5, 
  message: {
    error: 'Demasiados intentos de verificacion. Intenta mas tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
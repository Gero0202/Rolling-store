export const validateLoginFields = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  // Validación simple de formato email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password demasiado corta" });
  }

  next();
};

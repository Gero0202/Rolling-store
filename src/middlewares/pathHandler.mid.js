const pathHandler = (req, res) => {
    const message = "Not found path"
    const data = {
        method: req.method,
        url: req.originalUrl,
        error: message
    }

    if (req.originalUrl.startsWith("/api/")) {
        return res.status(404).json({ response: data });
    }

    return res.status(404).render("error", {
        title: "Página no encontrada", message
    });
}

export default pathHandler
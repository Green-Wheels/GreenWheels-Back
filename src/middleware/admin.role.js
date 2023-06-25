

// Definiere eine Funktion namens 'isAdmin'
function isAdmin(req, res, next) {
    // Extrahiere 'role' aus dem Token Payload des Requests
    const { role } = req.tokenPayload;
  
    // Prüfe, ob die Rolle nicht 'admin' ist
    if (role !== "admin") {
      // Wenn die Rolle nicht 'admin' ist, sende eine 403 (Verboten) Statusantwort mit einer Fehlermeldung
      return res
        .status(403)
        .send({ success: false, message: "Zugriff verboten, kein Administrator" });
    }
  
    // Wenn die Rolle 'admin' ist, rufe die nächste Middleware-Funktion in der Kette auf
    next();
  }
export default isAdmin;  
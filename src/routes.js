import { Router } from "express";
import { crearPago, success, failed, pending, webhook } from "./controllers/pago.js";

const router = Router();

router.post('/create_preferences', crearPago);

router.get('/success', success)

router.get('/failure', failed)

router.get('/pending', pending)

router.post('/webhook', webhook)

export default router;

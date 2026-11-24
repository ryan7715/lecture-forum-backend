// 회원과 관련된 라우터 모음

import { Router } from "express";

const router = Router();

router.post("/create", userController.createUser);
router.put("/update", () => {});
router.delete("/delete", () => {});
router.post("/login", () => {});






export default router;

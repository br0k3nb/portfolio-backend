import express from 'express'
import ProjectsController from '../controllers/ProjectsController';

const router = express.Router();

router.get("/projects", ProjectsController.view);
router.post("/projects/add", ProjectsController.add);
router.put("/projects/edt", ProjectsController.edit);
router.delete("/projects/add", ProjectsController.delete);

export default router;
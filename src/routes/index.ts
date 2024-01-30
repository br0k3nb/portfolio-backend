import express from 'express'
import ProjectsController from '../controllers/ProjectsController';

const router = express.Router();

router.get("/projects", ProjectsController.view);
router.post("/projects/add", ProjectsController.add);
router.patch("/project/edit/:id", ProjectsController.edit);
router.delete("/project/delete/:id", ProjectsController.delete);

export default router;
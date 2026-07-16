import { Router } from 'express';
import {
  createBrew,
  deleteBrew,
  getBrew,
  listBrews,
  updateBrew,
} from '../controllers/brewController.js';

const router = Router();

router.get('/', listBrews);
router.get('/:id', getBrew);
router.post('/', createBrew);
router.put('/:id', updateBrew);
router.delete('/:id', deleteBrew);

export default router;

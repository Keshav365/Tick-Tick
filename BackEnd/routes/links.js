import express from 'express';
import { toggleLinkDeletion, getLinks, createLink } from "../controllers/link.js";

const router = express.Router();

router.put('/:id', createLink);
router.put('/toggle-deletion/:id', toggleLinkDeletion); // Add this route for toggling completion
router.get('/', getLinks); 

export default router;

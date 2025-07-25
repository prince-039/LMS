import { Router } from 'express';
import { getAllCourses, getLecturesByCourseId } from '../controllers/course.controller.js';
import {isLoggedIn, authorizedRoles, authorizedSubscriber} from '../middlewares/auth.middleware.js';
import { createCourse, updateCourse, removeCourse, addLectureToCourseById } from '../controllers/course.controller.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router.get('/', getAllCourses);
router.post('/',isLoggedIn,
    upload.single('thumbnail'), 
    authorizedRoles('ADMIN'),
     createCourse
    );

router.get('/:id',isLoggedIn, authorizedSubscriber,getLecturesByCourseId);
router.put('/:id', 
    isLoggedIn,
    authorizedRoles('ADMIN'),
     updateCourse
    );
router.delete('/:id', isLoggedIn, 
authorizedRoles('ADMIN'),
 removeCourse
);
router.post('/:id',
            isLoggedIn,
            authorizedRoles('ADMIN'),
            upload.single('lecture'),
            addLectureToCourseById
          )

export default router;
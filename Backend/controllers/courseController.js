import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Lesson from "../models/Lesson.js";
import MEDICAL_DOMAINS from "../models/domains.js";

// --- COURSE CONTROLLERS ---

export const createCourse = async (req, res) => {
    try {
        const { title, description, domain, pricingType, price, recommendedForFailedCertifications } = req.body;
        const thumbnail = req.file ? req.file.path : null;

        if (!MEDICAL_DOMAINS.includes(domain)) {
            return res.status(400).json({ message: "Invalid domain" });
        }

        const course = await Course.create({
            title,
            description,
            thumbnail,
            domain,
            pricingType,
            price: pricingType === "paid" ? price : 0,
            createdBy: req.user._id,
            recommendedForFailedCertifications: !!recommendedForFailedCertifications,
            status: "draft"
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyCourses = async (req, res) => {
    try {
        const courses = await Course.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const { status, domain } = req.query;
        const query = {};
        
        // If user is not admin, only show approved courses
        if (req.user.role !== "admin") {
            query.status = "approved";
        } else if (status) {
            query.status = status;
        } else {
            // Admin "All" view should still exclude drafts by default
            query.status = { $ne: "draft" };
        }

        if (domain) query.domain = domain;

        const courses = await Course.find(query).populate("createdBy", "name").sort({ createdAt: -1 });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("createdBy", "name");
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { title, description, domain, pricingType, price, status, rejectionReason } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ message: "Course not found" });

        // Authorization: Admin can update status, Creator can update details
        const isAdmin = req.user.role === "admin";
        const isCreator = course.createdBy.toString() === req.user._id.toString();

        if (!isAdmin && !isCreator) {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (isCreator) {
            if (title) course.title = title;
            if (description) course.description = description;
            if (domain) {
                if (!MEDICAL_DOMAINS.includes(domain)) return res.status(400).json({ message: "Invalid domain" });
                course.domain = domain;
            }
            if (pricingType) course.pricingType = pricingType;
            if (price !== undefined) course.price = pricingType === "paid" ? price : 0;
            if (req.file) course.thumbnail = req.file.path;
            
            // If creator edits, reset status to pending
            course.status = "pending";
            course.rejectionReason = undefined;
        }

        if (isAdmin) {
            if (status) course.status = status;
            if (rejectionReason) course.rejectionReason = rejectionReason;
        }

        await course.save();
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCourseBasicInfo = async (req, res) => {
    try {
        const { title, description, domain, pricingType, price } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ message: "Course not found" });

        // Authorization: Creator can update details
        const isCreator = course.createdBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === "admin";

        if (!isCreator && !isAdmin) {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (title) course.title = title;
        if (description) course.description = description;
        if (domain) {
            if (!MEDICAL_DOMAINS.includes(domain)) {
                return res.status(400).json({ message: "Invalid domain" });
            }
            course.domain = domain;
        }
        if (pricingType) course.pricingType = pricingType;
        if (price !== undefined) course.price = pricingType === "paid" ? price : 0;
        if (req.file) course.thumbnail = req.file.path;

        // Keep current status, but clear rejection reason if it exists
        if (course.status === "rejected") {
            course.status = "draft";
        }
        course.rejectionReason = undefined;

        await course.save();
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const submitCourseForReview = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        course.status = "pending";
        await course.save();

        res.json({ message: "Course submitted for review", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const approveCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        course.status = "approved";
        course.rejectionReason = undefined;
        await course.save();

        res.json({ message: "Course approved successfully", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const rejectCourse = async (req, res) => {
    try {
        const { reason } = req.body;
        if (!reason) return res.status(400).json({ message: "Rejection reason is required" });

        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        course.status = "rejected";
        course.rejectionReason = reason;
        await course.save();

        res.json({ message: "Course rejected", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- MODULE CONTROLLERS ---

export const createModule = async (req, res) => {
    try {
        const { title, description, courseId, order } = req.body;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const module = await Module.create({
            title,
            description,
            course: courseId,
            order: order || 0
        });

        res.status(201).json(module);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getModulesByCourse = async (req, res) => {
    try {
        const modules = await Module.find({ course: req.params.courseId }).sort({ order: 1 });
        res.json(modules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateModule = async (req, res) => {
    try {
        const { title, description, order } = req.body;
        const module = await Module.findById(req.params.id).populate("course");
        if (!module) return res.status(404).json({ message: "Module not found" });

        if (module.course.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (title) module.title = title;
        if (description) module.description = description;
        if (order !== undefined) module.order = order;

        await module.save();
        res.json(module);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteModule = async (req, res) => {
    try {
        const module = await Module.findById(req.params.id).populate("course");
        if (!module) return res.status(404).json({ message: "Module not found" });

        if (module.course.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        // Delete all lessons in this module
        await Lesson.deleteMany({ module: module._id });
        await module.deleteOne();

        res.json({ message: "Module and associated lessons deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- LESSON CONTROLLERS ---

export const createLesson = async (req, res) => {
    try {
        const { title, description, moduleId, notes, order } = req.body;
        const module = await Module.findById(moduleId).populate("course");
        if (!module) return res.status(404).json({ message: "Module not found" });

        if (module.course.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const videoUrl = req.file ? req.file.path : null;

        const lesson = await Lesson.create({
            title,
            description,
            videoUrl,
            notes,
            module: moduleId,
            order: order || 0
        });

        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLessonsByModule = async (req, res) => {
    try {
        const lessons = await Lesson.find({ module: req.params.moduleId }).sort({ order: 1 });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateLesson = async (req, res) => {
    try {
        const { title, description, notes, order } = req.body;
        const lesson = await Lesson.findById(req.params.id).populate({
            path: "module",
            populate: { path: "course" }
        });
        if (!lesson) return res.status(404).json({ message: "Lesson not found" });

        if (lesson.module.course.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (title) lesson.title = title;
        if (description) lesson.description = description;
        if (notes) lesson.notes = notes;
        if (order !== undefined) lesson.order = order;
        if (req.file) lesson.videoUrl = req.file.path;

        await lesson.save();
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate({
            path: "module",
            populate: { path: "course" }
        });
        if (!lesson) return res.status(404).json({ message: "Lesson not found" });

        if (lesson.module.course.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        await lesson.deleteOne();
        res.json({ message: "Lesson deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

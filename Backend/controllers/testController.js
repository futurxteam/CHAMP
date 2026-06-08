import fs from "fs";
import Certification from "../models/Certification.js";
import Question from "../models/Question.js";
import Attempt from "../models/Attempt.js";
import Certificate from "../models/Certificate.js";
import Content from "../models/Content.js";
import Course from "../models/Course.js";
import generateCertificate from "../utils/generateCertificate.js";
import cloudinary from "../utils/cloudinary.js";

// GET /api/test/:certId/start
export const startTest = async (req, res) => {
    try {
        const { certId } = req.params;

        const cert = await Certification.findById(certId);
        if (!cert) return res.status(404).json({ message: "Certification not found" });

        const questions = await Question.find({ certification: certId });

        if (!questions || questions.length === 0) {
            return res.status(400).json({ message: "No questions found for this certification" });
        }

        // Randomize and select up to 10 questions
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(10, shuffled.length));

        // Strip correct answer from response
        const safeQuestions = selected.map((q) => ({
            _id: q._id,
            question: q.question,
            options: q.options,
            domain: q.domain,
            difficulty: q.difficulty,
        }));

        res.json({
            certId: cert._id,
            title: cert.title,
            domain: cert.domain,
            passingScore: cert.passingScore,
            questions: safeQuestions,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/test/submit
export const submitTest = async (req, res) => {
    try {
        const { certId, answers } = req.body;

        if (!certId || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: "certId and answers are required" });
        }

        const cert = await Certification.findById(certId);
        if (!cert) return res.status(404).json({ message: "Certification not found" });

        const answeredIds = answers.map((a) => a.questionId);
        const questions = await Question.find({ _id: { $in: answeredIds }, certification: certId });

        let correct = 0;
        questions.forEach((q) => {
            const ans = answers.find((a) => String(a.questionId) === String(q._id));
            if (ans && ans.selected === q.correctAnswer) {
                correct++;
            }
        });

        const total = questions.length || 1;
        const score = Math.round((correct / total) * 100);
        const passed = score >= cert.passingScore;

        const attempt = await Attempt.create({
            user: req.user._id,
            certification: certId,
            answers,
            score,
            passed,
        });

        let certificate = null;
        if (passed) {
            // Check if certificate already exists
            certificate = await Certificate.findOne({
                user: req.user._id,
                certification: certId
            });

            if (!certificate || !certificate.certificateUrl) {
                    const vId = certificate ? certificate.verificationId : `CERT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
                    const userName = req.user.name;
                    const certificationName = cert.title;

                    let filePath;
                    try {
                        // 1. Generate PDF
                        filePath = await generateCertificate(userName, certificationName, vId, new Date());

                        // 2. Upload to Cloudinary
                        const uploadResponse = await cloudinary.uploader.upload(filePath, {
                            resource_type: "raw",
                            folder: "CHAMP_Certificates",
                            public_id: `${vId}.pdf`
                        });
                        console.log('--- CLOUDINARY UPLOAD DEBUG ---');
                        console.log('Response:', JSON.stringify(uploadResponse, null, 2));
                        console.log('-------------------------------');

                        // 3. Save to DB
                        if (certificate) {
                            certificate.certificateUrl = uploadResponse.secure_url;
                            await certificate.save();
                        } else {
                            certificate = await Certificate.create({
                                user: req.user._id,
                                certification: certId,
                                verificationId: vId,
                                certificateUrl: uploadResponse.secure_url,
                            });
                        }
                        console.log('--- DB SAVE DEBUG ---');
                        console.log('Certificate Saved:', JSON.stringify(certificate, null, 2));
                        console.log('----------------------');

                } catch (certErr) {
                    console.error("--- CERTIFICATE ERROR ---");
                    console.error("Error Message:", certErr.message);
                    console.error("Full Error:", certErr);
                    console.error("-------------------------");
                } finally {
                    // 4. Cleanup local file
                    if (filePath && fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
            }
        }

        if (passed) {
            return res.json({
                score,
                passed,
                correct,
                total,
                certTitle: cert.title,
                passingScore: cert.passingScore,
                certificate,
                recommendations: [],
                attemptId: attempt._id,
            });
        }

        const recommendations = await Course.find({
            domain: cert.domain,
            pricingType: "free",
            status: "approved",
        })
        .populate("createdBy", "name")
        .sort({ createdAt: -1 })
        .limit(6);

        return res.json({
            score,
            passed: false,
            certificationDomain: cert.domain,
            recommendations,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/test/my-certificates
export const getMyCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find({ user: req.user._id })
            .populate("certification", "title domain description")
            .sort("-issuedAt");
        res.json(certificates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/test/certificate/:verificationId (Public)
export const verifyCertificate = async (req, res) => {
    try {
        const { verificationId } = req.params;
        const certificate = await Certificate.findOne({ verificationId })
            .populate("user", "name")
            .populate("certification", "title domain");

        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }

        console.log('--- VERIFY CERT DEBUG ---');
        console.log('Found Certificate:', JSON.stringify(certificate, null, 2));
        console.log('-------------------------');

        res.json({
            userName: certificate.user.name,
            certificationTitle: certificate.certification.title,
            issuedAt: certificate.issuedAt,
            verificationId: certificate.verificationId,
            certificateUrl: certificate.certificateUrl
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/test/certifications — List all available certifications
export const getCertifications = async (req, res) => {
    try {
        const certs = await Certification.find().select("title domain description price passingScore createdAt");
        res.json(certs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateCertificate = async (userName, certificationName, verificationId, date) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                layout: 'landscape',
                size: 'A4',
            });
 
            const fileName = `certificate_${verificationId}.pdf`;
            const filePath = path.join(__dirname, '..', 'tmp', fileName);

            // Ensure tmp directory exists
            const tmpDir = path.join(__dirname, '..', 'tmp');
            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir);
            }

            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            // Background / Border
            doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
               .lineWidth(5)
               .stroke('#1a3a5a');

            doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
               .lineWidth(2)
               .stroke('#1a3a5a');

            // Content
            doc.moveDown(4);
            doc.font('Helvetica-Bold').fontSize(50).fillColor('#1a3a5a').text('Certificate of Completion', {
                align: 'center',
            });

            doc.moveDown(2);
            doc.font('Helvetica').fontSize(20).fillColor('#333').text('This is to certify that', {
                align: 'center',
            });

            doc.moveDown(1);
            doc.font('Helvetica-Bold').fontSize(40).fillColor('#e67e22').text(userName, {
                align: 'center',
            });

            doc.moveDown(1);
            doc.font('Helvetica').fontSize(20).fillColor('#333').text('has successfully completed the certification', {
                align: 'center',
            });

            doc.moveDown(0.5);
            doc.font('Helvetica-Bold').fontSize(30).fillColor('#1a3a5a').text(certificationName, {
                align: 'center',
            });

            doc.moveDown(3);
            doc.font('Helvetica').fontSize(16).fillColor('#555').text(`Date: ${new Date(date).toLocaleDateString()}`, {
                align: 'center',
            });

            doc.moveDown(1);
            doc.font('Helvetica').fontSize(12).fillColor('#777').text(`Verification ID: ${verificationId}`, {
                align: 'center',
            });

            doc.end();

            stream.on('finish', () => {
                const stats = fs.statSync(filePath);
                console.log('--- PDF GENERATION DEBUG ---');
                console.log('Path:', filePath);
                console.log('Exists:', fs.existsSync(filePath));
                console.log('Size:', stats.size, 'bytes');
                console.log('-----------------------------');
                resolve(filePath);
            });

            stream.on('error', (err) => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};

export default generateCertificate;

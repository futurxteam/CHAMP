import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { testApi } from "../api/api";
import { motion } from "framer-motion";

export default function VerifyCertificatePage() {
    const { verificationId } = useParams();
    const [cert, setCert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCert = async () => {
            try {
                const data = await testApi.verifyCertificate(verificationId);
                console.log('--- FRONTEND CERT DEBUG ---');
                console.log('Verification ID:', verificationId);
                console.log('Data:', JSON.stringify(data, null, 2));
                console.log('---------------------------');
                setCert(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCert();
    }, [verificationId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-50">
                <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-surface-50 px-4">
            <div className="max-w-xl mx-auto">
                {error ? (
                    <div className="bg-white p-12 rounded-[3rem] border border-red-100 shadow-xl text-center">
                        <div className="text-6xl mb-6">⚠️</div>
                        <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter mb-4">Invalid Certificate</h2>
                        <p className="text-surface-500 mb-8 font-medium">The verification ID provided does not match any record in our system.</p>
                        <Link to="/" className="inline-block px-8 py-3 bg-surface-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Back to Home</Link>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-12 rounded-[4rem] border border-surface-100 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-bl-[5rem] -mr-10 -mt-10" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">✓</div>
                                <div>
                                    <h1 className="text-sm font-black text-green-600 uppercase tracking-[0.2em]">Verified Credential</h1>
                                    <p className="text-[10px] font-bold text-surface-300 uppercase tracking-widest italic">CHAMP Institutional Registry</p>
                                </div>
                            </div>

                            <div className="space-y-8 mb-12">
                                <div>
                                    <label className="text-[10px] font-black text-surface-300 uppercase tracking-widest block mb-2">Recipient Name</label>
                                    <p className="text-3xl font-black text-surface-900 uppercase tracking-tighter leading-none">{cert.userName}</p>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-surface-300 uppercase tracking-widest block mb-2">Certification Awarded</label>
                                    <p className="text-xl font-bold text-primary-600">{cert.certificationTitle}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-[10px] font-black text-surface-300 uppercase tracking-widest block mb-2">Date of Issue</label>
                                        <p className="text-sm font-black text-surface-900">{new Date(cert.issuedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-surface-300 uppercase tracking-widest block mb-2">Verification ID</label>
                                        <p className="text-sm font-mono font-bold text-surface-900">{cert.verificationId}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-surface-50 flex flex-col gap-4">
                                {cert.certificateUrl ? (
                                    <>
                                        <a 
                                            href={cert.certificateUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-4 bg-surface-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-600 transition-all shadow-xl shadow-surface-900/20 text-center block"
                                        >
                                            View Digital Certificate
                                        </a>
                                        <a 
                                            href={cert.certificateUrl}
                                            download={`Certificate_${cert.verificationId}.pdf`}
                                            className="w-full py-4 bg-white text-surface-900 border-2 border-surface-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-surface-50 transition-all text-center block"
                                        >
                                            ⬇ Download Credential
                                        </a>
                                    </>
                                ) : (
                                    <div className="text-center p-4 bg-surface-50 rounded-xl text-[10px] font-black uppercase text-surface-400">PDF Not Available</div>
                                )}
                                <Link to="/" className="text-center text-[10px] font-black text-surface-300 uppercase tracking-widest hover:text-surface-900 transition-colors">CHAMP Global Network</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

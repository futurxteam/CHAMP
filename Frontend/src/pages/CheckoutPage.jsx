import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../store/useStore";
import { courseApi } from "../api/api";

export default function CheckoutPage() {
  const { courseId } = useParams();
  const { token, user } = useStore();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    cardName: user?.name || "",
    cardNumber: "4111 2222 3333 4444",
    expiry: "12/28",
    cvc: "123",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const data = await courseApi.getById(courseId, token);
        setCourse(data);
      } catch (err) {
        console.error("Error loading checkout details:", err);
        setError(err.message || "Failed to load checkout details.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId && token) {
      fetchCourse();
    }
  }, [courseId, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-height-screen bg-[#f8fafc] flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-6" />
        <p className="text-surface-400 font-black uppercase text-xs tracking-widest">
          Initiating Purchase Portal...
        </p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-height-screen bg-[#f8fafc] py-20 px-4">
        <div className="max-w-xl mx-auto p-12 bg-white rounded-[3rem] border border-surface-100 text-center shadow-xl">
          <span className="text-6xl mb-6 block">⚠️</span>
          <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter mb-4">
            Portal Error
          </h3>
          <p className="text-surface-500 font-medium mb-8">
            {error || "We could not find the course for billing details."}
          </p>
          <Link
            to="/dashboard/user?tab=learning"
            className="px-8 py-3 bg-surface-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all inline-block shadow-lg"
          >
            ← Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = course.price || 0;
  const platformFee = 99;
  const total = subtotal + platformFee;

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="mb-8 px-6 py-2 bg-white text-surface-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-900 hover:text-white transition-all shadow-sm border border-surface-100"
        >
          ← Back to Preview
        </button>

        <h1 className="text-3xl font-black text-surface-900 uppercase tracking-tighter mb-8 text-center leading-none">
          Secured Checkout Portal
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Billing Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-10 bg-white rounded-[3rem] border border-surface-100 shadow-xl space-y-6"
            >
              <h3 className="text-xs font-black text-primary-600 uppercase tracking-[0.25em] mb-4">
                Mock Payment Credentials
              </h3>

              <div className="space-y-4">
                {/* Cardholder Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase text-surface-400 tracking-wider">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-3.5 bg-surface-50 rounded-xl border-none outline-none font-bold text-surface-900 placeholder:text-surface-300 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                  />
                </div>

                {/* Card Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase text-surface-400 tracking-wider">
                    Card Number (Visa / Mastercard)
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-3.5 bg-surface-50 rounded-xl border-none outline-none font-bold text-surface-900 placeholder:text-surface-300 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  />
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black uppercase text-surface-400 tracking-wider">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      className="w-full px-5 py-3.5 bg-surface-50 rounded-xl border-none outline-none font-bold text-surface-900 placeholder:text-surface-300 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black uppercase text-surface-400 tracking-wider">
                      Secure CVC Code
                    </label>
                    <input
                      type="password"
                      required
                      maxLength="4"
                      className="w-full px-5 py-3.5 bg-surface-50 rounded-xl border-none outline-none font-bold text-surface-900 placeholder:text-surface-300 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                      value={formData.cvc}
                      onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-surface-50">
                <button
                  type="submit"
                  className="w-full py-4 bg-surface-900 text-white hover:bg-primary-600 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  💳 Complete Mock Payment (₹{total.toLocaleString()})
                </button>
              </div>
            </form>
          </div>

          {/* Billing Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-white rounded-[3rem] border border-surface-100 shadow-xl space-y-6">
              <h3 className="text-xs font-black text-surface-900 uppercase tracking-widest pb-4 border-b border-surface-50">
                Purchase Order Details
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-16 h-12 rounded-lg bg-surface-100 overflow-hidden shrink-0 border border-surface-200 shadow-sm">
                  <img
                    src={course.thumbnail || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800"}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div>
                  <span className="text-[8px] font-black text-primary-600 uppercase tracking-widest block mb-0.5">
                    {course.domain}
                  </span>
                  <h4 className="text-sm font-black text-surface-900 uppercase tracking-tight line-clamp-1">
                    {course.title}
                  </h4>
                  <p className="text-[10px] text-surface-400 font-bold uppercase italic mt-0.5">
                    By {course.createdBy?.name || "CHAMP Faculty"}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-surface-50 space-y-3">
                <div className="flex justify-between text-xs font-bold text-surface-500">
                  <span>Course Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-surface-500">
                  <span>Secure Platform Fee</span>
                  <span>₹{platformFee.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-surface-50 flex justify-between items-baseline">
                  <span className="text-xs font-black uppercase text-surface-900 tracking-wider">
                    Grand Total
                  </span>
                  <span className="text-2xl font-black text-primary-600">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-900 rounded-[2rem] text-white/70 text-[10px] font-bold uppercase tracking-wider text-center border border-surface-800 shadow-lg">
              🛡️ Checkout backed by global healthcare certification standards.
            </div>
          </div>

        </div>
      </div>

      {/* Success Modal Simulation */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => {
                setShowModal(false);
                navigate("/dashboard/user?tab=learning");
              }}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative z-10 max-w-md w-full p-12 bg-white rounded-[4rem] border border-surface-100 shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-3xl mx-auto shadow-md">
                ✓
              </div>

              <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">
                Enrollment Simulated!
              </h2>

              <p className="text-sm text-surface-500 leading-relaxed font-semibold">
                Payment integration coming next phase. Your transaction and enrollment have been successfully simulated for this build.
              </p>

              <div className="p-4 bg-surface-50 rounded-2xl border border-surface-100 text-left space-y-1">
                <div className="text-[8px] font-black text-surface-300 uppercase tracking-widest">
                  Purchased Program
                </div>
                <div className="text-xs font-black text-surface-900 uppercase tracking-tight line-clamp-1">
                  {course.title}
                </div>
                <div className="text-[10px] text-green-600 font-bold uppercase italic mt-1 flex items-center gap-1">
                  <span>💳 Status:</span> Mock Payment Succeeded
                </div>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/dashboard/user?tab=learning");
                }}
                className="w-full py-4 bg-surface-900 text-white hover:bg-green-600 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-md"
              >
                Go to My Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

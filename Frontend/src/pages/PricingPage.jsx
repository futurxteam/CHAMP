import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../store/useStore";
import PricingCard from "../components/PricingCard";
import PageHeader from "../components/PageHeader";

const plans = [
  {
    name: "Free",
    description: "Get started with the essentials",
    price: "$0",
    period: null,
    features: [
      "Access to community forums",
      "Attend free events",
      "Read select articles",
      "Basic profile features",
      "Weekly newsletter",
    ],
  },
  {
    name: "Premium",
    description: "Unlock everything CHAMP has to offer",
    price: "$29",
    period: "month",
    features: [
      "All Free features included",
      "Access ALL premium events",
      "Read all premium articles & research",
      "Priority networking connections",
      "CME credit tracking",
      "Exclusive webinars & masterclasses",
      "Ad-free experience",
      "Early access to new features",
    ],
  },
];

const comparisonFeatures = [
  { feature: "Community Forums", free: true, premium: true },
  { feature: "Free Events", free: true, premium: true },
  { feature: "Select Articles", free: true, premium: true },
  { feature: "Basic Profile", free: true, premium: true },
  { feature: "Weekly Newsletter", free: true, premium: true },
  { feature: "Premium Events", free: false, premium: true },
  { feature: "All Articles & Research", free: false, premium: true },
  { feature: "Priority Networking", free: false, premium: true },
  { feature: "CME Credit Tracking", free: false, premium: true },
  { feature: "Exclusive Webinars", free: false, premium: true },
  { feature: "Ad-Free Experience", free: false, premium: true },
  { feature: "Early Access Features", free: false, premium: true },
];

export default function PricingPage() {
  const { user, upgradeToPremium } = useStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpgrade = () => {
    upgradeToPremium();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Membership Plans"
          subtitle="Unlock premium healthcare insights, accredited events, and elite networking"
        />

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl shadow-2xl shadow-surface-900/15 border border-accent-200 px-6 py-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-surface-800">Welcome to Premium! 🎉</p>
                <p className="text-sm text-surface-500">You now have access to all premium features.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isCurrentPlan={
                (plan.name === "Free" && !user?.isPremium) ||
                (plan.name === "Premium" && user?.isPremium)
              }
              onUpgrade={plan.name === "Premium" ? handleUpgrade : undefined}
            />
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-surface-100 overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-surface-100">
            <h2 className="text-2xl font-bold text-surface-800 text-center">Feature Comparison</h2>
            <p className="text-sm text-surface-500 text-center mt-1">See what's included in each plan</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-100">
                  <th className="text-left text-sm font-semibold text-surface-700 px-6 py-4">Feature</th>
                  <th className="text-center text-sm font-semibold text-surface-700 px-6 py-4 w-32">Free</th>
                  <th className="text-center text-sm font-semibold px-6 py-4 w-32">
                    <span className="text-transparent bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text">Premium</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={i} className={`border-b border-surface-50 ${i % 2 === 0 ? "bg-surface-50/50" : ""}`}>
                    <td className="text-sm text-surface-600 px-6 py-3.5">{row.feature}</td>
                    <td className="text-center px-6 py-3.5">
                      {row.free ? (
                        <svg className="w-5 h-5 text-accent-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-surface-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </td>
                    <td className="text-center px-6 py-3.5">
                      <svg className="w-5 h-5 text-accent-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-surface-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "Can I switch plans anytime?", a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately." },
              { q: "Is there a free trial for Premium?", a: "We offer a 14-day free trial for new Premium subscribers. No credit card required." },
              { q: "Do I get CME credits?", a: "Premium members can earn and track CME credits through eligible events and courses." },
              { q: "Can I cancel anytime?", a: "Absolutely. Cancel your Premium subscription at any time with no penalties or hidden fees." },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-surface-100">
                <h4 className="font-semibold text-surface-800 mb-2">{faq.q}</h4>
                <p className="text-sm text-surface-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

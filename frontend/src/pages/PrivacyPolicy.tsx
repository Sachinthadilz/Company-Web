import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  Mail,
  Cookie,
  FileText,
} from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you use our services, we may collect personal information such as your name, email address, phone number, company name, and job title. This information is collected when you fill out contact forms, subscribe to our newsletter, or engage with our services.",
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, operating system, pages visited, time spent on pages, and referral sources.",
        },
        {
          subtitle: "Cookies and Tracking",
          text: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser preferences.",
        },
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to provide, maintain, and improve our services, respond to your inquiries, process transactions, and deliver customer support.",
        },
        {
          subtitle: "Communication",
          text: "With your consent, we may send you promotional materials, newsletters, updates about our services, and relevant industry information. You can opt out at any time.",
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage patterns to understand how our services are used, identify areas for improvement, and develop new features that better serve our users.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Data Protection and Security",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures including encryption, secure servers, regular security audits, and access controls to protect your personal information from unauthorized access, disclosure, or destruction.",
        },
        {
          subtitle: "Data Retention",
          text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, comply with legal obligations, resolve disputes, and enforce our agreements.",
        },
        {
          subtitle: "Third-Party Services",
          text: "We may use trusted third-party service providers to assist in operating our website and services. These providers are contractually obligated to protect your information and use it only for the purposes we specify.",
        },
      ],
    },
    {
      icon: Users,
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "Access and Correction",
          text: "You have the right to access, update, or correct your personal information at any time. Contact us to request access to or modification of your data.",
        },
        {
          subtitle: "Data Deletion",
          text: "You may request deletion of your personal information, subject to certain legal exceptions. We will respond to deletion requests within 30 days.",
        },
        {
          subtitle: "Opt-Out",
          text: "You can opt out of receiving marketing communications by clicking the unsubscribe link in our emails or contacting us directly. Note that you may still receive transactional or service-related communications.",
        },
      ],
    },
    {
      icon: Eye,
      title: "Information Sharing",
      content: [
        {
          subtitle: "We Do Not Sell Your Data",
          text: "ARTecX Solutions does not sell, rent, or trade your personal information to third parties for marketing purposes.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or governmental regulation, or when necessary to protect our rights, safety, or property.",
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your personal information may be transferred. We will notify you of any such change and provide choices regarding your information.",
        },
      ],
    },
    {
      icon: Cookie,
      title: "Cookies and Tracking Technologies",
      content: [
        {
          subtitle: "Types of Cookies",
          text: "We use essential cookies (required for site functionality), analytics cookies (to understand usage patterns), and preference cookies (to remember your settings). Third-party cookies may be used for analytics and advertising.",
        },
        {
          subtitle: "Managing Cookies",
          text: "You can control cookie preferences through your browser settings. Note that disabling certain cookies may affect site functionality and your user experience.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Children's Privacy",
      content: [
        {
          subtitle: "Age Restriction",
          text: "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it promptly.",
        },
      ],
    },
    {
      icon: Mail,
      title: "International Data Transfers",
      content: [
        {
          subtitle: "Cross-Border Transfers",
          text: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.",
        },
      ],
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Privacy Policy | ARTecX Solutions</title>
        <meta
          name="description"
          content="Learn how ARTecX Solutions collects, uses, and protects your personal information. Our commitment to your privacy and data security."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Shield size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-blue-100 max-w-3xl mx-auto text-lg">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <p className="text-white/70 text-sm mt-6">
              Last Updated: March 30, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800/30"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              At ARTecX Solutions, we are committed to protecting your privacy
              and ensuring the security of your personal information. This
              Privacy Policy describes how we collect, use, disclose, and
              safeguard your information when you visit our website or use our
              services.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By using our services, you agree to the collection and use of
              information in accordance with this policy. If you do not agree
              with our policies and practices, please do not use our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <section.icon size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-6 ml-16">
                {section.content.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {item.subtitle}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Updates and Contact */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Updates */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technology, legal requirements, or
                other factors. We will notify you of any material changes by
                posting the new Privacy Policy on this page and updating the
                "Last Updated" date.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We encourage you to review this Privacy Policy periodically to
                stay informed about how we are protecting your information. Your
                continued use of our services after changes are posted
                constitutes your acceptance of the updated policy.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                If you have questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-3 text-blue-100">
                <p className="flex items-center gap-2">
                  <Mail size={18} />
                  <span>Email: privacy@artecxsolutions.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <Shield size={18} />
                  <span>Data Protection Officer: dpo@artecxsolutions.com</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

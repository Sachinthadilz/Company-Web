import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FileText,
  Scale,
  AlertCircle,
  UserCheck,
  CreditCard,
  Ban,
  Shield,
  RefreshCw,
} from "lucide-react";

const TermsOfService = () => {
  const sections = [
    {
      icon: UserCheck,
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing or using ARTecX Solutions' services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.",
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 18 years old and have the legal capacity to enter into binding contracts to use our services. By using our services, you represent and warrant that you meet these requirements.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Services Description",
      content: [
        {
          subtitle: "Our Services",
          text: "ARTecX Solutions provides digital product development services including web development, mobile app development, UI/UX design, software consulting, and related technology services. The specific scope of services will be defined in individual project agreements.",
        },
        {
          subtitle: "Service Modifications",
          text: "We reserve the right to modify, suspend, or discontinue any part of our services at any time with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of services.",
        },
      ],
    },
    {
      icon: Scale,
      title: "User Responsibilities",
      content: [
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account or security breach.",
        },
        {
          subtitle: "Prohibited Activities",
          text: "You agree not to: (a) violate any laws or regulations; (b) infringe on intellectual property rights; (c) transmit malicious code or viruses; (d) attempt to gain unauthorized access to our systems; (e) interfere with the proper functioning of our services; or (f) engage in fraudulent activities.",
        },
        {
          subtitle: "Content Standards",
          text: "Any content you submit through our services must be accurate, lawful, and not violate the rights of others. You retain ownership of your content but grant us a license to use it as necessary to provide our services.",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: [
        {
          subtitle: "Fees and Billing",
          text: "Fees for our services will be specified in individual project agreements or quotes. Payment terms, schedules, and accepted payment methods will be outlined in your service agreement. All fees are non-refundable unless otherwise stated.",
        },
        {
          subtitle: "Late Payments",
          text: "Late payments may be subject to interest charges at the rate of 1.5% per month or the maximum rate permitted by law, whichever is lower. We reserve the right to suspend services for accounts with overdue payments.",
        },
        {
          subtitle: "Taxes",
          text: "All fees are exclusive of taxes, levies, or duties. You are responsible for paying all applicable taxes associated with your use of our services.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Our IP Rights",
          text: "All intellectual property rights in our services, website, software, documentation, and materials remain the exclusive property of ARTecX Solutions or our licensors. You may not copy, modify, distribute, or create derivative works without our express written permission.",
        },
        {
          subtitle: "Client IP Rights",
          text: "Upon full payment for custom development services, you will own the final deliverables created specifically for you, subject to any third-party components or open-source licenses. We retain rights to our pre-existing tools, frameworks, and methodologies.",
        },
        {
          subtitle: "License Grant",
          text: "We grant you a limited, non-exclusive, non-transferable license to use our services for your internal business purposes in accordance with these terms.",
        },
      ],
    },
    {
      icon: AlertCircle,
      title: "Warranties and Disclaimers",
      content: [
        {
          subtitle: "Service Warranty",
          text: "We warrant that our services will be performed in a professional and workmanlike manner consistent with industry standards. Any warranty claims must be made within 30 days of service delivery.",
        },
        {
          subtitle: "Disclaimer",
          text: 'EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.',
        },
        {
          subtitle: "No Guarantee",
          text: "We do not guarantee that our services will be uninterrupted, error-free, or completely secure. You acknowledge that technology services inherently involve risks and uncertainties.",
        },
      ],
    },
    {
      icon: Ban,
      title: "Limitation of Liability",
      content: [
        {
          subtitle: "Liability Cap",
          text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.",
        },
        {
          subtitle: "Excluded Damages",
          text: "WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
        },
        {
          subtitle: "Exceptions",
          text: "Nothing in these terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.",
        },
      ],
    },
    {
      icon: RefreshCw,
      title: "Termination",
      content: [
        {
          subtitle: "Termination by You",
          text: "You may terminate your use of our services at any time by providing written notice. You remain responsible for all fees incurred prior to termination.",
        },
        {
          subtitle: "Termination by Us",
          text: "We may terminate or suspend your access to our services immediately, without prior notice, if you breach these terms or engage in conduct that we determine to be inappropriate or harmful.",
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your right to use our services will cease immediately. Provisions that by their nature should survive termination (including payment obligations, intellectual property rights, and limitation of liability) will continue in effect.",
        },
      ],
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Terms of Service | ARTecX Solutions</title>
        <meta
          name="description"
          content="Terms and conditions for using ARTecX Solutions services. Read our terms of service, user responsibilities, and legal agreements."
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
              <Scale size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-blue-100 max-w-3xl mx-auto text-lg">
              Please read these terms carefully before using our services. These
              terms govern your use of ARTecX Solutions services.
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
              Welcome to ARTecX Solutions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              These Terms of Service ("Terms") constitute a legally binding
              agreement between you and ARTecX Solutions ("we," "us," or "our")
              governing your access to and use of our services, website, and
              products.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              These Terms, together with our Privacy Policy and any other
              agreements you enter into with us, form the complete agreement
              between you and ARTecX Solutions. Please contact us if you have
              any questions about these Terms.
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

      {/* Additional Terms */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Governing Law */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Governing Law and Disputes
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance
                with the laws of the jurisdiction where ARTecX Solutions is
                registered, without regard to its conflict of law provisions.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Any disputes arising from these Terms or our services will first
                be attempted to be resolved through good-faith negotiation. If
                resolution cannot be reached, disputes shall be resolved through
                binding arbitration or in the courts of our jurisdiction, as
                applicable.
              </p>
            </div>

            {/* Severability */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Severability and Waiver
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                If any provision of these Terms is found to be unenforceable or
                invalid, that provision will be limited or eliminated to the
                minimum extent necessary, and the remaining provisions will
                remain in full force and effect.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our failure to enforce any right or provision of these Terms
                will not be deemed a waiver of such right or provision.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Changes to These Terms
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. We will
                notify you of material changes by posting the updated Terms on
                our website and updating the "Last Updated" date. For
                significant changes, we may also notify you via email.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Your continued use of our services after changes are posted
                constitutes your acceptance of the modified Terms. If you do not
                agree to the modified Terms, you must stop using our services.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Questions About These Terms?
              </h2>
              <p className="text-blue-100 leading-relaxed mb-6">
                If you have any questions or concerns about these Terms of
                Service, please don't hesitate to contact us:
              </p>
              <div className="space-y-3 text-blue-100">
                <p>Email: legal@artecxsolutions.com</p>
                <p>
                  Address: ARTecX Solutions, Technology Park, Innovation
                  District
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;

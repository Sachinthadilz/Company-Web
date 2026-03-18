import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const contactInfo = [
    { icon: Mail, title: 'Email Us', value: 'info@artecx-solutions.com', href: 'mailto:info@artecx-solutions.com' },
    { icon: Phone, title: 'UK Office', value: '+44 735 6200 686', href: 'tel:+447356200686' },
    { icon: Phone, title: 'Sri Lanka Office', value: '+94 719 620 413', href: 'tel:+94719620413' },
    { icon: MapPin, title: 'Our Office', value: 'Colombo, Sri Lanka', href: '#' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full mb-5">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Let's Build <span className="text-blue-200">Together</span>
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Have a project in mind? We'd love to hear from you. Send us a message and we'll get back within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                  Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Information</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">
                  Reach out through any of the channels below or use the contact form. We look forward to connecting with you.
                </p>

                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, title, value, href }) => (
                    <a
                      key={title}
                      href={href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide mb-0.5">{title}</p>
                        <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm group-hover:text-secondary dark:group-hover:text-blue-400 transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="mt-10 rounded-2xl overflow-hidden h-48 bg-gradient-to-br from-primary/10 to-secondary/10 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-secondary mx-auto mb-2" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Colombo, Sri Lanka</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send Us a Message</h2>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

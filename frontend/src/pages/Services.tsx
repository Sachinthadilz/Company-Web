import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getServices } from '../services/api';
import type { Service } from '../types/service';
import { AlertCircle } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getServices();
        setServices(res.data.data || []);
      } catch {
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full mb-5">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Comprehensive Digital <span className="text-blue-200">Solutions</span>
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              From concept to launch, we provide end-to-end technology services that help businesses grow and innovate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : error ? (
            <div className="flex flex-col items-center py-20 text-center">
              <AlertCircle size={40} className="text-red-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <ServiceCard key={service._id} service={service} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Process</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400">How we turn your idea into a product</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We deeply understand your business goals, users, and technical requirements.' },
              { step: '02', title: 'Design', desc: 'We create intuitive designs and architecture for a seamless user experience.' },
              { step: '03', title: 'Development', desc: 'Our experts build with clean, scalable code using agile methodologies.' },
              { step: '04', title: 'Delivery', desc: 'We deploy, test, and provide ongoing support for long-term success.' },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {i < 3 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-secondary opacity-30" />
                )}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <span className="text-white font-black text-lg">{step}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

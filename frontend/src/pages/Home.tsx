import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Users, Zap, Shield, Quote } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getServices, getProjects } from '../services/api';
import type { Service } from '../types/service';
import type { Project } from '../types/project';
import API_BASE from '../config/api';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, projectsRes] = await Promise.all([getServices(), getProjects()]);
        setServices(servicesRes.data.data?.slice(0, 3) || []);
        setProjects(projectsRes.data.data?.slice(0, 3) || []);
      } catch {
        // Fallback to empty arrays
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    fetch(`${API_BASE}/testimonials`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setTestimonials(d.data); })
      .catch(() => {});
  }, []);

  const whyChooseUs = [
    { icon: Star, title: 'Built for People', desc: 'We make everyday workflows simpler, smarter, and more human — for teams that refuse to settle.' },
    { icon: Users, title: 'Client-First Approach', desc: 'We believe amazing things happen when we move, and we treat every project as our own.' },
    { icon: Zap, title: 'Scalable By Design', desc: 'Scaling products that reach millions while maintaining the personal attention of a three-person shop.' },
    { icon: Shield, title: 'Integrity First', desc: 'Transparency is the core of our brand. We build systems that scale with your business.' },
  ];

  return (
    <>
      <HeroSection />

      {/* Services Preview */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 dark:bg-blue-900/30 text-secondary dark:text-blue-400 text-sm font-semibold rounded-full mb-4">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Services</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">End-to-end digital solutions from concept to launch, tailored to your unique business needs.</p>
          </motion.div>
          {loading ? <LoadingSkeleton count={3} /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, i) => <ServiceCard key={service._id} service={service} index={i} />)}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-primary to-secondary text-white font-semibold rounded-xl hover:opacity-90 hover:scale-105 transition-all shadow-lg">
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 dark:bg-blue-900/30 text-secondary dark:text-blue-400 text-sm font-semibold rounded-full mb-4">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Projects</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Real-world solutions we've built for clients across industries.</p>
          </motion.div>
          {loading ? <LoadingSkeleton count={3} /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, i) => <ProjectCard key={project._id} project={project} index={i} />)}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary dark:border-blue-400 dark:text-blue-400 font-semibold rounded-xl hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white hover:border-transparent transition-all">
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 bg-secondary/10 dark:bg-blue-900/30 text-secondary dark:text-blue-400 text-sm font-semibold rounded-full mb-4">Why ARTecX</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Us?</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">We combine technical excellence with deep business understanding to deliver solutions that don't just work — they drive results.</p>
              <div className="flex flex-col gap-4">
                {['ISO Certified Processes', 'NDA Protected Partnerships', '24/7 Support & Maintenance', 'Flexible Engagement Models'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUs.map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-md">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — only rendered when there's at least one published testimonial */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-secondary/10 dark:bg-blue-900/30 text-secondary dark:text-blue-400 text-sm font-semibold rounded-full mb-4">Client Stories</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Clients Say</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={t._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className="relative flex flex-col gap-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Quote size={24} className="text-primary/20 dark:text-blue-400/20 absolute top-4 right-4" />
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className={`text-lg ${s <= t.rating ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1">"{t.content}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                    {t.avatarUrl ? (
                      <img src={t.avatarUrl} alt={t.name} loading="lazy" className="h-10 w-10 rounded-full object-cover border-2 border-slate-100" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {t.name[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{t.name}</p>
                      {(t.role || t.company) && (
                        <p className="text-xs text-slate-400">{[t.role, t.company].filter(Boolean).join(' · ')}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;

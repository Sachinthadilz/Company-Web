import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getJobs } from '../services/api';
import type { Job } from '../types/job';
import { AlertCircle, Briefcase, Users, Globe } from 'lucide-react';

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Design', 'Engineering', 'Product', 'Marketing', 'Sales', 'Infrastructure'];

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getJobs();
        setJobs(res.data.data || []);
      } catch {
        setError('Failed to load job openings. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filteredJobs = activeCategory === 'All' 
    ? jobs 
    : jobs.filter(job => job.department === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full mb-5">
              Careers
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Join the <span className="text-blue-200">ARTecX Team</span>
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Build your career with a team that values innovation, excellence, and personal growth. We're always looking for talented people.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'Collaborative Culture', desc: 'Work with a diverse, talented team that celebrates innovation and supports each other.' },
              { icon: Globe, title: 'Remote-First', desc: 'Flexible working arrangements with options for remote, hybrid, or on-site roles.' },
              { icon: Briefcase, title: 'Growth Opportunities', desc: 'Invest in your career with mentorship, training budgets, and clear progression paths.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 text-center">
            Open <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Positions</span>
            <span className="ml-3 inline-flex items-center justify-center w-8 h-8 bg-secondary/10 dark:bg-blue-900/30 text-secondary text-sm font-bold rounded-full">
              {jobs.length}
            </span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-blue-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSkeleton count={3} type="job" />
          ) : error ? (
            <div className="flex flex-col items-center py-20 text-center">
              <AlertCircle size={40} className="text-red-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">{error}</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <Briefcase size={40} className="text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No open positions in this category at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job, i) => (
                <JobCard key={job._id} job={job} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;

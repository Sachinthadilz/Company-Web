import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Briefcase, CheckCircle, Mail, Loader2 } from 'lucide-react';
import { getJobById } from '../services/api';
import type { Job } from '../types/job';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data.data || null);
      } catch {
        setError('Job not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 size={36} className="animate-spin text-secondary" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-center px-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Job Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">{error}</p>
        <button
          onClick={() => navigate('/careers')}
          className="px-6 py-3 bg-gradient-to-br from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Careers
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-secondary pt-32 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm"
            >
              <ArrowLeft size={16} /> Back to Careers
            </Link>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 border border-white/30 text-white text-xs font-semibold rounded-full">
                <Briefcase size={12} />
                {job.department}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 border border-white/30 text-white text-xs font-medium rounded-full">
                <MapPin size={12} />
                {job.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">{job.title}</h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 mb-6"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the Role</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{job.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Requirements</h2>
              <ul className="space-y-4">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-400 text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Apply Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24"
            >
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Interested?</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Send us your application and we'll get back to you within 3 business days.
              </p>
              <a
                href={`mailto:careers@artecxsolutions.com?subject=Application for ${job.title}`}
                id="apply-btn"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-br from-primary to-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-md"
              >
                <Mail size={16} />
                Apply via Email
              </a>
              <p className="text-xs text-slate-400 text-center mt-4">
                Or email <a href="mailto:careers@artecxsolutions.com" className="text-secondary underline hover:text-primary transition-colors">careers@artecxsolutions.com</a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

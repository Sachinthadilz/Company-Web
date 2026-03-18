import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import type { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({ job, index }: JobCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/10 dark:bg-blue-900/30 text-secondary dark:text-blue-400 text-xs font-semibold rounded-full">
              <Briefcase size={11} />
              {job.department}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full">
              <MapPin size={11} />
              {job.location}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
            {job.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
            {job.description}
          </p>
        </div>
        <Link
          to={`/careers/${job._id}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-primary to-secondary text-white rounded-xl text-sm font-semibold hover:bg-slate-100 hover:opacity-90 transition-colors shadow-md shrink-0 self-start"
        >
          View Details
          <ArrowRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getProjects } from '../services/api';
import type { Project } from '../types/project';
import { AlertCircle, Search } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data.data || []);
        setFiltered(res.data.data || []);
      } catch {
        setError('Failed to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(projects);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        projects.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.technologies.some((t) => t.toLowerCase().includes(q))
        )
      );
    }
  }, [search, projects]);

  return (
    <div>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full mb-5">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Our <span className="text-blue-200">Work</span>
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              A showcase of solutions we've built — from FinTech platforms to AI-powered tools and everything in between.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-10 max-w-md mx-auto">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or technology…"
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-sm shadow-sm"
                id="project-search"
              />
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : error ? (
            <div className="flex flex-col items-center py-20 text-center">
              <AlertCircle size={40} className="text-red-400 mb-4" />
              <p className="text-slate-600 dark:text-slate-400">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400">No projects found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;

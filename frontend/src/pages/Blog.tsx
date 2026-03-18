import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

interface BlogPreview {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverUrl: string;
  author: string;
  tags: string[];
  publishedAt: string;
}

import API_BASE from '../config/api';

const API = API_BASE;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/blogs`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setPosts(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full mb-5">
              ARTecX Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Insights, Stories &{' '}
              <span className="text-blue-200">Updates</span>
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Thoughts on technology, design, and building products that matter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tag filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTag === null
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button key={tag} onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeTag === tag
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center text-slate-400">Loading posts…</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <p className="text-lg font-semibold mb-2">No posts yet</p>
              <p className="text-sm">Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <motion.article key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Cover */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 overflow-hidden">
                    {post.coverUrl ? (
                      <img src={post.coverUrl} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-black text-primary/20 dark:text-white/10">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map((t) => (
                          <span key={t} className="inline-flex items-center gap-1 rounded-md bg-secondary/10 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-medium text-secondary dark:text-blue-400">
                            <Tag size={10} />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="font-bold text-slate-900 dark:text-white text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><User size={12} />{post.author}</span>
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />{formatDate(post.publishedAt)}
                          </span>
                        )}
                      </div>
                      <Link to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-secondary transition-colors">
                        Read <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;

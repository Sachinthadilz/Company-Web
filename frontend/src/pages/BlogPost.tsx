import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  author: string;
  tags: string[];
  publishedAt: string;
}

import API_BASE from '../config/api';

const API = API_BASE;

// Very simple markdown-to-html renderer for headings, bold, italic, code, paragraphs
const renderMarkdown = (text: string): string => {
  return text
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-slate-900 dark:text-white mt-10 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-primary">$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-slate-500 dark:text-slate-400 my-4">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-slate-600 dark:text-slate-400">$1</li>')
    .replace(/\n\n/g, '</p><p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">')
    .replace(/^(?!<[h|b|l|c|p])(.+)$/gm, '<p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">$1</p>');
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API}/blogs/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setPost(d.data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Post not found</h1>
        <p className="text-slate-500 mb-8">This blog post doesn't exist or has been removed.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article>
      {/* Cover hero */}
      <div className="relative pt-20 bg-gradient-to-br from-primary to-secondary min-h-[40vh] flex flex-col justify-end">
        {post.coverUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <img src={post.coverUrl} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>
        )}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white border border-white/30">
                    <Tag size={10} /> {t}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-5">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
              {post.publishedAt && (
                <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(post.publishedAt)}</span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Post body */}
      <div className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.excerpt && (
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10 border-l-4 border-primary pl-6 italic">
              {post.excerpt}
            </p>
          )}
          <div
            className="prose-content text-slate-600 dark:text-slate-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 bg-slate-50 dark:bg-slate-950 text-center">
        <Link to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-secondary transition-colors shadow-md">
          <ArrowLeft size={16} /> More Posts
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;

import './config/loadEnv'; // ← MUST be first: populates process.env before any other import runs
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/database';
import errorHandler from './middleware/errorHandler';
import { contactLimiter, loginLimiter } from './middleware/rateLimiter';
import contactRoutes from './routes/contactRoutes';
import projectRoutes from './routes/projectRoutes';
import serviceRoutes from './routes/serviceRoutes';
import jobRoutes from './routes/jobRoutes';
import adminRoutes from './routes/adminRoutes';
import adminAuthRoutes from './routes/adminAuthRoutes';
import uploadRoutes from './routes/uploadRoutes';
import heroImageRoutes from './routes/heroImageRoutes';
import employeeOfMonthRoutes from './routes/employeeOfMonthRoutes';
import blogRoutes from './routes/blogRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import Blog from './models/Blog';



const app = express();
const PORT = process.env.PORT || 5000;

// ── Security headers ─────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS — reads allowed origins from env (comma-separated) ──────────────────
const rawOrigins = process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173,http://localhost:3000';
const allowedOrigins = rawOrigins.split(',').map((o) => o.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Robots.txt ───────────────────────────────────────────────────────────────
app.get('/robots.txt', (_req, res) => {
  const siteUrl = process.env.SITE_URL ?? 'https://artecxsolutions.com';
  res.type('text/plain').send(
    `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  );
});

// ── Sitemap ──────────────────────────────────────────────────────────────────
app.get('/sitemap.xml', async (_req, res) => {
  try {
    const siteUrl = process.env.SITE_URL ?? 'https://artecxsolutions.com';
    const staticPages = ['', '/about', '/services', '/projects', '/careers', '/blog', '/contact'];

    const blogs = await Blog.find({ published: true }).select('slug updatedAt').lean<{ slug: string; updatedAt: Date }[]>();

    const urls = [
      ...staticPages.map((path) => `
  <url>
    <loc>${siteUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`),
      ...blogs.map((b) => `
  <url>
    <loc>${siteUrl}/blog/${b.slug}</loc>
    <lastmod>${new Date(b.updatedAt as Date).toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`),
    ];

    res.type('application/xml').send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}\n</urlset>`
    );
  } catch {
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/admin/auth', adminAuthRoutes);        // loginLimiter applied inside authRoutes
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/hero-images', heroImageRoutes);
app.use('/api/employee-of-month', employeeOfMonthRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'ARTecX Solutions API is running' });
});

// Error Handler
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();

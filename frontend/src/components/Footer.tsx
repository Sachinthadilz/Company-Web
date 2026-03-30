import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      {/* Top CTA */}
      <div className="bg-gradient-to-br from-primary to-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Partner with ARTecX Solutions to transform your digital vision into
            reality.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
          >
            Start a Project
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-black text-sm">AX</span>
              </div>
              <div>
                <span className="font-black text-xl text-white">ARTecX</span>
                <span className="block text-xs text-slate-400 -mt-1">
                  Solutions
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Building innovative digital solutions that drive business growth
              and deliver exceptional user experiences.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Github, href: "https://github.com", label: "GitHub" },
                {
                  Icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  Icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-secondary transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/projects", label: "Projects" },
                { to: "/careers", label: "Careers" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                "Web Development",
                "Mobile App Development",
                "Cloud Solutions",
                "UI/UX Design",
                "API Development",
                "System Integration",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-secondary mt-0.5 shrink-0" />
                <a
                  href="mailto:info@artecx-solutions.com"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  info@artecx-solutions.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-secondary mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <a
                    href="tel:+447356200686"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    +44 735 6200 686 (UK)
                  </a>
                  <a
                    href="tel:+94719620413"
                    className="text-slate-400 hover:text-white text-sm transition-colors mt-1"
                  >
                    +94 719 620 413 (SL)
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-secondary mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm">
                  Colombo, Sri Lanka
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} ARTecX Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

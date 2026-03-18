import { motion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Cloud,
  Palette,
  Code2,
  GitMerge,
} from 'lucide-react';
import type { Service } from '../types/service';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Cloud,
  Palette,
  Code2,
  GitMerge,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const Icon = iconMap[service.icon] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 cursor-default"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
        {service.title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        {service.description}
      </p>
      <div className="mt-5 flex items-center gap-2 text-secondary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        <span>Learn more</span>
        <span className="text-lg">→</span>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

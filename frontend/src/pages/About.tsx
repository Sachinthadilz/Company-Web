import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Users, Globe, Star } from "lucide-react";
import API_BASE from "../config/api";

const team = [
  {
    name: "Tharindu De Zoysa",
    role: "Founder & CEO",
    image:
      "https://ambitious-moss-013648c10.1.azurestaticapps.net/assets/tharindu-DibtzlDi.jpg",
    category: "Leadership",
  },
  {
    name: "Sahan Abeysinghe",
    role: "CTO",
    image:
      "https://ambitious-moss-013648c10.1.azurestaticapps.net/assets/Sahan-Wiw6tFoc.jpg",
    category: "Leadership",
  },
  {
    name: "Imath De Silva",
    role: "Director",
    image:
      "https://ambitious-moss-013648c10.1.azurestaticapps.net/assets/imath-CacIxrkp.jpg",
    category: "Leadership",
  },
  {
    name: "Dinithi Gamage",
    role: "UI/UX",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    category: "Team Leads",
  },
  {
    name: "Natasha Fernando",
    role: "Frontend Mobile",
    image:
      "https://ambitious-moss-013648c10.1.azurestaticapps.net/assets/Frontend-Mobile-jfUpC_cy.jpeg",
    category: "Team Leads",
  },
  {
    name: "Dilmi Kavishka",
    role: "Frontend Web",
    image:
      "https://ambitious-moss-013648c10.1.azurestaticapps.net/assets/Frontend-Web-D_FMaMFd.jpeg",
    category: "Team Leads",
  },
  {
    name: "Pathum Sankalpa",
    role: "Backend",
    image:
      "https://ambitious-moss-013648c10.1.azurestaticapps.net/assets/Backend-Lead-vaegYnvh.jpeg",
    category: "Team Leads",
  },
  {
    name: "Chathurika Ariyasena",
    role: "Marketing",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    category: "Team Leads",
  },
  {
    name: "Sunera Hettiarachchi",
    role: "R&D",
    image:
      "https://ambitious-moss-013648c10.1.azurestaticapps.net/assets/R_D-Lead-DYC_l-9o.jpeg",
    category: "Team Leads",
  },
  {
    name: "Nishitha Nishadi",
    role: "QA",
    image:
      "https://ambitious-moss-013648c10.1.azurestaticapps.net/assets/QA-Lead-BsKK55q2.jpeg",
    category: "Team Leads",
  },
  {
    name: "Sasun Madhuranga",
    role: "AI & ML",
    image:
      "https://ambitious-moss-013648c10.1.azurestaticapps.net/assets/AI-Lead-DTvnzSLA.jpeg",
    category: "Team Leads",
  },
];

interface EOM {
  _id: string;
  name: string;
  role: string;
  bio: string;
  quote: string;
  photoUrl: string;
  month: number;
  year: number;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const About = () => {
  const [activeCategory, setActiveCategory] = useState("Leadership");
  const [eomList, setEomList] = useState<EOM[]>([]);
  const teamCategories = ["Leadership", "Team Leads", "Employee Of The Month"];

  useEffect(() => {
    fetch(`${API_BASE}/employee-of-month`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success)
          setEomList(d.data.filter((e: EOM & { active: boolean }) => e.active));
      })
      .catch(() => {});
  }, []);

  const values = [
    {
      icon: Target,
      title: "Mission",
      desc: "We're building for People — making everyday workflows simpler, smarter, and more human.",
    },
    {
      icon: Eye,
      title: "Vision",
      desc: "To bring complex workflows into focus with design that empowers every user journey.",
    },
    {
      icon: Heart,
      title: "Values",
      desc: "Customer First, Innovation, Integrity, and Passion guide everything we build.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full mb-5">
              About ARTecX Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Building Digital Products <br className="hidden sm:block" />
              <span className="text-blue-200">For People</span>
            </h1>
            <p className="text-blue-100 max-w-3xl mx-auto text-lg">
              We build digital products that make everyday workflows simpler,
              smarter, and more human — for teams that refuse to settle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-secondary/10 dark:bg-blue-900/30 text-secondary dark:text-blue-400 text-sm font-semibold rounded-full mb-4">
                Our Story
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                From Startup to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Industry Leader
                </span>
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  ARTecX Solutions was founded in 2020 by three founders sharing
                  a single garage and a whiteboard, driven by the belief that
                  technology should be built for people.
                </p>
                <p>
                  By 2022, we hit a massive milestone: 1 million active users
                  across the platforms we designed. We've scaled products that
                  reach millions while maintaining the personal attention of a
                  three-person shop.
                </p>
                <p>
                  Today, we continue to design systems that scale, bringing
                  complex workflows into focus to empower every user journey.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Award, value: "150+", label: "Projects Delivered" },
                { icon: Users, value: "50+", label: "Happy Clients" },
                { icon: Globe, value: "15+", label: "Countries" },
                { icon: Heart, value: "8+", label: "Years Experience" },
              ].map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-700"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1">
                    {value}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              What Drives{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Us
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 dark:bg-blue-900/30 text-secondary dark:text-blue-400 text-sm font-semibold rounded-full mb-4">
              Meet the Team
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              The People Behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                ARTecX
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {teamCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-blue-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Employee Of The Month tab */}
          {activeCategory === "Employee Of The Month" &&
            (eomList.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <Star
                  size={40}
                  className="text-slate-300 dark:text-slate-600 mx-auto mb-4"
                />
                <p className="text-slate-500 dark:text-slate-400">
                  No Employee of the Month records yet.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-8">
                {eomList.map((emp, i) => (
                  <motion.div
                    key={emp._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden w-full sm:w-80"
                  >
                    {/* Month badge */}
                    <div className="bg-gradient-to-r from-primary to-secondary px-5 py-2 flex items-center gap-2">
                      <Star
                        size={14}
                        className="text-yellow-300"
                        fill="currentColor"
                      />
                      <span className="text-white text-xs font-bold tracking-wide">
                        {MONTH_NAMES[emp.month - 1]} {emp.year}
                      </span>
                    </div>
                    <div className="p-6 text-center">
                      {emp.photoUrl ? (
                        <img
                          src={emp.photoUrl}
                          alt={emp.name}
                          className="w-28 h-28 rounded-2xl object-cover shadow-lg mx-auto mb-4"
                        />
                      ) : (
                        <div className="w-28 h-28 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4 text-3xl font-black text-slate-400">
                          {emp.name.charAt(0)}
                        </div>
                      )}
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                        {emp.name}
                      </h3>
                      <p className="text-secondary dark:text-blue-400 text-sm font-semibold mb-3">
                        {emp.role}
                      </p>
                      {emp.bio && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-3">
                          {emp.bio}
                        </p>
                      )}
                      {emp.quote && (
                        <p className="italic text-slate-400 dark:text-slate-500 text-xs border-t border-slate-100 dark:border-slate-700 pt-3">
                          &ldquo;{emp.quote}&rdquo;
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}

          {/* Leadership & Team Leads tabs */}
          {activeCategory !== "Employee Of The Month" &&
            (team.filter((member) => member.category === activeCategory)
              .length === 0 ? (
              <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <Users
                  size={40}
                  className="text-slate-300 dark:text-slate-600 mx-auto mb-4"
                />
                <p className="text-slate-500 dark:text-slate-400">
                  No team members match this category right now.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {team
                  .filter((member) => member.category === activeCategory)
                  .map((member, i) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -6 }}
                      className="group text-center"
                    >
                      <div className="relative mb-5 mx-auto w-36 h-36">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-36 h-36 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                        {member.name}
                      </h3>
                      <p className="text-secondary dark:text-blue-400 text-sm font-semibold mb-2">
                        {member.role}
                      </p>
                    </motion.div>
                  ))}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default About;

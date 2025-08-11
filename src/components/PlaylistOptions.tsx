import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PlaylistOptions() {
  const options = [
    { title: "Questionnaire", desc: "Answer a few quick questions" },
    { title: "Text Prompt", desc: "Describe your vibe in words" },
  ];

  return (
    <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 px-8">
      {options.map((opt, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg cursor-pointer flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-semibold">{opt.title}</h3>
            <p className="text-gray-400 mt-2">{opt.desc}</p>
          </div>
          <ArrowRight className="mt-4 text-green-400" />
        </motion.div>
      ))}
    </section>
  );
}

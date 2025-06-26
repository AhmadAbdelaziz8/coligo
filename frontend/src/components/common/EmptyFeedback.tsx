import React from "react";

interface EmptyFeedbackProps {
  type: "announcements" | "exams";
  className?: string;
}

const EmptyFeedback: React.FC<EmptyFeedbackProps> = ({
  type,
  className = "",
}) => {
  const config = {
    announcements: {
      emoji: "📢",
      title: "No Announcements Yet!",
      subtitle: "Stay tuned for important updates from your instructors",
      bgGradient: "from-blue-500 via-blue-600 to-indigo-700",
      iconBg: "from-blue-400 to-blue-600",
      borderGlow: "shadow-blue-500/30",
    },
    exams: {
      emoji: "📝",
      title: "No Exams Yet!",
      subtitle: "Check back later for upcoming quizzes and assessments",
      bgGradient: "from-purple-500 via-purple-600 to-pink-600",
      iconBg: "from-purple-400 to-pink-500",
      borderGlow: "shadow-purple-500/30",
    },
  };

  const { emoji, title, subtitle, bgGradient, iconBg, borderGlow } =
    config[type];

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
        bg-gradient-to-br ${bgGradient} 
        rounded-3xl 
        border border-white/20 
        p-8 
        text-center 
        shadow-2xl ${borderGlow}
        backdrop-blur-sm
        transform transition-all duration-300 hover:scale-105
        relative overflow-hidden
      `}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon Container */}
          <div
            className={`
            bg-gradient-to-br ${iconBg} 
            w-24 h-24 
            rounded-full 
            flex items-center justify-center 
            mx-auto mb-6 
            shadow-xl 
            border-4 border-white/30
            transform hover:rotate-12 transition-transform duration-300
          `}
          >
            <span className="text-5xl filter drop-shadow-lg">{emoji}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
            {title}
          </h3>

          {/* Subtitle */}
          <p className="text-white/90 text-base leading-relaxed max-w-sm mx-auto font-medium">
            {subtitle}
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center mt-8 space-x-3">
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyFeedback;

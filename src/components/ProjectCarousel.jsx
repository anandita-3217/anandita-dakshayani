import { useState } from 'react';
// import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "DeepFake Image Detection",
      description: "Deep learning-based system for detecting Deepfake images with 99.76% accuracy using SVM classifiers and DenseNets. Analyzed 6.9M features across 140k images.",
      tech: ["Python", "Django", "SVM", "DenseNets", "TensorFlow"],
      accuracy: "99.76%",
      features: [
        "3 SVM classifiers (Linear, RBF, Polynomial)",
        "Data preprocessing on 140k images",
        "Comparative analysis of 20 detection systems"
      ],
      color: "from-purple-500 to-pink-500",
      github: "#",
      demo: "#"
    },
    {
      id: 2,
      title: "FlashLearn - Flashcard App",
      description: "Interactive flashcard application with dynamic quiz features and JSON-based deck management. Supports up to 150 flashcards per deck with optimized GUI.",
      tech: ["Python", "Pytest", "Kivy"],
      features: [
        "3 difficulty levels (Beginner, Mid, Pro)",
        "JSON-based deck upload",
        "Scrollable views for 25+ cards"
      ],
      color: "from-blue-500 to-cyan-500",
      github: "#",
      demo: "#"
    },
    {
      id: 3,
      title: "Spam Email Detection",
      description: "Machine learning system using Naive Bayes Classification to identify and filter spam emails with high accuracy.",
      tech: ["Python", "Naive Bayes", "GaussianNB", "Scikit-Learn"],
      features: [
        "Naive Bayes Classification",
        "Email pattern recognition",
        "High accuracy spam filtering"
      ],
      color: "from-green-500 to-emerald-500",
      github: "#",
      demo: "#"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-gray-600 text-lg">Showcasing innovation in AI, ML, and Software Development</p>
      </div>

      <div className="relative">
        {/* Main Carousel */}
        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project) => (
              <div key={project.id} className="w-full flex-shrink-0">
                <div className={`bg-gradient-to-br ${project.color} p-1 rounded-2xl`}>
                  <div className="bg-white rounded-xl p-8 h-full">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-3xl font-bold text-gray-800 mb-3">
                          {project.title}
                        </h3>
                        {project.accuracy && (
                          <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
                            Accuracy: {project.accuracy}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-purple-500 mr-2">▹</span>
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex gap-4 mt-auto">
                        <a
                          href={project.github}
                          className="flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <Github size={18} />
                          <span>Code</span>
                        </a>
                        <a
                          href={project.demo}
                          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <ExternalLink size={18} />
                          <span>View Project</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all hover:scale-110"
          aria-label="Previous project"
        >
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all hover:scale-110"
          aria-label="Next project"
        >
          <ChevronRight size={24} className="text-gray-800" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-purple-600'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Project Counter */}
      <div className="text-center mt-6 text-gray-600 font-medium">
        {currentIndex + 1} / {projects.length}
      </div>
    </div>
  );
};

export default ProjectCarousel;
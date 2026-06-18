export const interviewData = {
  matchScore: 92,

  skillGaps: [
    "Git & GitHub Workflow",
    "Performance Optimization Techniques",
    "Unit & Integration Testing",
  ],

  technicalQuestions: [
    {
      id: 1,
      question:
        "Explain the difference between Flexbox and CSS Grid. When would you use each one?",
      intention:
        "To evaluate understanding of modern CSS layout systems.",
      answer:
        "Flexbox is one-dimensional and works well for rows or columns. Grid is two-dimensional and is ideal for complex layouts involving rows and columns.",
    },
    {
      id: 2,
      question:
        "How does React's virtual DOM improve performance?",
      intention:
        "To assess knowledge of React rendering and optimization.",
      answer:
        "The virtual DOM compares changes before updating the real DOM, minimizing expensive DOM operations and improving performance.",
    },
    {
      id: 3,
      question:
        "What is the difference between let, const, and var in JavaScript?",
      intention:
        "To test understanding of JavaScript variable declarations.",
      answer:
        "var is function-scoped, while let and const are block-scoped. const cannot be reassigned after initialization.",
    },
    {
      id: 4,
      question:
        "How would you make a website responsive?",
      intention:
        "To assess responsive design knowledge.",
      answer:
        "Use media queries, flexible layouts, relative units, Flexbox, Grid, and adopt a mobile-first approach.",
    },
  ],

  behavioralQuestions: [
    {
      id: 1,
      question:
        "Tell me about a challenging project you worked on.",
      answer:
        "Discuss the challenge, your approach, technologies used, and the final outcome using the STAR method.",
    },
    {
      id: 2,
      question:
        "Describe a time you faced a tight deadline.",
      answer:
        "Focus on prioritization, communication, and successful delivery.",
    },
    {
      id: 3,
      question:
        "How do you handle criticism from teammates?",
      answer:
        "Show openness to feedback, learning mindset, and professionalism.",
    },
  ],

  roadmap: [
    {
      day: 1,
      title: "HTML, CSS & Responsive Design",
      tasks: [
        "Revise Flexbox and Grid",
        "Build a responsive landing page",
        "Practice media queries",
        "Review CSS positioning",
      ],
    },
    {
      day: 2,
      title: "JavaScript Fundamentals",
      tasks: [
        "Closures and Scope",
        "Promises & Async/Await",
        "Array Methods",
        "DOM Manipulation",
      ],
    },
    {
      day: 3,
      title: "React Fundamentals",
      tasks: [
        "Components & Props",
        "State Management",
        "Hooks (useState, useEffect)",
        "Build a small React project",
      ],
    },
    {
      day: 4,
      title: "Git & GitHub",
      tasks: [
        "Git Commands",
        "Branching & Merging",
        "Pull Requests",
        "GitHub Workflow",
      ],
    },
    {
      day: 5,
      title: "Mock Interview",
      tasks: [
        "Technical Round Practice",
        "Behavioral Questions",
        "Project Explanation",
        "Resume Review",
      ],
    },
  ],
};
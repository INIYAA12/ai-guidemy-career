import { CareerProfile, CareerRecommendation, SkillRoadmapWeek } from "@/types/career";

export const getMockRecommendations = (profile: CareerProfile): CareerRecommendation[] => {
  const interests = profile.interests.toLowerCase();
  const academic = profile.academicBackground.toLowerCase();
  
  // Generate recommendations based on interests and background
  const allCareers: CareerRecommendation[] = [
    {
      title: "Software Developer",
      description: "Design and develop software applications, websites, and systems using various programming languages and frameworks.",
      matchPercentage: 95,
      requiredSkills: ["JavaScript", "Python", "React", "Problem Solving", "Git"],
      averageSalary: "$85,000 - $130,000"
    },
    {
      title: "Data Scientist",
      description: "Analyze complex data to help organizations make informed business decisions using statistical methods and machine learning.",
      matchPercentage: 90,
      requiredSkills: ["Python", "SQL", "Machine Learning", "Statistics", "Tableau"],
      averageSalary: "$95,000 - $145,000"
    },
    {
      title: "UX/UI Designer",
      description: "Create intuitive and visually appealing user interfaces and experiences for digital products and services.",
      matchPercentage: 85,
      requiredSkills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "HTML/CSS"],
      averageSalary: "$70,000 - $110,000"
    },
    {
      title: "Digital Marketing Specialist",
      description: "Develop and execute online marketing campaigns to promote products, services, and brand awareness.",
      matchPercentage: 82,
      requiredSkills: ["Google Analytics", "SEO", "Social Media", "Content Creation", "PPC Advertising"],
      averageSalary: "$50,000 - $80,000"
    },
    {
      title: "Product Manager",
      description: "Lead product development from conception to launch, coordinating between technical and business teams.",
      matchPercentage: 88,
      requiredSkills: ["Project Management", "Analytics", "Communication", "Market Research", "Agile"],
      averageSalary: "$90,000 - $140,000"
    },
    {
      title: "Cybersecurity Analyst",
      description: "Protect organizations from digital threats by monitoring, detecting, and responding to security incidents.",
      matchPercentage: 87,
      requiredSkills: ["Network Security", "Incident Response", "Risk Assessment", "Compliance", "Ethical Hacking"],
      averageSalary: "$80,000 - $120,000"
    }
  ];

  // Simple matching algorithm based on keywords
  let scoredCareers = allCareers.map(career => {
    let score = career.matchPercentage;
    
    // Boost scores based on interests
    if (interests.includes("technology") || interests.includes("tech") || interests.includes("programming")) {
      if (career.title.includes("Software") || career.title.includes("Data")) score += 5;
    }
    if (interests.includes("design") || interests.includes("creative")) {
      if (career.title.includes("UX/UI")) score += 8;
    }
    if (interests.includes("marketing") || interests.includes("business")) {
      if (career.title.includes("Marketing") || career.title.includes("Product")) score += 6;
    }
    if (interests.includes("security") || interests.includes("cybersecurity")) {
      if (career.title.includes("Cybersecurity")) score += 10;
    }

    // Adjust based on academic background
    if (academic.includes("computer science") || academic.includes("engineering")) {
      if (career.title.includes("Software") || career.title.includes("Data") || career.title.includes("Cybersecurity")) score += 3;
    }
    if (academic.includes("business") || academic.includes("mba")) {
      if (career.title.includes("Product") || career.title.includes("Marketing")) score += 4;
    }
    if (academic.includes("design") || academic.includes("art")) {
      if (career.title.includes("UX/UI")) score += 5;
    }

    return { ...career, matchPercentage: Math.min(98, score) };
  });

  // Sort by match percentage and return top 3
  return scoredCareers
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3);
};

export const getMockRoadmap = (profile: CareerProfile): SkillRoadmapWeek[] => {
  const interests = profile.interests.toLowerCase();
  
  // Generate roadmap based on top career recommendation
  const recommendations = getMockRecommendations(profile);
  const topCareer = recommendations[0];
  
  if (topCareer.title.includes("Software")) {
    return [
      {
        week: 1,
        title: "Programming Fundamentals",
        tasks: [
          "Learn basic JavaScript syntax and concepts",
          "Complete 10 coding challenges on a practice platform",
          "Build a simple calculator application",
          "Set up development environment (VS Code, Git)"
        ],
        resources: [
          "MDN Web Docs - JavaScript Guide",
          "FreeCodeCamp JavaScript course",
          "Codecademy JavaScript track"
        ]
      },
      {
        week: 2,
        title: "Web Development Basics",
        tasks: [
          "Learn HTML5 semantic elements and structure",
          "Master CSS3 styling and responsive design",
          "Create your first interactive web page",
          "Practice with CSS Grid and Flexbox"
        ],
        resources: [
          "W3Schools HTML/CSS tutorials",
          "CSS-Tricks website",
          "Responsive Web Design course"
        ]
      },
      {
        week: 3,
        title: "React Framework",
        tasks: [
          "Understand React components and JSX",
          "Learn state management with useState hook",
          "Build a todo list application",
          "Practice component composition and props"
        ],
        resources: [
          "Official React documentation",
          "React tutorial on reactjs.org",
          "Scrimba React course"
        ]
      },
      {
        week: 4,
        title: "Project & Portfolio",
        tasks: [
          "Build a complete portfolio website",
          "Deploy your project using Vercel or Netlify",
          "Create a GitHub repository with clean code",
          "Write project documentation and README"
        ],
        resources: [
          "GitHub Pages documentation",
          "Portfolio examples on Dribbble",
          "LinkedIn profile optimization guide"
        ]
      }
    ];
  } else if (topCareer.title.includes("Data")) {
    return [
      {
        week: 1,
        title: "Python & Data Analysis",
        tasks: [
          "Learn Python basics and data types",
          "Master pandas for data manipulation",
          "Practice with numpy for numerical computing",
          "Complete basic data analysis exercises"
        ],
        resources: [
          "Python.org official tutorial",
          "Pandas documentation and tutorials",
          "Kaggle Learn Python course"
        ]
      },
      {
        week: 2,
        title: "Statistics & Visualization",
        tasks: [
          "Study descriptive and inferential statistics",
          "Learn matplotlib and seaborn for visualization",
          "Create compelling data visualizations",
          "Understand correlation vs causation"
        ],
        resources: [
          "Khan Academy Statistics course",
          "Matplotlib tutorials",
          "Seaborn documentation"
        ]
      },
      {
        week: 3,
        title: "Machine Learning Basics",
        tasks: [
          "Understand supervised vs unsupervised learning",
          "Learn scikit-learn library basics",
          "Build your first predictive model",
          "Practice with classification and regression"
        ],
        resources: [
          "Scikit-learn tutorials",
          "Coursera Machine Learning course",
          "Towards Data Science articles"
        ]
      },
      {
        week: 4,
        title: "Portfolio Project",
        tasks: [
          "Complete an end-to-end data science project",
          "Create a Jupyter notebook with analysis",
          "Build a dashboard or web app",
          "Present findings and insights clearly"
        ],
        resources: [
          "Kaggle datasets",
          "Streamlit for web apps",
          "GitHub portfolio examples"
        ]
      }
    ];
  } else {
    // Default roadmap for other careers
    return [
      {
        week: 1,
        title: "Industry Foundation",
        tasks: [
          "Research industry trends and best practices",
          "Identify key skills and certifications needed",
          "Create a learning plan and timeline",
          "Connect with professionals on LinkedIn"
        ],
        resources: [
          "Industry reports and whitepapers",
          "LinkedIn Learning courses",
          "Professional association websites"
        ]
      },
      {
        week: 2,
        title: "Core Skill Development",
        tasks: [
          "Take online courses in relevant skills",
          "Complete practical exercises and projects",
          "Join online communities and forums",
          "Start building a portfolio of work"
        ],
        resources: [
          "Coursera specialization courses",
          "Udemy skill-specific courses",
          "YouTube educational channels"
        ]
      },
      {
        week: 3,
        title: "Hands-on Practice",
        tasks: [
          "Work on real-world projects",
          "Seek feedback from experienced professionals",
          "Participate in hackathons or competitions",
          "Volunteer for relevant opportunities"
        ],
        resources: [
          "GitHub open source projects",
          "Local meetups and events",
          "Professional mentorship platforms"
        ]
      },
      {
        week: 4,
        title: "Portfolio & Networking",
        tasks: [
          "Create a professional portfolio website",
          "Optimize your LinkedIn profile",
          "Apply for internships or entry-level positions",
          "Prepare for technical interviews"
        ],
        resources: [
          "Portfolio design inspiration",
          "Interview preparation guides",
          "Job search platforms and strategies"
        ]
      }
    ];
  }
};
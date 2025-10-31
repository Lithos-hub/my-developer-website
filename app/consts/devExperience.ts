type Stack = {
  techName: string;
  imageUrl: string;
};

export interface Experience {
  id: number;
  image: string;
  roleKey: string;
  company: string;
  companyFields: string[];
  subtitle: string;
  clients: string[];
  clientFields: string[];
  initialMonth: number;
  endMonth: number | null;
  initialYear: number;
  endYear: number | null;
  stack: Stack[];
  tasksKeys: string[];
}

type FieldExtractor<T, U> = (item: U) => T[];

export const DEV_EXPERIENCE = [
  {
    id: 1,
    image: "/company-logos/cgi.png",
    roleKey: "experience.roles.frontEndDeveloper",
    company: "CGI",
    companyFields: ["Consulting", "IT"],
    clients: ["BBVA"],
    clientFields: ["Banking"],
    subtitle: "CGI",
    initialYear: 2021,
    endYear: 2022,
    initialMonth: 3,
    endMonth: 6,
    stack: [
      { techName: "Vue 2", imageUrl: "/tech-logos/vue.svg" },
      { techName: "Vuex", imageUrl: "/tech-logos/vuex.svg" },
      { techName: "Vuetify", imageUrl: "/tech-logos/vuetify.svg" },
      { techName: "JavaScript", imageUrl: "/tech-logos/javascript.svg" },
      { techName: "SCSS", imageUrl: "/tech-logos/sass.svg" },
    ],
    tasksKeys: [
      "experience.items.1.tasks.1",
      "experience.items.1.tasks.2",
      "experience.items.1.tasks.3",
      "experience.items.1.tasks.4",
      "experience.items.1.tasks.5",
    ],
  },
  {
    id: 2,
    image: "/company-logos/cathedral_software.png",
    roleKey: "experience.roles.frontEndDeveloper",
    company: "Cathedral Software",
    companyFields: ["Consulting", "IT"],
    subtitle: "Cathedral Software",
    clients: ["McKinsey & Company", "Repsol"],
    clientFields: ["Consulting", "Energy"],
    initialYear: 2022,
    endYear: 2023,
    initialMonth: 6,
    endMonth: 8,
    stack: [
      { techName: "Vue 3", imageUrl: "/tech-logos/vue.svg" },
      { techName: "React", imageUrl: "/tech-logos/react.svg" },
      { techName: "TypeScript", imageUrl: "/tech-logos/typescript.svg" },
      { techName: "Vuex", imageUrl: "/tech-logos/vuex.svg" },
      { techName: "Next", imageUrl: "/tech-logos/next.svg" },
      { techName: "leaflet", imageUrl: "/tech-logos/leaflet.svg" },
      { techName: "Jest", imageUrl: "/tech-logos/jest.svg" },
      { techName: "Vitest", imageUrl: "/tech-logos/vitest.svg" },
      {
        techName: "Testing Library",
        imageUrl: "/tech-logos/testing-library.svg",
      },
      { techName: "Tailwind", imageUrl: "/tech-logos/tailwind.svg" },
      { techName: "SCSS", imageUrl: "/tech-logos/sass.svg" },
      { techName: "Three.js", imageUrl: "/tech-logos/three.svg" },
    ],
    tasksKeys: [
      "experience.items.2.tasks.1",
      "experience.items.2.tasks.2",
      "experience.items.2.tasks.3",
      "experience.items.2.tasks.4",
      "experience.items.2.tasks.5",
      "experience.items.2.tasks.6",
      "experience.items.2.tasks.7",
      "experience.items.2.tasks.8",
      "experience.items.2.tasks.9",
    ],
  },
  {
    id: 3,
    image: "/company-logos/innoIT.png",
    roleKey: "experience.roles.frontEndDeveloper",
    company: "InnoIT",
    companyFields: ["Consulting", "IT"],
    subtitle: "InnoIT",
    clients: ["Europcar"],
    clientFields: ["Transport", "Renting", "SaaS"],
    initialYear: 2023,
    endYear: 2024,
    initialMonth: 8,
    endMonth: 6,
    stack: [
      { techName: "Vue 3", imageUrl: "/tech-logos/vue.svg" },
      { techName: "TypeScript", imageUrl: "/tech-logos/typescript.svg" },
      { techName: "Nuxt", imageUrl: "/tech-logos/nuxt.svg" },
      { techName: "Pinia", imageUrl: "/tech-logos/pinia.svg" },
      { techName: "Jest", imageUrl: "/tech-logos/jest.svg" },
      { techName: "SCSS", imageUrl: "/tech-logos/sass.svg" },
    ],
    tasksKeys: [
      "experience.items.3.tasks.1",
      "experience.items.3.tasks.2",
      "experience.items.3.tasks.3",
      "experience.items.3.tasks.4",
      "experience.items.3.tasks.5",
    ],
  },
  {
    id: 4,
    image: "/company-logos/photopills.png",
    roleKey: "experience.roles.frontEndDeveloper",
    company: "PhotoPills",
    companyFields: ["Product", "SaaS"],
    subtitle: "PhotoPills",
    clients: ["PhotoPills"],
    clientFields: ["Photography", "Product", "SaaS"],
    initialYear: 2024,
    endYear: 2025,
    initialMonth: 6,
    endMonth: 1,
    stack: [
      { techName: "Vue 3", imageUrl: "/tech-logos/vue.svg" },
      { techName: "TypeScript", imageUrl: "/tech-logos/typescript.svg" },
      { techName: "Vitest", imageUrl: "/tech-logos/vitest.svg" },
      { techName: "Pinia", imageUrl: "/tech-logos/pinia.svg" },
      { techName: "Tailwind", imageUrl: "/tech-logos/tailwind.svg" },
      { techName: "SCSS", imageUrl: "/tech-logos/sass.svg" },
    ],
    tasksKeys: [
      "experience.items.4.tasks.1",
      "experience.items.4.tasks.2",
      "experience.items.4.tasks.3",
      "experience.items.4.tasks.4",
      "experience.items.4.tasks.5",
    ],
  },
  {
    id: 5,
    image: "/company-logos/knowmad_mood.jpg",
    roleKey: "experience.roles.softwareEngineer",
    company: "Knowmad Mood",
    companyFields: ["Consulting", "IT"],
    subtitle: "Knowmad Mood",
    clients: ["El Corte Inglés"],
    clientFields: ["E-commerce", "Fashion"],
    initialYear: 2025,
    endYear: null,
    initialMonth: 2,
    endMonth: null,
    stack: [
      { techName: "Vue 3", imageUrl: "/tech-logos/vue.svg" },
      { techName: "TypeScript", imageUrl: "/tech-logos/typescript.svg" },
      { techName: "Jest", imageUrl: "/tech-logos/jest.svg" },
      { techName: "Pinia", imageUrl: "/tech-logos/pinia.svg" },
      { techName: "Tailwind", imageUrl: "/tech-logos/tailwind.svg" },
      { techName: "Less", imageUrl: "/tech-logos/less.svg" },
    ],
    tasksKeys: [
      "experience.items.5.tasks.1",
      "experience.items.5.tasks.2",
      "experience.items.5.tasks.3",
      "experience.items.5.tasks.4",
      "experience.items.5.tasks.5",
      "experience.items.5.tasks.6",
    ],
  },
].sort((a, b) => b.id - a.id) as Experience[];

// Get all years from beginning and end of experience + 1 year
const getYears = (experience: Experience) => {
  return [
    experience.initialYear,
    experience.endYear,
    experience.endYear ?? new Date().getFullYear(),
  ];
};

export const EXPERIENCE_YEARS = [
  ...new Set(DEV_EXPERIENCE.map(getYears).flat()),
] as const;

const getMostCommonFields = <T extends string, U extends Experience>(
  experiences: U[],
  fieldExtractor: FieldExtractor<T, U>,
  limit: number = 5
): string => {
  const fieldCount = experiences.reduce((acc, experience) => {
    fieldExtractor(experience).forEach((field) => {
      acc[field] = (acc[field] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(fieldCount)
    .sort((a, b) => b[1] - a[1])
    .map(([field]) => field)
    .slice(0, limit)
    .join(", ");
};

export const getMostUsedTech = () =>
  getMostCommonFields(DEV_EXPERIENCE, (exp) =>
    exp.stack.map((tech) => tech.techName)
  );

export const getMainClientFields = () =>
  getMostCommonFields(DEV_EXPERIENCE, (exp) => exp.clientFields);

export const techSkills = [
  {
    image: "/tech-logos/html.svg",
    name: "HTML",
  },
  {
    image: "/tech-logos/css.svg",
    name: "CSS",
  },
  {
    image: "/tech-logos/javascript.svg",
    name: "JavaScript",
  },
  {
    image: "/tech-logos/typescript.svg",
    name: "TypeScript",
  },
  {
    image: "/tech-logos/vite.svg",
    name: "Vite",
  },
  {
    image: "/tech-logos/vue.svg",
    name: "Vue",
  },
  {
    image: "/tech-logos/react.svg",
    name: "React",
  },
  {
    image: "/tech-logos/next.svg",
    name: "Next.js",
  },
  {
    image: "/tech-logos/nuxt.svg",
    name: "Nuxt",
  },
  {
    image: "/tech-logos/pinia.svg",
    name: "Pinia",
  },
  {
    image: "/tech-logos/vuex.svg",
    name: "Vuex",
  },
  {
    image: "/tech-logos/redux.svg",
    name: "Redux",
  },
  {
    image: "/tech-logos/jest.svg",
    name: "Jest",
  },
  {
    image: "/tech-logos/vitest.svg",
    name: "Vitest",
  },
  {
    image: "/tech-logos/testing-library.svg",
    name: "Testing Library",
  },
  {
    image: "/tech-logos/sass.svg",
    name: "SASS",
  },
  {
    image: "/tech-logos/tailwind.svg",
    name: "Tailwind CSS",
  },
  {
    image: "/tech-logos/less.svg",
    name: "Less",
  },
  {
    image: "/tech-logos/three.svg",
    name: "Three.js",
  },
  {
    image: "/tech-logos/leaflet.svg",
    name: "Leaflet.js",
  },
  {
    image: "/tech-logos/git.svg",
    name: "Git",
  },
  {
    image: "/tech-logos/docker.svg",
    name: "Docker",
  },
  {
    image: "/tech-logos/node.svg",
    name: "Node",
  },
  {
    image: "/tech-logos/mongo.svg",
    name: "MongoDB",
  },
  {
    image: "/tech-logos/linux.svg",
    name: "Linux",
  },
];

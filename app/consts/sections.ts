export const sectionsOptions = [
  "hero",
  "about",
  "summary",
  "experience",
  "portfolio",
] as const;
export type Section = (typeof sectionsOptions)[number];

interface SectionData {
  id: string;
  code: string;
  title: string;
  componentName: string;
  path: string;
}

export const sections: Record<Section, SectionData> = {
  hero: {
    id: "hero",
    code: "A1",
    title: "<Hero />",
    componentName: "Hero.vue",
    path: "#hero",
  },
  about: {
    id: "about",
    code: "A2",
    title: "<About />",
    componentName: "About.vue",
    path: "#about",
  },
  summary: {
    id: "summary",
    code: "B1",
    title: "<Summary />",
    componentName: "Summary.vue",
    path: "#summary",
  },
  experience: {
    id: "experience",
    code: "B2",
    title: "<Experience />",
    componentName: "Experience.vue",
    path: "#experience",
  },
  portfolio: {
    id: "portfolio",
    code: "C1",
    title: "<Portfolio />",
    componentName: "Portfolio.vue",
    path: "#portfolio",
  },
};

const caseStudyProjects = [
  {
    title: "Flesh and Bones",
    slug: "flesh-and-bones",
    image: "/images/work/flesh-and-bones.jpg",
    url: "https://wearefleshandbones.com/",
    challenge: "Create a digital world that feels handmade, cinematic, and a little strange while still making the project easy to enter. Create a digital world that feels handmade, cinematic, and a little strange while still making the project easy to enter.",
    solutionLabel: "Campaign sequence",
    resultLabels: ["Identity", "Experience", "Launch"]
  },
  {
    title: "Futuristic Films",
    slug: "futuristic-films",
    image: "/images/work/futuristic.jpg",
    url: "https://futuristicfilms.com/",
    challenge: "Give a production studio portfolio the speed of a reel and the structure of a serious body of work.",
    solutionLabel: "Portfolio system",
    resultLabels: ["Reel", "Projects", "Studio"]
  },
  {
    title: "Clayton Cotterell",
    slug: "clayton-cotterell",
    image: "/images/work/clayton-cotterell.jpg",
    url: "https://claytoncotterell.com/",
    challenge: "Present a photographer's work with enough restraint for the images to lead and enough attitude to feel authored.",
    solutionLabel: "Gallery rhythm",
    resultLabels: ["Archive", "Editorial", "Portfolio"]
  }
];

export const archives = [
  {
    title: "Nike: 15 Years of Dunk",
    image: "/images/work/nike-sb.jpg",
    url: "http://fyod.s3-website-us-east-1.amazonaws.com/"
  },
  {
    title: "Coca Cola: Building of Memories",
    image: "/images/work/coca-cola.jpg",
    url: "http://cb-proto.s3-website-us-east-1.amazonaws.com/"
  },
  {
    title: "Domino's: IFTTT",
    image: "/images/work/dominos-ifttt.jpg",
    url: "http://ifttt-dominos.s3-website-us-east-1.amazonaws.com/"
  },
  {
    title: "Fruit of the Loom: Tuck Effect",
    image: "/images/work/tuck-effect.jpg",
    url: "http://tuck-effect.s3-website-us-east-1.amazonaws.com/"
  }
];

export const caseStudies = caseStudyProjects.map((project) => ({
  ...project,
  path: `/${project.slug}`
}));

export const workProjects = [...caseStudies, ...archives];

export function getWorkProjectBySlug(slug) {
  return caseStudies.find((project) => project.slug === slug);
}

export function getNextWorkProject(slug) {
  const currentIndex = caseStudies.findIndex((project) => project.slug === slug);

  if(currentIndex === -1) {
    return caseStudies[0];
  }

  return caseStudies[(currentIndex + 1) % caseStudies.length];
}

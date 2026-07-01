const projects = [
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
  },
  {
    title: "Nike: 15 Years of Dunk",
    slug: "nike-15-years-of-dunk",
    image: "/images/work/nike-sb.jpg",
    url: "http://fyod.s3-website-us-east-1.amazonaws.com/",
    archive: true,
    challenge: "Celebrate a deep product history without turning the archive into a static timeline.",
    solutionLabel: "Archive interaction",
    resultLabels: ["Timeline", "Product", "Campaign"]
  },
  {
    title: "Coca Cola: Building of Memories",
    slug: "coca-cola-building-of-memories",
    image: "/images/work/coca-cola.jpg",
    url: "http://cb-proto.s3-website-us-east-1.amazonaws.com/",
    archive: true,
    challenge: "Turn a branded story into a web experience with warmth, pacing, and a clear emotional arc.",
    solutionLabel: "Story prototype",
    resultLabels: ["Narrative", "Prototype", "Brand"]
  },
  {
    title: "Domino's: IFTTT",
    slug: "dominos-ifttt",
    image: "/images/work/dominos-ifttt.jpg",
    url: "http://ifttt-dominos.s3-website-us-east-1.amazonaws.com/",
    archive: true,
    challenge: "Make a playful service integration understandable at a glance without flattening the idea.",
    solutionLabel: "Integration flow",
    resultLabels: ["Automation", "Prototype", "Ordering"]
  },
  {
    title: "Fruit of the Loom: Tuck Effect",
    slug: "fruit-of-the-loom-tuck-effect",
    image: "/images/work/tuck-effect.jpg",
    url: "http://tuck-effect.s3-website-us-east-1.amazonaws.com/",
    archive: true,
    challenge: "Turn a small product behavior into a campaign interaction people can immediately understand.",
    solutionLabel: "Comparison tool",
    resultLabels: ["Product", "Prototype", "Campaign"]
  }
];

export const workProjects = projects.map((project) => ({
  ...project,
  path: `/${project.slug}`
}));

export function getWorkProjectBySlug(slug) {
  return workProjects.find((project) => project.slug === slug);
}

export function getNextWorkProject(slug) {
  const currentIndex = workProjects.findIndex((project) => project.slug === slug);

  if(currentIndex === -1) {
    return workProjects[0];
  }

  return workProjects[(currentIndex + 1) % workProjects.length];
}

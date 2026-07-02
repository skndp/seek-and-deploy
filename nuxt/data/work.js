const caseStudyProjects = [
  {
    title: "Flesh and Bones",
    slug: "flesh-and-bones",
    image: "/images/work/flesh-and-bones.jpg",
    url: "https://wearefleshandbones.com/",
    challenge: {
      image: "/images/work/flesh-and-bones.jpg",
      copy: "Transform an aging studio website into a fast, cinematic brand experience with custom web design, motion-led storytelling, and a flexible CMS workflow that is easier for the client to manage.",
      extraImage: "/images/work/flesh-and-bones.jpg"
    },
    solution: {
      video: "/videos/work/fnb-fpo.mp4",
      chapters: [
        {
          start: 0,
          title: "Immersive video content anchors the digital experience"
        },
        {
          start: 2,
          title: "Hand-crafted interactions and transitions bring the brand to life"
        },
        {
          start: 4,
          title: "Structured in Sanity CMS for easy content management and updates"
        }
      ]
    },
    results: {
      resultsStats: [
        "Winner, FWA - SOTD",
        "Significant Performance Improvements",
        "Traffic and Engagement Increased"
      ]
    }
  },
  {
    title: "Futuristic Films",
    slug: "futuristic-films",
    image: "/images/work/futuristic.jpg",
    url: "https://futuristicfilms.com/",
    challenge: {
      image: "/images/work/futuristic.jpg",
      copy: "Refresh a film production studio website with a stronger brand presence, clearer content structure, and a portfolio experience built to showcase the work first.",
      extraImage: "/images/work/futuristic.jpg"
    },
    solution: {
      video: "/videos/work/fnb-fpo.mp4",
      chapters: [
        {
          start: 0,
          title: "Brand, work, and culture are woven throughout the experience"
        },
        {
          start: 2,
          title: "Case studies lead the homepage and guide the narrative"
        },
        {
          start: 4,
          title: "Structured in Sanity CMS for easy content updates and control"
        }
      ]
    },
    results: {
      resultsStats: [
        "Significant Performance Improvements",
        "Traffic and Engagement Increased",
        "Flexible Sanity CMS for easier ongoing updates"
      ]
    }
  },
  {
    title: "Clayton Cotterell",
    slug: "clayton-cotterell",
    image: "/images/work/clayton-cotterell.jpg",
    url: "https://claytoncotterell.com/",
    challenge: {
      image: "/images/work/clayton-cotterell.jpg",
      copy: "Create an immersive portfolio while giving the client complete creative control over highly customized project layouts through an intuitive CMS.",
      extraImage: "/images/work/clayton-cotterell.jpg"
    },
    solution: {
      video: "/videos/work/fnb-fpo.mp4",
      chapters: [
        {
          start: 0,
          title: "Crafted interactions create a memorable portfolio experience"
        },
        {
          start: 2,
          title: "Unique layouts designed to keep the photography front and center"
        },
        {
          start: 4,
          title: "Built to showcase work for global brands including Nike, Airbnb, and The New York Times"
        },
        {
          start: 6,
          title: "Custom Sanity CMS powers flexible photo and video grid layouts"
        }
      ]
    },
    results: {
      resultsStats: [
        "Honorable Mention - Awwwards",
        "Highly engaging portfolio experience",
        "Flexible Sanity CMS for easier ongoing updates"
      ]
    }
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

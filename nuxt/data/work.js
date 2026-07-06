const caseStudyProjects = [
  {
    title: "Flesh and Bones",
    slug: "flesh-and-bones",
    image: "/images/work/flesh-and-bones.jpg",
    url: "https://wearefleshandbones.com/",
    with: {
      "name": "Aaron Ray",
      "url": "https://www.aaronjray.com/"
    },
    challenge: {
      image: "/images/work/flesh-and-bones-brand-card.png",
      copy: "Transform an aging studio website into a fast, cinematic brand experience with custom web design, motion-led storytelling, and a flexible CMS workflow that is easier for the client to manage.",
      squareVideo: "/videos/work/flesh-and-bones-square.mp4"
    },
    solution: {
      video: "/videos/work/flesh-and-bones-highlights.mp4",
      chapters: [
        {
          start: 0,
          title: "Immersive video content anchors the digital experience"
        },
        {
          start: 7,
          title: "Hand-crafted interactions and transitions bring the brand to life"
        },
        {
          start: 13,
          title: "Structured in Sanity CMS for easy content management and updates"
        }
      ]
    },
    results: {
      resultsStats: [
        {
          label: "Winner - FWA SOTD",
          icon: "fwa"
        },
        {
          label: "Improved Performance and SEO",
          icon: "startup"
        },
        {
          label: "Increased Traffic and Engagement",
          icon: "fortune"
        }
      ]
    }
  },
  {
    title: "Futuristic Films",
    slug: "futuristic-films",
    image: "/images/work/futuristic.jpg",
    url: "https://futuristicfilms.com/",
    with: {
      "name": "Consume & Create",
      "url": "https://www.consumeandcreate.co/"
    },
    challenge: {
      image: "/images/work/futuristic-brand-card.png",
      copy: "Refresh a film production studio website with a stronger brand presence, clearer content structure, and a portfolio experience built to showcase the work first.",
      squareVideo: "/videos/work/futuristic-square.mp4"
    },
    solution: {
      video: "/videos/work/futuristic-highlights.mp4",
      chapters: [
        {
          start: 0,
          title: "Brand, work, and culture are woven throughout the experience"
        },
        {
          start: 9.5,
          title: "Case studies lead the homepage and guide the narrative"
        },
        {
          start: 16,
          title: "Structured in Sanity CMS for easy content updates and control"
        }
      ]
    },
    results: {
      resultsStats: [
        {
          label: "Improved Performance and SEO",
          icon: "startup"
        },
        {
          label: "Increased Traffic and Engagement",
          icon: "fortune"
        },
        {
          label: "Full Site Control Reduced Recurring Costs",
          icon: "share"
        }
      ]
    }
  },
  {
    title: "Clayton Cotterell",
    slug: "clayton-cotterell",
    image: "/images/work/clayton-cotterell.jpg",
    url: "https://claytoncotterell.com/",
    with: {
      "name": "Midnight Sea",
      "url": "https://midnightsea.studio/"
    },
    challenge: {
      image: "/images/work/clayton-cotterell-brand-card.png",
      copy: "Create an immersive portfolio that showcases a world-class photographer's work while giving them complete creative control over highly customized project layouts.",
      squareVideo: "/videos/work/cotterell-square.mp4"
    },
    solution: {
      video: "/videos/work/clayton-cotterell-highlights.mp4",
      chapters: [
        {
          start: 0,
          title: "Crafted interactions and unique layouts create a memorable portfolio experience"
        },
        {
          start: 10,
          title: "Built to showcase work for global brands including Nike, Airbnb, and The New York Times"
        },
        {
          start: 21.45,
          title: "Custom Sanity CMS powers flexible photo and video grid layouts"
        }
      ]
    },
    results: {
      resultsStats: [
        {
          label: "Honorable Mention - Awwwards",
          icon: "awwwards"
        },
        {
          label: "Increased Traffic and Engagement",
          icon: "fortune"
        },
        {
          label: "Full Site Control Reduced Recurring Costs",
          icon: "share"
        }
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

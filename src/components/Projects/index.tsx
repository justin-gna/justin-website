import { motion } from 'framer-motion'
import styles from './Projects.module.scss'
import { ProjectCard } from './ProjectCard'
import { useFadeUp } from '../../hooks/useFadeUp'
import websiteImg from '../../assets/website.png'
import letterboxdImg from '../../assets/letterboxd.png'
import boggleImg from '../../assets/boggle.png'
import cyberSecImg from '../../assets/cybersec.png'
import mlImg from '../../assets/machinelearning.png'

function AnimatedCard({ children }: { children: React.ReactNode }) {
  const fade = useFadeUp<HTMLDivElement>()
  return (
    <motion.div
      ref={fade.ref}
      initial={fade.initial}
      animate={fade.animate}
    >
      {children}
    </motion.div>
  )
}

export interface Project {
  title: string
  color: string
  description: string
  techStack: string[]
  githubUrl?: string
  backgroundImage?: string
  youtubeUrl?: string
  externalUrl?: string
}

const projects: Project[] = [
  {
    title: "Personal Website",
    color: "#ec2651",
    description: "This portfolio website you're looking at, focusing on front end responsive design",
    techStack: ["React", "TypeScript", "SCSS", "Vite"],
    githubUrl: "https://github.com/justin-gna/justin-website",
    backgroundImage: websiteImg,
  },
  {
    title: "Letterboxd React Component",
    color: "#181c21",
    description: "A React component for embedding your Letterboxd diary on your personal site. Data is fetched via a companion Cloudflare Worker that reads your public Letterboxd RSS feed and enriches it with TMDB poster images.",
    techStack: ["React", "TypeScript", "Cloudflare Worker", "SCSS", "Vite"],
    githubUrl: "https://github.com/justin-gna/letterboxd-diary",
    backgroundImage: letterboxdImg,
  },
  {
    title: "City Prediction ML Model",
    color: "#ffaf8a",
    description: "The final project in my Intro to Machine Learning course @ UofT. In a team of 4, we trained an ML model to predict cities based on student survey responses about architecture, culture, temperature, and word associations.",
    techStack: ["Python", "Numpy", "scikit-learn"],
    externalUrl: "https://docs.google.com/document/d/1S7BU_DIDBoOaGJ-FDZQRDYdHmCga1-VciD5fDccrogE/edit?tab=t.0#heading=h.j3ardwhhdo4v",
    backgroundImage: mlImg,
  },
  {
    title: "Boggle 1.1",
    color: "#ffaf8a",
    description: "An enhancement on a console based Boggle game bulit in my Intro to Software Development course @ UofT. In a team of 4, we enriched the game by implementing an interactive GUI, multiple difficulty modes, and language and accessibility settings.",
    techStack: ["Java", "JavaFX"],
    backgroundImage: boggleImg,
    youtubeUrl: "https://www.youtube.com/watch?v=0sBkFePW33U"
  },
  {
    title: "Computer Security",
    color: "#ffaf8a",
    description: "In my Computer Security courses @ UofT I learned how to exploit vulnerabilities in software and how to mitigate and protect against them, through various projects and participating in CTFs. Linked below is a seminar I conducted in a group of 3, about phishing.",
    techStack: ["C", "Kali Linux", "Python"],
    backgroundImage: cyberSecImg,
    externalUrl: "https://docs.google.com/presentation/d/1dZvY4vuKQskhPMMMt40hUSoXvcI5nOim50t9CdYAanY/edit?usp=sharing",
  },
]

function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.sectionTitle}>projects</h2>
      <div className={styles.container}>
        <div className={styles.grid}>
          {projects.map(project => (
            <AnimatedCard key={project.title}>
              <div className={styles.card}>
                <ProjectCard project={project} />
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

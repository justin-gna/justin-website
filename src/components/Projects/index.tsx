import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Projects.module.scss'
import ProjectModal from './ProjectModal'
import { ProjectCard } from './ProjectCard'
import { useFadeUp } from '../../hooks/useFadeUp'
import websiteImg from '../../assets/website.png'
import letterboxdImg from '../../assets/letterboxd.png'
import boggleImg from '../../assets/boggle.png'
import cyberSecImg from '../../assets/cybersec.png'
import mlImg from '../../assets/machinelearning.png'

const TILT_INTENSITY = 7

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleCardClick = (index: number) => {
    if (activeIndex !== null) return
    const el = cardRefs.current[index]
    if (!el) return
    // Reset any in-progress tilt before measuring so rect is accurate
    el.style.transition = 'none'
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    const rect = el.getBoundingClientRect()
    el.style.visibility = 'hidden'
    setActiveRect(rect)
    setActiveIndex(index)
  }

  const handleExited = (index: number) => {
    const el = cardRefs.current[index]
    if (el) el.style.visibility = ''
    setActiveIndex(null)
    setActiveRect(null)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (activeIndex === index) return
    const el = cardRefs.current[index]
    if (!el) return
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    const rotX = (offsetY / (rect.height / 2)) * TILT_INTENSITY
    const rotY = -(offsetX / (rect.width / 2)) * TILT_INTENSITY
    el.style.transition = 'transform 0.08s linear'
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`
  }

  const handleMouseLeave = (index: number) => {
    const el = cardRefs.current[index]
    if (!el) return
    el.style.transition = 'transform 0.5s ease-out'
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.sectionTitle}>projects</h2>
      <div className={styles.container}>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <AnimatedCard key={project.title}>
              <div
                ref={(el) => { cardRefs.current[index] = el }}
                className={styles.card}
                onClick={() => handleCardClick(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <ProjectCard project={project} />
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
      {/* One overlay card per project — always in DOM so images are preloaded.
          Each is position:fixed and visibility:hidden until its card is clicked. */}
      {projects.map((project, index) => (
        <ProjectModal
          key={project.title}
          project={project}
          isActive={activeIndex === index}
          rect={activeIndex === index ? activeRect : null}
          onExited={() => handleExited(index)}
        />
      ))}
    </section>
  )
}

export default Projects

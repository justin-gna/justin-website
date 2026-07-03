import { useState } from 'react'
import styles from './ProjectCard.module.scss'
import type { Project } from '..'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {project.backgroundImage ? (
        <img
          src={project.backgroundImage}
          alt={project.title}
          className={styles.image}
        />
      ) : (
        <div
          className={styles.placeholder}
          style={{ backgroundColor: project.color }}
        />
      )}
      <h3 className={styles.titleRow}>
        <button
          className={styles.header}
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
        >
          <span className={styles.title}>{project.title}</span>
          <span className={`${styles.arrow} ${expanded ? styles.arrowOpen : ''}`} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
          </span>
        </button>
      </h3>
      <div className={`${styles.details} ${expanded ? styles.open : ''}`}>
        <div className={styles.detailsInner}>
          <div className={styles.detailsBody}>
            <div className={styles.tags}>
              {project.techStack.map(tech => (
                <span key={tech} className={styles.tag}>{tech}</span>
              ))}
            </div>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.links}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  view on github →
                </a>
              )}
              {project.youtubeUrl && (
                <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  watch on youtube →
                </a>
              )}
              {project.externalUrl && (
                <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  visit project →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

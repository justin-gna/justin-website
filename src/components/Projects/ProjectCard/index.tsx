import styles from './ProjectCard.module.scss'
import { CardFrontBottom } from '../CardFrontBottom'
import type { Project } from '..'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
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
      <CardFrontBottom title={project.title} techStack={project.techStack} />
    </>
  )
}

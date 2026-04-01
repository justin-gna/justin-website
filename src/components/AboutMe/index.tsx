import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './AboutMe.module.scss'
import logoSvg from '../../assets/logo.svg'
import resumePdf from '../../assets/Justin_Gnananadchtheram_Resume.pdf'
import LinkedInIcon from '../icons/LinkedInIcon'
import GitHubIcon from '../icons/GitHubIcon'
import InstagramIcon from '../icons/InstagramIcon'
import { useFadeUp } from '../../hooks/useFadeUp'

function AboutMe() {
  const fade = useFadeUp<HTMLDivElement>()
  const [spinning, setSpinning] = useState(false)

  return (
    <section id="about" className={styles.about}>
      <motion.div
        ref={fade.ref}
        className={styles.container}
        initial={fade.initial}
        animate={fade.animate}
      >
        <div className={styles.leftColumn}>
          <div
            className={`${styles.imageWrapper}${spinning ? ` ${styles.spinning}` : ''}`}
            onClick={() => { if (!spinning) setSpinning(true) }}
            onAnimationEnd={() => setSpinning(false)}
          >
            <img src={logoSvg} alt="Justin" className={styles.profileImage} />
          </div>
          <div className={styles.socialLinks}>
            <a href="https://linkedin.com/in/justin-gna/" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <LinkedInIcon />
            </a>
            <a href="https://github.com/justin-gna" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <GitHubIcon />
            </a>
            <a href="https://instagram.com/justin.gna" target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <InstagramIcon />
            </a>
          </div>
          <a href={resumePdf} target="_blank" rel="noopener noreferrer" className={styles.resumeLink}>
            résumé
          </a>
        </div>
        <div className={styles.bio}>
          <h3>greetings</h3>
          <p>
            i'm justin and welcome to my personal portfolio website. i'm interested in ui/ux design, cybersecurity, and machine learning. i'm also interested in discrete math, algebra, and number theory. most of all, i'm passionate about problem solving.
          </p>
          <p>
            take a look around. check out my projects to get a better idea about my technical skills, check out the other sections for more about me personally and what i'm up to.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutMe

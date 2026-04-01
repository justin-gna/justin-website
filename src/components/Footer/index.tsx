import styles from './Footer.module.scss'
import LinkedInIcon from '../icons/LinkedInIcon'
import GitHubIcon from '../icons/GitHubIcon'
import InstagramIcon from '../icons/InstagramIcon'

function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.name}>justin edward gnananadchtheram</span>
      <div className={styles.socials}>
        <a
          href="https://linkedin.com/in/justin-gna"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="LinkedIn"
        >
          <LinkedInIcon size={18} />
        </a>
        <a
          href="https://github.com/justin-gna"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="GitHub"
        >
          <GitHubIcon size={18} />
        </a>
        <a
          href="https://instagram.com/justin.gna"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="Instagram"
        >
          <InstagramIcon size={18} />
        </a>
      </div>
    </footer>
  )
}

export default Footer

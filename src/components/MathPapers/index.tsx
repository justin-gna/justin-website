import { motion } from 'framer-motion'
import styles from './MathPapers.module.scss'
import chroniclesOfPiPdf from '../../assets/The_Chronicles_of_Pi.pdf'
import chooseOrNotPdf from '../../assets/To_Choose_or_Not_To_Choose.pdf'
import mat202PortfolioPdf from '../../assets/MAT202_Final_Portfolio.pdf'
import ExternalLinkIcon from '../icons/ExternalLinkIcon'
import { useFadeUp } from '../../hooks/useFadeUp'

const papers = [
  {name: "The Chronicles of Pi", description: "on the history of pi, its irrationality, and some interesting proofs", pdf: chroniclesOfPiPdf},
  {name: "The Axiom of Choice: To Choose or Not To Choose", description: "on the axiom of choice and the implications of accepting it or not accepting it", pdf: chooseOrNotPdf},
  {name: "MAT202 Final Portfolio", description: "various proofs i did while taking mat202", pdf: mat202PortfolioPdf},
]

function MathPapers() {
  const fade = useFadeUp<HTMLDivElement>()

  return (
    <section id="math" className={styles.mathPapers}>
      <motion.div
        ref={fade.ref}
        className={styles.container}
        initial={fade.initial}
        animate={fade.animate}
      >
        <h3>math</h3>
        <ul className={styles.list}>
          {papers.map((paper) => (
            <a key={paper.name} href={paper.pdf} target="_blank" rel="noopener noreferrer">
              <li className={styles.item}>
                <div>
                  <span className={styles.paperName}>{paper.name}</span>
                  <p className={styles.paperDescription}>{paper.description}</p>
                </div>
                <div className={styles.link}>
                  <ExternalLinkIcon size={20} />
                </div>
              </li>
            </a>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}

export default MathPapers

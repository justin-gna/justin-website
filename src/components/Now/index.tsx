import styles from './Now.module.scss'

function Now() {

  return (
    <section className={styles.now}>
      <h2 className={styles.sectionTitle}>what i'm up to now</h2>
      <p className={styles.lastUpdated}>last updated: march 2026</p>
      <p className={styles.description}>
        this is my 'now' page, if you're on this website you probably have an idea of who i am and what i do, 
        so this page is dedicated to talking about what i've been up to recently. 
        this page is inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">derek sivers' idea of a now page</a>. 
      </p>
      <div className={styles.container}>
        <div className={styles.subsection}>
          <h3>what i'm consuming</h3>
          <p>
            i've been keeping up with the <a href="https://www.exorcistfiles.tv/" target="_blank" rel="noopener noreferrer">exorcist files podcast</a>, 
            they take the case files of an exorcist, fr. carlos martins, and create dramatized reenactments of the cases. 
            if you're interested in the supernatural and/or theology definitely check it out.
          </p>
        </div>
        <div className={styles.subsection}>
          <h3>what i'm creating</h3>
          <p>
            i'm currently working on the blog section of this website, and then i'll be working on the chat section of this website. 
            i'm trying to design the blog so that it's very easy to upload a new blog, i want to dumb it down to 
            simpily committing a markdown file to the repo and redeploying. 
            the chat section of this website would be a place where visitors can leave a message and also view the 
            messages that others have left, this will be a little more diffcult because of the security concerns with anonymous 
            user input.
          </p>
        </div>
        <div className={styles.subsection}>
          <h3>how i'm moving</h3>
          <p>
            i've been playing a lot of soccer recently in a rec league with some friends, i must be honest we are terrible, 
            i genuinely can't remember the last time we won a game. i'm probably going to be taking a break from the rec leagues this summer 
            and focus on playing sports for fun, like tennis, and volleyball. this summer i'll also be going on runs, trying to set some new personal 
            bests in the 5k and 10k.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Now

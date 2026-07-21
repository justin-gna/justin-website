import styles from './Now.module.scss'

function Now() {

  return (
    <section className={styles.now}>
      <h2 className={styles.sectionTitle}>what i'm up to now</h2>
      <p className={styles.lastUpdated}>last updated: july 2026</p>
      <p className={styles.description}>
        this is my 'now' page, if you're on this website you probably have an idea of who i am and what i do, 
        so this page is dedicated to talking about what i've been up to recently. 
        this page is inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">derek sivers' idea of a now page</a>. 
      </p>
      <div className={styles.container}>
        <div className={styles.subsection}>
          <h3>what i'm consuming</h3>
          <p>
            i've been rewatching avatar: the last airbender (2005-2008), it's honestly so perfect i find myself wondering 
            how they pulled off such an amazing original show and then everything that's come after it has been pretty mediocre.
          </p>
        </div>
        <div className={styles.subsection}>
          <h3>what i'm creating</h3>
          <p>
            i just worked on making this website work with Next.js and hosting it on cloudflare. I also redesigned some portions of 
            this website so that they would be more lightweight. unfortunately that means there's no more cool animated gradient on the 
            hero page, but it has been replaced with a cool interactive bubble thingy, which i got from <a href="https://github.com/baunov/gradients-bg" target="_blank" rel="noopener noreferrer">this repo</a>.
            i'm working on the chat and blog section of this website still, stay tuned.
          </p>
        </div>
        <div className={styles.subsection}>
          <h3>how i'm moving</h3>
          <p>
            i said i would be taking a break from soccer, but somehow i was convinced to join an 11v11 sunday league. it is fun to play, especially with the world 
            cup going on, it's made me more eager to play soccer, but we do still kind of suck. i've been playing a lot of volleyball recently, 
            going to drop-ins and all that, i haven't really seen much improvement but i am enjoying every chance i get to play. i said i would be running 
            but the weather is so hot and i've just been very lazy so i haven't actually gone on a proper run since like early june.
          </p>
        </div>
      </div>
      <hr className={styles.divider} />
      <h2 className={styles.sectionTitle}>archive</h2>
      <p className={styles.lastUpdated}>previous versions of this page</p>
      <div className={styles.container}>
        <div className={styles.archiveEntry}>
          <h3>march 2026</h3>
        </div>
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

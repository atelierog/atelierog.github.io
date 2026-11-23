const services = [
  { number: "01", title: "Design", description: "Create a clear, consistent digital identity that helps your business look credible and communicate better.", items: ["Brand and business creatives", "Web and landing page design", "Menus, catalogues and marketing assets"] },
  { number: "02", title: "Excel & Data", description: "Turn scattered information into organised, useful systems that make everyday work easier.", items: ["Excel tools and trackers", "Dashboards and reports", "Data organisation and cleanup"] },
  { number: "03", title: "Digital Tools", description: "Give customers and teams simpler ways to discover, access and use your business.", items: ["Business websites and digital presence", "QR experiences and digital menus", "Forms, catalogues and customer workflows"] },
  { number: "04", title: "Business Automation", description: "Reduce repetitive work with connected workflows designed around how your business actually operates.", items: ["Workflow mapping", "Process automation", "Custom business systems"] },
];

const products = [
  { number: "01", name: "Digital Menu", category: "RESTAURANTS & HOSPITALITY", description: "A mobile-first menu and QR experience designed to make browsing, discovery and ordering simpler.", status: "In development", mark: "MENU", tone: "menu" },
  { number: "02", name: "Gym Manager", category: "FITNESS & MEMBERSHIP BUSINESSES", description: "A mobile-first operations system for memberships, attendance, renewals and day-to-day gym management.", status: "In development", mark: "GM", tone: "gym" },
  { number: "03", name: "QR Management", category: "CUSTOMER & BUSINESS WORKFLOWS", description: "Practical QR-based experiences that connect customers to the right information and business touchpoints.", status: "Concept / development", mark: "QR", tone: "qr" },
];

const principles = [
  ["01", "Understand first", "We start by learning how your business works and where the friction really is."],
  ["02", "Keep it practical", "We recommend the simplest useful solution instead of adding technology for its own sake."],
  ["03", "Build with care", "We focus on clear workflows, dependable foundations and thoughtful user experiences."],
  ["04", "Improve together", "We learn from feedback and refine the solution as your needs evolve."],
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <div className="site-nav-wrap">
          <a className="wordmark" href="#top" aria-label="Atelier OG home"><span>ATELIER</span><b>OG</b><i>®</i></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#services">Services</a><a href="#products">Products</a><a href="#approach">Our approach</a><a href="#about">About</a>
          </nav>
          <a className="nav-cta" href="mailto:atelierog@gmail.com?subject=Business%20Enquiry%20-%20Atelier%20OG">Let’s talk <span>↗</span></a>
          <details className="mobile-nav">
            <summary aria-label="Open navigation"><span></span><span></span></summary>
            <nav aria-label="Mobile navigation"><a href="#services">Services</a><a href="#products">Products</a><a href="#approach">Our approach</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
          </details>
        </div>
      </header>

      <section className="hero">
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-glow" aria-hidden="true"></div>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line"></span> INDEPENDENT TECHNOLOGY STUDIO · INDIA</p>
            <h1>Make your business<br />work <em>smarter.</em></h1>
            <p className="hero-description">We design useful digital experiences, build practical business tools and simplify everyday operations through technology.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#services">Explore what we do <span>↗</span></a>
              <a className="text-link" href="mailto:atelierog@gmail.com?subject=Let%27s%20build%20something%20useful">Start a conversation <span>→</span></a>
            </div>
            <div className="hero-note"><span className="status-dot"></span> Thoughtful solutions. Built around real business needs.</div>
          </div>
          <div className="hero-visual" aria-label="Abstract illustration of connected business systems">
            <div className="visual-orbit orbit-a"></div><div className="visual-orbit orbit-b"></div>
            <div className="visual-core"><span className="core-top">ATELIER</span><strong>OG</strong><span className="core-bottom">IDEAS INTO SYSTEMS</span></div>
            <div className="visual-node node-one"><span className="node-icon">✳</span><span>DESIGN</span></div>
            <div className="visual-node node-two"><span className="node-icon">▦</span><span>DATA</span></div>
            <div className="visual-node node-three"><span className="node-icon">⌘</span><span>DIGITAL</span></div>
            <div className="visual-node node-four"><span className="node-icon">↗</span><span>SYSTEMS</span></div>
            <div className="visual-cross cross-one"></div><div className="visual-cross cross-two"></div>
          </div>
        </div>
        <div className="hero-bottom"><span>JAMSHEDPUR, INDIA</span><span>DESIGN · DIGITAL · DATA · AUTOMATION</span><span>EST. 2026</span></div>
      </section>

      <section className="intro section-shell">
        <div className="section-kicker">01 / WHAT WE DO</div>
        <div className="intro-content"><h2>Good technology should make work <em>feel simpler.</em></h2><div className="intro-aside"><p>Every business has tasks that take too long, information that gets lost and customer experiences that could be better. We help turn those everyday challenges into clear, usable solutions.</p><a className="text-link dark-link" href="#approach">How we work <span>→</span></a></div></div>
      </section>

      <section id="services" className="services-section section-shell">
        <div className="section-topline"><div><div className="section-kicker">02 / OUR CAPABILITIES</div><h2>What we can <em>help with.</em></h2></div><p>From a single digital asset to a connected business workflow, start with the problem you need to solve.</p></div>
        <div className="service-grid">{services.map((service) => (
          <article className="service-card" key={service.number}>
            <div className="service-card-top"><span>{service.number}</span><span className="service-arrow">↗</span></div>
            <h3>{service.title}</h3><p>{service.description}</p>
            <ul>{service.items.map((item) => <li key={item}><span>＋</span>{item}</li>)}</ul>
            <a href={`mailto:atelierog@gmail.com?subject=${encodeURIComponent("Enquiry - " + service.title)}`} className="card-link">Discuss this service <span>→</span></a>
          </article>
        ))}</div>
      </section>

      <section id="products" className="products-section section-shell">
        <div className="section-topline"><div><div className="section-kicker">03 / OUR PRODUCTS</div><h2>Tools we’re <em>building.</em></h2></div><p>We are developing focused software products for specific business needs. Product availability will be announced as each product is ready.</p></div>
        <div className="product-list">{products.map((product) => (
          <article className="product-row" key={product.number}>
            <div className={`product-art ${product.tone}`}><div className="product-art-grid"></div><span>{product.mark}</span><i></i></div>
            <div className="product-info"><div className="product-meta"><span>{product.number} / {product.category}</span><span className="product-status"><i></i>{product.status}</span></div><h3>{product.name}</h3><p>{product.description}</p></div>
            <a className="product-enquire" href={`mailto:atelierog@gmail.com?subject=${encodeURIComponent("Product enquiry - " + product.name)}`} aria-label={`Enquire about ${product.name}`}>↗</a>
          </article>
        ))}</div>
      </section>

      <section id="approach" className="approach-section section-shell">
        <div className="approach-heading"><div className="section-kicker">04 / OUR APPROACH</div><h2>Clarity before<br /><em>complexity.</em></h2><p>We believe the best solution is not the one with the most features. It is the one that solves the right problem and fits the way people work.</p></div>
        <div className="principle-list">{principles.map((item) => <article className="principle" key={item[0]}><span>{item[0]}</span><div><h3>{item[1]}</h3><p>{item[2]}</p></div><b>↗</b></article>)}</div>
      </section>

      <section id="about" className="about-section section-shell">
        <div className="section-kicker">05 / ABOUT ATELIER OG</div>
        <div className="about-content"><div><h2>A small studio mindset.<br /><em>A systems-level view.</em></h2></div><div className="about-copy"><p>Atelier OG is an independent technology studio founded in 2026. We bring together design, data, digital tools and business automation to help organisations work with greater clarity.</p><p>We are building a growing portfolio of practical services and focused software products. Our starting point is always the same: understand the people, understand the process, then build what is genuinely useful.</p><div className="founder-line"><span className="founder-avatar">RK</span><div><strong>Rahul Kumar</strong><small>Founder, Atelier OG</small></div></div></div></div>
      </section>

      <section id="contact" className="contact-section section-shell">
        <div className="contact-orb" aria-hidden="true"></div>
        <div className="section-kicker">06 / START A CONVERSATION</div>
        <div className="contact-content"><div><h2>Have a business<br />challenge? <em>Let’s talk.</em></h2><p>Tell us what you’re trying to improve. We’ll help you explore a practical next step.</p></div><a className="contact-button" href="mailto:atelierog@gmail.com?subject=Business%20Enquiry%20-%20Atelier%20OG"><span>atelierog@gmail.com</span><b>↗</b></a></div>
      </section>

      <footer className="site-footer"><div className="footer-main"><a className="wordmark footer-wordmark" href="#top"><span>ATELIER</span><b>OG</b><i>®</i></a><p>Technology that moves<br />business forward.</p><div className="footer-links"><a href="#services">Services</a><a href="#products">Products</a><a href="#about">About</a><a href="mailto:atelierog@gmail.com">Contact</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Atelier OG. All rights reserved.</span><span>Jamshedpur, Jharkhand, India</span><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}

export type BlogArticle = {
  slug: string;
  date: string;
  title: string;
  outlet: string;
  image: string;
  caption: string;
  excerpt: string;
  content: string;
  tag: string;
  readTime: string;
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "can-we-survive-without-the-cloud",
    date: "2024-06-20",
    title: "Digital Degrowth: Can we survive without the Cloud?",
    outlet: "The Guardian",
    image: "/assets/articles/cloud-degrowth.svg",
    caption: "A geometric abstraction of the cloud dissolving into grounded infrastructure.",
    excerpt:
      "A lead feature designed for the top of the grid: big headline, atmospheric artwork, and enough space for a sharp thesis before the reader enters the archive.",
    content: `
      <p>The digital cloud is often presented as a weightless, ethereal entity—a borderless expanse where our data floats freely. But in reality, the cloud is a massive, energy-intensive infrastructure that consumes vast amounts of water and electricity, while concentrating power in the hands of a few tech giants.</p>
      <p>Digital degrowth challenges the assumption that we need more "cloud" to progress. Instead, it asks: can we survive without the cloud? Or more accurately, can we thrive by reclaiming our digital sovereignty through localized, community-owned infrastructure?</p>
      <p>The current model of digital colonialism relies on extracting data from the global majority to feed the algorithms of the global minority. By dismantling these extractive systems and building tools that serve local needs, we can create a technology stack that is truly sustainable and democratic.</p>
      <p>This transition requires us to rethink our relationship with convenience and speed. It invites us to value resilience, privacy, and community over the endless expansion of big tech's reach.</p>
    `,
    tag: "Featured Essay",
    readTime: "8 min read",
  },
  {
    slug: "unmasking-digital-colonialism-lebanon",
    date: "2024-05-15",
    title: "Unmasking Digital Colonialism in Lebanon",
    outlet: "People's Tech",
    image: "/assets/articles/digital-colonialism.svg",
    caption:
      "Cedar tree abstraction standing resilient against imperial circuit grids.",
    excerpt:
      "A tall card for reportage and field dispatches, balancing image weight with an excerpt that still feels spacious on desktop.",
    content: `
      <p>In Lebanon, the digital landscape is a battleground for sovereignty. As the country grapples with economic collapse and political instability, big tech companies have stepped in to provide "solutions" that often deepen dependency rather than fostering independence.</p>
      <p>Digital colonialism manifests in the way infrastructure is built and controlled. Foreign corporations own the pipes and the platforms, dictating the terms of engagement for Lebanese citizens. This isn't just about software; it's about the control of information and the shaping of public discourse.</p>
      <p>However, grassroots movements are pushing back. From community-run mesh networks to open-source initiatives, people are reclaiming their digital space. These efforts are not just about technology; they are about political agency and the right to self-determination in the digital age.</p>
    `,
    tag: "Field Report",
    readTime: "6 min read",
  },
  {
    slug: "silicon-valley-bank-run-degrowth",
    date: "2024-04-02",
    title: "Why the Silicon Valley Bank Run matters for Degrowth",
    outlet: "Tech Empire",
    image: "/assets/articles/svb-degrowth.svg",
    caption:
      "A digital grid melting under the weight of financial instability.",
    excerpt:
      "A wider block for analysis pieces, where metadata, deck, and visual rhythm sit in a denser magazine-style composition.",
    content: `
      <p>The collapse of Silicon Valley Bank (SVB) sent shockwaves through the tech world, revealing the fragility of an ecosystem built on infinite growth and cheap capital. For the degrowth movement, this event is a clear signal that the current model is unsustainable.</p>
      <p>Tech startups, fueled by venture capital, are often pressured to scale at all costs, often at the expense of social and ecological responsibility. When the financial foundations of this system tremble, the entire structure is put at risk.</p>
      <p>Digital degrowth offers an alternative: a technology sector that isn't beholden to the whims of finance. By prioritizing stability, utility, and social good over exponential growth, we can build a tech ecosystem that is resilient to financial shocks and serves the needs of the many, not just the investors.</p>
    `,
    tag: "Analysis",
    readTime: "5 min read",
  },
  {
    slug: "community-owned-networks-sovereignty",
    date: "2024-03-18",
    title: "How community-owned networks reshape digital sovereignty",
    outlet: "People's Tech",
    image: "/assets/articles/community-networks.svg",
    caption: "A decentralized mesh of nodes forming a resilient local network.",
    excerpt:
      "Compact card styling for recurring essays, built to keep the archive browsable and scannable in a true grid view.",
    content: `
      <p>Community-owned networks are the vanguard of digital sovereignty. By taking control of the physical infrastructure of the internet—from fiber optics to wireless nodes—communities can ensure that their communication is private, affordable, and aligned with their values.</p>
      <p>These networks are more than just a technical alternative to big ISPs; they are a model for democratic governance. Decisions about the network are made by the people who use it, rather than by distant executives driven by profit.</p>
      <p>As we face increasing centralization and surveillance online, the importance of these local networks cannot be overstated. They provide the foundation for a decentralized web where power is distributed and sovereignty is reclaimed.</p>
    `,
    tag: "Infrastructure",
    readTime: "4 min read",
  },
  {
    slug: "politics-of-bandwidth-scarcity",
    date: "2024-02-10",
    title: "The politics of bandwidth scarcity and planned digital restraint",
    outlet: "The Guardian",
    image: "/assets/articles/bandwidth-scarcity.svg",
    caption: "A data flood being distilled into its most meaningful essence.",
    excerpt:
      "Short cards hold topical arguments and keep the visual cadence moving between larger anchor stories.",
    content: `
      <p>We live in an era of "infinite" bandwidth, but this abundance is an illusion that comes with a heavy ecological cost. The politics of bandwidth scarcity suggests that we should treat digital resources as finite, much like water or clean air.</p>
      <p>Planned digital restraint is not about austerity; it's about intentionality. It's about choosing quality over quantity and recognizing that not every piece of data needs to be streamed in 4K or stored forever in the cloud.</p>
      <p>By adopting a mindset of digital degrowth, we can reduce our environmental footprint and reclaim our attention from the constant barrage of high-bandwidth distractions. This is a political choice that prioritizes the health of our planet and our minds.</p>
    `,
    tag: "Opinion",
    readTime: "3 min read",
  },
  {
    slug: "designing-media-systems-beyond-dependency",
    date: "2024-01-27",
    title: "Designing media systems beyond platform dependency",
    outlet: "Tech Empire",
    image: "/assets/articles/platform-dependency.svg",
    caption: "Breaking the strings of dependency on monolithic platforms.",
    excerpt:
      "This slot is ideal for interviews, essays, or book excerpts that need a measured amount of context without taking over the full page.",
    content: `
      <p>The current media landscape is dominated by a few platforms that control how information is discovered and consumed. This platform dependency is a threat to editorial independence and democratic discourse.</p>
      <p>Designing media systems beyond this dependency requires a fundamental shift in how we think about digital distribution. We need protocols, not just platforms. We need systems that are interoperable, decentralized, and owned by the public or non-profit entities.</p>
      <p>By building media infrastructure that isn't controlled by algorithmic profit-seeking, we can create a space for journalism and culture that is truly diverse and resilient. This is the path toward a media ecosystem that serves the public interest.</p>
    `,
    tag: "Interview",
    readTime: "7 min read",
  },
];

export const latestArticles = blogArticles.slice(0, 3);

export const formatArticleDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export interface PageContent {
  kicker: string;
  title: string;
  body: string;
  page: string;
  header: string;
}

export interface Spread {
  chapter: string;
  left: PageContent;
  right: PageContent;
}

export const spreads: Spread[] = [
  {
    chapter: "Praise",
    left: {
      kicker: "",
      title: "",
      body: "\"Digital Degrowth addresses new challenges emerging from the digitalisation of every sector of our lives, impacting our sovereignty and democracy. A vital book for anyone concerned about justice and equality, and about the limitless extraction of the Earth's resources to support the technologies of limitless greed and limitless growth.\"\n\n— <em><strong>Vandana Shiva</strong></em>, environmental activist",
      page: "i",
      header: "praise",
    },
    right: {
      kicker: "",
      title: "",
      body: "\"This book is a must-read for anyone who wants to know the brutal truth of digital colonialism driven by the American Empire. Don't get deceived by the American tech 'left' who is actually funded by billionaries. The true left vision of the future is digital degrowth.\"\n\n— <em><strong>Kohei Saito</strong></em>, author of Slow Down: The Degrowth Manifesto",
      page: "ii",
      header: "digital degrowth",
    },
  },
  {
    chapter: "Praise",
    left: {
      kicker: "",
      title: "",
      body: "\"Digital Degrowth pulls back the curtain to reveal the starkly naked machinery of imperial wizards and corporations that lack care and compassion. Our collective battles for 'ecosocialist degrowth' will reflect war resistance that protects our contaminated lives and challenges corporate extraction preying upon biological, mineral, and spiritual life. This text is a must-read manual for upgrading your security zones.\"\n\n— <em><strong>Joy James</strong></em>, author of New Bones Abolition and editor of Beyond Cop Cities",
      page: "iii",
      header: "praise",
    },
    right: {
      kicker: "",
      title: "",
      body: "\"Synthetic and encyclopedic, Michael Kwet surveys the landscape of US monopoly power in the global technology sector, traces the capillaries containing the capital and cobalt flowing from core to periphery, periphery to core, required to fuel that power and the way of life it accompanies, and delivers a map to ending it. A must-read.\"\n\n— <em><strong>Max Ajl</strong></em>, author of A People's Green New Deal",
      page: "iv",
      header: "digital degrowth",
    },
  },
  {
    chapter: "Praise",
    left: {
      kicker: "",
      title: "",
      body: "\"As resistance movements around the world evolve, the question of 'resistance against what and who' has gained renewed importance. Digital Degrowth forces us to look at America's tech empire critically to inform a new wave of resistance led by today's youth. Kwet explains the problems clearly and provides solutions that directly impact the climate change debate. It's a must-read and call to action for activists and activist communities in all sectors of society.\"\n\n— <em><strong>Itumeleng Moabi</strong></em>, Fees Must Fall activist and resistance movement archivist",
      page: "v",
      header: "praise",
    },
    right: {
      kicker: "",
      title: "",
      body: "\"All too often scholarship identifies crises without offering resolutions. In Digital Degrowth, Kwet provides compelling solutions for organized transformation essential for a just and sustainable digital economy. A masterful scholarly contribution on the digital economy and the ecological collapse that humanity confronts in the years to come.\"\n\n— <em><strong>Immanuel Ness</strong></em>, Professor of Political Science, City University of New York",
      page: "vi",
      header: "digital degrowth",
    },
  },
  {
    chapter: "Praise",
    left: {
      kicker: "",
      title: "",
      body: "\"Lucidly written and easy to read, Kwet provides the most important big picture analysis of the digital society to date. Given the challenges we have facing us, we need to shift our understanding of and relationship to digital technologies away from docile consumerism towards empowering people to take an active role in its development and use. Essential reading for the general public and activists alike.\"\n\n— <em><strong>Joshua Dávila</strong></em>, author of Blockchain Radicals: How Capitalism Ruined Crypto and How to Fix It",
      page: "vii",
      header: "praise",
    },
    right: {
      kicker: "",
      title: "",
      body: "\"Kwet's critically important book forces us to confront the morbid symptoms characterising our contemporary conjuncture by outlining the stupidity of accelerating towards extinction unless we smarten up and confront the technophilic elite and reclaim science and technology for the people.\"\n\n— <em><strong>Rasigan Maharajh</strong></em>, Institute for Economic Research on Innovation, Tshwane University of Technology",
      page: "viii",
      header: "digital degrowth",
    },
  },
  {
    chapter: "Praise",
    left: {
      kicker: "",
      title: "",
      body: "\"Digital Degrowth takes an in-depth look at the unsustainable and unethical practice of digital colonialism perpetuated by Big Tech and the Western economies on the Global South. Through meticulous research, Kwet tackles an important, and hitherto ignored, topic, namely the role of Big Tech in climate change.\"\n\n— <em><strong>Ramesh Subramanian</strong></em>, Gabriel Ferrucci Professor of Business Analytics and Information Systems, Quinnipiac University",
      page: "ix",
      header: "praise",
    },
    right: {
      kicker: "By Michael Kwet",
      title: "A Groundbreaking Exploration",
      body: "A groundbreaking exploration of how technology has become a tool of control and extraction. This essential text examines the systems of digital surveillance, data harvesting, and technological dependence that shape modern society, offering critical insights into how we can resist and reimagine our relationship with technology.",
      page: "x",
      header: "digital degrowth",
    },
  },
  {
    chapter: "Book Info",
    left: {
      kicker: "",
      title: "Digital Degrowth",
      body: "Technology in the Age of Survival",
      page: "x",
      header: "digital degrowth",
    },
    right: {
      kicker: "Table of Contents",
      title: "Chapter Guide",
      body: "1. Digital Colonialism  14\n2. What is Degrowth?  43\n3. Digital Degrowth  63\n4. Cloud Colonialism  94\n5. Digital Ecocide  119\n6. The Big Tech Military Machine  151\n7. Surveil and Punish  169\n8. People's Tech and Digital Tech Deal  199\n9. Taking Action  223",
      page: "xi",
      header: "contents",
    },
  },
  {
    chapter: "Contents",
    left: {
      kicker: "Front Matter",
      title: "Acknowledgments",
      body: "Michael Kwet thanks his parents Linda Basel Kwet and Fred Kwet for their support, as well as friends and colleagues who helped shape this work. Special gratitude goes to Agnes Oberauer for reviewing the manuscript and the Centre for Social Change at the University of Johannesburg for supporting this research. This book is a call to action for global justice and environmental survival.",
      page: "xi",
      header: "contents",
    },
    right: {
      kicker: "The Question",
      title: "Are we going to be smart, or stupid?",
      body: "We are overheating the planet by 1.2ºC above the pre-industrial level. Global heating produces more numerous and intense extreme weather events—hurricanes, monsoons, floods, wildfires, and droughts. If we keep pushing temperatures up, we will trigger irreversible tipping points that cascade out of control. In addition to overheating the planet, we are destroying the biodiversity and habitats that sustain the web of life.",
      page: "xii",
      header: "introduction",
    },
  },
  {
    chapter: "Introduction",
    left: {
      kicker: "The Crisis",
      title: "The Sixth Mass Extinction",
      body: "Humans are killing off species at approximately 1,000 times the typical background rate in evolutionary history. We are overfarming the soils, clearing tropical rain forests for livestock grazing, and ruining the oceans by polluting them with plastics while depleting fish stocks. Environmental scientists call this the Sixth Mass Extinction. The question becomes: are we going to be smart, or are we going to be stupid?",
      page: "xiii",
      header: "introduction",
    },
    right: {
      kicker: "The Problem",
      title: "Extinction by technology",
      body: "Technology accelerates our collective demise. Digital technologies are one part of the problem. They are used to automate factories for just-in-time manufacturing, automated industrial agriculture, 24/7 surveillance, and control systems. They run the weapons systems of the military-industrial complex. Digital tech integrates with fossil fuels and extractive industries to fuel global capitalism. It speeds up consumption, the overexploitation of labor, and environmental destruction.",
      page: "xiv",
      header: "introduction",
    },
  },
  {
    chapter: "Introduction",
    left: {
      kicker: "The Root Cause",
      title: "Unlimited growth and consumption",
      body: "Capitalism requires unlimited growth and unlimited consumption. It demands extraction of natural resources, labor exploitation, and control systems. Capitalists prioritize accumulating wealth over all else—human welfare, peace, and ecological survival. The result is runaway extraction, production, waste, and environmental destruction. At this rate of consumption, we would need 1.7 Earths to sustain our lifestyle. We only have one.",
      page: "xv",
      header: "introduction",
    },
    right: {
      kicker: "The Contradiction",
      title: "Technology on a dying planet",
      body: "Technologists imagine innovation will save humanity. They fantasize about space travel and leaving Earth behind. But we can't escape. Technology won't save us unless we challenge the systems driving extraction and destruction. Technology itself isn't the problem—capitalist systems of control through technology are. We must build democratic alternatives. We must demand global justice and environmental survival.",
      page: "xvi",
      header: "digital degrowth",
    },
  },
  {
    chapter: "Introduction",
    left: {
      kicker: "The Vision",
      title: "Digital degrowth",
      body: "Digital degrowth is a vision where the most powerful technology corporations are dismantled, where surveillance systems are eliminated, where artificial intelligence is banned, where semiconductors are reserved for essential needs, where renewable energy powers a smaller digital infrastructure, where data is decentralized, where digital systems are accountable to democratic communities, and where digital technology serves humanity and the planet instead of the reverse.",
      page: "xvii",
      header: "digital degrowth",
    },
    right: {
      kicker: "The Demand",
      title: "A digital New Deal",
      body: "Digital degrowth requires a Digital New Deal. This means establishing a new digital infrastructure owned and controlled by democratic communities and international cooperation. It means democratizing and degenerating the global digital economy. It means refusing to participate in the digital economy of surveillance and data extraction. It means building alternatives.",
      page: "xviii",
      header: "digital degrowth",
    },
  },
  {
    chapter: "Introduction",
    left: {
      kicker: "The Book",
      title: "A framework for understanding",
      body: "This book provides the intellectual and practical framework for understanding digital degrowth. It connects digital technology to American Empire, global inequality, surveillance, data extraction, environmental destruction, and resistance movements. It tackles the fake solutions offered by the American tech 'left' and presents a real pathway forward grounded in global justice and environmental survival.",
      page: "xix",
      header: "introduction",
    },
    right: {
      kicker: "Key Topics",
      title: "Nine chapters ahead",
      body: "The book explores nine key topics: Digital Colonialism, Degrowth, Digital Degrowth, Cloud Colonialism, Digital Ecocide, The Big Tech Military Machine, Surveillance Systems, People's Tech, and Practical Actions. Each chapter builds on previous insights to create a comprehensive understanding of how technology is used as a tool of control and how we can resist.",
      page: "xx",
      header: "introduction",
    },
  },
  {
    chapter: "Chapter 1",
    left: {
      kicker: "American Dominance",
      title: "Digital Colonialism",
      body: "Digital colonialism is the domination and control of developing countries and their peoples by the United States through digital technology corporations and data extraction systems. It mirrors historical colonialism where industrialized nations extracted raw materials and enslaved peoples. Today, the US extracts data, wealth, and labor from the Global South through digital technology.",
      page: "1",
      header: "digital degrowth",
    },
    right: {
      kicker: "The Numbers",
      title: "American tech dominance",
      body: "Of the top 1,000 digital technology corporations, the United States accounts for 55% of companies, 77% of market cap, and 59% of revenue. Through digital colonialism, Americans have taken control of the global digital society. US corporations dominate social media, search engines, semiconductors, cloud computing, and operating systems. Anyone challenging the American Empire faces economic sanctions and armed intervention.",
      page: "2",
      header: "digital degrowth",
    },
  },
  {
    chapter: "Introduction",
    left: {
      kicker: "Environmental Impact",
      title: "Digital ecocide",
      body: "The digital economy is contributing mightily to environmental breakdown. The Information and Communications Technology sector emits 2–5% of global carbon emissions. Its physical infrastructure requires mining operations that destroy local habitats and poison environments. Tech giants like Microsoft and Amazon are digitalizing industrial agriculture, while e-waste from rich countries is dumped on the global poor.",
      page: "3",
      header: "introduction",
    },
    right: {
      kicker: "Reckoning Required",
      title: "The US as existential threat",
      body: "Instead of helping the Global South, the US plunders it to sustain its global power and benefit from cheap labor and raw materials. It maintains 750+ foreign military bases and extracts record amounts of fossil fuels. The United States is the greatest threat to life in human history. If we're going to survive, the people of the world must demand global equality.",
      page: "4",
      header: "digital degrowth",
    },
  },
  {
    chapter: "Introduction",
    left: {
      kicker: "The Big Picture",
      title: "A wide-lens analysis",
      body: "This book brings together aspects of society often studied in silos—software development, degrowth, industrial agriculture, cloud computing, artificial intelligence, semiconductors, American Empire, resistance movements, social media, military, and race relations. It offers a big-picture analysis of the digital age in the context of the environmental crisis. Written for the global public—not specialists—every topic is explained from scratch.",
      page: "5",
      header: "introduction",
    },
    right: {
      kicker: "Missing Framework",
      title: "Digital degrowth as paradigm",
      body: "The framework presented in this book is missing from digital politics because it is dominated by a US-centered tech 'left' that erases the American Empire, digital colonialism, and degrowth. Instead, this American School focuses on surveillance capitalism, antitrust reforms, and algorithmic bias. It makes no sense to think about digital tech without framing it around degrowth and digital colonialism.",
      page: "6",
      header: "digital degrowth",
    },
  },
];

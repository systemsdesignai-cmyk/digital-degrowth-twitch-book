import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  twitterHandle?: string;
  publishedDate?: string;
}

export const SEO = ({
  title = "Digital Degrowth - Michael Kwet",
  description = "A manifesto for dismantling digital colonialism and building a technology stack that serves the people, not the empire.",
  image = "/assets/book_logo.png",
  url = "https://digitaldegrowth.com", // Fallback URL
  type = "website",
  twitterHandle = "@michaelkwet",
  publishedDate,
}: SEOProps) => {
  const siteTitle = title.includes("Digital Degrowth")
    ? title
    : title.includes("Home")
      ? "Digital Degrowth"
      : `${title} | Digital Degrowth`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Best Practices */}
      <link rel="canonical" href={url} />
      {publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}

      {/* llm.txt link */}
      <link rel="help" href="/llm.txt" title="AI Search Engine Context" />
    </Helmet>
  );
};

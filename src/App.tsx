import {
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { BlogPage } from "@/pages/BlogPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { ContactPage } from "@/pages/ContactPage";
import { StudioPage } from "@/pages/StudioPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Layout } from "@/components/common/Layout";

const BLOG_ARCHIVE_BATCH_SIZE = 2;

const App = () => {
  const [searchParams] = useSearchParams();

  const blogPage = Math.max(
    0,
    (Number(searchParams.get("page") ?? "1") || 1) - 1,
  );

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/blog"
          element={
            <BlogPage
              currentPage={blogPage}
              pageSize={BLOG_ARCHIVE_BATCH_SIZE}
            />
          }
        />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/studio/*" element={<StudioPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;

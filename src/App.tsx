import {
  Routes,
  Route,
} from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { BlogPage } from "@/pages/BlogPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { ContactPage } from "@/pages/ContactPage";
import { StudioPage } from "@/pages/StudioPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Layout } from "@/components/common/Layout";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/studio/*" element={<StudioPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;

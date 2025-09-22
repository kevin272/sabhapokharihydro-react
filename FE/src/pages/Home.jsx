import Header from "../components/common/Header";
import Banner from "../components/Banner";
import Services from "../components/Services";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/common/Footer";
import LatestProject from "../components/LatestProject";
import ProjectUpdates from "../components/ProjectUpdates";
import LatestBlogSection from "../components/LatestBlog";

export default function Home() {
  return (
    <>
      <Banner />
      <Services />
      <About />
      <WhyChooseUs />
      <LatestProject/>
      <ProjectUpdates/>
      <LatestBlogSection/>
    </>
  );
}

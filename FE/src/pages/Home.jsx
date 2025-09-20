import Header from "../components/common/Header";
import Banner from "../components/Banner";
import Services from "../components/Services";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <>
      <Banner />
      <Services />
      <About />
      <WhyChooseUs />
    </>
  );
}

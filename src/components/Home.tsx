import BlogPreview from "./BlogPreview";
import Epicycle from "./Epicycle/Epicycle";
import ScrollDownIndicator from "./ScrollDownIndicator";

import "../styles/Home.scss";

function Home() {
  return (
    <section className="home">
      <div className="hero">
        <Epicycle />
        <div className="hero__info">
          <h1>
            "Standing on the
            <br />
            shoulders of giants"
          </h1>
        </div>
      </div>

      <div className="blog__dashboard">
        <h1> Recent Blogs</h1>
        <div className="blog__preview-container">
          <BlogPreview filename="an_overkill_solution_to_a_complicated_sum" />
          <BlogPreview filename="feynman's_integration_technique" />
          <BlogPreview filename="technologies_i_used_to_make_this_website" />
          <BlogPreview filename="coping_with_regrets" />
          <BlogPreview filename="the_quest_for_meaning" />
        </div>
      </div>

      <ScrollDownIndicator />
    </section>
  );
}

export default Home;

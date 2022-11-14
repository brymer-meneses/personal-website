import BlogPreview from "./BlogPreview";
import Epicycle from "./Epicycle/Epicycle";

import "../styles/Home.scss"

function Home() {
  return (
    <section className="home">

      <div className="hero">
        <Epicycle/>
        <div className="hero__info">
          <h1> Hi there! </h1>
          <h1> 
            Welcome to my blog, <br/>
            enjoy reading!
          </h1>
        </div>
      </div>

      <div className="blog__dashboard">
        <h1> Recent Blogs</h1>
        <hr/>
        <div className="blog__preview-container">
          <BlogPreview filename="the_quest_for_meaning"/>
          <BlogPreview filename="an_overkill_solution_to_a_complicated_sum"/>
        </div>

      </div>

    </section>
  )
  
}

export default Home;

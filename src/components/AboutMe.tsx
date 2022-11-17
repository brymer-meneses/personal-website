import "../styles/AboutMe.scss";

function AboutMe() {
  const GithubLink = "https://github.com/brymer-meneses";

  return (
    <div className="about-me">
      <div className="about-me__description">
        <h1>Hi, I'm Brymer Meneses</h1>
        <p>
          I’m an aspiring Software Engineer with passion for Machine Learning
          and Blockchain Technologies. I’m currently a sophmore student at
          University of the Philippines Baguio.
        </p>
      </div>

      <div className="about-me__experience">
        <div className="about-me__experience__programming-languages">
          <h2>Programming Languages</h2>
          <ul>
            <li> Rust </li>
            <li> C / C++ </li>
            <li> Python </li>
            <li> Java </li>
            <li> Javascript / Typescript </li>
            <li> Lua </li>
            <li> Dart </li>
            <li> Solidity </li>
          </ul>
        </div>

        <div className="about-me__experience__technologies">
          <h2>Technologies</h2>
          <ul>
            <li> Linux </li>
            <li> PyTorch </li>
            <li> TensorFlow </li>
            <li> React </li>
            <li> Vite </li>
            <li> NodeJS </li>
            <li> HTML / JS / CSS / SCSS </li>
          </ul>
        </div>
      </div>

      <div className="about-me__notable-projects">
        <h2>Notable Projects</h2>
        <ul>
          <li>
            <a href={GithubLink + "/Lox"}>Lox</a> - an attempt to learn how to
            create a programming language from scratch.
          </li>
          <li>
            <a href={GithubLink + "/PolyLang"}>PolyLang</a> - A work in progress
            compiler using LLVM
          </li>
          <li>
            <a href={GithubLink + "/Synapse"}>Synapse</a> - A Deep Learning
            Library written from scratch.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutMe;

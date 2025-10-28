import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="blurry-prev">
          <img src="/img-1.jpg" alt="" />
          <div className="overlay"></div>
        </div>

        <div className="col site-info">
          <nav>
            <a href="">Home</a>
            <a href="">Work</a>
            <a href="">Contact</a>
          </nav>
          <div className="header">
            <h1>Daksh Singh</h1>
          </div>

          <div className="copy">
            <p>
              I am a freelance creative director delivering innovative design
              solutions for businesses around the globe.
            </p>
          </div>
        </div>
        <div className="col project-preview">
          <div className="project-details">
            <div className="title">
              <h1>Beyond the Summit</h1>
            </div>
            <div className="info">
              <p>
                Join a team of elite mountaineers as they attempt to conquer K2
                in winter, a feat never before accomplished. This breathtaking
                documentary captures the raw beauty of the Karokam and the
                indomitable human spirit.
              </p>
            </div>
            <div className="credits">
              <p>Credits</p>
            </div>
            <div className="director">
              <p>Director: Alex Hornomi</p>
            </div>
            <div className="cinematographer">
              <p>Cinematographer: Jimmy Chen</p>
            </div>
          </div>

          <div className="project-img">
            <img src="/img-1.jpg" alt="" />
          </div>
        </div>

        <div className="gallery-wrapper">
          <div className="gallery"></div>
        </div>
      </div>
    </>
  );
}

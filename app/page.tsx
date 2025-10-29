"use client";
import { galleryItems } from "./constants/data";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);
export default function Home() {
  useGSAP(() => {
    const gallery = document.querySelector(".gallery");
    const blurryPrev = document.querySelector(".blurry-prev");
    const projectPreview = document.querySelector(".project-preview");
    const itemCount = galleryItems.length;

    let activeItemIndex = 0;
    let isAnimating = false;

    function createSplitText(element: gsap.DOMTarget) {
      const splitText = new SplitText(element, { type: "lines" });
    
      splitText.lines.forEach((line) => {
        const lineDiv = document.createElement("div");
        lineDiv.className = "line";
        
        const parent = line.parentElement;
        if (!parent) return;
        
        lineDiv.appendChild(line);
        parent.appendChild(lineDiv);
      });
    }

    const initialInfoText = document.querySelector(".info p");
    if (initialInfoText) {
      createSplitText(initialInfoText);
    }

    const elementsToAnimate = document.querySelectorAll(
      ".title h1, .info p, .line span, .credits p, .director p, .cinematographer p"
    );
    gsap.set(elementsToAnimate, {
      y: 0,
    });

    for(let i = 0; i < itemCount; i++){
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item"); // Add the 'item' class
      
      if(i === 0) itemDiv.classList.add("active");
      
      // Create a NEW img element for each item
      const img = document.createElement("img");
      img.src = `/img-${i+1}.jpg`;
      img.alt = galleryItems[i].title;
    
      itemDiv.appendChild(img);
      itemDiv.dataset.index = String(i);
      itemDiv.addEventListener("click", () => handleItemClick(i));
      gallery?.appendChild(itemDiv);
    }
  }, {});
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

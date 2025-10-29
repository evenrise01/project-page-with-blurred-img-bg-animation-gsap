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

    for (let i = 0; i < itemCount; i++) {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item"); // Add the 'item' class

      if (i === 0) itemDiv.classList.add("active");

      // Create a NEW img element for each item
      const img = document.createElement("img");
      img.src = `/img-${i + 1}.jpg`;
      img.alt = galleryItems[i].title;

      itemDiv.appendChild(img);
      itemDiv.dataset.index = String(i);
      itemDiv.addEventListener("click", () => handleItemClick(i));
      gallery?.appendChild(itemDiv);
    }

    function createElementWithClass(tag: string, className: string) {
      const element = document.createElement(tag);
      element.classList.add(className);
      return element;
    }

    function createProjectDetails(activeItem, index: number) {
      const newProjectDetails = createElementWithClass(
        "div",
        "project-details"
      );

      const detailsStructure = [
        { className: "title", tag: "h1", content: activeItem.title },
        { className: "info", tag: "p", content: activeItem.copy },
        { className: "credits", tag: "p", content: "Credits" },
        {
          className: "director",
          tag: "p",
          content: `Director: ${activeItem.director}`,
        },
        {
          className: "cinematographer",
          tag: "p",
          content: `Cinematographer: ${activeItem.cinematographer}`,
        },
      ];

      detailsStructure.forEach(({ className, tag, content }) => {
        const div = createElementWithClass("div", className);
        const element = document.createElement(tag);
        element.textContent = content;
        div.appendChild(element);
        newProjectDetails.appendChild(div);
      });

      const newProjectImg = createElementWithClass("div", "project-img");
      const newImg = document.createElement("img");
      newImg.src = `./img-${index + 1}.jpg`;
      newImg.alt = activeItem.title;
      newProjectImg.appendChild(newImg);

      return {
        newProjectDetails,
        newProjectImg,
        infoP: newProjectDetails.querySelector(".info p"),
      };
    }

    function handleItemClick(index: number) {
      if (index === activeItemIndex || isAnimating) return;

      isAnimating = true;

      const activeItem = galleryItems[index];

      if (!gallery) return;

      gallery.children[activeItemIndex].classList.remove("active");
      gallery.children[index].classList.add("active");
      activeItemIndex = index;

      const elementsToAnimate = document.querySelectorAll(
        ".title h1, .info p, .line span, .credits p, .director p, .cinematographer p"
      );

      const currentProjectImg = document.querySelector(".project-img");
      const currentProjectImgElement = currentProjectImg?.querySelector("img");

      const newBlurryImg = document.createElement("img");
      newBlurryImg.src = `./img-${index + 1}.jpg`;
      newBlurryImg.alt = activeItem.title;

      gsap.set(newBlurryImg, {
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      });
      blurryPrev?.insertBefore(newBlurryImg, blurryPrev.firstChild);

      //New image fade in, old image fade out
      const currentBlurryImg = blurryPrev?.querySelector("img:nth-child(2)");
      if (currentBlurryImg) {
        gsap.to(currentBlurryImg, {
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
          onComplete: () => {blurryPrev?.removeChild(currentBlurryImg)},
        });

        gsap.to(newBlurryImg, {
          delay: 0.5,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        });

        gsap.to(elementsToAnimate, {
          y: -60,
          duration: 1,
          ease: "power4.in",
          stagger: 0.05,
        });

        gsap.to(currentProjectImg, {
          onStart: () => {
            gsap.to(currentProjectImgElement!, {
              scale: 2,
              duration: 1,
              ease: "power4.in",
            });
          },
          scale: 0,
          bottom: "10em",
          duration: 1,
          ease: "power4.in",
          onComplete: () => {
            document.querySelector(".project-details")?.remove();

            const { newProjectDetails, newProjectImg, infoP } =
              createProjectDetails(activeItem, index);

            projectPreview?.appendChild(newProjectDetails);
            projectPreview?.appendChild(newProjectImg);

            createSplitText(infoP);

            const newElementsToAnimate = newProjectDetails.querySelectorAll(
              ".title h1, .info p, .line span, .credits p, .director p, .cinematographer p"
            );

            gsap.fromTo(
              newElementsToAnimate,
              { y: 40 },
              { y: 0, duration: 1, ease: "power4.out", stagger: 0.05 }
            );

            gsap.fromTo(
              newProjectImg,
              { scale: 0, bottom: "-10em" },
              { scale: 1, bottom: "1em", ease: "power4.out" }
            );

            gsap.fromTo(
              newProjectImg.querySelector("img"),
              { scale: 2 },
              {
                scale: 1,
                duration: 1,
                ease: "power4.out",
                onComplete: () => {
                  isAnimating = false;
                },
              }
            );
          },
        });
      }
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

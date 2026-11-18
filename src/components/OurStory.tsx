"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./our-story.css";

// Replace these draft details with your real memories and photographs.
// Example photo: "/images/our-first-photo.jpg" (saved under public/images).
const chapters: {
  id: string; label: string; title: string; accent: string;
  caption: string; body: string; photo: string | null; alt: string;
}[] = [
  {
    id: "first-hello", label: "THE FIRST HELLO", title: "Where it", accent: "all began.",
    caption: "a beginning worth keeping",
    body: "The story of how we met will live here, in our own words.",
    photo: null, alt: "Ken and Riza near the beginning of their relationship",
  },
  {
    id: "little-things", label: "THE LITTLE THINGS", title: "The moments", accent: "in between.",
    caption: "a little piece of our world",
    body: "A favorite memory together will become this chapter.",
    photo: null, alt: "A favorite memory shared by Ken and Riza",
  },
  {
    id: "next-chapter", label: "THE NEXT CHAPTER", title: "All roads", accent: "lead to us.",
    caption: "and all that comes after",
    body: "Our proposal story, or another moment we choose to share, will appear here.",
    photo: null, alt: "A meaningful moment in Ken and Riza's story",
  },
];

function saveDate() {
  const contents = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ken and Riza//Wedding//EN",
    "BEGIN:VEVENT", "UID:ken-riza-20300418@wedding-invite",
    "DTSTAMP:20261116T000000Z", "DTSTART;VALUE=DATE:20300418",
    "DTEND;VALUE=DATE:20300419", "SUMMARY:Ken & Riza Wedding",
    "LOCATION:Batangas", "DESCRIPTION:Church and ceremony time to follow.",
    "END:VEVENT", "END:VCALENDAR", "",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([contents], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "ken-and-riza-wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function OurStory() {
  const root = useRef<HTMLElement>(null);
  const [letterOpen, setLetterOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(".overture-words span", { opacity: 0.2 }, {
          opacity: 1, stagger: 0.12, ease: "none",
          scrollTrigger: { trigger: ".story-overture", start: "top 25%", end: "bottom 90%", scrub: 0.6 },
        });

        gsap.fromTo(".story-thread path", { strokeDashoffset: 1 }, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: ".story-chapters", start: "top 60%", end: "bottom 65%", scrub: 0.8 },
        });

        gsap.utils.toArray<HTMLElement>(".story-chapter").forEach((chapter, index) => {
          const photo = chapter.querySelector(".memory-photo");
          const copy = chapter.querySelector(".memory-copy");
          gsap.fromTo(photo, { y: 55, rotation: index % 2 ? 6 : -6 }, {
            y: -20, rotation: index % 2 ? -1 : 1, ease: "none",
            scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: 1 },
          });
          gsap.fromTo(copy, { y: 32, opacity: 0.15 }, {
            y: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: chapter, start: "top 80%", end: "top 30%", scrub: 0.7 },
          });
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={root} id="our-story" className="love-story" aria-label="Our story">
      <div className="story-overture">
        <div className="overture-sticky">
          <p className="eyebrow">BEFORE THE AISLE · BEFORE THE VOWS</p>
          <span className="story-star" aria-hidden="true">✧</span>
          <h2 className="overture-words">
            <span>Before </span><span>this </span><span>day, </span>
            <br /><span>there </span><span>was </span><em><span>a beginning.</span></em>
          </h2>
          <p className="story-handwriting">a few pages from our story</p>
          <nav className="chapter-links" aria-label="Story chapters">
            {chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`}>0{index + 1}<span>{chapter.label}</span></a>)}
          </nav>
        </div>
      </div>

      <div className="story-chapters">
        <svg className="story-thread" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 0 C5 160 95 220 50 340 S5 570 50 670 S95 860 50 1000" pathLength="1" />
        </svg>

        {chapters.map((chapter, index) => (
          <article key={chapter.id} id={chapter.id} className={`story-chapter chapter-${index + 1}`}>
            <figure className="memory-photo">
              <div className="photo-tape" aria-hidden="true" />
              <div className="photo-window">
                {chapter.photo ? (
                  <Image src={chapter.photo} alt={chapter.alt} fill sizes="(max-width: 760px) 85vw, 40vw" className="memory-image" />
                ) : (
                  <div className="photo-placeholder" aria-label="Draft placeholder for your photograph">
                    <svg className="botanical-sketch" viewBox="0 0 200 240" fill="none" aria-hidden="true">
                      <path d="M96 225 C108 170 72 110 112 30 M101 178 C50 175 45 139 46 130 C85 130 100 152 101 178 M97 140 C140 138 158 105 155 96 C120 99 101 117 97 140 M98 96 C67 91 58 64 63 52 C91 59 99 79 98 96 M108 53 C134 45 139 24 132 15 C111 25 108 38 108 53" />
                    </svg>
                    <span className="photo-monogram">K <i>&</i> R</span>
                    <span className="photo-pending">A PHOTOGRAPH TO COME</span>
                  </div>
                )}
              </div>
              <figcaption>{chapter.caption}<span>0{index + 1}</span></figcaption>
            </figure>

            <div className="memory-copy">
              <p className="eyebrow">0{index + 1} / {chapter.label}</p>
              <h3>{chapter.title}<br /><em>{chapter.accent}</em></h3>
              <span className="memory-rule" aria-hidden="true" />
              <p className="memory-body">{chapter.body}</p>
              {!chapter.photo && <span className="draft-label">A CHAPTER WAITING FOR OUR WORDS</span>}
            </div>
          </article>
        ))}
      </div>

      <section className="letter-section" aria-labelledby="letter-title">
        <p className="eyebrow">AND NOW, A NOTE FOR YOU</p>
        <h2 id="letter-title">The next page<br /><em>has room for you.</em></h2>
        <div className={`wedding-letter ${letterOpen ? "letter-open" : ""}`}>
          <div className="envelope-flap" aria-hidden="true" />
          <button className="wax-seal" aria-expanded={letterOpen} aria-controls="personal-letter" aria-label={letterOpen ? "Close our invitation note" : "Open our invitation note"} onClick={() => setLetterOpen(!letterOpen)}>K<span>&</span>R</button>
          <p className="envelope-instruction">{letterOpen ? "with love, always" : "a little note, just for you"}</p>
          <div id="personal-letter" className="letter-paper" hidden={!letterOpen}>
            <p className="story-handwriting">Dear you,</p>
            <p>With the people we love beside us, we begin our forever.</p>
            <p>We would love for you to be part of this day.</p>
            <p className="letter-signature">Ken & Riza</p>
            <span className="eyebrow">18 APRIL 2030 · BATANGAS</span>
          </div>
        </div>
        <button className="story-calendar" onClick={saveDate}>SAVE OUR DATE <span aria-hidden="true">↗</span></button>
        <p className="calendar-note">Adds an all-day reminder. Ceremony time to follow.</p>
      </section>
    </section>
  );
}

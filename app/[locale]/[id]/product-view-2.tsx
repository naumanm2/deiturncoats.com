"use client";

import React, { useEffect, useRef, useState } from "react";
import Pill from "@/app/components/pill";
import CTA from "@/app/components/cta";
import Arrow from "@/app/assets/svg/arrow.svg";
import Chevron from "@/app/assets/svg/chevron.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

import Placeholder from "@/public/jpg/placeholder.png";

type productPageOptions = {
  id: string;
  locale: "en" | "fi";
  headline: string;
  subtitle?: string;
  price: string;
  descriptionDeiIn?: string;
  deiInHeadline?: string;
  deiInSubtitle?: string;
  descriptionDeiOut?: string;
  deiOutHeadline?: string;
  deiOutSubtitle?: string;
  availableSizes?: string[];
  nonAvailableSizes?: string[];
  deiInImage1Src?: string;
  deiInImage2Src?: string;
  deiInImageAlt?: string;
  deiOutImage1Src?: string;
  deiOutImage2Src?: string;
  deiOutImageAlt?: string;
  url: string;
};

export default function ProductViewTwo({
  id,
  locale,
  headline,
  subtitle,
  price,
  deiInHeadline,
  deiInSubtitle,
  descriptionDeiIn,
  deiOutHeadline,
  deiOutSubtitle,
  descriptionDeiOut,
  availableSizes,
  nonAvailableSizes,
  deiInImage1Src,
  deiInImage2Src,
  deiInImageAlt,
  deiOutImage1Src,
  deiOutImage2Src,
  deiOutImageAlt,
  url,
}: productPageOptions) {
  const [deiIn, setDeiStatus] = useState(true);
  const [activePill, setActivePill] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: deiInImage1Src, alt: deiInImageAlt },
    { src: deiInImage2Src, alt: deiInImageAlt },
    { src: deiOutImage1Src, alt: deiOutImageAlt },
    { src: deiOutImage2Src, alt: deiOutImageAlt },
  ];

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // // Auto-play interval
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setStatus((prev) => (prev + 1) % length);
  //   }, time);
  //   return () => clearInterval(intervalId);
  // }, [length, time]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const delta = touchStartX.current - touchEndX.current;
      if (delta > 50)
        setCurrentImageIndex((prev) => (prev === 0 ? 4 - 1 : prev - 1));
      // swipe left
      else if (delta < -50)
        setCurrentImageIndex((prev) => (prev === 0 ? 4 - 1 : prev + 1)); // swipe right
    }
  };

  useEffect(() => {
    setDeiStatus(currentImageIndex < 2); // index 0 or 1 = deiIn, else deiOut
  }, [currentImageIndex]);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === 3 ? 0 : prev + 1));
  };

  const handleClick = (index: number) => {
    setMenuOpen(!menuOpen);
    if (index != activePill) {
      setActivePill(index);
    } else {
      setActivePill(-1);
    }
  };
  return (
    <div className="flex flex-col gap-4 lg:gap-8 lg:flex-row lg:items-center">
      {deiInImage1Src ? (
        <div
          className="flex-1 relative h-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative aspect-[8/9] w-full rounded-2xl overflow-hidden">
            {images.map((image, index) =>
              image?.src ? (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.alt || ""}
                  width={1080}
                  height={1350}
                  placeholder="blur"
                  blurDataURL={Placeholder.src}
                  sizes="(max-width:768px) 50vw, 100vw"
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover",
                    index === currentImageIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  )}
                />
              ) : null
            )}
          </div>

          {/* Arrows */}
          <div className="absolute bottom-1/2 z-20 translate-y-1/2 gap-2 p-2 w-full flex flex-row justify-between">
            <button
              onClick={handlePrev}
              className=" rounded-full hover:backdrop-blur-2xl rotate-180 transition-all ease-in-out duration-300 backdrop-blur-xl w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-slate-500 border active:backdrop-blur-lg"
              aria-label="Previous image"
            >
              <Arrow width={"24px"} fill={"#ffffff"} />
            </button>
            <button
              onClick={handleNext}
              className=" rounded-full hover:backdrop-blur-2xl transition-all ease-in-out duration-300 backdrop-blur-xl lg:w-16 w-12 h-12 lg:h-16 flex items-center justify-center border-slate-500 border active:backdrop-blur-lg"
              aria-label="Previous image"
            >
              {" "}
              <Arrow width={"24px"} fill={"#ffffff"} />
            </button>
          </div>
          {/* Index */}
          <div className="absolute bottom-0 left-0 z-20 w-full text-center text-white font-bold p-4 ">
            <div className="">
              <small>{currentImageIndex + 1}</small>
              <small>/</small>
              <small>4</small>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 aspect-[8/9] w-full rounded-2xl bg-[#88888a]"></div>
      )}
      <div className="flex-1 flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col gap-2 uppercase ">
          <small className="text-stone-700">{subtitle}</small>
          <h3>{headline}</h3>
        </div>
        <div className="flex flex-col gap-1">
          <small className="uppercase text-stone-700 rounded-full w-max">
            {deiIn ? deiInHeadline : deiOutHeadline}
          </small>
          <strong>{deiIn ? deiInSubtitle : deiOutSubtitle}</strong>
          <p className="mt-2">{deiIn ? descriptionDeiIn : descriptionDeiOut}</p>
        </div>

        <div className="[&_span]:text-[80%] [&_span]:font-bold pt-4">
          <div className="relative w-full bg-stone-100 backdrop-blur-2xl z-30 rounded-lg mb-2">
            <button
              className="w-full rounded-lg flex justify-between items-center p-3 border-background transition-background hover:bg-stone-200 duration-200 ease-in-out cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {activePill < 0 ? (
                <span className="opacity-70">Choose size</span>
              ) : (
                <div className="flex flex-row justify-between w-full">
                  <span className={cn("font-bold opacity-100")}>
                    {availableSizes![activePill]}
                  </span>
                  <div className="flex flex-row items-center gap-2 mr-4">
                    <div className="w-1 h-1 rounded-full bg-green-300"></div>
                    <span>Available</span>
                  </div>
                </div>
              )}
              <Chevron className={cn("opacity-30", menuOpen && "rotate-180")} />
            </button>
            <ul
              className={cn(
                "absolute top-13 left-0 hidden shadow-sm bg-stone-100 rounded-lg border-stone-200",
                menuOpen && "block rounded-lg w-full overflow-y-auto"
              )}
            >
              {availableSizes?.map((size, index) => (
                <li
                  key={index}
                  onClick={() => handleClick(index)}
                  className={cn(
                    "flex flex-row justify-between p-3 cursor-pointer transition-background hover:bg-stone-200 duration-100 ease-in-out",
                    activePill === index && "bg-stone-200"
                  )}
                >
                  <span className="font-normal">{size}</span>
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-green-300"></div>
                    <span>Available</span>
                  </div>
                </li>
              ))}
              {nonAvailableSizes?.map((size, index) => (
                <li
                  key={index}
                  onClick={() => handleClick(index)}
                  className={cn(
                    "flex flex-row justify-between p-3 text-stone-500"
                  )}
                >
                  <span>{size}</span>
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                    <span>Unavailable</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <Link
              className="w-full p-2 rounded-lg flex justify-between items-center px-3 py-3 bg-foreground transition-background hover:bg-[#232323] duration-200 ease-in-out cursor-pointer"
              href={url}
            >
              <span className="font-bold text-white">{"Buy now"}</span>
              <span className="text-white ">{price}</span>
            </Link>
          </div>
        </div>

        {/* {availableSizes && (
          <div className="flex flex-col gap-6 bg-stone-100 p-4 px-6 rounded-2xl mt-3">
            <div>
              <>
                <small className="text-stone-700">
                  {locale == "en" ? "Choose size:" : "Valitse koko:"}
                </small>
                <div className="flex flex-row flex-wrap -mx-2 gap-2 pt-2">
                  {availableSizes!.map((size, index) => (
                    <Pill
                      text={size}
                      key={index}
                      selected={activePill === index}
                      handleClick={() => handleClick(index)}
                    />
                  ))}
                  {nonAvailableSizes!.map((size, index) => (
                    <Pill text={size} key={index} disabled={true} />
                  ))}
                </div>
              </>
            </div>
            <div className="border-b border-slate-300"></div>
            <CTA
              primary
              text={activePill < 0 ? "Choose size" : "Buy now"}
              disabled={activePill < 0}
              url={url}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState } from "react";
import Pill from "@/app/components/pill";
import CTA from "@/app/components/cta";
import Arrow from "@/app/assets/svg/arrow.svg";
import Image from "next/image";

type productPageOptions = {
  id: string;
  locale: "en" | "fi";
  headline: string;
  subtitle: string;
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

export default function ProductView({
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
        setCurrentImageIndex((prev) =>
          prev === 0 ? 4 - 1 : prev - 1
        ); // swipe left
      else if (delta < -50)
        setCurrentImageIndex((prev) => (prev === 0 ? 4 - 1 : prev + 1)); // swipe right
    }
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 4 - 1 : prev - 1));
    console.log(currentImageIndex % 5);
    setDeiStatus(!deiIn);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === 4 - 1 ? 0 : prev + 1));
    console.log(currentImageIndex % 5);
    setDeiStatus(currentImageIndex + 1 > 2);
  };

  const handleClick = (index: number) => {
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
          {images[currentImageIndex]?.src ? (
            <Image
              className="aspect-[8/9] w-full rounded-2xl object-cover"
              src={images[currentImageIndex].src!}
              alt={images[currentImageIndex].alt || ""}
              width={1080}
              height={1350}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="aspect-[8/9] w-full rounded-2xl bg-zinc-300" />
          )}

          {/* Arrows */}
          <div className="absolute bottom-1/2 translate-y-1/2 gap-2 p-2 w-full flex flex-row justify-between">
            <button
              onClick={handlePrev}
              className=" rounded-full hover:backdrop-blur-2xl rotate-180 transition-all ease-in-out duration-300 backdrop-blur-xl w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border-slate-500 border"
              aria-label="Previous image"
            >
              <Arrow width={"24px"} fill={"#ffffff"} />
            </button>
            <button
              onClick={handleNext}
              className=" rounded-full hover:backdrop-blur-2xl transition-all ease-in-out duration-300 backdrop-blur-xl lg:w-16 w-12 h-12 lg:h-16 flex items-center justify-center border-slate-500 border"
              aria-label="Previous image"
            >
              {" "}
              <Arrow width={"24px"} fill={"#ffffff"} />
            </button>
          </div>
          {/* Index */}
          <div className="absolute bottom-0 left-0 w-full text-center text-white font-bold p-4 ">
            <div className="">
              <small>{currentImageIndex + 1}</small>
              <small>/</small>
              <small>4</small>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 aspect-[8/9] w-full rounded-2xl bg-zinc-300"></div>
      )}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <small className="uppercase text-stone-700">{subtitle}</small>
          <h3>{headline}</h3>
          <strong className="font-bold float-left">{price}</strong>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <small className="uppercase text-stone-700 px-2 py-1 rounded-full border border-stontext-stone-700 w-max -ml-1">
              {deiIn ? deiInHeadline : deiOutHeadline}
            </small>
            <strong>{deiIn ? deiInSubtitle : deiOutSubtitle}</strong>
          </div>
          <p className="mt-2">{deiIn ? descriptionDeiIn : descriptionDeiOut}</p>
        </div>
        {availableSizes && (
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
        )}
      </div>
    </div>
  );
}

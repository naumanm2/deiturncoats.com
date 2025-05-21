import LogoVert from "@/app/assets/svg/logo-round.svg";

export default function Home() {
  return (
    <div className="h-dvh w-full flex justify-center flex-col gap-0 items-center text-center bg-[#222222] text-white">
      <LogoVert className="h-64 md:h-96 text-white pb-24" />
      <h3
        className={`font-monumental pb-0 mb-0 leading-tight text-white`}
      >
        OPENING SOON
        <br />
        5.6.2025
      </h3>
    </div>
  );
}

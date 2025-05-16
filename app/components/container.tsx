export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="box-border max-w-screen-[1720px] p-4 md:p-8 w-full">
      <div className=" p-4 md:p-8 bg-white rounded-2xl md:rounded-4xl">
        {children}
      </div>
    </div>
  );
}

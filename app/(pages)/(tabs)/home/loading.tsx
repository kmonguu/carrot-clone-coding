export default function Loading() {
  return (
    <div className="flex flex-col p-5 gap-5 animate-pulse">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-5 ">
          <div className="size-28 bg-neutral-500" />
          <div className="flex flex-col gap-2 *:rounded-md">
            <div className=" bg-neutral-500 h-5 w-40" />
            <div className=" bg-neutral-500 h-5 w-20" />
            <div className=" bg-neutral-500 h-5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

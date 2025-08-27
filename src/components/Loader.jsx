import { HashLoader } from "react-spinners";

const Loader = ({ text }) => {
  return (
    <div className="flex items-center justify-center w-full h-[450px]">
      <div className="flex items-center justify-center flex-col gap-1">
        <HashLoader
          color="#2563eb"
          height={12}
          width={4}
          radius={2}
          margin={8}
        />
        <p className="text-slate-800 mt-3 ml-3">{text ? text : "Loading..."}</p>
      </div>
    </div>
  );
};

export default Loader;

import { useContext } from "react";
import PromptContext from "../../state/PromptContext";

const GptDetails = () => {
  const { promptData } = useContext(PromptContext);
  console.log(promptData);

  return (
    promptData && (
      <div>
        <div className="p-5">
          <div className="text-center">
            <h1 className="font-bold ">
              Region:{" "}
              {promptData?.region !== ""
                ? promptData?.region
                : promptData?.promptData}
            </h1>
          </div>
          <p className="font-bold pt-5 text-center">Itineraries</p>
          <div>
            {Object.entries(promptData?.itineraries).map(([city, details]) => (
              <div
                key={city}
                className=" bg-slate-200 to-90% shadow-xl rounded-xl flex flex-col  mx-auto justify-center items-center w-[75%] my-[2%] p-4"
              >
                <h2 className="italic">{city}</h2>
                <p className="ps-4 pt-2">{details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default GptDetails;

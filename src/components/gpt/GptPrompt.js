import React, { useRef } from "react";
import assistant from "../../assets/assistant.png";
import openai from "../../utils/openai";
import { useContext } from "react";
import PromptContext from "../../state/PromptContext";

const GptPrompt = () => {
  const { setPromptData } = useContext(PromptContext);
  const prompt = useRef(null);

  const handleGptSearch = async () => {
    console.log(prompt.current.value);

    // const gptQuery = `Please provide a detailed travel itinerary for ${prompt.current.value}, covering the major cities and attractions.
    //    Ensure the itinerary includes the following:  A starting point(preferably a major city or airport).
    //   A list of cities to visit in the state/region.
    //   A brief description of each city, including the estimated travel time from the previous city, major attractions to visit, and the recommended duration of stay.
    //   A return point (preferably back to the starting city or a major exit point).
    //   Make sure to provide the list of cities as an array for reference.
    //   Example: [State/Region Name: 'Gujarat']
    //   Cities to visit in Gujarat: ['Ahmedabad', 'Vadodara', 'Surat', 'Rajkot', ...]`;

    // const gptSuggestion = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });

    // console.log(gptSuggestion.choices[0].message.content);
    // const travelPlan = gptSuggestion.choices[0].message.content;

    const travelPlan = `[State/Region Name: 'North East India']

    Cities to visit in North East India: ['Guwahati', 'Shillong', 'Kaziranga National Park', 'Majuli Island', 'Tawang', 'Kohima', 'Imphal']

    Starting Point: Guwahati

    1. Guwahati:
       - Travel Time from previous city: N/A (starting point)
       - Major attractions:
         - Kamakhya Temple: A famous Hindu pilgrimage site dedicated to the goddess Kamakhya.
         - Umananda Temple: A small island temple dedicated to Lord Shiva.
         - Assam State Museum: Showcasing the cultural heritage and history of Assam.
         - Brahmaputra River Cruise: Enjoy a scenic cruise on the mighty Brahmaputra River.
       - Recommended duration of stay: 2-3 days

    2. Shillong:
       - Travel Time from Guwahati: 2-3 hours (100 km)
       - Major attractions:
         - Elephant Falls: A picturesque waterfall cascading down rocks surrounded by lush greenery.
         - Shillong Peak: Offers panoramic views of the city and the surrounding hills.
         - Don Bosco Museum: A museum showcasing the culture and heritage of North East India.
         - Ward's Lake: A beautiful lake with garden and boating facilities.
       - Recommended duration of stay: 2-3 days

    3. Kaziranga National Park:
       - Travel Time from Shillong: 5-6 hours (280 km)
       - Major attractions:
         - Jeep Safari: Explore the wildlife and spot the famous one-horned rhinoceros.
         - Elephant Safari: A unique way to observe the flora and fauna of the park.
         - Kaziranga Orchid and Biodiversity Park: Housing a wide variety of orchids and other plant species.
       - Recommended duration of stay: 2-3 days

    4. Majuli Island:
       - Travel Time from Kaziranga National Park: 3-4 hours (120 km)
       - Major attractions:
         - Satras: Vaishnavite monasteries providing insight into the Assamese religious and cultural practices.
         - Majuli Festival: If visiting during November, witness the vibrant cultural festival.
         - Majuli Island Hopping: Visit various villages and interact with the locals.
       - Recommended duration of stay: 2-3 days

    5. Tawang:
       - Travel Time from Majuli Island: Approx. 2 days (road and ferry)
       - Major attractions:
         - Tawang Monastery: The largest monastery in India and a revered Buddhist pilgrimage site.
         - Sela Pass: A high-altitude mountain pass offering stunning views of the surrounding landscapes.
         - Tawang War Memorial: Dedicated to the Indian Army soldiers who sacrificed their lives in the 1962 Indo-China war.
       - Recommended duration of stay: 3-4 days

    6. Kohima:
       - Travel Time from Tawang: 2-3 days (road and ferry)
       - Major attractions:
         - Kohima War Cemetery: Commemorating the soldiers who died during the World War II Battle of Kohima.
         - Kisama Heritage Village: Showcasing the rich Naga tribal culture through traditional houses and artifacts.
         - Dzükou Valley: Famous for its picturesque landscapes and seasonal flowers.
       - Recommended duration of stay: 2-3 days

    7. Imphal:
       - Travel Time from Kohima: 6-7 hours (350 km)
       - Major attractions:
         - Kangla Fort: An ancient fort and palace complex with historical significance.
         - Loktak Lake: The largest freshwater lake in Northeast India, known for its floating islands.
         - Shri Govindji Temple: A popular Hindu temple dedicated to Lord Krishna.
       - Recommended duration of stay: 2-3 days

    Return Point: Guwahati (convenient airport for departure)

    Note: The travel times mentioned are approximate and can vary depending on the mode of transportation and road conditions. It is advisable to plan and book accommodations in advance, especially during peak seasons.`;

    const result = {
      region: "",
      cities: [],
      itineraries: {},
    };

    // Extract region
    const regexRegion = /\[State\/Region Name: '([^']+)'\]/;
    const matchRegion = travelPlan.match(regexRegion);
    if (matchRegion) {
      result.region = matchRegion[1];
    }

    // Extract cities
    const regexCities = /Cities to visit in [^:]+: \[([^\]]+)\]/;
    const matchCities = travelPlan.match(regexCities);
    if (matchCities) {
      result.cities = matchCities[1]
        .split(",")
        .map((city) => city.trim().replace(/'/g, ""));
    }

    // Extract itineraries
    const regexItinerary = /\d+\.\s+([^:]+):([\s\S]+?)(?=\d+\.\s+[^:]+:|$)/g;
    let matchItinerary;
    while ((matchItinerary = regexItinerary.exec(travelPlan)) !== null) {
      const city = matchItinerary[1].trim();
      const itinerary = matchItinerary[2].trim();
      result.itineraries[city] = itinerary;
    }
    result.promptData = prompt.current.value;

    console.log(result);

    setPromptData(result);
  };
  return (
    <div className="bg-slate-200 to-90% shadow-xl rounded-xl flex  mx-auto justify-center items-center mt-[6%] w-[55%] px-4 py-4">
      <div className=" flex w-3/4 justify-center py-2">
        <img className="w-[40px]" src={assistant}></img>{" "}
        <input
          ref={prompt}
          type="text"
          required
          placeholder="Enter Your Prompt Here "
          className="border text-lack border-black rounded-lg  ms-4 px-3  w-3/4"
        />
      </div>

      <button
        className="border bg-blue-700 text-white w-[80px] rounded-lg px-3 py-2 "
        onClick={handleGptSearch}
      >
        Search
      </button>
    </div>
  );
};

export default GptPrompt;

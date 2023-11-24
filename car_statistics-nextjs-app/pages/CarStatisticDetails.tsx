import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CarStatistic } from "../src/app/models/CarStatistic";
import agent from "../src/app/api/agent";
import { NavigationButtons } from "@/app/NavigationButtons";
import "./../src/app/globals.css";
import Image from "next/image";

const CarStatisticDetails = () => {
  const router = useRouter();
  const { carStatisticId: oneCarStatisticId } = router.query; // Access the CarStatistic ID from the route parameter
  const [oneCarStatistic, setOneCarStatistic] = useState<CarStatistic | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (oneCarStatisticId) {
      agent.Catalog.details(Number(oneCarStatisticId))
        .then((data: CarStatistic) => {
          const idToFind = Number(oneCarStatisticId);
          const foundOneCarStatistic = data.id == idToFind;
          if (foundOneCarStatistic) {
            setOneCarStatistic(data);
          } else {
            console.error("No CarStatistic data found.");
          }
        })
        .catch((error) =>
          console.error("Error fetching CarStatistic data:", error)
        )
        .finally(() => {
          setLoading(false);
        });
    }
  }, [oneCarStatisticId]);

  return (
    <div data-testid="carStatisticDetails-1">
      <NavigationButtons />
      <div className="flex justify-center items-center min-h-screen">
        {loading ? (
          <p>Loading...</p>
        ) : oneCarStatistic ? (
          <div className="carStatistic-details">
            <h1 className="text-8xl">
              {oneCarStatistic.carRegistrationNumber}
            </h1>
            <Image
              src={`https://picsum.photos/id/${
                oneCarStatistic.id + 10
              }/400/300`}
              alt={oneCarStatistic.carRegistrationNumber}
              className="pt-5 w-30 object-cover mb-4 transition-transform transform hover:scale-105"
              width={400}
              height={300}
            />
            <p className="text-4xl">
              CarSpeedDate(dd/mm/yyyy):{" "}
              <b>
                {new Date(oneCarStatistic.carSpeedDate).toLocaleDateString(
                  "en-GB"
                )}
              </b>
            </p>
            <p className="text-4xl">
              CarSpeed: <b>{oneCarStatistic.carSpeed}</b>
            </p>
          </div>
        ) : (
          <p>No CarStatistic found.</p>
        )}
      </div>
    </div>
  );
};

export default CarStatisticDetails;

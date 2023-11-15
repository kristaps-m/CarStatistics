import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CarStatistic } from "../src/app/models/CarStatistic";
import agent from "../src/app/api/agent";
import { NavigationButtons } from "@/app/NavigationButtons";
import "./../src/app/globals.css";

const ProductDetails = () => {
  const router = useRouter();
  const { carStatisticId: oneCarStatisticId } = router.query; // Access the product ID from the route parameter
  const [oneCarStatistic, setProduct] = useState<CarStatistic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (oneCarStatisticId) {
      agent.Catalog.details(Number(oneCarStatisticId))
        .then((data: CarStatistic) => {
          const idToFind = Number(oneCarStatisticId);
          const foundOneCarStatistic = data.id == idToFind;
          if (foundOneCarStatistic) {
            setProduct(data);
          } else {
            console.error("No product data found.");
          }
        })
        .catch((error) => console.error("Error fetching product data:", error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [oneCarStatisticId]);

  return (
    <div data-testid="productDetails-1">
      <NavigationButtons />
      <div className="flex justify-center items-center min-h-screen">
        {loading ? (
          <p>Loading...</p>
        ) : oneCarStatistic ? (
          <div className="product-details">
            <h1 className="text-5xl">{oneCarStatistic.id}</h1>
            <img
              src={`https://picsum.photos/id/${
                oneCarStatistic.id + 10
              }/400/300`}
              alt={oneCarStatistic.carRegistrationNumber}
              className="w-full pt-5 w-30 object-cover mb-4 transition-transform transform hover:scale-105"
            />
            <h2>
              CarSpeedDate(dd/mm/yyyy):{" "}
              {new Date(oneCarStatistic.carSpeedDate).toLocaleDateString(
                "en-GB"
              )}
            </h2>
            <h2>CarSpeed: {oneCarStatistic.carSpeed}</h2>
            <h2>
              CarRegistrationNumber: {oneCarStatistic.carRegistrationNumber}
            </h2>
          </div>
        ) : (
          <p>No CarStatistic found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

import React from "react";

export default function HomePage() {
  return (
    <div data-testid="homePage-1">
      <h1 className="flex justify-center text-3xl font-bold mb-4">
        Welcome to Our Car Speed Statistics!
      </h1>
      <p className="flex justify-center text-lg text-center mb-8">
        Explore our wide range of high-quality features.
      </p>
      <br />
      <br />
      <div className="product p-4 bg-white rounded-lg shadow-lg max-w-[80%]">
        <br />
        <div className="product-details">
          <h3 className="text-xl font-semibold">
            Top Speed of the previous month:
          </h3>
          <br />
          <h3 className="text-lg font-semibold text-blue-600">134</h3>
          <br />
          <p className="text-sm max-w-[50%]">
            This top speed was achieved in 2020-08-05 and 2020-08-19.
          </p>
          <p className="text-sm max-w-[50%]">Remember to be safe on road!</p>
        </div>
      </div>
      <p className="flex justify-center p-5 px-10">
        DISCLAIMER: Images in routes: http://localhost:3000/car-statistics/id
        are just to represent possible picture size in a real application. Do
        not take what&apos;s displayed in picture seriously.
      </p>
    </div>
  );
}

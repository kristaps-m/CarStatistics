import React from "react";

export default function HomePage() {
  return (
    <div data-testid="homePage-1">
      <h1 className="flex justify-center text-3xl font-bold mb-4">
        Welcome to Our Product Shop
      </h1>
      <p className="flex justify-center text-lg text-center mb-8">
        Explore our wide range of high-quality products.
      </p>
      <br />
      <br />
      <div className="product p-4 bg-white rounded-lg shadow-lg max-w-[80%]">
        <img
          src="https://picsum.photos/id/292/500/500"
          alt="Product Image"
          className="product-image rounded-lg"
        />
        <div className="product-details">
          <h3 className="text-xl font-semibold">
            Top Product of the previous month:
          </h3>
          <br />
          <h3 className="text-lg font-semibold text-blue-600">Onion</h3>
          <br />
          <p className="text-sm max-w-[50%]">
            An onion also known as the bulb onion or common onion, is a
            vegetable that is the most widely cultivated species of the genus
            Allium.
          </p>
          <p className="text-sm max-w-[50%]">
            The shallot is a botanical variety of the onion which was classified
            as a separate species until 2011. Its close relatives include
            garlic, scallion, leek, and chive.
          </p>
          <p className="text-sm font-semibold text-green-600">Price: $8.99</p>
        </div>
      </div>
      <p className="flex justify-center p-5 px-10">
        DISCLAIMER: Images are just to represent possible picture size in a real
        application. Do not take what&apos;s displayed in pictures seriously.
      </p>
    </div>
  );
}

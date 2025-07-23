const Recommendations = () => {
  const recs = [
    {
      name: "Pasta Alfredo",
      img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Paneer Tikka",
      img: "https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Dragon Roll",
      img: "https://media.istockphoto.com/id/1024561260/photo/indian-veg-chapati-wrap-kathi-roll-served-in-a-plate-with-sauce-over-moody-background.jpg?s=1024x1024&w=is&k=20&c=4Ztns9fH6RqEzixUlvw2zZ7Dt7sFtR7y9skc4yt1OHY=",
    },
  ];

  return (
    <div className="text-gray-800 px-4 py-8">
      <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
        🍽️ Recommended For You
      </h2>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recs.map((dish, i) => (
          <li
            key={i}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group"
          >
            <div className="relative">
              <img
                src={dish.img}
                alt={dish.name}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow">
                Chef's Pick
              </span>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition">
                {dish.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Curated just for your taste
              </p>
              <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition duration-300 shadow-md">
                Add to Favorites ❤️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;

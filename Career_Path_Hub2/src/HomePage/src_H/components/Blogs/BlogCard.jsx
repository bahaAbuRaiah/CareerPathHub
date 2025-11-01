import React from "react";

const BlogCard = ({ Img1, title, description, date, author }) => {
  return (
    <div>
      <div
        id="card"
        className="mx-2 mb-7 rounded-lg p-4 shadow-lg transition-all duration-500 hover:scale-[1.01] hover:shadow-xl "
      >
        <div className="overflow-hidden rounded-lg ">
          <img
            src={Img1}
            alt="No image"
            className="mx-auto h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
          />
        </div>
        <div className="space-y-3 py-3">
          <h1 className="line-clamp-1 text-xl font-bold">{title}</h1>
          <p className="line-clamp-2">{description}</p>
          <div className="flex justify-between text-slate-600">
            <p>{date}</p>
            <p className="line-clamp-1">By {author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

import React from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate

const BannerDetails = ({
  reverse,
  img,
  smallHeight,
  title,
  description,
  bulletPoints,
  Button,
  targetPage,
}) => {
  const navigate = useNavigate(); // استخدام useNavigate

  // دالة التعامل مع الزر للتوجيه إلى صفحة أخرى
  const handleButtonClick = () => {
    navigate(targetPage); // التنقل إلى الصفحة المحددة
  };

  return (
    <section>
      <main className="bg-slate-100 dark:bg-slate-950 dark:text-white">
        <section className="container mx-auto flex flex-col items-center justify-center py-10 px-4 md:h-[600px] md:px-8">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div
              data-aos="fade-right"
              data-aos-duration="400"
              data-aos-once="true"
              className={`flex flex-col items-start gap-6 text-left md:items-start md:p-8 md:text-left ${
                reverse ? "md:order-last" : ""
              }`}
            >
              <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {description}
              </p>
              <div>
                <ul className="flex list-inside list-disc flex-col gap-4">
                  {bulletPoints.map((point, index) => (
                    <li key={index} className="font-medium text-lg">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-x-4">
                <button
                  onClick={handleButtonClick} // إضافة دالة onClick
                  className="rounded-md border-2 bg-emerald-600 border-primary px-6 py-3 text-lg text-white transition-colors duration-300 hover:bg-teal-500"
                >
                  {Button}
                </button>
              </div>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="400"
              data-aos-once="true"
              className={`flex justify-center ${reverse ? "order-1" : ""}`}
            >
              <img
                src={img}
                alt="No image"
                className="w-auto max-w-[550px] h-auto transition-transform duration-300 ease-in-out hover:scale-105 hover:drop-shadow-lg"
              />
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default BannerDetails;

import React from "react";
import { motion } from "framer-motion";

import omnix from '../../../src_H/assets/Company-logo/omnix.png';
import Atypon from '../../../src_H/assets/Company-logo/Atypon.png';
import green from '../../../src_H/assets/Company-logo/green.png';
import Shabakati from '../../../src_H/assets/Company-logo/Shabakati.png';
import adTech from '../../../src_H/assets/Company-logo/adTech.png';
import aspire from '../../../src_H/assets/Company-logo/aspire.jpg';
import adTect from '../../../src_H/assets/Company-logo/adTech.png'
const companies = [
  { name: "omnix", logo: omnix },
  { name: "Atypon", logo: Atypon },
  { name: "green", logo: green },
  { name: "Shabakati", logo: Shabakati },
  { name: "adTech", logo: adTech },
  { name: "Aspire", logo: aspire }, 
  {name : "adTech ", logo :adTect}
];

const CompaniesSection = () => {
  return (
    <section className="bg-gray-900 py-12">
      <div className="container mx-auto text-center text-white">
        <motion.h2
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Powering Jordanian IT Companies
        </motion.h2>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              className="w-24 md:w-36"
              whileHover={{
                scale: 1.1, // تكبير الصورة عند التحويم
                rotate: 15, // إضافة دوران للصورة عند التحويم
              }}
              transition={{
                type: "spring",
                stiffness: 300, // مرونة عالية للتكبير والتدوير
                damping: 10, // تأثير أكثر سلاسة
              }}
            >
              <motion.img
                src={company.logo}
                alt={company.name}
                className="mx-auto h-24 md:h-32 opacity-75 hover:opacity-100 transition duration-300"
                initial={{ opacity: 0, scale: 0.5 }} // أنيميشن للظهور من حجم صغير
                animate={{ opacity: 1, scale: 1 }} // تكبير الصورة عند الظهور
                transition={{ duration: 0.8, ease: "easeInOut" }} // انيميشن للظهور
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};



export default CompaniesSection;




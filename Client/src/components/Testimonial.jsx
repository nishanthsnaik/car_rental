import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from 'motion/react'

const testimonials = [
  {
    name:"Emma Rodriguez",
    location: "Barcelona,Spain",
    image: assets.testimonial_image_1,
    rating:5,
    review:
      "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that CarRental provides.",
  },
  {
    name:"Mrs Potts",
    location: "New York,USA",
    image: assets.testimonial_image_2,
    rating:4.5,
    review:
            "The booking process was smooth and fast. The car was clean, comfortable, and exactly as shown on the website.",
  },
  {
    name:"Tony Stark",
    location: "LA,Los Angeles",
    image: assets.testimonial_image_1,
    rating:4,
    review:
    "One of the best rental services I've used. The pickup and return process was quick and hassle-free.",
  },
];

const Testimonial = () => {
  return (
    
    <motion.section
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full bg-white py-20 px-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Title title="What Our Customer say" subTitle="discover why our customers are buying our car"/>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        className="flex flex-wrap justify-center gap-4 mt-18"
      >
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full sm:w-80"
          >
            <div className="bg-white rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-500 h-full">
              {/* User Info */}
              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-base font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-xs">{item.location}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mt-3">
                {Array(5).fill(0).map((_,index)=>(
                  <img key={index} src={assets.star_icon} alt='star-icon' className="w-3 h-3"/>
                ))}
              </div>

              {/* Review */}
              <p className="font-light text-gray-500 text-xs leading-5 mt-3">
                "{item.review}"
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Testimonial;

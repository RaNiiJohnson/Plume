/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useQuery } from "@tanstack/react-query";
import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React from "react";
import { getUsers } from "../actions/userAction";
import PostPagination from "../components/features/posts/PostPagination";

export const Dashboard = () => {
  const { data: dataUser } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  if (!dataUser) return;

  return (
    <div
      ref={ref}
      className="h-[210vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <PostPagination />
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="relative left-0 w-full px-4 py-20 mx-auto max-w-7xl md:py-40top-0">
      <h1 className="text-2xl font-bold md:text-7xl dark:text-white">
        Découvrer, partager et ressenter l'impact des textes
      </h1>
      <p className="max-w-2xl mt-4 text-base md:text-xl dark:text-neutral-200">
        Bienvenue sur <span className="text-primary font-protest">Plume</span>
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl ">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="absolute inset-0 object-cover object-left-top w-full h-full"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 w-full h-full bg-black opacity-0 pointer-events-none group-hover/product:opacity-80"></div>
      <h2 className="absolute text-white opacity-0 bottom-4 left-4 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
};

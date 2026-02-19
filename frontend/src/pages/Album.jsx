import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [open, setOpen] = useState(false);
  const images = [
    {
      index: 0,
      url: "/01.jpg",
    },
    {
      index: 1,
      url: "/02.jpg",
    },
    {
      index: 2,
      url: "/03.jpg",
    },
    {
      index: 3,
      url: "/04.jpg",
    },
    {
      index: 4,
      url: "/05.jpg",
    },
    {
      index: 5,
      url: "/06.jpeg",
    },
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [currentImage]);

  const handleNext = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
    } else {
      setCurrentImage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-slate-400 h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-2">
        <div className="max-w-[600px] h-[400px] relative">
          <img
            onClick={() => setOpen(true)}
            className="w-full h-full object-cover rounded-[20px] cursor-pointer aspect-video"
            src={images[currentImage].url}
            alt=""
          />
          <div
            onClick={handlePrev}
            className="absolute top-[50%] left-2 transform -translate-y-1/2 bg-red-700/90 text-white rounded-[50%] cursor-pointer"
          >
            <IoIosArrowBack size={30} />
          </div>
          <div
            onClick={handleNext}
            className="absolute top-[50%] right-2 transform -translate-y-1/2 bg-red-700/90 text-white rounded-[50%] cursor-pointer"
          >
            <IoIosArrowForward size={30} />
          </div>
        </div>
        <div className="flex justify-center">
          {images.map((item) => (
            <div key={item.index} className="cursor-pointer">
              {item.index === currentImage ? (
                <GoDotFill
                  onClick={() => setCurrentImage(item.index)}
                  size={28}
                />
              ) : (
                <GoDot onClick={() => setCurrentImage(item.index)} size={28} />
              )}
            </div>
          ))}
        </div>
      </div>
      {open && (
        <div className="h-screen absolute">
          <img
            className="w-screen h-full object-cover"
            src={images[currentImage].url}
            alt=""
          />
          <div
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 bg-white/90 rounded-[50%] cursor-pointer"
          >
            <IoMdClose size={30} />
          </div>
          <div
            onClick={handlePrev}
            className="absolute top-[50%] left-2 transform -translate-y-1/2 bg-white/90 rounded-[50%] cursor-pointer"
          >
            <IoIosArrowBack size={30} />
          </div>
          <div
            onClick={handleNext}
            className="absolute top-[50%] right-2 transform -translate-y-1/2 bg-white/90 rounded-[50%] cursor-pointer"
          >
            <IoIosArrowForward size={30} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
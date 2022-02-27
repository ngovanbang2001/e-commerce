import Slider from "react-slick";
import { useHistory } from "react-router-dom";
const images = [
  {
    link: "https://user-images.githubusercontent.com/62241342/147386364-b74cf4f0-2b98-498f-ad41-4893d2d0a287.jpg",
  },
  {
    link: "https://user-images.githubusercontent.com/62241342/147386368-ea310d40-1b0d-4f1e-a470-6fdba3635c48.jpg",
  },
  {
    link: "https://user-images.githubusercontent.com/62241342/147390149-899cf62e-b360-4d69-bd7a-55627bbedebb.jpg",
  },
  {
    link: "https://user-images.githubusercontent.com/62241342/147386371-535b668c-2be7-4325-8fa2-a15b6e0238bc.jpg",
  },
];
function HeaderSlide() {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: 0,
    dots: true,
    autoplay: false,
    infinite: true,
    pauseOnHover: false,
    swipeToSlide: true,
  };
  return (
    <div className=" relative mb-10 mt-4">
      <Slider {...settings} className=" w-full">
        {images.map((item, i) => (
          <SlideItem key={i} item={item} />
        ))}
      </Slider>
    </div>
  );
}
export default HeaderSlide;
const SlideItem = (props) => {
  let hisrory = useHistory();
  const { item } = props;
  const backGround = item.link;

  return (
    <div
      className="mt-320:h-[200px] mt-1280:h-[480px] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backGround})` }}
    >
      <div className="absolute mt-28 "> </div>
    </div>
  );
};

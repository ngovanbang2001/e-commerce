import HeaderSlide from "./../../component/HeaderSlide/index";
import ProductList from "./../../component/ProductList/index";
const imgPromotion = [
  {
    link: "https://user-images.githubusercontent.com/62241342/147403589-bfa6e32f-05df-4d3c-8669-2592dfed66bb.jpg",
  },
  {
    link: "https://user-images.githubusercontent.com/62241342/147403590-cda842f3-559a-4043-a15e-a5c53770f7ba.jpg",
  },
  {
    link: "https://user-images.githubusercontent.com/62241342/147403643-a3d95627-c486-48f4-9543-b5bba67d8a53.jpg",
  },
];
function Home() {
  return (
    <>
      <HeaderSlide />
      <div className="mx-auto max-w-[1200px]">
        {" "}
        <div className="grid grid-cols-3 gap-4 my-8  ">
          {imgPromotion.map((item, i) => (
            <BannerItem key={i} item={item} />
          ))}
        </div>
        <div className="section mb-8 ">
          <div className="flex justify-center mb-8">
            <h2 className="text-4xl font-semibold   text-black p-2">
              Lastest Product
            </h2>
          </div>
          <ProductList />
        </div>
      </div>
    </>
  );
}
export default Home;
const BannerItem = (props) => {
  const { item } = props;
  const backGround = item.link;

  return (
    <div
      className=" bg-cover bg-center bg-no-repeat relative h-[190px] rounded-md"
      style={{ backgroundImage: `url(${backGround})` }}
    ></div>
  );
};

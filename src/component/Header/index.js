import Menu from "./../Menu/index.js";
function Header() {
  return (
    <div className="w-full  py-1 fixed z-10 top-0 text-black  border-b-2 border-[#f1f1f1] bg-white">
      <Menu />
    </div>
  );
}
export default Header;

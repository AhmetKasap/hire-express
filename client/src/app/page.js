import Navbar from "@/components/Navbar";
import Search from "@/components/Search/Search";
import AllHost from "./hosts/components/AllHost";

export default function Home() {
  return (
    <>

      <div className="w-10/12 mx-auto">
        <Navbar></Navbar>
        <Search></Search>
        <AllHost></AllHost>
      </div>
    </>
  );
}

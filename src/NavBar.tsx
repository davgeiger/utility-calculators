import { Link, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NavBar() {
  return (
    <>
      <div className="mb-2 flex gap-2 bg-gray-200 p-2">
        <Link to="/donation-calc">
          <Button variant={"outline"} className={"text-black"}>
            Donation Calculator
          </Button>
        </Link>
        <Link to="/speed-calc">
          <Button variant={"outline"} className={"text-black"}>
            Video Speed Calculator
          </Button>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

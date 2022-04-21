import BlinkingCursor from "./BlnkingCursor";
import Link from "next/link";

const UnderConstruction = () => {
  return (
    <div className="mb-10">
      <h2 className="text-3xl"><span className='text-red'>~/</span> <span className='text-white'>$ under_construction<BlinkingCursor cursor={'_'}/></span></h2>
      <div className="mt-6">
        <p className="mb-4">This page is under construction. Please check back later.</p>
        <img src="/images/undercontrsuction.gif" alt="a 90s / 2000s  under construction sign" className="my-4"/>
        <Link href="/">
          <a>
            <button className="inline-block bg-red-500 py-2 px-4 border border-transparent rounded-2xl text-base font-medium text-white hover:bg-red-700 hidden md:block">
              Go back to home
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default UnderConstruction;

import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

export const NAVIGATION = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Shop",
    path: "/shop",
  },
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "FAQ",
    path: "/faq",
  },
];

export const Navigation = () => {
  return (
    <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-2 flex justify-between items-center flex-wrap">
      <div className="flex items-center divide-x gap-x-2">
        <button className="flex items-center gap-2 py-2 px-3 transition duration-300 hover:bg-yellow-500 hover:text-white">
          <Bars3Icon className="w-6 h-6" />
          <span className="font-medium">Shop By Category</span>
          <ChevronDownIcon className="w-6 h-6 ml-3" />
        </button>
        <div className="flex items-center gap-2 pl-2 font-medium">
          {NAVIGATION.map((nav) => (
            <Link
              key={nav.label}
              className="py-2 px-3 transition duration-300 hover:bg-gray-100"
              to={nav.path}
            >
              {nav.label}
            </Link>
          ))}
        </div>
      </div>
      <Link
        to="tel:+8801315873250"
        className="py-2 px-3 transition duration-300 hover:bg-gray-100"
      >
        Call Us: <strong>+880 1315-873250</strong>
      </Link>
    </nav>
  );
};

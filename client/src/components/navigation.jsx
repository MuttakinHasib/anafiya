import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import useMenuHandler from "../hooks/useMenuHandler";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { useCategory } from "../hooks/useCategory";

const solutions = [
  {
    name: "Insights",
    description: "Measure actions your users take",
    href: "##",
    // icon: IconOne,
  },
  {
    name: "Automations",
    description: "Create your own targeted content",
    href: "##",
    // icon: IconTwo,
  },
  {
    name: "Reports",
    description: "Keep track of your growth",
    href: "##",
    // icon: IconThree,
  },
];

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
  const [isOpen, setIsOpen] = useState(false);
  const {
    categories: { data },
  } = useCategory();

  const innerRef = useMenuHandler(() => {
    setIsOpen(false);
  });

  return (
    <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-2 flex justify-between items-center flex-wrap">
      <div className="flex items-center divide-x gap-x-2">
        <button
          className="flex items-center gap-2 py-2 px-3 transition duration-300 hover:bg-yellow-500 hover:text-white"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <Bars3Icon className="w-6 h-6" />
          <span className="font-medium">Shop By Category</span>
          <ChevronDownIcon className="w-6 h-6 ml-3" />
        </button>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="z-50"
        >
          <div
            ref={innerRef}
            className="origin-top-right top-5 absolute right-0 mt-2 w-48 rounded shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 p-1"
            style={{ zIndex: 9999 }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            {data.map((item) => (
              <Link to={`/products/${item.slug}`} id={item._id}>
                <span
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </Transition>
      </div>
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

      <Link
        to="tel:+8801315873250"
        className="py-2 px-3 transition duration-300 hover:bg-gray-100"
      >
        Call Us: <strong>+880 1315-873250</strong>
      </Link>
    </nav>
  );
};

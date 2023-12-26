import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
} from "react-icons/si";

import { Link } from "react-router-dom";

const informationNav = [
  { label: "About Us", path: "/about-us" },
  { label: "Delivery Information", path: "/delivery-information" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Brands", path: "/brands" },
  { label: "Contact Us", path: "/contact-us" },
  { label: "Returns", path: "/returns" },
  { label: "Site Map", path: "/site-map" },
];

const accountNav = [
  { label: "Store Location", path: "/store-location" },
  { label: "Order History", path: "/order-history" },
  { label: "Wish List", path: "/wishlist" },
  { label: "Newsletter", path: "/newsletter" },
  { label: "Special Offers", path: "/special-offers" },
];

const SOCIAL_NETWORKS = [
  {
    label: "Facebook",
    url: `https://facebook.com/muttakinhasib`,
    icon: <SiFacebook title="Facebook" color="#0866FF" size={24} />,
  },
  {
    label: "Instagram",
    url: `https://instagram.com/muttakinhasib`,
    icon: <SiInstagram title="Instagram" color="#E4405F" size={24} />,
  },
  {
    label: "Twitter",
    url: `https://twitter.com/muttakinhasib`,
    icon: <SiTwitter title="Twitter" color="#1D9BF0" size={24} />,
  },
  {
    label: "GitHub",
    url: `https://github.com/muttakinhasib`,
    icon: <SiGithub title="GitHub" color="#181717" size={24} />,
  },
  {
    label: "LinkedIn",
    url: `https://linkedin.com/in/muttakinhasib`,
    icon: <SiLinkedin title="Linkedin" color="#0A66C2" size={24} />,
  },
];

export const Footer = () => {
  return (
    <footer className="text-white">
      <div className="bg-gray-700">
        <div className="container pt-14 pb-12 grid grid-cols-12 gap-5 md:gap-10 justify-between md:justify-start">
          <div className="space-y-3 md:space-y-6 text-center xl:text-left col-span-12 xl:col-span-4">
            <h5 className="text-xl font-medium">Contact Us</h5>
            <p className="text-gray-400">
              Hi, we are always open for cooperation and suggestions, contact us
              in one of the ways below:
            </p>
            <address className="flex flex-wrap not-italic gap-y-5 justify-between">
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Phone number
                </dt>
                <dd className="text-sm">+880 1315-873250</dd>
              </dl>
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Email address
                </dt>
                <dd className="text-sm break-words">
                  muttakinislamhasib@gmail.com
                </dd>
              </dl>
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Our Location
                </dt>
                <dd className="text-sm">715 Fake Street, New York 10021 USA</dd>
              </dl>
              <dl className="space-y-1 bg-gray-600 py-4 px-3 xl:p-0 xl:bg-transparent rounded xl:rounded-none w-full sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/4-12px)] xl:w-[calc(100%/2-30px-1px)]">
                <dt className="uppercase text-xs text-gray-400">
                  Working hours
                </dt>
                <dd className="text-sm">Mon-Sat 10:00 AM - 7:00 PM</dd>
              </dl>
            </address>
          </div>
          <div className="space-y-3 md:space-y-6 text-center md:text-start mx-auto col-span-6 md:col-span-3 xl:col-span-2">
            <h5 className="text-xl font-medium">Information</h5>
            <div className="gap-3 flex flex-col">
              {informationNav.map((nav) => (
                <Link
                  key={nav.label}
                  to={nav.path}
                  className="text-[15px] text-gray-400 hover:text-white transition-colors duration-200 inline-block"
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3 md:space-y-6 text-center md:text-start mx-auto col-span-6 md:col-span-3 xl:col-span-2">
            <h5 className="text-xl font-medium">My Account</h5>
            <div className="gap-3 flex flex-col">
              {accountNav.map((nav) => (
                <Link
                  key={nav.label}
                  to={nav.path}
                  className="text-[15px] text-gray-400 hover:text-white transition-colors duration-200 inline-block"
                >
                  {nav.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3 md:space-y-6 text-center md:text-start col-span-12 md:col-span-6 xl:col-span-4">
            <h5 className="text-xl font-medium">Newsletter</h5>
            <div className="space-y-3">
              <p className="text-gray-400">
                Enter your email address below to subscribe to our newsletter
                and keep up to date with discounts and special offers.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-x-3 max-w-lg w-full">
                <input
                  type="email"
                  className="bg-gray-600 border-2 w-full border-gray-600 px-3 py-2 rounded focus:ring-0 focus:border-gray-600 focus:bg-gray-700 focus:outline-none placeholder-gray-400"
                  placeholder="email@example.com"
                />
                <button className="border-none bg-yellow-500 text-white py-2 px-5 border-2 border-yellow-500 rounded">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-400">Follow me on social networks</p>
              <div className="inline-flex items-center gap-5 bg-white p-3">
                {SOCIAL_NETWORKS.map((network) => (
                  <Link
                    key={network.label}
                    to={network.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-105"
                  >
                    {network.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800">
        <div className="container py-5 flex items-center justify-center md:justify-between flex-wrap gap-5">
          <p className="text-sm text-gray-400 md:text-start text-center">
            &copy; {new Date().getFullYear()} All Rights Reserved. Developed by
            &nbsp;
            <a
              href="https://github.com/muttakinhasib"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-yellow-500 whitespace-nowrap"
            >
              Muttakin Islam Hasib
            </a>
          </p>

          <img
            className="h-14 bg-white p-2"
            src="https://www.leafrootfruit.com.au/wp-content/uploads/2018/08/secure-stripe-payment-logo-amex-master-visa.png"
            alt="Stripe Secure Payment"
          />
        </div>
      </div>
    </footer>
  );
};

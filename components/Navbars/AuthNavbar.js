import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";

import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import PagesDropdown from "../Dropdowns/PagesDropdown";
import Button from "../Forms/Button.component";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleLanguage = () => {
    window.location.replace("http://localhost:3000/");
  };

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/"
              className="text-white text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              {t("common:ABC")}
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="items-center text-white px-3 text-xl">
                <Link href={`#contact_us`}>{t('common:Contact us')}</Link>
              </li>

              <li className="items-center text-white px-3 text-xl">
                <Link href={`#operator`}>{t('common:Operator')}</Link>
              </li>

              <li className="items-center text-white text-xl px-3">
                {session?.username ? (
                  <Link href={`/admin/dashboard`}>{t("Dashboard")}</Link>
                ) : (
                  <Link href={`/user/login`}>{t("common:Login")}</Link>
                )}
              </li>

              <li className="flex items-center">
                {router.locale === "bn" && (
                  <Link
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    href={`http://localhost:3000/`}
                  >
                    <Button type={"button"} event={handleLanguage}>
                      English
                    </Button>
                  </Link>
                )}
                {router.locale === "en-US" && (
                  <Link
                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    href="http://localhost:3000/bn"
                  >
                    বাংলা
                  </Link>
                )}
              </li>

              {/* <li className="flex items-center">
                <PagesDropdown />
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

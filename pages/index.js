import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import Button from "@/components/Forms/Button.component";
import Label from "@/components/Forms/Label.component";
import getError from "@/utils/error";
import SendMessage from "@/helpers/SendMessage";
import CONSTANT_VARIABLE from "@/utils/env";

export default function Landing() {
  let { t } = useTranslation("common");

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPackages = async () => {
      const { data } = await axios.post(`/api/package`);
      setPackages(data);
      setLoading(false);
    };

    getPackages();
  }, []);

  const onSubmit = (values) => {
    const sendMessageReq = async () => {
      try {
        const { data } = await axios.post(`/api/request-message`, values);
        if (data.message == "Successfully done") {
          alert(t("Successfully done"));
          SendMessage(
            CONSTANT_VARIABLE.OWNER_MOBILE,
            `${values.name}(${values.email}) Said that ${values.message}`
          );
        }
        window.location.reload();
      } catch (err) {
        toast.error(getError(err));
      }
    };

    sendMessageReq();
  };

  return (
    <>
      <ToastContainer position="top-right" limit={1} />
      <Navbar transparent />

      <div>
        <main>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://img.lovepik.com/background/20211022/small/lovepik-city-ground-background-image_401956862.jpg')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4 ml-auto mr-auto text-center">
                  <div className="pr-12">
                    <h3 className="text-white font-semibold text-2xl">
                      {t("Welcome to Automatic Building Controller")}
                    </h3>

                    <p className="mt-4  text-blueGray-200">
                      {t("land_message_one")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </div>

          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <section className="pb-20 bg-blueGray-200 -mt-24">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                  <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                          <i className="fas fa-award"></i>
                        </div>
                        <h6 className="text-xl font-semibold">{t('common:Unit Package')}</h6>
                        <ul className="text-xs	 my-2">
                          <li className="my-1">
                            {packages[0]?.amount} TK per Unit Price
                          </li>
                          <li className="my-1">
                            Validity {packages[0]?.validity}
                          </li>
                          <li className="my-1">{packages[0]?.condition}</li>
                        </ul>
                        <Button
                          className="bg-blueGray-800 my-3 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150"
                          type={`button`}
                        >
                          <Link href={`/subscription/unit-package`}>
                            {t('common:Subscription')}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                          <i className="fas fa-retweet"></i>
                        </div>
                        <h6 className="text-xl font-semibold">
                        {t('common:Building Package')}
                        </h6>
                        <ul className="text-xs	 my-2">
                          <li className="my-1">
                            {packages[1]?.amount} TK per Unit Price
                          </li>
                          <li className="my-1">
                            Validity {packages[1]?.validity}
                          </li>
                          <li className="my-1">{packages[1]?.condition}</li>
                        </ul>
                        <Button
                          className="bg-blueGray-800 my-3 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150"
                          type={`button`}
                        >
                          <Link href={`/subscription/building-package`}>
                          {t('common:Subscription')}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                          <i className="fas fa-fingerprint"></i>
                        </div>
                        <h6 className="text-xl font-semibold">
                        {t('common:Unlimited Package')}
                        </h6>
                        <ul className="text-xs	 my-2">
                          <li className="my-1">
                            {packages[2]?.amount} TK per Unit Price
                          </li>
                          <li className="my-1">
                            Validity {packages[2]?.validity}
                          </li>
                          <li className="my-1">{packages[2]?.condition}</li>
                        </ul>
                        <Button
                          className="bg-blueGray-800 my-3 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150"
                          type={`button`}
                        >
                          <Link href={`/subscription/unlimited-package`}>
                          {t('common:Subscription')}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center mt-32">
                  <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                      <i className="fas fa-user-friends text-xl"></i>
                    </div>
                    <h3 className="text-3xl mb-2 font-semibold leading-normal">
                      {t("Working with us is a pleasure")}
                    </h3>

                    <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                      {t("land_message_two")}
                    </p>
                  </div>

                  <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                      <Image
                        alt="..."
                        src="/img/group_discussion.jpg"
                        className="w-full align-middle rounded-t-lg"
                        width={400}
                        height={100}
                      />
                      <blockquote className="relative p-8 mb-4">
                        <svg
                          preserveAspectRatio="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 583 95"
                          className="absolute left-0 w-full block h-95-px -top-94-px"
                        >
                          <polygon
                            points="-30,95 583,95 583,65"
                            className="text-blueGray-700 fill-current"
                          ></polygon>
                        </svg>
                        <h4 className="text-xl font-bold text-white">
                          {t("Services")}
                        </h4>
                        <p className="text-md font-light mt-2 text-white">
                          {t("land_message_three")}
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* <section className="relative py-20">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blueGray-200">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">A growing company</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                    The extension comes with three pre-built pages to help you
                    get started faster. You can change the text and images and
                    you're good to go.
                  </p>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Carefully crafted components
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Amazing page examples
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-500">
                            Dynamic components
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section> */}

          <section className="pt-20 pb-48" id="operator">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center text-center mb-24">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-3xl font-semibold">
                    {t("List of our system operators")}
                  </h2>
                  <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                    {t("land_message_four")}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <Image
                      alt="..."
                      src="/img/shameem2.jpg"
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                      width={100}
                      height={100}
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">{t("shameem")}</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        {t("Email")}: shameem@gmail.com
                      </p>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        {t("Phone")}: 01716005752
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <Image
                      alt="..."
                      src="/img/shafiq.jpg"
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                      width={100}
                      height={100}
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">{t("shafiq")}</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        {t("Email")}:shafiqul@gmail.com
                      </p>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        {t("Phone")}:01716162457
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <Image
                      alt="..."
                      src="/img/hafiz.jpg"
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                      width={100}
                      height={100}
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">{t("hafiz")}</h5>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        {t("Email")}: hafizur@gmail.com
                      </p>
                      <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                        {t("Phone")}: 01763771672
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-instagram"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-20 relative block bg-blueGray-800">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-800 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>

            <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
              <div className="flex flex-wrap text-center justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold text-white">
                    {t("Contact US")}
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap mt-12 justify-center">
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-medal text-xl"></i>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-white">
                    Excelent Services
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-400">
                    {t('common:land_message_six')}
                  </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-poll text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    Grow Your Building
                  </h5>
                  <p className="mt-2 mb-4 text-blueGray-400">
                    {t('common:land_message_six')}
                  </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-lightbulb text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    Saving Time
                  </h5>
                  <p className="mt-2 mb-4 text-blueGray-400">
                    {t('common:land_message_six')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="relative block py-24 lg:pt-0 bg-blueGray-800" id="contact_us">
            <Formik
              initialValues={{ name: "", email: "", message: "" }}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form>
                    <div className="container mx-auto px-4">
                      <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                            <div className="flex-auto p-5 lg:p-10">
                              <h4 className="text-2xl font-semibold">
                                {t("Contact US")}
                              </h4>
                              <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                                {t("land_message_five")}
                              </p>
                              <div className="relative w-full mb-3 mt-8">
                                <Label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="full-name"
                                >
                                  {t("Full Name")}
                                </Label>
                                <Field
                                  name="name"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  placeholder={t("Full Name")}
                                />
                              </div>

                              <div className="relative w-full mb-3">
                                <Label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="email"
                                >
                                  {t("Email")}
                                </Label>
                                <Field
                                  name="email"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  placeholder={t("Email")}
                                />
                              </div>

                              <div className="relative w-full mb-3">
                                <Label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="message"
                                >
                                  {t("Message")}
                                </Label>
                                <Field
                                  as="textarea"
                                  rows="4"
                                  cols="80"
                                  name="message"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                  placeholder="Type a message..."
                                />
                              </div>
                              <div className="text-center mt-6">
                                <Button
                                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="submit"
                                >
                                  {t("Send Message")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}

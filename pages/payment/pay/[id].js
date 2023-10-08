import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string, ref } from "yup";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { toast } from "react-toastify";

import Label from "@/components/Forms/Label.component";
import Admin from "@/components/layouts/Admin";
import TextError from "@/components/Error/TextError";
import Button from "@/components/Forms/Button.component";
import { useRouter } from "next/router";
import getError from "@/utils/error";
import { useEffect, useState } from "react";

const PaymentForm = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const paymentValidationSchema = () => {
    return object({
      amount: string().required(t("payment:Amount is Required")),
    });
  };

  const user_id = router?.query?.id;

  useEffect(() => {
    const getPaymentInfo = async (user_id) => {
      const { data } = await axios.post(`/api/payment/info`, {
        user_id: user_id,
      });

      setUser(data);
      setLoading(false);
    };

    getPaymentInfo(user_id);
  }, [user_id]);

  const initialValues = {
    amount: user?.amount,
  };

  const onSubmit = async (values) => {
    try {
      values.payment_id = user_id;
      console.log(values)
      const {
        data: { url },
      } = await axios.post(`/api/payment/pay`, values);
      window.location.replace(url);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Admin>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h2 className="text-xl text-center bold text-black">
            <legend>{t("common:Payment Form")}</legend>
          </h2>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={() => paymentValidationSchema()}
          >
            {(formik) => {
              return (
                <Form>
                  <fieldset className="flex flex-col w-auto border-2 shadow-sm border-solid border-indigo-600 p-3">
                    <legend>{t("common:Payment Form")}</legend>

                    <div className="w-full lg:w-6/12 md:w-6/12  self-center ">
                      <Label htmlFor="amount" className="block">
                        Amount
                      </Label>
                      <Field
                        name="amount"
                        id="amount"
                        className="w-full md:w-12/12 custom_input "
                        readOnly="true"
                      />
                      <ErrorMessage
                        name="amount"
                        className="w-full md:w-12/12 block"
                        component={TextError}
                      />
                    </div>

                    <div className=" flex flex-wrap justify-center mt-4">
                      <Button
                        type="submit"
                        className="bg-cyan-900 active:bg-cyan-800 hover:bg-cyan-600 text-white px-2 mx-5"
                      >
                        {t("common:Submit")}
                      </Button>
                    </div>
                  </fieldset>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </Admin>
  );
};

export default PaymentForm;

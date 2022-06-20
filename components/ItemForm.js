import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";

const ItemSchema = Yup.object.shape({
  title: Yup.string().trim().required(),
  location: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  categories: Yup.string().required(),
});

const ItemForm = () => {
  const initialItemValues = {
    title: "",
    location: "",
    description: "",
    categories: "",
  };

  return (
    <div>
      <Formik></Formik>
    </div>
  );
};

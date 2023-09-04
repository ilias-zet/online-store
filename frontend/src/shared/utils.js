import axios from "axios";

export const getRecommended = async () => {
  try {
    //Get array with recommended products
    const { data } = await axios.get("http://localhost:8000/getRecommended");
    return data;
  } catch (e) {
    console.log("Error Home page: ", e);
  }
};

export const getCategories = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/getCategories");
    return data;
  } catch (e) {
    console.log("Error PageWithCategories: ", e);
  }
};

export const getProduct = async (product_id) => {
  try {
    const { data } = await axios.get("http://localhost:8000/getFullProduct", {
      params: { product_id },
    });
    return data;
  } catch (e) {
    console.log("Error on fetchData const:  ", e);
  }
};

export const getProducts = async (category) => {
  try {
    const { data } = await axios.get("http://localhost:8000/getProducts", {
      params: { category },
    });
    return data;
  } catch (e) {
    console.log("Error on MainCagegoryPage:  ", e);
  }
};

export const getSignUp = async (name, surname, email, password, userData) => {
  userData = { name, surname, email, password };
  try {
    const { data } = await axios.post(
      "http://localhost:8000/auth/registration",
      userData
    );
    return data;
  } catch (e) {
    const err = e?.response.data?.message
      ? e?.response.data?.message
      : "Unexpected registration error";
    alert(err);
  }
};

export const getSignIn = async (userData, email, password) => {
  if (!email || !password) return;
  userData = {
    email,
    password,
  };
  console.log(userData)
  try {
    const { data } = await axios.post(
      "http://localhost:8000/auth/login",
      userData
    );
    return data;
  } catch (e) {
    alert(e);
  }
};
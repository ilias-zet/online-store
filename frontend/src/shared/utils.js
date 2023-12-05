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
  userData = { name, surname, email, password, role: "user" };
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

export const getSignIn = async (email, password) => {
  if (!email || !password) return;
  const userData = {
    email,
    password,
  };
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

export const saveCart = async (user) => {
  try {
    const { data } = await axios.post("http://localhost:8000/saveCart", user);
    return data;
  } catch (e) {
    alert(e);
  }
};

export const createNewProductDB = async (newProduct) => {
  try {
    const data = await axios.post("http://localhost:8000/createNewProductDB", {
      newProduct,
    });
    return data;
  } catch (e) {
    console.log("Error on fetchData const:  ", e);
  }
};

export const getSearchResults = async (searchQ,category) => {
  const data = await axios.get("http://localhost:8000/getSearchResults", {
    params: {searchQ,category},
  });
  return data;
};

export const getIsValidToken = async (token) => {
  const data = await axios.get("http://localhost:8000/validation_current_user", {
    params: token,
  });
  return data;
};

export const updateCart = async (userID,newCart) => {
  const data = await axios.get("http://localhost:8000/update_cart", {
    params:{userID,newCart},
  })
  return data
}

export const updateBuyHistory = async (userID,cart) => {
  const data = await axios.get("http://localhost:8000/update_buy_history", {
    params:{userID,cart},
  })
  return data
}
import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAIL,
} from "../actions";

const initialState = {
  products: [],
  fetchingProducts: false,
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_START:
      return {
        ...state,
        fetchingProduct: true,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        fetchingProducts: true,
        error: "",
      };

    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        fetchingProducts: false,
        error: action.payload,
      };

    case POST_PRODUCT_SUCCESS:
      return {};

    case POST_PRODUCT_FAIL:
      return {};

    default:
      return state;
  }
};

export default reducer;

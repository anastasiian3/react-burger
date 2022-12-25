export const getOrders = (state) => state.wsReducer.orders;
export const getAllIngredients = (state) => state.ingredientsReducer.ingredients;

export const getConstructorIngredients = (state) => state.constructorReducer;
export const getIngredientsDetailedInfo = (state) => state.ingredientsReducer;

export const isUserAuth = (state) => state.userAuthReducer.isAuth;
export const getUserName = (state) => state.userAuthReducer.user.name;
export const getDetailedUser = (state) => state.userAuthReducer.user;

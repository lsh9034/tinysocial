const errorMessage = require('../errorMessages');
module.exports.Mutation = {
  signInWithGoogle: async (_, {googleId}, {dataSources}) => {
    return dataSources.authAPI.signInWithGoogle({googleId});
  },
  signUpWithGoogle: async (
    _, {googleId, email, firstName, lastName, profileImgUrl},
    {dataSources}) => {
    return dataSources.authAPI.signUpWithGoogle({
      googleId, email, firstName, lastName,
      profileImgUrl,
    });
  },
  signIn: async (_, {email, pw}, {dataSources}) => {
    return dataSources.authAPI.signIn({email, pw});
  },
  signUp: async (_, {email, firstName, lastName, pw, repw}, {dataSources}) => {
    return dataSources.authAPI.signUp({
      email, firstName, lastName, pw, repw,
    });
  },
  emailValidate: async (_, {token}, {dataSources}) => {
    return dataSources.authAPI.emailValidate(token);
  },
  logOut: async (_, __, {dataSources, userId}) => {
    throw new Error(errorMessage.notImplementMessage);
  },
  createOrModifyReview: async (_, {eventId, title, content, isPublic}, {dataSources, userId}) => {
    const review = dataSources.reviewAPI.createOrModifyOfReview({eventId, title, content, isPublic, userId});
    return review;
  },
  joinEvent: async (
    _,
    {orderId, eventId},
    {dataSources},
  ) => {
    const orderID = orderId;

    // Call PayPal to get the transaction details
    const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);

    let order;
    try {
      order = await payPalClient.client().execute(request);
    } catch (err) {
      // Handle any errors from the call
      console.error(err);
      return false;
    }

    // Validate the transaction details are as expected
    console.log(order.result);
    console.log(order.result.purchase_units[0].amount);
    console.log(order.result.purchase_units[0].payee);
    console.log(order.result.purchase_units[0].payments);
    if (order.result.purchase_units[0].amount.currency_code !== 'USD' ||
        order.result.purchase_units[0].amount.value !== '0.01') {
      return false;
    }

    // Save the transaction in your database
    // await database.saveTransaction(orderID);


    // Return a successful response to the client
    return true;
  },
};

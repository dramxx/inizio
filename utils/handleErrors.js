const handleErrors = (error, returnError) => {

  let errorMsg;

  if (error.response) {
    errorMsg = error.response.data;
    console.error('[RESPONSE ERR]: ', errorMsg);
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  }else if (error.request) {
    errorMsg = error.request;
    console.error('[REQUEST ERR]: ', errorMsg);
  }else {
    errorMsg = error.message;
    console.error('[ERROR MESSAGE]: ', errorMsg);
  }
  returnError(errorMsg);
};

export default handleErrors;

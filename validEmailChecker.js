function isValidEmail(email) {
    // Regular expression to match a valid email address.
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    // Return true if the email address matches the regular expression, false otherwise.
    return emailRegex.test(email);
}

export default isValidEmail
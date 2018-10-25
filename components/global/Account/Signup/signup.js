const signupId = "signup";

// Modal Header
const signupModalHeader = "Register";
// Create the Signup Form HTML
const signupModalHTML =
  "<div id='modal_signup_form_body' class='modal_account_form_body'>" +
  "<form id='modal_signup_form' class='modal_account_form' action='/users/signup' method='POST' onsubmit=''>" +
  "<div class='modal_signup_input_field modal_account_input_field'>" +
  "<div class='modal_signup_input_field_header modal_account_input_field_header'>Username</div>" +
  "<div class='modal_signup_input_body modal_account_input_body'>" +
  "<input type='text' name='username' id='modal_signup_username_input' class='modal_signup_input modal_account_input'>" +
  "</div>" +
  "</div>" +
  "<div class='modal_signup_input_field modal_account_input_field'>" +
  "<div class='modal_signup_input_field_header modal_account_input_field_header'>Email</div>" +
  "<div class='modal_signup_input_body modal_account_input_body'>" +
  "<input type='email' name='email' id='modal_signup_email_input' class='modal_signup_input modal_account_input'>" +
  "</div>" +
  "</div>" +
  "<div class='modal_signup_input_field modal_account_input_field'>" +
  "<div id='modal_signup_password_input_field_header' class='modal_signup_input_field_header modal_account_input_field_header'>Password</div>" +
  "<div id='modal_signup_password_input_body' class='modal_signup_input_body modal_account_input_body'>" +
  "<input type='password' name='password' id='modal_signup_password_input' class='modal_signup_input modal_account_input'>" +
  "<input type='password' name='confirmPassword' id='modal_signup_confirm_password_input' " +
  "class='modal_signup_input modal_account_input' placeholder='Confirm Password'>" +
  "</div>" +
  "</div>" +
  "<div id='modal_signup_first_name_input_field' class='modal_signup_input_field modal_account_input_field'>" +
  "<div id='modal_signup_first_name_input_field_header' class='modal_signup_input_field_header modal_account_input_field_header'>First Name</div>" +
  "<div id='modal_signup_first_name_input_body' class='modal_signup_input_body modal_account_input_body'>" +
  "<input type='text' name='firstName' id='modal_signup_first_name_input' class='modal_signup_input modal_account_input'>" +
  "</div>" +
  "</div>" +
  "<div id='modal_signup_last_name_input_field' class='modal_signup_input_field modal_account_input_field'>" +
  "<div id='modal_signup_last_name_input_field_header' class='modal_signup_input_field_header modal_account_input_field_header'>Last Name</div>" +
  "<div id='modal_signup_last_name_input_body' class='modal_signup_input_body modal_account_input_body'>" +
  "<input type='text' name='lastName' id='modal_signup_last_name_input' class='modal_signup_input modal_account_input'>" +
  "</div>" +
  "</div>" +
  "<div class='modal_signup_input_field modal_account_input_field'>" +
  "<div class='modal_signup_input_field_header modal_account_input_field_header'>Address</div>" +
  "<div id='modal_signup_search_address_input_body' class='modal_signup_input_body modal_account_input_body'>" +
  "<input type='text' id='modal_signup_search_address_input' class='modal_signup_input modal_account_input' " +
  "onfocus=\"this.value=''\" placeholder='Enter your address'>" +
  "</div>" +
  "</div>" +
  "<div class='modal_signup_input_field modal_account_input_field'>" +
  "<div id='modal_signup_street_address_input_field_header' class='modal_signup_input_field_header modal_account_input_field_header'>Street Address</div>" +
  "<div id='modal_signup_street_address_input_body' class='modal_signup_input_body modal_account_input_body'>" +
  "<input type='text' name='streetNumber' id='modal_signup_street_number_input' class='modal_signup_input modal_account_input'>" +
  "<input type='text' name='streetName' id='modal_signup_route_input' class='modal_signup_input modal_account_input'>" +
  "</div>" +
  "</div>" +
  "<div class='modal_signup_input_field modal_account_input_field'>" +
  "<div class='modal_signup_input_field_header modal_account_input_field_header'>Suburb</div>" +
  "<div class='modal_signup_input_body modal_account_input_body'>" +
  "<input type='text' name='suburb' id='modal_signup_sublocality_level_1_input' class='modal_signup_input modal_account_input'>" +
  "</div>" +
  "</div>" +
  "<div class='modal_signup_input_field modal_account_input_field'>" +
  "<div id='modal_signup_locality_postal_code_input_field_header' " +
  "class='modal_signup_input_field_header modal_account_input_field_header'>City, Postcode</div>" +
  "<div id='modal_signup_locality_postal_code_input_body' class='modal_signup_input_body modal_account_input_body'>" +
  "<input type='text' name='city' id='modal_signup_locality_input' class='modal_signup_input modal_account_input'>" +
  "<input type='text' name='postcode' id='modal_signup_postal_code_input' class='modal_signup_input modal_account_input'>" +
  "</div>" +
  "</div>" +
  "<div class='modal_signup_input_field modal_account_input_field'>" +
  "<div class='modal_signup_input_field_header modal_account_input_field_header'>Country</div>" +
  "<div class='modal_signup_input_body modal_account_input_body'>" +
  "<input type='text' name='country' id='modal_signup_country_input' class='modal_signup_input modal_account_input'>" +
  "</div>" +
  "</div>" +
  "<div class='form_submit_button_body'>" +
  "<button class='form_submit_button'>SIGNUP</button>" +
  "</div>" +
  "</form>" +
  "</div>";

// Modal Footer
const signupModalFooter =
  "<div id='modal_signup_login_statement_body' class='modal_account_statement_body'>" +
  "<div id='modal_signup_login_statement_text_one' class='modal_signup_login_statement_text modal_account_statement_text'>Login</div>" +
  "<div id='modal_signup_login_statement_text_two' class='modal_signup_login_statement_text modal_account_statement_text'>if you are already a member</div>" +
  "</div>";

// Create a Signup Modal
const constructSignupModal = () => {
  addModal(signupId, signupModalHeader, signupModalFooter);
  modalBodyPointer.insertAdjacentHTML("beforeend", signupModalHTML);
  addressAutocompleteInit(
    document.querySelector("#modal_signup_search_address_input"),
    fillInSignupAddress
  );
  document
    .querySelector("#modal_signup_login_statement_text_one")
    .addEventListener("click", () => {
      constructLoginModal();
    });
};

const fillInSignupAddress = () => {
  const place = addressAutocomplete.getPlace();

  for (component in addressComponentsObject) {
    document.querySelector("#modal_signup_" + component + "_input").value = "";
  }

  for (let i = 0; i < place.address_components.length; i++) {
    const addressType = place.address_components[i].types[0];
    if (addressComponentsObject[addressType]) {
      document.querySelector("#modal_signup_" + addressType + "_input").value =
        place.address_components[i][addressComponentsObject[addressType]];
    }
  }
};

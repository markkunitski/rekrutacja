import React, { useState } from "react";
import axios from "axios";
import MyBtn from "./components/UI/MyBtn";
import MyInput from "./components/UI/MyInput";
import MyAnchor from "./components/UI/MyAnchor";
function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    agreement_mail: false,
    agreement_call: false,
    agreement_sms: false,
    error_test: false,
  });

  // messanges
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // inputs handler
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.required && e.target.value === "") {
      setErrors({ ...errors, [e.target.name]: "To pole mysze być wypełnione" });
      e.target.classList.add("has-error");
    } else {
      setErrors({ ...errors, [e.target.name]: null });
      e.target.classList.remove("has-error");
    }
  };

  // checkbox handler
  const handleCheckboxChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  // Form Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    // Validate form again and make POST request
    const errorFields = Object.keys(form).filter((key) => form[key] === "");
    if (errorFields.length > 0) {
      setErrors(
        errorFields.reduce(
          (obj, key) => ({ ...obj, [key]: "To pole mysze być wypełnione" }),
          {}
        )
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://test8.it4u.company/sapi/modules/contact/form/40042ce28394dc369948c018b22c534d",
        form
      );
      if (response.data?.content) {
        setMessage(response.data.content);
      } else {
        setMessage("Nie powiodło się");
      }
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form_container">
      <div className="container ">
        <div className="row">
          <div className="col-12 h-screen d-flex flex-column align-items-center justify-content-center form__parent">
            <p className="form__parent__hero text-center">
              Czy już widzisz tutaj swój nowy dom? Skontaktuj się z nami <br />{" "}
              i <strong>porozmawiajmy o ofercie na działki!</strong>
            </p>
            <form className="myform" onSubmit={onSubmit}>
              <div className="position-relative">
                <MyInput
                  className="w-100"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="IMIĘ I NAZWISKO"
                  required
                  onChange={onChange}
                ></MyInput>
                {errors.name && <p className="errors">{errors.name}</p>}
              </div>
              <div className="position-relative">
                <MyInput
                  className="w-100"
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="[0-9]{9}"
                  placeholder="TELEFON"
                  onChange={onChange}
                ></MyInput>
              </div>
              <div className="position-relative">
                <MyInput
                  className="w-100"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="EMAIL"
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  required
                  onChange={onChange}
                ></MyInput>
                {errors.email && <p className="errors">{errors.email}</p>}
              </div>
              <div className="myform__bottom">
                <p className="myform__bottom__small mb-4">
                  Wyrażam zgodę na otrzymywanie od Duda Development Sp. z o.o.
                  SKA z siedzibą w Poznaniu ul. Macieja Palacza 144, 60-278
                  Poznań, informacji handlowej:
                </p>
              </div>

              <div className="d-flex align-items-center">
                <input
                  disabled={form.email ? false : true}
                  className="custom-checkbox"
                  type="checkbox"
                  name="agreement_mail"
                  id="agreement_mail"
                  checked={form.agreement_mail}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="agreement_mail">
                  w formie elektronicznej (mail) na wskazany adres mailowy{" "}
                </label>
              </div>

              <div className="d-flex align-items-center">
                <input
                  disabled={form.phone ? false : true}
                  className="custom-checkbox"
                  id="agreement_call"
                  type="checkbox"
                  name="agreement_call"
                  checked={form.agreement_call}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="agreement_call">
                  drogą telefoniczną, na udostępniony numer telefonu{" "}
                </label>
              </div>
              <div className="d-flex align-items-center">
                <input
                  disabled={form.phone ? false : true}
                  className="custom-checkbox"
                  id="agreement_sms"
                  type="checkbox"
                  name="agreement_sms"
                  checked={form.agreement_sms}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="agreement_sms">
                  w formie SMS, na udostępniony numer telefonu
                </label>
              </div>

              <MyBtn className="my-4" type="submit">
                WYŚLIJ
              </MyBtn>
              <MyAnchor className="text-center">
                Kto będzie administratorem Twoich danych osobowych?
              </MyAnchor>
            </form>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

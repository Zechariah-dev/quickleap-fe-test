import { useField } from "formik";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import {
  CardNumberFormatter,
  ExpiryDateFormatter,
} from "../../helpers/formatter";
import "./style.css";

export default function Input({ label, type = "text", ...props }) {
  const [field, meta] = useField(props);
  const { name } = field;

  const check = name === "password" || name === "confirmPassword";

  return (
    <div className="input-container">
      <label className="label" for={name}>
        {label}
      </label>
      <div style={{ display: "inline-flex" }}>
        <input
          {...field}
          {...props}
          type={check && props.passwordstate[name] ? "text" : type}
          className="input"
          onChange={(e) => {
            if (e.target.name === "cardNumber")
              e.target.value = CardNumberFormatter(e.target.value);

            if (e.target.name === "expiryDate")
              e.target.value = ExpiryDateFormatter(e.target.value);

            field.onChange(e);
          }}
          style={{ border: meta.error && meta.touched && "1px solid red" }}
        />
        {check && (
          <button
            style={{
              display: check ? "block" : "none",
            }}
            className="show-password"
            type="button"
            onClick={() => {
              const { setpasswordstate, passwordstate } = props;

              setpasswordstate({
                ...passwordstate,
                [name]: !passwordstate[name],
              });
            }}
          >
            {props.passwordstate[name] ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </button>
        )}
      </div>

      {meta.error && meta.touched && <div className="error">{meta.error}</div>}
    </div>
  );
}

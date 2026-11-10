import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";
import { handleToken } from "../store/slices/authSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payments = () => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
    });
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    } else {
      dispatch(handleToken(session.token));
    }
  };

  return (
    <button onClick={handleClick} className="btn">
      Add Credits
    </button>
  );
};

export default Payments;

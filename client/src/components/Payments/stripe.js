import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_fOctpRTcO9h31ZexdMNGXwti00gQNOlQaP");

const StripeComponent = (props) => {
  const [status, setStatus] = useState("Please wait...");

  const { pageid, orderid } = props.match.params;
  useEffect(() => {
    document.title = "Payment Page";
    const createSession = async () => {
      const stripe = await stripePromise;

      // Call your backend to create the Checkout Session
      const response = await fetch("/payments/stripe/create", {
        method: "POST",
        body: JSON.stringify({
          pageid,
          orderid,
        }),
      });

      const session = await response.json();
      try {
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        }
      } catch (error) {
        setStatus(session.status);
      }
    };
    createSession();
  }, []);

  return <>{status}</>;
};

export default StripeComponent;

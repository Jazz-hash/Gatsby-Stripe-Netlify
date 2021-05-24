import React from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_oCAxK0CcUTHFsfOEu531pLYK00rYFcE5uu")

const CheckoutSession = () => {
  const redirectToCheckout = async () => {
    const stripe = await stripePromise

    const response = await fetch("/.netlify/functions/checkout")
    const data = await response.json()

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    })
  }

  return (
    <div>
      <div>Hello Checkout Session !!</div>
      <button onClick={redirectToCheckout}> Checkout</button>
    </div>
  )
}

export default CheckoutSession

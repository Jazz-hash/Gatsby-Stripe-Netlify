import * as React from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_oCAxK0CcUTHFsfOEu531pLYK00rYFcE5uu")

const IndexPage = () => {
  const redirectToCheckout = async () => {
    const stripe = await stripePromise

    const result = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1Iujz0AcdubkaULyk76yd2ZR", quantity: 1 }],
      successUrl: `http://localhost:8000/`,
      cancelUrl: `http://localhost:8000/`,
    })
  }

  return (
    <div>
      <div>Hello World !!</div>
      <button onClick={redirectToCheckout}> Checkout</button>
    </div>
  )
}

export default IndexPage

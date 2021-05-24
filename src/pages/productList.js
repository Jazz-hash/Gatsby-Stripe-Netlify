import * as React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { graphql, useStaticQuery } from "gatsby"

const stripePromise = loadStripe("pk_test_oCAxK0CcUTHFsfOEu531pLYK00rYFcE5uu")

const ProductsPage = ({ location }) => {
  const data = useStaticQuery(
    graphql`
      query ProductPrices {
        prices: allStripePrice(
          filter: { active: { eq: true } }
          sort: { fields: unit_amount }
        ) {
          edges {
            node {
              id
              active
              currency
              unit_amount
              product {
                id
                name
                images
              }
            }
          }
        }
      }
    `
  )
  const checkout = async id => {
    console.log(id)
    const stripe = await stripePromise

    const result = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: id, quantity: 1 }],
      successUrl: `${location.origin}/paymentSuccess`,
      cancelUrl: `${location.origin}/paymentError`,
    })
  }

  console.log(data)
  return (
    <div>
      <div>Product List !! </div>
      {data.prices.edges.map(({ node: price }) => (
        <div key={price.id}>
          <p>Product Name: {price.product.name}</p>
          <p>Product Price: {price.unit_amount}</p>
          <p>
            <img src={price.product.images[0]} width="100px" height="100px" />
          </p>
          <p>
            <button
              onClick={() => {
                checkout(price.id)
              }}
            >
              Checkout
            </button>
          </p>
        </div>
      ))}
    </div>
  )
}

export default ProductsPage

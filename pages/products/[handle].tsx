import React from 'react'
import { useRouter } from 'next/router'
import Layout from "components/common/Layout";

const Product: React.FC = () => {
  const router = useRouter();
  const { handle } = router.query
  return (
    <Layout>
      <article className="product">
        <section className="md:grid md:grid-cols-2">
          <div className="product__images">
            
          </div>
          <div className="product__details">

          </div>
        </section>
        { handle }
      </article>
    </Layout>
  )
}

export default Product;
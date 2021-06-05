import React from 'react'
import Layout from "components/common/Layout"

const home: React.FC = () => (
  <Layout>
    <div>ただのトップページです。</div>
    <a href="/collections/all">
      カタログ(/collections/allへ)
    </a>
  </Layout>
)

export default home;
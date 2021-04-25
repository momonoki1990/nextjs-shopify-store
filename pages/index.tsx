import React from 'react'
import Layout from "../components/Layout"
import Link from 'next/link'

const home: React.FC = () => (
  <Layout>
    <div>ただのトップページです。</div>
    <Link href="/collections/all">
      カタログ(/collections/allへ)
    </Link>
  </Layout>
)

export default home;
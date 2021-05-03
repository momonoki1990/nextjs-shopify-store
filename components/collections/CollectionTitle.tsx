import React from 'react'

type Props = {
  title: string
}

const CollectionTitle = ({ title }) => (
  <h1 className="font-semibold mb-14 text-center text-gray-700 text-4xl">{ title }</h1>
);

export default CollectionTitle
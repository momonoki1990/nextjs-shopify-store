import React from 'react'
import { GetServerSideProps } from 'next'

export type Props = {
  text: string
}

const collectionAll = ({ text }: Props) => (
  <>
    <div>collection/allのページです</div>
    <div>test</div>
    <div>{text}</div>
  </>
);


export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      text: "hello",
    }
  };
};


export default collectionAll
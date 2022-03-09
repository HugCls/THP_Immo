import { useEffect } from "react"
import Layout from "../components/Layout"
import useFetchGet from "../src/hooks/useFetch"

const PageContact = () => {

  const {isLoading, apiData: data, serverError } = useFetchGet('/api/post/getAllPosts')

  console.log(data)

  return (
    <Layout><h1>Contact</h1></Layout>
  )
}

export default PageContact
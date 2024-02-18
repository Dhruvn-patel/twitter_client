import {GraphQLClient} from 'graphql-request'

export const graphQLClient=new GraphQLClient(
    `http://localhost:8000/graphql`
    ,{
 headers:()=>({
    Authorization:`Bearer ${typeof window!='undefined'?
    window.localStorage.getItem("twitter_token")
    :""}`
 })
}
)
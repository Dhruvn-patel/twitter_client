import { graphql } from "../../gql"
// codegen generate types for schemas 
export  const verifyUserGoogleTokenQuery=`
#graphql
query verifyUserGoogleTokenQuery($token:String!){
    verfiyGoogleToken(token:$token)
}
`
export const getCurrentUser=`
 #graphql
query GetCurrentUser {
    getCurrentUser {
      email
      firstName
      id
      lastName
      profileImg
    }
  }
`
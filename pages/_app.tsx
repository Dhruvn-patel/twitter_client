import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import {GoogleOAuthProvider} from '@react-oauth/google'
const inter = Inter({ subsets: ["latin"] });
import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient=new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider  clientId="466822532146-94qafh5bueip6p779dgcudd3flvaqec0.apps.googleusercontent.com">
      <Component {...pageProps} />
      <Toaster position="top-center" />
      </GoogleOAuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  );
}

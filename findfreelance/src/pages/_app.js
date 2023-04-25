import '@/styles/globals.scss';
import { useRouter } from "next/router";
import MainLayout from '@/components/Layouts/MainLayout';
import AuthLayout from '@/components/Layouts/AuthLayout';
// import { UserContextProvider } from '@/context/UserContext';

export default function App({ Component, pageProps }) {
 
  const router = useRouter();

  return (
    <>

      {/* <UserContextProvider> */}
      {
        router.asPath.startsWith("/auth") ? (
          <AuthLayout>
              <Component {...pageProps} />
          </AuthLayout>
        )
        : (
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
        )
        }
      {/* </UserContextProvider> */}
    </>
  )
}
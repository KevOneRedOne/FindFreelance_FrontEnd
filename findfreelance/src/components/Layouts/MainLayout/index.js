import Header from '@/components/Partials/Header';
import Footer from '@/components/Partials/Footer';

const MainLayout = ({children}) => {
  
    return (
      <>
        <Header/>
          {children}
        <Footer/>
      </>
    );
  }
  
export default MainLayout;
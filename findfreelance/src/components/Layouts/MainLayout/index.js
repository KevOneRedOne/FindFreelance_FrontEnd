import Header from '@/components/Partials/Header'

const MainLayout = ({children}) => {
  
    return (
      <>
        <Header/>
        {children}
      </>
    );
  }
  
export default MainLayout;
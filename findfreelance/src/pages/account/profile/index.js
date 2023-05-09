import { useState, useContext } from 'react';
import userContext from '@/context/userContext';
import userdetails from '@/components/UI/User/DetailsUser';


const Index = () => {
    const {user, isCompany, isFreelance, isAdmin, isLogged} = useContext(userContext);

    return (
        <>
            <main>
                <h1>Mon Profil</h1>



            </main>
        </>
    );
    
};

export default Index;
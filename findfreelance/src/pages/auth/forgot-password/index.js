import styles from './index.module.scss';
import React, { useState } from 'react';
import Link from 'next/link';
import Title from '@/components/UI/Title';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Notification from '@/components/UI/Notification';
import Loading from '@/components/UI/Loading';
import useFetch from '@/hooks/useFetch';
import Logo from '@/../public/images/logo/letter-f.png';
import image from '@/../public/images/password.jpg';

const Index = () => {

    const [userForm, setUserForm] = useState({
        email: ""
    });

    //TODO: Finish this function and in the API
    const { fetchData, data, error, loading, typeofError } = useFetch({
        url: "/auth/user/forgot_password",
        method: "PUT",
        body: userForm,
        token: null
    });

    return (
        <>
            <main className={styles.signin_layout}>
                <div className={styles.signin_layout__form}>
                    <div className={styles.signin_layout__form__header}>
                    <Link href={'/'}><img src={Logo.src} loading="lazy" alt=""/></Link>
                    <p><Link href={'login'}>Se connecter</Link></p>
                    </div>
                    <div className={styles.signin_layout__form__content}>
                        <Loading isLoad={loading} />
                        <Title Level="h2" title="Mot de passe oublié" />
                        <form onSubmit={(e) => {submitLogin(e)}}>
                            <Input 
                                label={"Email"}
                                type="email"
                                name={"email"}
                                isRequired={true}
                                onChange={(e) => handleChange(e)}
                                value={userForm.email}
                            />
                            <br />
                            <div className={styles.submit_btn}>
                                <Button 
                                    type="submit"
                                    title="Reinitialiser"
                                    className="btn__secondary"
                                /> 
                            </div>
                        </form>
                    </div>
                    {
                        typeofError === 'success' && data.success && (
                            <Notification type="success" message={data.message} />
                        ) || typeofError === 'error' && error && (
                            <Notification type="error" message={error.message} />
                        ) || typeofError === 'warning' && error && (
                            <Notification type="warning" message={error.message} />
                        )
                    }
                </div>
                <div className={styles.signin_layout__image}>
                    <img src={image.src} alt="paswword" />
                </div>
            </main>
        </>
  );


}; 

export default Index;
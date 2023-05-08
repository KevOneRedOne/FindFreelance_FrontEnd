import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import Logo from "@/../public/images/logo/letter-f.png";
import image from "@/../public/images/login.jpg";
import Title from "@/components/UI/Title";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import Loading from "@/components/UI/Loading";
import UserContext from "@/context/userContext";

const Index = () => {
    const router = useRouter();
    const {login} = useContext(UserContext);

    const [userForm, setUserForm] = useState({
        email: '',
        password: '',
    });
    const [token, setToken] = useState(null);


    const { fetchData, data, error, loading, typeofError } = useFetch({
        url: "/auth/login",
        method: "POST",
        body: userForm,
        token: null
    });

    const { 
        data: user, 
        error: errorUser, 
        loading: loadingUser, 
        typeofError: typeofErrorUser,
        fetchData: fetchDataUser 
    } = useFetch({url: `/user/me`, method: "GET", token: token, body: null});

    useEffect(() => {
        if (data.token){
            setToken(data.token);
            localStorage.setItem("token", data.token);
        }
        console.log(data);

    }, [data]);

    useEffect(() => {
        fetchDataUser();
        if (user.success) {
            login({
                firstName: user.user.firstName,
                lastName: user.user.lastName,
                email:user.user.email,
                user: user.user
            })
            router.push('/');
        }
  },[token,user])
 
    const handleChange = (e) => {
        setUserForm({
          ...userForm,
          [e.target.name]: e.target.value
        })
    }

    const submitLogin = (e) => {
        e.preventDefault();
        fetchData();
        
    }

    return (
        <>
            <main className={styles.signin_layout}>
                <div className={styles.signin_layout__form}>
                    <div className={styles.signin_layout__form__header}>
                    <Link href={'/'}><img src={Logo.src} loading="lazy" alt=""/></Link>
                    <p><Link href={'register'}>S'incrire</Link></p>
                    </div>
                    <div className={styles.signin_layout__form__content}>
                        <Loading isLoad={loading} />
                        <Title Level="h2" title="Connexion" />
                        <form onSubmit={(e) => {submitLogin(e)}}>
                            <Input 
                                label={"Email"}
                                type="email"
                                name={"email"}
                                isRequired={true}
                                onChange={(e) => handleChange(e)}
                                value={userForm.email}
                            />
                            <Input 
                                label={"Mot de passe"}
                                type="password"
                                name={"password"}
                                isRequired={true}
                                onChange={(e) => handleChange(e)}
                                value={userForm.password}

                            />
                            <Link href={'forgot-password'}><p>Mot de passe oublié ?</p></Link>
                            <div className={styles.submit_btn}>
                                <Button 
                                    type="submit"
                                    title="Se connecter"
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
                    <img src={image.src} alt="login" />
                </div>
            </main>
        </>
    )
}

export default Index
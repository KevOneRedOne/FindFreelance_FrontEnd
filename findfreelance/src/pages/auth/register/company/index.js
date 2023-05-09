import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import useFetch from "@/hooks/useFetch";
import styles from "./index.module.scss";
import Title from "@/components/UI/Title";
import Logo from "@/../public/images/logo/letter-f.png";
import image from "@/../public/images/company.jpg";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import UserForm from "@/components/UI/Form/UserForm/";
import CompanyForm from "@/components/UI/Form/CompanyForm/";


const Index = () => {
    const router = useRouter();
    const [userForm, setUserForm] = useState({
        lastName: '' ,
        firstName: '' ,
        email: '',
        password: '' ,
        phoneNumber: '', 
        address: {
            street: '',
            city: '', 
            zipCode: '' ,
            country: '' ,
        },
    });
    const [companyForm, setCompanyForm] = useState({
        socialReason:'',
        socialStatus:'' ,
        socialCapital: 0,
        siret:0,
        address: {
            street: '',
            city: '' ,
            zipCode: '',
            country: '', 
        }
    });
    const [registerStep, setRegisterStep] = useState(0);
    const [errorPwd, setError] = useState(false);
    const [token, setToken] = useState(null);


    const { fetchData, data, error, loading } = useFetch({
        url: "/auth/register/user_inCompany",
        method: "POST",
        body: {
            user: userForm,
            company: companyForm
        },
        token: null
    });

    const handleChangeUser = (e) => {
        if (e.target.name === 'street' || e.target.name === 'city' || e.target.name === 'zipCode' || e.target.name === 'country') {
            setUserForm((prevState) => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [e.target.name]: e.target.value
                }
            }));
        } else {
            setUserForm({
                ...userForm,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleChangeCompany = (e) => {
        if (e.target.name === 'street' || e.target.name === 'city' || e.target.name === 'zipCode' || e.target.name === 'country') {
            setCompanyForm((prevState) => ({
              ...prevState,
              address: {
                ...prevState.address,
                [e.target.name]: e.target.value
              }
            }));
        } else {
            setCompanyForm({
                ...companyForm,
                [e.target.name]: e.target.value
            });
        }
    };

    const submitRegister = (e) => {
        e.preventDefault();
        if(userForm.password !== userForm.confirmPassword && userForm.confirmPassword !== undefined ){
            setError(true);
        } else {
            setRegisterStep(registerStep + 1);
        }
        if( registerStep === 1 ){
            fetchData();
            setRegisterStep(0);
        }
    };

    useEffect(() => {
        if (data !== undefined && data !== null && data !== {} && data.token !== undefined ) {
            setToken(data.token);
            localStorage.setItem('token', data.token);
            router.push('/auth/login');
        } else {
            setRegisterStep(0);
        }
    }, [data, error, data.success, token]);
  


    return (
        <>
            <main className={styles.signup_layout}>
                <div className={styles.signup_layout__form}>
                    <div className={styles.signup_layout__form__header}>
                        <Link href={'/'}><img src={Logo.src} loading="lazy" alt=""/></Link>
                        <p><Link href={'../../../auth/login'}>Se connecter</Link></p>
                    </div>
                    <div className={styles.signup_layout__form__content}>
                        <Title Level="h2" title="Vos informations" />
                        <form onSubmit={(e) => {submitRegister(e)}}>
                            {
                                registerStep === 0 && (
                                    <>
                                        <UserForm userForm={userForm} handleChange={handleChangeUser}/>
                                        <div className={styles.signup_layout__form__content_btn}>
                                            <Button
                                                type="submit"
                                                title="Etape suivante"
                                                className="btn__secondary"
                                                onClick={() => setRegisterStep(registerStep + 1)}
                                            />
                                        </div>
                                    </>
                                )
                            }
                            {
                                registerStep === 1 && (
                                    <>
                                        <CompanyForm companyForm={companyForm} handleChange={handleChangeCompany}/>
                                        <div className={styles.signup_layout__form__content_btn}>
                                            <Button
                                                type="button"
                                                title="Précédent"
                                                className="btn__tertiary"
                                                handleClick={() => setRegisterStep(0)}
                                            />
                                            <Button
                                                type="submit"
                                                title="S'incrire"
                                                className="btn__secondary"
                                            />
                                        </div>
                                    </>
                                )
                            }
                        </form>
                        {
                            error && (
                                <Notification type="error" message={error.message} />
                            ) ||  errorPwd && (
                                <Notification type="warning" message="Les mots de passe ne correspondent pas" />
                            )   
                        }
                    </div>
                </div>
                <div className={styles.signin_layout__image}>
                    <img src={image.src} alt="register_company" />
                </div>
            </main>
        </>

    )
}

export default Index;

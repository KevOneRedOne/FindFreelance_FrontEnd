import Link from "next/link";
import {useRouter} from "next/router";
import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Title from "@/components/UI/Title";
import Logo from "@/../public/images/logo/letter-f.png";
import image from "@/../public/images/freelance.jpg";
import Button from "@/components/UI/Button";
import UserForm from "@/components/UI/Form/UserForm";
import FreelanceForm  from "@/components/UI/Form/FreelanceForm";
import Notification from "@/components/UI/Notification";


const Index = () => {
    const router = useRouter();
    const [registerStep, setRegisterStep] = useState(0);
    const [errorPwd, setError] = useState(false);
    const [token, setToken] = useState(null);
    const [userForm, setUserForm] = useState({
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: {
            street: '',
            city: '',
            zipCode: '',
            country: ''
        },
    });
    const [freelanceForm, setFreelanceForm] = useState({
        socialReason: '',
        socialStatus: '',
        dailyRate: 0,
        yearsOfExperience: 0,
        jobs: [],
        skills: [],
    });
    const { fetchData, data, error, loading } = useFetch({
        url: "/auth/register/freelancer",
        method: "POST",
        body: {
            user: userForm,
            freelance: freelanceForm
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

    const handleChangeFreelance = (e) => {
        if (e.target.name === 'street' || e.target.name === 'city' || e.target.name === 'zipCode' || e.target.name === 'country') {
            setFreelanceForm((prevState) => ({
              ...prevState,
              address: {
                ...prevState.address,
                [e.target.name]: e.target.value
              }
            }));
        } else {
            setFreelanceForm({
                ...freelanceForm,
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
                        <p><Link href={'/auth/login'}>Se connecter</Link></p>
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
                                        <FreelanceForm freelanceForm={freelanceForm} handleChange={handleChangeFreelance}/>
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
                    <img src={image.src} alt="register_freelance" />
                </div>
            </main>
        </>

    )
}

export default Index;

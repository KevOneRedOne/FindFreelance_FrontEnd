import styles from "./index.module.scss";
import Link from "next/link";
import Logo from "../../../../public/images/logo/letter-f.png";
import image from "../../../../public/images/login.jpg";
import Title from "@/components/UI/Title";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Notification from "@/components/UI/Notification";
import Loading from "@/components/UI/Loading";

const Index = () => {

    // TODO: set a state for the form
    // TODO: connect the form to the api

    return (
        <>
            <main className={styles.signin_layout}>
                <div className={styles.signin_layout__form}>
                    <div className={styles.signin_layout__form__header}>
                    <Link href={'/home'}><img src={Logo.src} loading="lazy" alt=""/></Link>
                    <p><Link href={'register'}>S'incrire</Link></p>
                    </div>
                    <div className={styles.signin_layout__form__content}>
                        {/* TODO: set a variable for the isLoad */}
                        <Loading isLoad={false} />
                        <Title Level="h2" title="Connexion" />
                        {/* TODO: remove les console log */}
                        <form onSubmit={(e) => {console.log(e)}}>
                            <Input 
                                label={"Email"}
                                type="email"
                                name={"email"}
                                isRequired={true}
                                onChange={(e) => handleChange(e)}
                            />
                            <Input 
                                label={"Mot de passe"}
                                type="password"
                                name={"password"}
                                isRequired={true}
                                onChange={(e) => {console.log(e)}}

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
                        // TODO : replace true and message by error state
                        true && (
                            <Notification type="warning" message={"coucou"}/>
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
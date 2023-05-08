import Link from "next/link";
import styles from "./../index.module.scss";
import Title from "@/components/UI/Title";
import Input from "@/components/UI/Input";
import Logo from "@/../public/images/logo/letter-f.png";
import image from "@/../public/images/company.jpg";
import Select from "@/components/UI/Select";
import Button from "@/components/UI/Button";
import indicatifs from "@/utils/selectOptions/indicatifs.js";


const Index = () => {

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
                        <form onSubmit={(e) => {console.log(e)}}>
                            <div className={styles.signup_layout__form__content_user_data}>
                                <Input
                                    label={"Nom"}
                                    type="text"
                                    name={"lastName"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                                <Input
                                    label={"Prénom"} 
                                    type="text"
                                    name={"firstName"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                            </div>
                            <div className={styles.signup_layout__form__content_user_number}>
                                <Select 
                                    label={"Indicateur Tél."}
                                    name={"indicatif"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                    options={indicatifs}
                                />
                                <Input
                                    label={"Tel. Professionnel"}
                                    type="tel"
                                    name={"tel"}
                                    pattern={"^9[0-9]{7}"} 
                                    maxlength={10}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                            </div>
                            <div className={styles.signup_layout__form__content_user_email}>
                                <Input
                                    label={"Email Professionnel"}
                                    type="email"
                                    name={"email"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                                <div className={styles.signup_layout__form__content_user_pwd}>
                                    <Input
                                        label={"Mot de passe"}
                                        type="password"
                                        name={"password"}
                                        isRequired={true}
                                        onChange={(e) => {console.log(e)}}
                                    />
                                    <Input
                                        label={"Confirmer mot de passe"}
                                        type="password"
                                        name={"confirmPassword"}
                                        isRequired={true}
                                        onChange={(e) => {console.log(e)}}
                                    />
                                </div>
                            </div>
                            <div className={styles.signup_layout__form__content_user_address}>
                                <Input
                                    label={"Adresse"}
                                    type="text"
                                    name={"address"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                                <div className={styles.signup_layout__form__content_user_address_zip}>
                                    <Input
                                        label={"Code postal"}
                                        type="text"
                                        name={"postalCode"}
                                        isRequired={true}
                                        onChange={(e) => {console.log(e)}}
                                    />
                                    <Input
                                        label={"Ville"}
                                        type="text"
                                        name={"city"}
                                        isRequired={true}
                                        onChange={(e) => {console.log(e)}}
                                    />
                                </div>
                                <Input
                                    label={"Pays"}
                                    type="text"
                                    name={"country"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                            </div>
                            <div className={styles.signup_layout__form__content_btn}>
                                <Button 
                                    type="submit"
                                    title="Etape suivante"
                                    className="btn__secondary"
                                    onClick={(e) => {console.log(e)}}
                                />

                                <Link href={'/auth/register/company/step2'}>Etape suivante</Link>
                            </div>
                        </form>
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

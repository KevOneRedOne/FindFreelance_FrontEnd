import Link from "next/link";
import styles from "./../index.module.scss";
import Title from "@/components/UI/Title";
import Input from "@/components/UI/Input";
import Logo from "@/../public/images/logo/letter-f.png";
import image from "@/../public/images/freelance.jpg";
import Select from "@/components/UI/Select";
import Button from "@/components/UI/Button";
import companies from "@/utils/selectOptions/companies";

const Index = () => {
    const socialStatus= [
        {value: "EI", label: "EI"},
        {value: "EIRL", label: "EIRL"},
        {value: "EURL", label: "EURL"},
    ]
        



    return (
        <>
            <main className={styles.signup_layout}>
                <div className={styles.signup_layout__form}>
                    <div className={styles.signup_layout__form__header}>
                        <Link href={'/'}><img src={Logo.src} loading="lazy" alt=""/></Link>
                        <p><Link href={'/auth/login'}>Se connecter</Link></p>
                    </div>
                    <div className={styles.signup_layout__form__content}>
                        <Title Level="h2" title="Vos informations Freelance" />
                        <form onSubmit={(e) => {console.log(e)}}>
                            <div className={styles.signup_layout__form__company}>
                                <Select
                                    label={"Statut social"}
                                    name={"companyType"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                    options={socialStatus}
                                />
                            </div>
                            <Input
                                label={"Raison sociale"}
                                type="text"
                                name={"companyName"}
                                isRequired={true}
                                onChange={(e) => {console.log(e)}}
                            />
                            <div className={styles.signup_layout__form__company}>
                                <Input
                                    label= {"Année d'expérience"}
                                    type="number"
                                    name={"experience"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                                <Input
                                    label= {"Honoraire journalier"}
                                    type="number"
                                    name={"honor"}
                                    isRequired={true}
                                    onChange={(e) => {console.log(e)}}
                                />
                            </div>

                            <div className={styles.signup_layout__form__content_btn}>
                                <Link href={'/auth/register/freelance/step1'}>Précédent</Link>
                                <Button 
                                    type="submit"
                                    title={"S'incrire"}
                                    className="btn__tertiary"
                                    onClick={(e) => {console.log(e)}}
                                />
                            </div>
                        </form>
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

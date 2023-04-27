
import styles from "./index.module.scss";
import Link from "next/link";
import Title from "@/components/UI/Title";
import Logo from "../../../../public/images/logo/letter-f.png";
import Image from "../../../../public/images/BusinessPeople.jpg";
import chevronRight from "../../../../public/images/icons/chevronRight.png";


const Index = () => {
    return (
        <>
            <main className={styles.signup_layout}>
                <div className={styles.signup_layout__form}>
                    <div className={styles.signup_layout__form__header}>
                        <Link href={'/home'}><img src={Logo.src} loading="lazy" alt=""/></Link>
                        <p><Link href={'login'}>Se connecter</Link></p>
                    </div>
                    <div className={styles.signup_layout__form__content}>
                        <Title Level="h2" title="Quelle est votre situation ?" />
                        <br />
                        <div className={styles.signup_layout__form__content__cards}>
                                <Link className={styles.signup_layout__form__content__card_link} href={'/auth/register/company'}>
                                    <img src="//dam.malt.com/signup/identity-client-v2" loading="lazy" alt=""/>
                                    <div className={styles.signup_layout__form__content__card_content}>
                                        <div className={styles.signup_layout__form__content__card_title}>
                                            Entreprise</div>
                                        <div className={styles.signup_layout__form__content__card_subtitle}>
                                            Je recherche des freelances</div>
                                    </div>
                                    <img className={styles.arrow} src={chevronRight.src} loading="lazy" alt=""/>
                                </Link>
                                <Link className={styles.signup_layout__form__content__card_link} href={'/auth/register/freelance'}>
                                    <img src="//dam.malt.com/signup/identity-freelancer-v2" loading="lazy" alt=""/>
                                    <div className={styles.signup_layout__form__content__card_content}>
                                        <div className={styles.signup_layout__form__content__card_title}>
                                            Freelance</div>
                                        <div className={styles.signup_layout__form__content__card_subtitle}>
                                            Je souhaite créer mon profil</div>
                                    </div>
                                    <img className={styles.arrow} src={chevronRight.src} loading="lazy" alt=""/>
                                </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.signup_layout__image}>
                    <img src={Image.src} loading="lazy" alt=""/>
                </div>

            </main>
        </>
    )
}   

export default Index;

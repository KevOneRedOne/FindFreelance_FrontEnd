import { useRouter } from "next/router";
import styles from "./index.module.scss";
import Button from "@/components/UI/Button";
import NavItem from "@/components/UI/NavItem";
import Logo from "../../../../public/images/logo/letter-f.png";

const Index = () => {
  const router = useRouter();
  const isLogged = false;

  const menu = [
    {
      title: "Home",
      link: "/",
      className: styles.nav__item,
    },
    {
      title: "À propos",
      link: "./about",
      className: styles.nav__item,
    },
    {
      title: "Contact",
      link: "./contact",
      className: styles.nav__item,
    },
    {
      title: "S'incrire",
      link: "./auth/register",
      className: styles.nav__item,
    }
  ];
  return (
    <div className={`${styles.wrapper} flex`}>
      <div className={styles.logo}>
        <h2>FindFreelance</h2>
        <img src={Logo.src} alt="FindFreelance" />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {menu.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
          {isLogged ? (
            <li>
              <span>Bonjour {user && user.firstName}</span>
              <Button
                type="button"
                title="Se déconnecter"
                className="btn__primary"
                handleClick={() => logout()}
              />
            </li>
          ) : (
            <li className={styles.nav__item}>
              <Button
                type="button"
                title="Se connecter"
                className="btn__secondary"
                handleClick={() => router.push("/auth/login")}
              />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Index;

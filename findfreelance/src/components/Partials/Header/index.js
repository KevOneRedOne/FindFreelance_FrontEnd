import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import styles from "./index.module.scss";
import Button from "@/components/UI/Button";
import NavItem from "@/components/UI/NavItem";
import Logo from "@/../public/images/logo/letter-f.png";
import UserContext from "@/context/userContext";
import Link from "next/link";

const Index = () => {
  const router = useRouter();
  const {user, isLogged, logout, isAdmin, isFreelancer, isCompany} = useContext(UserContext);
  
  const [menu, setMenu] = useState([]);

  const menuDefault = [
    {
      title: "Accueil",
      link: "/",
      className: styles.nav__item,
    },
    {
      title: "S'incrire",
      link: "./auth/register",
      className: styles.nav__item,
    },
  ];

  const menuLoggedFreelance = [
    {
      title: "Dashboard",
      link: "./dashboard/freelance",
      className: styles.nav__item,
    }
  ];

  const menuLoggedCompany = [
    {
      title: "Dashboard",
      link: "./dashboard/company",
      className: styles.nav__item,
    }
  ];

  const menuLoggedAdmin = [
    {
      title: "Les utilisateurs",
      link: "./admin/users",
      className: styles.nav__item,
    },
    {
      title: "Les métiers",
      link: "./admin/jobs",
      className: styles.nav__item,
    },
    {
      title: "Les compétences",
      link: "./admin/skills",
      className: styles.nav__item,
    },
    {
      title: "Les entreprises",
      link: "./admin/companies",
      className: styles.nav__item,
    },
    {
      title: "Les missions",
      link: "./admin/missions",
      className: styles.nav__item,
    }
  ];
    

  useEffect(() => {
    if (isAdmin) {
      setMenu([...menuLoggedAdmin]);
    } else if (isLogged) {
      if (isFreelancer) {
        setMenu([...menuLoggedFreelance]);
      } else if (isCompany) {
        setMenu([...menuLoggedCompany]);
      }
    } else {
      setMenu([...menuDefault]);
    }
    
  }, [user, isLogged, isAdmin, isFreelancer, isCompany]);


  return (
    <div className={`${styles.wrapper} flex`}>
      <div className={styles.logo}>
        <img src={Logo.src} alt="FindFreelance Logo" />
        <h1>FindFreelance</h1>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {
            menu.map((item, index) => (
              <NavItem key={index} item={item} />
            ))
          }
          { isLogged ? (
            <li>
              <Link href="/account/profile"><span>Bonjour, {user && user.firstName}</span></Link>
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

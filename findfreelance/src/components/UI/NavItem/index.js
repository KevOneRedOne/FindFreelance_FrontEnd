import Link from "next/link";

const Index = ({item}) => {
  return (
    <li className={item.className}>
      <Link href={item.link}>
        {item.title}
      </Link>
    </li>
  );
}

export default Index;

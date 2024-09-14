"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();
import { Icons } from "../ui/icons";

interface MenuItem {
  href: string;
  icon: JSX.Element;
  label: string;
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const menuItems: MenuItem[] = [
    {
      href: "/home",
      icon: <Icons type="House" size={30} weight="fill" className="mr-2" />,
      label: "Inicio",
    },
    {
      href: "/report",
      icon: (
        <Icons type="BookBookmark" size={30} weight="fill" className="mr-2" />
      ),
      label: "Reporte Diário",
    },
    {
      href: "/teachers",
      icon: (
        <Icons type="GraduationCap" size={30} weight="fill" className="mr-2" />
      ),
      label: "Professores",
    },
    {
      href: "/students",
      icon: <Icons type="UsersFour" size={30} weight="fill" className="mr-2" />,
      label: "Alunos",
    },
    {
      href: "/classes",
      icon: (
        <Icons
          type="ChalkboardTeacher"
          size={30}
          weight="fill"
          className="mr-2"
        />
      ),
      label: "Turmas",
    },
    {
      href: "/settings",
      icon: <Icons type="Gear" size={30} weight="fill" className="mr-2" />,
      label: "Configurações",
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <div
      key={item.href}
      className={`flex items-center pt-9    ${
        pathname === item.href ? "text-primary" : "text-zinc-500"
      }`}
    >
      <Link href={item.href} className="flex items-center">
        {item.icon}
        <p>{item.label}</p>
      </Link>
    </div>
  );

  return (
    <div className="px-7 sticky top-0  bg-white h-screen flex flex-col justify-between items-center pb-16 shadow-lg z-50 w-64  ">
      <div className="flex-grow">{menuItems.map(renderMenuItem)}</div>
      <div className="mt-auto">
        <button onClick={handleSignOut}>
          <Icons
            type="SignOut"
            size={30}
            className="text-cancel cursor-pointer"
            weight="fill"
          />
        </button>
      </div>
    </div>
  );
}

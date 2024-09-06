import { BrandLogo } from "./BrandLogo";
import { UserInfo } from "./UserInfo";

export function Header() {
  return (
    <header className="bg-[#FEFEFE] flex items-center  py-7 px-12 justify-between w-full ">
      <BrandLogo />
      <UserInfo name="Joao Paulo" role="Secretario" avatarSrc="/avatar.png" />
    </header>
  );
}

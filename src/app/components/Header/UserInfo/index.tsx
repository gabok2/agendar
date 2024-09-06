import { Avatar } from "@/app/components/ui/Avatar";
import { Typography } from "@/app/components/ui/Typography";

interface UserInfoProps {
  readonly name: string;
  readonly role: string;
  readonly avatarSrc: string;
}

export function UserInfo({ name, role, avatarSrc }: UserInfoProps) {
  return (
    <div className="flex items-center">
      <Avatar src={avatarSrc} alt={name} size={42} />
      <div className="flex flex-col pl-5">
        <Typography variant="body" color="text-gray-500">
          {name}
        </Typography>
        <Typography variant="caption" color="text-gray-400">
          {role}
        </Typography>
      </div>
    </div>
  );
}

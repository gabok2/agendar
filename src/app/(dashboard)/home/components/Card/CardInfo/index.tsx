import { Typography } from "@/app/components/ui/Typography";

interface CardInfoProps {
  readonly title: string;
  readonly number: string;
  readonly IconComponent?: React.ElementType;
}

export function CardInfo({ title, number, IconComponent }: CardInfoProps) {
  return (
    <div className="flex flex-col ">
      {IconComponent && (
        <div className="p-1 rounded-lg bg-blue-500 bg-opacity-20 w-fit ">
          <IconComponent size={38} className="text-primary" weight="fill" />
        </div>
      )}
      <div className="flex space-x-8 items-center">
        <div className=" pt-5  space-y-2 ">
          <Typography variant="body" color="text-gray-500 ">
            {title}
          </Typography>
          <Typography variant="h2" fontWeight="medium" color="text-gray-700">
            {number}
          </Typography>
        </div>
      </div>
    </div>
  );
}

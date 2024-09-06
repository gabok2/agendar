import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size: number;
}

export function Avatar({ src, alt, size }: AvatarProps) {
  return (
    <Image
      className="rounded-full"
      src={src}
      alt={alt}
      width={size}
      height={size}
    />
  );
}

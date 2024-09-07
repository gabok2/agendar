import Image from "next/image";

interface AvatarProps {
  readonly src: string;
  readonly alt: string;
  readonly size: number;
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

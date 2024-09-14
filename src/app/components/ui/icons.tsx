import React from "react";
import {
  BookBookmark,
  ChalkboardTeacher,
  Gear,
  GraduationCap,
  House,
  SignOut,
  UsersFour,
  MagnifyingGlass,
  DotsThreeOutlineVertical,
  CaretRight,
  CaretLeft,
  CaretDown,
  CaretUp,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  Lock,
} from "@phosphor-icons/react/dist/ssr";
import { IconType } from "@/app/utils/types/inputTypes";

interface IconsProps {
  readonly type: IconType;
  readonly size?: number;
  readonly weight?: "fill" | "regular";
  readonly className?: string;
}

export function Icons({ type, size = 24, className, weight }: IconsProps) {
  const iconProps = {
    width: size,
    height: size,
    className,
    weight,
  };

  switch (type) {
    case "BookBookmark":
      return <BookBookmark {...iconProps} />;
    case "ChalkboardTeacher":
      return <ChalkboardTeacher {...iconProps} />;
    case "Gear":
      return <Gear {...iconProps} />;
    case "GraduationCap":
      return <GraduationCap {...iconProps} />;
    case "House":
      return <House {...iconProps} />;
    case "SignOut":
      return <SignOut {...iconProps} />;
    case "UsersFour":
      return <UsersFour {...iconProps} />;
    case "MagnifyingGlass":
      return <MagnifyingGlass {...iconProps} />;
    case "DotsThreeOutlineVertical":
      return <DotsThreeOutlineVertical {...iconProps} />;
    case "CaretRight":
      return <CaretRight {...iconProps} />;
    case "CaretLeft":
      return <CaretLeft {...iconProps} />;
    case "CaretDown":
      return <CaretDown {...iconProps} />;
    case "CaretUp":
      return <CaretUp {...iconProps} />;
    case "EnvelopeSimple":
      return <EnvelopeSimple {...iconProps} />;
    case "Eye":
      return <Eye {...iconProps} />;
    case "EyeSlash":
      return <EyeSlash {...iconProps} />;
    case "Lock":
      return <Lock {...iconProps} />;
    default:
      return null;
  }
}

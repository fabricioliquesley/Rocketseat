import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  source: string;
  hasBorder?: boolean;
}

export function Avatar({ source, hasBorder = true, alt, ...props }: AvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={source}
      alt={alt}
      {...props}
    />
  );
}

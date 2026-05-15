import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

function Icon({ children, size = 18, strokeWidth = 1.5, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconMic = (p: IconProps) => (
  <Icon {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21" />
    <path d="M8.5 21h7" />
  </Icon>
);

export const IconMicOff = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 5a3 3 0 0 1 6 0v6" />
    <path d="M9 9v2a3 3 0 0 0 5.2 2.05" />
    <path d="M5.5 11a6.5 6.5 0 0 0 10.9 4.75" />
    <path d="M18.5 11a6.5 6.5 0 0 1-.4 2.2" />
    <path d="M12 17.5V21" />
    <path d="M8.5 21h7" />
    <path d="M3 3l18 18" />
  </Icon>
);

export const IconScreen = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8" />
    <path d="M12 16v4" />
    <path d="M12 13V8" />
    <path d="M9 11l3-3 3 3" />
  </Icon>
);

export const IconHand = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M12 10V4a1.5 1.5 0 0 1 3 0v7" />
    <path d="M15 11V6a1.5 1.5 0 0 1 3 0v9a6 6 0 0 1-6 6h-1.2a4 4 0 0 1-3.4-1.9L5 16a1.6 1.6 0 0 1 2.7-1.7L9 16V8.5a1.5 1.5 0 0 1 3 0" />
  </Icon>
);

export const IconAdd = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="10" cy="9" r="3.5" />
    <path d="M3.5 19c.7-3 3.5-5 6.5-5s5.8 2 6.5 5" />
    <path d="M18 6v6" />
    <path d="M15 9h6" />
  </Icon>
);

export const IconChat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 5h16v11H9l-5 4z" />
    <path d="M8 10h8" />
    <path d="M8 13h5" />
  </Icon>
);

export const IconClose = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </Icon>
);

export const IconLeave = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 0 1 18 0" />
    <path d="M5 14l-1.5-2.5a1 1 0 0 1 .4-1.4l2.2-1.2a1 1 0 0 1 1.2.2L9 10.5" />
    <path d="M19 14l1.5-2.5a1 1 0 0 0-.4-1.4l-2.2-1.2a1 1 0 0 0-1.2.2L15 10.5" />
  </Icon>
);

export const IconSend = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12l16-8-6 16-2.5-6.5z" />
  </Icon>
);

export const IconMore = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="5" cy="12" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
  </Icon>
);

export const IconSettings = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 12a7.5 7.5 0 0 0-.1-1.3l2-1.5-2-3.4-2.3.9a7.6 7.6 0 0 0-2.2-1.3L14.4 3h-4l-.4 2.4a7.6 7.6 0 0 0-2.2 1.3l-2.3-.9-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.6l-2 1.5 2 3.4 2.3-.9a7.6 7.6 0 0 0 2.2 1.3l.4 2.4h4l.4-2.4a7.6 7.6 0 0 0 2.2-1.3l2.3.9 2-3.4-2-1.5c.1-.4.1-.9.1-1.3z" />
  </Icon>
);

export const IconDot = ({
  size = 6,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 6 6" aria-hidden="true">
    <circle cx="3" cy="3" r="3" fill={color} />
  </svg>
);

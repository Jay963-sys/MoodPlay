"use client";
import Lottie from "lottie-react";

export default function LottiePlayer({
  src,
  ...props
}: {
  src: string;
  [key: string]: any;
}) {
  return <Lottie animationData={require(src)} {...props} />;
}

import Link from "next/link";
import React from "react";

export default function WebsiteLogo() {
  return (
    <Link href={"/"}>
      <h1 className="website-logo">Dev.Field</h1>
    </Link>
  );
}

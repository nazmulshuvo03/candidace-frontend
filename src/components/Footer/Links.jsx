import Link from "next/link";

export const FooterLinks = () => {
  const footerLinks = [
    {
      to: "/about-us",
      name: "About Us",
    },
    {
      to: "/how-it-works",
      name: "How it works",
    },
    {
      to: "https://candidace.fyi/blog/",
      name: "Blogs",
      target: "_blank",
    },
    {
      to: "/terms-and-conditions",
      name: "Terms & Conditions",
    },
    {
      to: "/privacy-policy",
      name: "Privacy Policy",
    },
  ];

  return (
    <nav className="flex gap-2 flex-wrap items-center justify-center">
      {footerLinks.map((link) => (
        <Link
          key={link.name}
          href={{ pathname: link.to }}
          target={link.target || ""}
          className=""
        >
          <div className="text-xs underline font-medium">{link.name}</div>
        </Link>
      ))}
    </nav>
  );
};

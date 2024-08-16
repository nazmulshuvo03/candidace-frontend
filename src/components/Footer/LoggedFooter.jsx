import { FooterLinks } from "./Links";
import { FooterRights } from "./Rights";
import { FooterSocials } from "./Socials";

export const LoggedFooter = () => {
  return (
    <div className="px-2 py-4">
      <div className="flex items-center justify-center">
        <FooterSocials />
      </div>
      <div className="py-3 px-5">
        <FooterLinks />
      </div>
      <div className="text-xs font-light text-center">
        <FooterRights />
      </div>
    </div>
  );
};

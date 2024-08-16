import { FooterSocials } from "./Socials";
import { FooterLinks } from "./Links";
import { FooterRights } from "./Rights";

export const Footer = () => {
  return (
    <div
      className="h-72 flex flex-col justify-center bg-white"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className="flex flex-col md:flex-row gap-2 items-center border-b-2 border-gray-800 pb-10">
        <div className="text-3xl font-semibold opacity-75 ">
          <div to={"/"} className="text-gray-900">
            <img
              src={"/images/logo_full.svg"}
              alt="Candidace Logo"
              style={{ height: "80px" }}
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center gap-6 text-sm font-semibold">
          <FooterLinks />
        </div>
        <FooterSocials />
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 py-4 text-xs">
        <div className="text-center md:text-start flex gap-2 items-center justify-center">
          <FooterRights />
        </div>
      </div>
    </div>
  );
};

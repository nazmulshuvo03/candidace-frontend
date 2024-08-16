export const Companies = () => {
  return (
    <div
      className="bg-white py-6 flex flex-col md:flex-row gap-4 items-center justify-between"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className="text-sm font-semibold">
        Practice with peers from your Dream Company
      </div>
      <div className="flex gap-2">
        <img src="/images/landingPage/company1.svg" alt="company 1" />
        <img src="/images/landingPage/company2.svg" alt="company 2" />
        <img src="/images/landingPage/company1.svg" alt="company 1" />
        <img src="/images/landingPage/company2.svg" alt="company 2" />
      </div>
    </div>
  );
};

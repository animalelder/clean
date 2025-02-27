// The mobile version of the DonateHero is a MESS
// TODO: Fix the mobile version of the DonateHero

export default function DonateHero() {
  return (
    <>
      <div className="relative mx-auto h-80 w-[90%] max-w-[1000px] justify-self-center rounded-3xl bg-primaryred-900 bg-donate-mobile bg-top bg-no-repeat max-md:max-w-[340px] md:h-60 md:bg-donate-desktop md:bg-right">
        <div className="ml-3 mt-3 flex h-[270px] w-[330px] flex-col items-center justify-start max-md:mt-[120px] max-md:hidden max-md:flex-wrap md:h-[210px] md:w-[300px] md:items-start md:justify-between">
          <h3 className="text-[28px] font-bold tracking-wide text-white">
            Donate
          </h3>
          <div className="text-sm font-light text-white">
            Donation. God loves a donor.
          </div>
          <div className="inline-flex items-center justify-start gap-4 gap-x-2 justify-self-end rounded-[34px] bg-off-white/10">
            <div className="inline-flex h-[26px] flex-col items-center justify-center gap-1.5 rounded-[34px] bg-black px-2 py-1">
              <div className="px-1 text-xs font-medium leading-tight text-white">
                One time
              </div>
            </div>
            <div className="inline-flex h-[26px] flex-col items-start justify-center gap-1.5 px-0.5">
              <div className="px-1 text-xs font-normal leading-tight text-white">
                Monthly
              </div>
            </div>
          </div>
          <div className="flex h-12 w-[600px] flex-wrap items-start justify-start gap-3.5 overflow-hidden">
            <div className="inline-flex items-center justify-start gap-3">
              <div className="flex h-12 w-[90px] items-center justify-center gap-2.5 rounded-[40px] border bg-[#865852] px-[31px] py-2 max-md:hidden">
                <div className="text-base font-normal leading-relaxed text-white">
                  $50
                </div>
              </div>
              <div className="flex h-12 w-[90px] items-center justify-center gap-2.5 rounded-[40px] border bg-white px-[31px] py-[11px]">
                <div className="text-base font-medium leading-relaxed text-zinc-900">
                  $100
                </div>
              </div>
              <div className="flex w-[90px] items-center justify-center gap-2.5 self-stretch rounded-[40px] border bg-[#865852] px-[31px] py-2 max-md:hidden">
                <div className="text-base font-normal leading-relaxed text-white">
                  $200
                </div>
              </div>
              <div className="flex h-12 w-[90px] items-center justify-center gap-2.5 rounded-[40px] border bg-[#865852] px-[31px] py-2 max-md:hidden">
                <div className="text-base font-normal leading-relaxed text-white">
                  Custom
                </div>
              </div>
              <div className="flex w-[152px] items-center justify-center gap-2.5 self-stretch rounded-[40px] bg-red-700 px-6 py-[11px]">
                <div className="text-center text-base font-bold leading-relaxed text-white">
                  Donate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

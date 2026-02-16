import { Icon } from "@iconify/react";

const FeatureItem = ({ icon, text }: { icon: string; text: string }) => (
  <div className="relative group h-full cursor-pointer">
    {/* ส่วยรัศมีสีแดงด้านหลัง (Glow Layer) */}
    <div className="absolute inset-0 bg-[#e53637]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div
      className="relative flex flex-col items-center justify-center gap-3 p-2 md:p-6 h-full
                    bg-white/3 backdrop-blur-2xl
                    rounded-2xl border border-white/10
                    border-t-[#e53637]/50 border-l-white/20
                    shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]
                    hover:bg-white/8 hover:border-[#e53637] 
                    transition-all duration-500 overflow-hidden"
    >
      {/* 1. Icon Section (เน้นสีแดง-ขาว) */}
      <div className="relative w-16 h-16 flex items-center justify-center mb-1">
        {/* แสงฟุ้งสีแดงเข้มข้น */}
        <div className="absolute inset-0 bg-[#e53637] rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity"></div>

        {/* วงกลมกระจกชั้นใน */}
        <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20 shadow-inner"></div>

        {/* ตัว Icon สีขาวโดดเด่น */}
        <div className="relative z-10 text-white group-hover:scale-110 transition-transform duration-300">
          <Icon icon={icon} width={38} />
        </div>
      </div>

      {/* 2. Text Section (ขาวหนา ตัดด้วยขีดแดง) */}
      <div className="text-center z-10">
        <p className="text-white font-black text-sm md:text-base lg:text-lg tracking-tight leading-tight drop-shadow-md">
          {text}
        </p>
        <div className="h-1 w-8 bg-[#e53637] mx-auto mt-2 rounded-full shadow-[0_0_8px_#e53637] group-hover:w-full transition-all duration-500"></div>
      </div>

      {/* 3. แสง Flare วิ่งผ่าน (White Specular) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
      </div>

      {/* 4. มุมสะท้อนสีแดงสว่าง (Corner Light) */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#e53637]/20 blur-3xl rounded-full group-hover:bg-[#e53637]/40 transition-colors"></div>
    </div>
  </div>
);

const FeaturesSection = () => {
  const features = [
    { icon: "mdi:chat-processing-outline", text: "สำหรับทุกเครือข่าย" },
    { icon: "mdi:thumb-up-outline", text: "คุ้มที่สุด" },
    { icon: "mdi:clock-time-four-outline", text: "เงินเข้าทันที" },
    { icon: "mdi:shield-check-outline", text: "ปลอดภัยไร้กังวล" },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 p-2 bg-[#0b0c2a]">
      {features.map((item, index) => (
        <FeatureItem key={index} icon={item.icon} text={item.text} />
      ))}
    </div>
  );
};

export default FeaturesSection;

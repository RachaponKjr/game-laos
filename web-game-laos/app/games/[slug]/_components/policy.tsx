import { Icon } from "@iconify/react";
import React from "react";

const Policy = () => {
  return (
    <section className="mt-4 md:mt-12 bg-gray-50 rounded-[2rem] p-6 md:p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Icon
          icon="fluent:document-protect-24-filled"
          className="text-[#e53637]"
          width={28}
        />
        <h3 className="text-xl font-bold text-[#0b0c2a]">
          ข้อกำหนดและเงื่อนไขการเติมเงิน
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ฝั่งซ้าย: วิธีการเติม */}
        <div className="space-y-4">
          <h4 className="font-bold text-[#e53637] flex items-center gap-2">
            <Icon icon="mdi:help-circle" /> ขั้นตอนการสั่งซื้อ
          </h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="font-bold text-[#0b0c2a]">1.</span>
              <span>
                ตรวจสอบ <strong>UUID</strong> ให้ถูกต้องก่อนยืนยัน
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#0b0c2a]">2.</span>
              <span>เลือกแพ็กเกจที่ต้องการและชำระเงินตามช่องทางที่เลือก</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#0b0c2a]">3.</span>
              <span>
                ระบบจะดำเนินการเติมเข้าตัวละครโดยอัตโนมัติภายใน 1-5 นาที
              </span>
            </li>
          </ul>
        </div>

        {/* ฝั่งขวา: นโยบาย */}
        <div className="space-y-4">
          <h4 className="font-bold text-[#e53637] flex items-center gap-2">
            <Icon icon="mdi:alert-circle" /> นโยบายการรับประกัน
          </h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <Icon
                icon="mdi:check-circle"
                width={20}
                className="text-green-500 mt-0.5 min-w-4 min-h-4 max-w-4 max-h-4"
              />
              <span>
                สินค้าประเภท Digital Code/Top-up
                ซื้อแล้วไม่สามารถคืนเงินได้ทุกกรณี
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="mdi:check-circle"
                width={20}
                className="text-green-500 mt-0.5 min-w-4 min-h-4 max-w-4 max-h-4"
              />
              <span>หากกรอก UUID ผิด ทางร้านไม่สามารถดึงยอดเงินคืนให้ได้</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon
                icon="mdi:check-circle"
                width={20}
                className="text-green-500 mt-0.5 min-w-4 min-h-4 max-w-4 max-h-4"
              />
              <span>
                กรณีมีปัญหา ติดต่อแอดมินได้ตลอด 24 ชม. พร้อมแนบหลักฐานการโอน
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* คำเตือนด้านล่างสุด */}
      <div className="mt-8 p-4 bg-white rounded-xl border-l-4 border-yellow-400 flex items-start gap-4">
        <Icon
          icon="mdi:shield-alert"
          className="text-yellow-500 min-w-4 min-h-4"
          width={32}
        />
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>หมายเหตุ:</strong> การเติมเงินนี้เป็นการเติมผ่านระบบเปย์ตรง
          (Official Partner) ปลอดภัย 100% ไม่มีความเสี่ยงต่อการโดนแบน
          หรือโดนรีฟันด์ภายหลัง โปรดระวังมิจฉาชีพแอบอ้างเป็นทีมงานในช่องทางอื่นๆ
        </p>
      </div>
    </section>
  );
};

export default Policy;

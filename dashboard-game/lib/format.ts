export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0, // ถ้าไม่อยากได้ทศนิยม .00 ให้ใส่ 0
  }).format(price);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 0,
  }).format(num);
};

export const formatStatus = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "รอดำเนินการ";
    case "PROCESSING":
      return "กำลังดำเนินการ";
    case "COMPLETED":
      return "สำเร็จ";
    case "CANCELLED":
      return "ยกเลิก";
    default:
      return status;
  }
};

export const formatStatusColor = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "bg-red-600";
    case "PROCESSING":
      return "bg-yellow-600";
    case "COMPLETED":
      return "bg-green-600";
    case "CANCELLED":
      return "bg-gray-600";
    default:
      return "bg-gray-600";
  }
};

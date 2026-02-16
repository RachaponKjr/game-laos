/**
 * ฟังก์ชันกลางสำหรับอัปโหลดไฟล์ไปหลังบ้าน
 * @param file ไฟล์ที่ต้องการอัปโหลด
 * @param folder ชื่อโฟลเดอร์ปลายทาง (เช่น 'games', 'avatars', 'banners')
 * @returns คืนค่าเป็น URL string จากหลังบ้าน หรือ null ถ้าพลาด
 */
export const uploadFile = async (
  file: File,
  folder: string,
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upload/image?path=${folder}`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Upload Error:", error);
    return null;
  }
};

import fs from "fs";
import path from "path";

export function getIllustrationAssets(): string[] {
  try {
    const dirPath = path.join(process.cwd(), "public", "assets", "Illustrations");

    if (!fs.existsSync(dirPath)) {
      return [];
    }

    const validExtensions = [".webp", ".png", ".jpg", ".jpeg", ".svg"];
    const files = fs.readdirSync(dirPath);

    const images = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return validExtensions.includes(ext);
      })
      .map((file) => `/assets/Illustrations/${file}`);

    return images.sort();
  } catch (err) {
    console.error("Failed to read illustrations directory:", err);
    return [];
  }
}

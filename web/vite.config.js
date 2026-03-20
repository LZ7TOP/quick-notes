import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper to parse changelog
const getLatestChangelog = () => {
  try {
    const content = fs.readFileSync(
      path.resolve(__dirname, "../CHANGELOG.md"),
      "utf-8",
    );
    const sections = content.split("## [").slice(1, 4); // Get top 3
    return sections.map((s) => {
      const lines = s.split("\n");
      const version = lines[0].split("]")[0];
      const date = lines[0].split(" - ")[1] || "";
      // Extract bullet points
      const bullets = lines
        .filter((l) => l.trim().startsWith("-"))
        .map((l) => l.trim().slice(1).trim())
        .slice(0, 3); // Max 3 bullets per version
      return { version, date, bullets };
    });
  } catch {
    return [];
  }
};

// Read version from extension manifest
const manifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../manifest.json"), "utf-8"),
);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(manifest.version),
    __APP_CHANGELOG__: JSON.stringify(getLatestChangelog()),
  },
});

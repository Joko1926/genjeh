import { GoogleGenAI, Type } from "@google/genai";
import { UrgencyLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseCitizenMessage = async (message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        You are the AI engine for SI-KAPAS (Sistem Integrasi Kinerja & Pelayanan Aspirasi Sosial) specifically for Desa Kapas, Kecamatan Kapas, Kabupaten Bojonegoro.
        Your task is to analyze a citizen's message (WhatsApp) and extract structured data.

        Context for Desa Kapas:
        - Specific Locations (Dusun): "Dusun I (Krajan)", "Dusun II (Ngalian)", "Dusun III (Kedaton)", "Komplek Balai Desa", "Pasar Desa Kapas".
        - Administrative Units: "RW 01" to "RW 06", "RT 01" to "RT 28".
        - Landmarks: "Stasiun Kapas", "Masjid Besar", "Jalan Raya Bojonegoro-Babat".
        - Categories: 
          - "Infrastruktur" (Jalan poros desa, drainase, PJU).
          - "Administrasi" (KTP, KK, Surat Pindah, Akta).
          - "Sosial" (BLT DD, PKH, Bansos).
          - "Pertanian" (Pupuk subsidi, kartu tani, irigasi, kelompok tani).
          - "Keamanan" (Poskamling, ketertiban).
          - "Bencana" (Banjir luapan irigasi/Bengawan, pohon tumbang).

        Analyze the following message: "${message}"
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "Category of the report" },
            location: { type: Type.STRING, description: "Detected specific location in Desa Kapas or 'Desa Kapas (Umum)'" },
            urgency: { type: Type.STRING, enum: [UrgencyLevel.LOW, UrgencyLevel.MEDIUM, UrgencyLevel.HIGH, UrgencyLevel.CRITICAL] },
            summary: { type: Type.STRING, description: "Max 10 words summary" },
            suggestedResponse: { type: Type.STRING, description: "Polite response in Indonesian using 'Bojonegoroan' polite tone (Nggih, Monggo, etc.) if possible" }
          },
          required: ["category", "location", "urgency", "summary", "suggestedResponse"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error parsing message with Gemini:", error);
    return {
      category: "Umum",
      location: "Desa Kapas",
      urgency: UrgencyLevel.MEDIUM,
      summary: "Laporan warga (AI Error)",
      suggestedResponse: "Ngapunten, sistem sedang sibuk. Laporan panjenengan sudah kami catat."
    };
  }
};
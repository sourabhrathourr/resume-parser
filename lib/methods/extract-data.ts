"use server";

export async function generateProfile() {
  return {
    name: "Sourabh Rathour",
    email: "rathoursourabh5@gmail.com",
  };
}

export async function extractDataFromResume(file: File | string) {
  try {
    const formData = new FormData();
    const origin = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (typeof file === "string") {
      const response = await fetch(`${origin}/${file}`);
      const blob = await response.blob();
      formData.append("file", blob, "resume.pdf");
    } else {
      formData.append("file", file);
    }

    const response = await fetch(`${origin}/api/parse`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in extractDataFromResume:", error);
    throw error;
  }
}

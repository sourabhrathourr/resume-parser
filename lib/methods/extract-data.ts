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
    const origin =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    if (typeof file === "string") {
      try {
        const response = await fetch(`${origin}/${file}`);
        if (!response.ok) {
          throw new Error("Failed to fetch default resume");
        }
        const blob = await response.blob();
        formData.append("file", blob, "resume.pdf");
      } catch (error) {
        console.log(error);
        throw new Error(
          "Failed to load default resume. Please try uploading a file instead.",
        );
      }
    } else {
      // Handle uploaded file
      if (file.type !== "application/pdf") {
        throw new Error("Invalid file type. Please upload a PDF file.");
      }
      formData.append("file", file);
    }

    const response = await fetch(`${origin}/api/parse`, {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("Invalid response from server");
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `Server error: ${response.status}`);
    }

    if (!result.data) {
      throw new Error("Invalid response format from server");
    }

    return result.data;
  } catch (error) {
    console.error("Error in extractDataFromResume:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to process resume");
  }
}

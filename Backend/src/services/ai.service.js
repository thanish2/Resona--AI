const { GoogleGenAI } = require("@google/genai");
const {z}=require("zod")
const puppeteer=require("puppeteer")

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "An overall compatibility score from 0 to 100 representing how closely the candidate's resume and profile align with the job description's requirements. E.g., 85 for a strong match with most required skills present, 40 for a weak match with major gaps.",
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A likely technical interview question based on the job description and the candidate's resume. E.g., 'Can you explain how you optimized the MongoDB queries mentioned in your resume?' or 'How would you design a REST API for a high-traffic e-commerce checkout system?'",
          ),
        intention: z
          .string()
          .describe(
            "What the interviewer is trying to assess by asking this question. E.g., 'Testing whether the candidate can explain technical decisions with real metrics, not just buzzwords' or 'Evaluating system design thinking and scalability awareness.'",
          ),
        answer: z
          .string()
          .describe(
            "Guidance on how the candidate should approach and structure their answer. E.g., 'Start with the specific bottleneck you identified, explain the indexing/schema change you made, and quantify the improvement (e.g., reduced query time by 40%). Avoid vague claims without numbers.'",
          ),
      }),
    )
    .describe(
      "A list of more than 3 technical interview questions tailored to the role, each paired with the interviewer's underlying intent and a suggested strategy for answering. E.g., questions on React state management, Node.js API design, or database optimization based on the candidate's stated experience.",
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A likely behavioral interview question aimed at evaluating soft skills, past experiences, or cultural fit. E.g., 'Tell me about a time you disagreed with a teammate on a technical approach — how did you resolve it?'",
          ),
        intention: z
          .string()
          .describe(
            "What the interviewer is trying to assess by asking this question. E.g., 'Assessing conflict resolution skills and whether the candidate can collaborate under disagreement without becoming defensive.'",
          ),
        answer: z
          .string()
          .describe(
            "Guidance on how the candidate should approach and structure their answer. E.g., 'Use the STAR method: describe the Situation, your Task, the Action you took (focus on communication, not just being right), and the positive Result for the team.'",
          ),
      }),
    )
    .describe(
      "A list of more than 3 behavioral interview questions relevant to the role, each paired with the interviewer's underlying intent and a suggested strategy for answering. E.g., questions about teamwork, handling failure, or working under tight deadlines.",
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "A specific skill or area of knowledge required by the job description but missing or underdeveloped in the candidate's profile. E.g., 'Docker and containerized deployments' or 'System design for distributed systems.'",
          ),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "How critical this skill gap is relative to the job requirements. E.g., 'low' for a nice-to-have skill like a specific CSS framework, 'high' for a core requirement like Node.js if the candidate has none.",
          ),
      }),
    )
    .describe(
      "A list of skill or knowledge gaps identified between the candidate's profile and the job description, each rated by severity. E.g., missing AWS experience (medium) or no exposure to CI/CD pipelines (high) for a DevOps-heavy role.",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe(
            "The sequential day number of the preparation plan, starting at 1. E.g., 1, 2, 3... up to however many days before the interview.",
          ),
        focus: z
          .string()
          .describe(
            "The primary focus area for this day of preparation. E.g., 'Data Structures & Algorithms — Arrays and Strings' or 'Mock behavioral interview practice.'",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "Concrete, actionable tasks to complete on this day. E.g., ['Solve 3 LeetCode medium array problems', 'Review time complexity of common sorting algorithms', 'Read Chapter 4 of Cracking the Coding Interview']",
          ),
      }),
    )
    .describe(
      "A day-by-day more than 7 day preparation roadmap designed to help the candidate systematically close skill gaps and get interview-ready before their target date. E.g., a 7-day plan progressing from fundamentals review to mock interviews.",
    ),

  title: z
    .string()
    .describe(
      "A title for the job for which the interview report is generated. e.g., 'Software Engineer '.",
    ),
});


async function generateInterviewReport({resume,selfDescription,jobDescription}){

    const prompt=`Generate an report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
                        `
     const jsonSchema = z.toJSONSchema(interviewReportSchema);
    const response = await ai.models.generateContent({
      model: "	gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema,
      },
    });

    return JSON.parse(response.text)
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // waitUntil: "networkidle0" is harmless here since there are no
    // external resources, but keeps this safe if the LLM ever slips one in
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

async function generateResumePdf({resume,selfDescription,jobDescription}){
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "A complete, self-contained HTML document for a professional resume, ready to be rendered to PDF via a headless browser (e.g. Puppeteer). " +
          "Requirements: " +
          "(1) Include the full document structure: <!DOCTYPE html>, <html>, <head> with a <style> block, and <body> — do not omit any of these. " +
          "(2) All CSS must be inlined in a single <style> tag in the <head>. Do not reference external stylesheets, fonts, images, or scripts, since the PDF renderer has no network access. " +
          "(3) Use only system-safe fonts (e.g. Arial, Helvetica, Georgia, 'Times New Roman', sans-serif) — no Google Fonts or @font-face imports. " +
          "(4) Design for a standard A4 or Letter page size using @page and appropriate margins (e.g. 0.5in-1in), and ensure content does not overflow or get awkwardly cut across page breaks — use 'page-break-inside: avoid' on sections like work experience entries. " +
          "(5) Use a clean, ATS-friendly single-column or lightly two-column layout with clear visual hierarchy: name and contact info at the top, followed by sections such as Summary, Experience, Education, Skills, and Projects as relevant to the provided content. " +
          "(6) Use semantic HTML tags (h1, h2, section, ul/li) rather than divs for everything, and keep the color palette minimal and print-safe (dark text on white/light background, one accent color used sparingly for headers or dividers). " +
          "(7) Do not include placeholder text, lorem ipsum, or empty sections — only include sections for which real content was provided. " +
          "(8) Keep font sizes and spacing appropriate for a one-page resume where possible, shrinking margins/line-height slightly if content is dense rather than letting it spill onto a second page.",
      ),
  });

const prompt = `
                You are an expert resume writer, ATS optimization specialist, and technical recruiter. Generate a premium, ATS-friendly resume as a single self-contained HTML document using only the information provided below.

                CANDIDATE INFORMATION:
                ${selfDescription || "No self description provided."}
                ${resume ? `EXISTING RESUME:\n${resume}` : ""}
                ${jobDescription ? `TARGET JOB DESCRIPTION:\n${jobDescription}` : ""}

                OBJECTIVE:
                Create a resume that maximizes ATS compatibility and recruiter appeal while remaining completely truthful. The resume should be tailored to the target job description, naturally emphasizing the candidate's most relevant skills, experience, and projects to maximize interview chances without misrepresenting the candidate.

                RULES:
                - Never fabricate companies, roles, dates, projects, skills, technologies, education, certifications, achievements, responsibilities, or metrics.
                - Preserve all names, dates, institutions, companies, links, CGPA, and contact information exactly as provided.
                - If information is missing, omit it instead of guessing or adding placeholders.
                - Return only the HTML document.

                CONTENT:
                - Rewrite all content professionally instead of copying it verbatim.
                - Improve grammar, clarity, readability, and technical depth.
                - Expand concise descriptions into detailed, recruiter-friendly bullet points only when supported by the provided information.
                - Convert responsibilities into achievement-oriented bullet points wherever possible.
                - Use strong action verbs and avoid weak phrases such as "Worked on", "Helped", or "Responsible for".
                - Quantify achievements only when explicitly supported.
                - Ensure the writing feels natural and human-written, avoiding repetitive or AI-generated phrasing.

                JOB DESCRIPTION OPTIMIZATION:
                - Analyze the job description and identify key skills, technologies, responsibilities, and keywords.
                - Naturally incorporate relevant keywords throughout the resume.
                - Reorder the summary, skills, experience, and projects to prioritize the most relevant content.
                - Emphasize transferable skills and matching experience without exaggeration or inventing information.

                SECTIONS:
                Include only sections with genuine content:
                - Header
                - Professional Summary
                - Skills
                - Experience
                - Projects
                - Education
                - Certifications
                - Achievements

                SUMMARY:
                Write a concise 3-4 line summary focused on technical strengths, relevant expertise, and value for the target role.

                SKILLS:
                - Group skills into logical categories.
                - Remove duplicates.
                - Normalize technology names.
                - Order skills by relevance to the target role.

                EXPERIENCE & PROJECTS:
                - Write 3-6 impactful bullet points for each entry.
                - Explain technical implementation, architecture, technologies used, APIs, databases, authentication, deployment, optimization, scalability, testing, security, and business impact wherever supported by the provided information.
                - Prioritize the most relevant experiences and projects for the target role.

                ATS REQUIREMENTS:
                - Use standard section headings recognized by ATS.
                - Keep the layout simple and ATS-friendly.
                - Avoid tables, multi-column layouts, icons, images, SVGs, progress bars, and decorative elements.
                - Use semantic HTML with all content as selectable text.
                - Naturally optimize for ATS keywords without keyword stuffing.

                LAYOUT:
                - The resume should ideally fit on one page and must never exceed two pages.
                - Prioritize the most relevant information if content must be condensed.
                - Maintain excellent spacing, typography, and readability while maximizing useful content.

                HTML:
                - Return a complete HTML document beginning with <!DOCTYPE html>.
                - Embed all CSS inside a single <style> tag.
                - Do not use JavaScript or external libraries.
                - Ensure it prints cleanly on A4 paper with approximately 0.5-inch margins.

                Before generating, internally verify:
                - No fabricated information.
                - ATS optimized.
                - Tailored to the target job.
                - Natural, human-written language.
                - No repeated content.
                - Valid HTML.

                Return ONLY the HTML document.
                `.trim();
  
  const response=await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: z.toJSONSchema(resumePdfSchema),
    },
  });

  const jsonContent= JSON.parse(response.text)

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  return pdfBuffer


}
  

module.exports = {generateInterviewReport,generateResumePdf};

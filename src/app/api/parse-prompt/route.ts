import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Received POST request at /api/parse-prompt");

  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    console.log("Invalid or missing prompt");
    return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
  }

  console.log(`Received prompt: ${prompt}`);

  // Enhanced fallback parser with extensive keyword coverage
  function parsePromptFallback(prompt: string) {
    const lowerPrompt = prompt.toLowerCase();
    let genre = "Pop"; // Default
    let mood = "Happy"; // Default
    let activity = "General"; // Default
    let era = "Modern"; // Default
    let artist = "Random"; // Default

    // Context-specific handling (higher priority)
    if (
      lowerPrompt.match(
        /\b(funeral|memorial|remembrance|grief|mourning|dirge|elegy)\b/
      )
    ) {
      mood = "Sad";
      activity = "Memorial";
      genre = lowerPrompt.includes("gospel")
        ? "Gospel"
        : lowerPrompt.includes("ambient")
        ? "Ambient"
        : "Classical";
      era = lowerPrompt.match(/\b(modern|recent)\b/) ? "Modern" : "Classic";
    } else if (
      lowerPrompt.match(
        /\b(crying|weeping|sadness|sorrow|heartbreak|broken heart|loss|grieving)\b/
      )
    ) {
      mood = "Sad";
      activity = "Reflection";
      genre = lowerPrompt.match(/\b(acoustic|singer-songwriter)\b/)
        ? "Acoustic"
        : "Indie";
      era = lowerPrompt.match(/\b(modern|recent)\b/) ? "Modern" : "Classic";
    } else if (
      lowerPrompt.match(/\b(wedding|marriage|bridal|romance|love)\b/)
    ) {
      mood = "Romantic";
      activity = "Wedding";
      genre = lowerPrompt.match(/\b(pop|acoustic)\b/) ? "Pop" : "Classical";
      era = lowerPrompt.match(/\b(modern|recent)\b/) ? "Modern" : "Classic";
    } else if (lowerPrompt.match(/\b(meditation|mindfulness|yoga|zen)\b/)) {
      mood = "Calm";
      activity = "Meditation";
      genre = "Ambient";
      era = "Modern";
    } else if (lowerPrompt.match(/\b(halloween|spooky|haunted)\b/)) {
      mood = "Eerie";
      activity = "Party";
      genre = "Alternative";
      era = "Modern";
    } else if (lowerPrompt.match(/\b(christmas|holiday|winter holiday)\b/)) {
      mood = "Happy";
      activity = "Holiday";
      genre = lowerPrompt.includes("jazz") ? "Jazz" : "Pop";
      era = "Classic";
    } else {
      // Genre keywords
      if (lowerPrompt.match(/\b(hip-?hop|rap|trap)\b/)) genre = "Hip-Hop";
      else if (lowerPrompt.match(/\b(rock|punk|metal|grunge)\b/))
        genre = "Rock";
      else if (lowerPrompt.match(/\b(jazz|smooth jazz|bebop)\b/))
        genre = "Jazz";
      else if (lowerPrompt.match(/\b(classical|orchestral|symphony|opera)\b/))
        genre = "Classical";
      else if (lowerPrompt.match(/\b(lo-?fi|chillhop)\b/)) genre = "Lo-Fi";
      else if (
        lowerPrompt.match(/\b(electronic|edm|dance|techno|house|trance)\b/)
      )
        genre = "Electronic";
      else if (lowerPrompt.match(/\b(r&b|soul|neo-soul)\b/)) genre = "R&B";
      else if (lowerPrompt.match(/\b(country|folk|bluegrass)\b/))
        genre = "Country";
      else if (lowerPrompt.match(/\b(reggae|ska|dub)\b/)) genre = "Reggae";
      else if (lowerPrompt.match(/\b(indie|alternative)\b/)) genre = "Indie";
      else if (lowerPrompt.match(/\b(gospel|spiritual|hymns)\b/))
        genre = "Gospel";
      else if (lowerPrompt.match(/\b(ambient|instrumental|new age)\b/))
        genre = "Ambient";
      else if (lowerPrompt.match(/\b(latin|salsa|reggaeton|tango)\b/))
        genre = "Latin";
      else if (lowerPrompt.match(/\b(blues)\b/)) genre = "Blues";
      else if (lowerPrompt.match(/\b(acoustic|singer-songwriter)\b/))
        genre = "Acoustic";
      else if (lowerPrompt.match(/\b(k-pop|j-pop|pop rock)\b/)) genre = "Pop";

      // Mood keywords
      if (
        lowerPrompt.match(
          /\b(chill|relax|calm|mellow|soothing|peaceful|tranquil)\b/
        )
      )
        mood = "Calm";
      else if (
        lowerPrompt.match(/\b(happy|upbeat|cheerful|joyful|fun|bright)\b/)
      )
        mood = "Happy";
      else if (
        lowerPrompt.match(/\b(energetic|up-?tempo|lively|pumped|exciting)\b/)
      )
        mood = "Energetic";
      else if (
        lowerPrompt.match(
          /\b(sad|melancholy|emotional|somber|solemn|tearful|bittersweet)\b/
        )
      )
        mood = "Sad";
      else if (lowerPrompt.match(/\b(dreamy|ethereal|ambient|surreal)\b/))
        mood = "Dreamy";
      else if (lowerPrompt.match(/\b(intense|epic|dramatic|powerful)\b/))
        mood = "Intense";
      else if (lowerPrompt.match(/\b(romantic|lovely|passionate|sensual)\b/))
        mood = "Romantic";
      else if (lowerPrompt.match(/\b(spooky|eerie|creepy|haunting)\b/))
        mood = "Eerie";
      else if (lowerPrompt.match(/\b(nostalgic|retro|sentimental)\b/))
        mood = "Nostalgic";

      // Activity keywords
      if (
        lowerPrompt.match(
          /\b(coding|study|focus|work|reading|writing|homework)\b/
        )
      )
        activity = "Study";
      else if (lowerPrompt.match(/\b(workout|running|exercise|gym|fitness)\b/))
        activity = "Workout";
      else if (lowerPrompt.match(/\b(party|dance|club|fest|celebration)\b/))
        activity = "Party";
      else if (lowerPrompt.match(/\b(relaxing|chilling|lounging|unwinding)\b/))
        activity = "Relaxing";
      else if (lowerPrompt.match(/\b(driving|road trip|commute)\b/))
        activity = "Driving";
      else if (lowerPrompt.match(/\b(sleep|bedtime|night|rest)\b/))
        activity = "Sleep";
      else if (lowerPrompt.match(/\b(coffee shop|cafe|chill spot)\b/))
        activity = "Cafe";
      else if (lowerPrompt.match(/\b(gaming|video games)\b/))
        activity = "Gaming";
      else if (lowerPrompt.match(/\b(cooking|kitchen|dinner)\b/))
        activity = "Cooking";
      else if (lowerPrompt.match(/\b(walking|hiking|stroll)\b/))
        activity = "Walking";

      // Era keywords
      if (lowerPrompt.match(/\b(80s|1980s|eighties)\b/)) era = "80s";
      else if (lowerPrompt.match(/\b(90s|1990s|nineties)\b/)) era = "90s";
      else if (lowerPrompt.match(/\b(2000s|00s|noughties)\b/)) era = "2000s";
      else if (lowerPrompt.match(/\b(70s|1970s|seventies)\b/)) era = "70s";
      else if (lowerPrompt.match(/\b(60s|1960s|sixties)\b/)) era = "60s";
      else if (lowerPrompt.match(/\b(50s|1950s|fifties)\b/)) era = "50s";
      else if (lowerPrompt.match(/\b(classic|oldies|retro|old school)\b/))
        era = "Classic";
      else if (lowerPrompt.match(/\b(modern|recent|new|current)\b/))
        era = "Modern";
    }

    // Artist extraction (avoid context words)
    const contextWords = [
      "funeral",
      "memorial",
      "remembrance",
      "grief",
      "mourning",
      "dirge",
      "elegy",
      "crying",
      "weeping",
      "sadness",
      "sorrow",
      "heartbreak",
      "loss",
      "grieving",
      "wedding",
      "marriage",
      "bridal",
      "romance",
      "love",
      "meditation",
      "mindfulness",
      "yoga",
      "zen",
      "halloween",
      "spooky",
      "haunted",
      "christmas",
      "holiday",
    ];
    const artistMatch =
      prompt.match(/(?:by|from|of)\s+([\w\s]+?)(?:\s+(?:for|to|at|in|$))/i) ||
      prompt.match(/\b([\w\s]+)\s+(?:songs|music|tracks)\b/i);
    if (
      artistMatch &&
      !contextWords.some((word) => artistMatch[1].toLowerCase().includes(word))
    ) {
      artist = artistMatch[1].trim();
    }

    return { genre, mood, activity, era, artist };
  }

  const systemPrompt = `
You are a helpful music assistant. Based on a user's prompt, extract a mood, genre, activity, era, and artist.
Return only a JSON object like:
{
  "mood": "...",
  "genre": "...",
  "activity": "...",
  "era": "...",
  "artist": "..."
}
If any field is unclear or not present, guess appropriately with reasonable defaults (e.g., mood: "Happy", genre: "Pop", activity: "General", era: "Modern", artist: "Random").
`;

  try {
    const openAiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      }
    );

    if (!openAiRes.ok) {
      const errorText = await openAiRes.text();
      console.error(`OpenAI API error: ${openAiRes.status} - ${errorText}`);

      // Fallback to keyword-based parsing
      console.log("Falling back to keyword-based prompt parsing");
      const fallbackResult = parsePromptFallback(prompt);
      console.log("Prompt parsed with fallback:", fallbackResult);
      return NextResponse.json(fallbackResult);
    }

    const result = await openAiRes.json();
    let extracted;
    try {
      extracted = JSON.parse(result.choices[0].message.content);
    } catch (parseErr) {
      console.error("Failed to parse OpenAI response as JSON:", parseErr);
      // Fallback to keyword-based parsing
      console.log("Falling back to keyword-based prompt parsing");
      const fallbackResult = parsePromptFallback(prompt);
      console.log("Prompt parsed with fallback:", fallbackResult);
      return NextResponse.json(fallbackResult);
    }

    // Validate extracted fields
    const requiredFields = ["mood", "genre", "activity", "era", "artist"];
    if (!requiredFields.every((field) => field in extracted)) {
      console.error("OpenAI response missing required fields:", extracted);
      // Fallback to keyword-based parsing
      console.log("Falling back to keyword-based prompt parsing");
      const fallbackResult = parsePromptFallback(prompt);
      console.log("Prompt parsed with fallback:", fallbackResult);
      return NextResponse.json(fallbackResult);
    }

    console.log("Prompt parsed successfully with OpenAI:", extracted);
    return NextResponse.json(extracted);
  } catch (err) {
    console.error("Prompt parsing failed:", err);
    // Fallback to keyword-based parsing
    console.log("Falling back to keyword-based prompt parsing");
    const fallbackResult = parsePromptFallback(prompt);
    console.log("Prompt parsed with fallback:", fallbackResult);
    return NextResponse.json(fallbackResult);
  }
}

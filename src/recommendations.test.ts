import { describe, expect, it } from "vitest";
import { getRecommendations, type Answers } from "./recommendations";

const habits: Answers = {
  shower: "long",
  tap: "sometimes",
  leaks: "not_sure",
  lights: "often",
  devices: "often",
};

describe("getRecommendations", () => {
  it("creates focused tips for reported water and energy habits", () => {
    const tips = getRecommendations(habits);
    expect(tips.map((tip) => tip.category)).toEqual([
      "Água",
      "Água",
      "Água",
      "Energia",
      "Energia",
    ]);
    expect(tips.some((tip) => tip.title.includes("banho"))).toBe(true);
    expect(tips.some((tip) => tip.title.includes("aparelhos"))).toBe(true);
  });

  it("encourages maintaining good habits when no change is suggested", () => {
    const tips = getRecommendations({
      shower: "short",
      tap: "always",
      leaks: "no",
      lights: "rarely",
      devices: "rarely",
    });
    expect(tips).toHaveLength(1);
    expect(tips[0].category).toBe("Rotina");
  });
});

export type Answers = {
  shower: "short" | "medium" | "long";
  tap: "always" | "sometimes" | "rarely";
  leaks: "yes" | "not_sure" | "no";
  lights: "often" | "sometimes" | "rarely";
  devices: "often" | "sometimes" | "rarely";
};

export type Recommendation = {
  title: string;
  detail: string;
  category: "Água" | "Energia" | "Rotina";
};

export function getRecommendations(answers: Answers): Recommendation[] {
  const tips: Recommendation[] = [];
  if (answers.shower === "long")
    tips.push({
      title: "Experimente um banho mais curto",
      detail:
        "Escolha uma música curta como referência e tente reduzir o banho aos poucos, no seu ritmo.",
      category: "Água",
    });
  if (answers.shower === "medium")
    tips.push({
      title: "Diminua alguns minutos do banho",
      detail:
        "Uma pequena redução já é um bom começo. Desligue o chuveiro enquanto se ensaboa, se for confortável e seguro.",
      category: "Água",
    });
  if (answers.tap !== "always")
    tips.push({
      title: "Feche a torneira nas pausas",
      detail:
        "Ao escovar os dentes ou ensaboar a louça, deixe a água aberta apenas quando precisar.",
      category: "Água",
    });
  if (answers.leaks !== "yes")
    tips.push({
      title: "Inclua uma checagem de vazamentos na rotina",
      detail:
        "Observe torneiras, descargas e manchas de umidade. Se notar um vazamento, avise quem pode providenciar o reparo.",
      category: "Água",
    });
  if (answers.lights !== "rarely")
    tips.push({
      title: "Apague a luz ao sair",
      detail:
        "Aproveite a iluminação natural durante o dia e confira se ficou alguma luz acesa em cômodos vazios.",
      category: "Energia",
    });
  if (answers.devices !== "rarely")
    tips.push({
      title: "Desligue o que não está em uso",
      detail:
        "Ao terminar de usar um aparelho, desligue-o. Evite desconectar equipamentos que precisam permanecer ligados por segurança ou funcionamento.",
      category: "Energia",
    });
  if (tips.length === 0)
    tips.push({
      title: "Você já cultiva bons hábitos",
      detail:
        "Continue com essas escolhas e convide alguém da casa a compartilhar uma dica que funcione no dia a dia.",
      category: "Rotina",
    });
  return tips;
}

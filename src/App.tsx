import { useState } from "react";
import { getRecommendations, type Answers } from "./recommendations";

const questions: {
  key: keyof Answers;
  title: string;
  help: string;
  options: { value: Answers[keyof Answers]; label: string }[];
}[] = [
  {
    key: "shower",
    title: "Como costuma ser o seu banho?",
    help: "Pense em um dia comum.",
    options: [
      { value: "short", label: "Até 5 minutos" },
      { value: "medium", label: "De 5 a 10 minutos" },
      { value: "long", label: "Mais de 10 minutos" },
    ],
  },
  {
    key: "tap",
    title: "Você fecha a torneira nas pausas?",
    help: "Por exemplo, ao escovar os dentes ou ensaboar a louça.",
    options: [
      { value: "always", label: "Sempre" },
      { value: "sometimes", label: "Às vezes" },
      { value: "rarely", label: "Quase nunca" },
    ],
  },
  {
    key: "leaks",
    title: "Você costuma verificar se há vazamentos?",
    help: "Vale observar torneiras, descargas e sinais de umidade.",
    options: [
      { value: "yes", label: "Sim, com frequência" },
      { value: "not_sure", label: "Não tenho certeza" },
      { value: "no", label: "Ainda não" },
    ],
  },
  {
    key: "lights",
    title: "Com que frequência ficam luzes acesas em cômodos vazios?",
    help: "Considere a rotina da casa.",
    options: [
      { value: "rarely", label: "Raramente" },
      { value: "sometimes", label: "Às vezes" },
      { value: "often", label: "Com frequência" },
    ],
  },
  {
    key: "devices",
    title: "Aparelhos ficam ligados quando ninguém está usando?",
    help: "Considere TV, computador e outros aparelhos do dia a dia.",
    options: [
      { value: "rarely", label: "Raramente" },
      { value: "sometimes", label: "Às vezes" },
      { value: "often", label: "Com frequência" },
    ],
  },
];

function App() {
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [checked, setChecked] = useState<string[]>(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem("ecoconsumo-checklist") ?? "[]",
      );
      return Array.isArray(saved) &&
        saved.every((item) => typeof item === "string")
        ? saved
        : [];
    } catch {
      return [];
    }
  });
  const toggleAction = (id: string) =>
    setChecked((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
      try {
        localStorage.setItem("ecoconsumo-checklist", JSON.stringify(next));
      } catch {
        /* The checklist still works for this visit if storage is unavailable. */
      }
      return next;
    });
  const current = questions[step];
  const progress = complete ? 100 : Math.round((step / questions.length) * 100);
  const result = complete ? getRecommendations(answers as Answers) : [];
  const actionTips = [
    ["banho", "Tentar encurtar o banho em alguns minutos"],
    ["torneira", "Fechar a torneira nas pausas"],
    ["vazamento", "Observar torneiras e descargas em busca de vazamentos"],
    ["luzes", "Apagar as luzes ao sair de um cômodo"],
    ["aparelhos", "Desligar aparelhos que não estão em uso"],
  ];

  return (
    <>
      <a className='skip-link' href='#conteudo'>
        Pular para o conteúdo
      </a>
      <header className='site-header'>
        <div className='header-inner'>
          <a className='brand' href='#inicio' aria-label='EcoConsumo, início'>
            <span className='brand-mark' aria-hidden='true'>
              e
            </span>
            <span>
              eco<span className='brand-light'>consumo</span>
            </span>
          </a>
          <nav aria-label='Navegação principal'>
            <a href='#diagnostico'>Meu diagnóstico</a>
            <a href='#guia'>Guia prático</a>
            <a href='#checklist'>Meu checklist</a>
          </nav>
          <a className='header-cta' href='#diagnostico'>
            Começar <span aria-hidden='true'>↗</span>
          </a>
        </div>
      </header>

      <main id='conteudo'>
        <section className='hero' id='inicio'>
          <div className='hero-inner'>
            <div className='hero-copy'>
              <p className='eyebrow'>
                <span className='eyebrow-dot' /> PEQUENAS ESCOLHAS, GRANDE
                IMPACTO
              </p>
              <h1>
                O futuro começa
                <br />
                dentro de <em>casa.</em>
              </h1>
              <p className='hero-text'>
                Água e energia fazem parte de tudo. Descubra como cuidar melhor
                desses recursos com atitudes simples que cabem na sua rotina.
              </p>
              <a className='button button-dark' href='#diagnostico'>
                Descobrir meus hábitos <span aria-hidden='true'>→</span>
              </a>
              <div className='hero-note'>
                <span className='note-icon' aria-hidden='true'>
                  ✳
                </span>
                <span>Sem julgamento. Um passo de cada vez.</span>
              </div>
            </div>
            <div
              className='hero-visual'
              aria-label='Ilustração de uma casa cercada por folhas e gotas de água'
            >
              <div className='sun' />
              <div className='visual-label label-top'>
                recursos que
                <br />
                importam <span>↘</span>
              </div>
              <div className='home'>
                <div className='roof' />
                <div className='house'>
                  <div className='window window-left' />
                  <div className='window window-right' />
                  <div className='door' />
                  <div className='house-ground' />
                </div>
              </div>
              <div className='plant plant-one'>
                <i />
                <i />
                <i />
                <b />
              </div>
              <div className='plant plant-two'>
                <i />
                <i />
                <i />
                <b />
              </div>
              <div className='water-drop'>◒</div>
              <div className='visual-label label-bottom'>
                cada atitude conta <span>✳</span>
              </div>
              <div className='orbit orbit-one' />
              <div className='orbit orbit-two' />
            </div>
            <div className='hero-stats'>
              <div>
                <strong>62,5%</strong>
                <span>
                  sentem dificuldade
                  <br />
                  em mudar hábitos
                </span>
              </div>
              <div className='stat-divider' />
              <div>
                <strong>5 min</strong>
                <span>
                  para começar a<br />
                  fazer diferente
                </span>
              </div>
              <small>Um retrato de 8 pessoas ouvidas no projeto</small>
            </div>
          </div>
        </section>

        <section
          className='research-strip'
          aria-label='Resultados da pesquisa inicial'
        >
          <div className='strip-label'>
            O QUE OUVIMOS
            <br />
            <span>em uma pesquisa inicial</span>
          </div>
          <div className='strip-item'>
            <strong>62,5%</strong>
            <span>
              têm dificuldade
              <br />
              em mudar hábitos
            </span>
          </div>
          <div className='strip-item'>
            <strong>62,5%</strong>
            <span>
              às vezes deixam aparelhos
              <br />
              ligados sem necessidade
            </span>
          </div>
          <div className='strip-item'>
            <strong>37,5%</strong>
            <span>
              tomam banhos com
              <br />
              mais de 10 minutos
            </span>
          </div>
          <div className='strip-item'>
            <strong>25%</strong>
            <span>
              verificam vazamentos
              <br />
              regularmente
            </span>
          </div>
          <p>
            Resultados de uma pesquisa com 8 pessoas. A amostra é pequena e não
            representa toda a população.
          </p>
        </section>

        <section className='diagnostic section-wrap' id='diagnostico'>
          <div className='section-heading'>
            <p className='eyebrow'>01 — CONHEÇA SUA ROTINA</p>
            <h2>
              Um diagnóstico
              <br />
              do seu <em>dia a dia.</em>
            </h2>
            <p>
              Responda cinco perguntas rápidas. Suas respostas ficam neste
              dispositivo e ajudam a montar dicas para você.
            </p>
          </div>
          <div className='quiz-card'>
            {!complete ? (
              <>
                <div className='quiz-top'>
                  <span>SEU MAPA DE HÁBITOS</span>
                  <span>
                    0{step + 1} <i>/ 0{questions.length}</i>
                  </span>
                </div>
                <div
                  className='progress-track'
                  role='progressbar'
                  aria-label='Progresso do questionário'
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <span style={{ width: `${progress}%` }} />
                </div>
                <fieldset className='question'>
                  <legend>{current.title}</legend>
                  <p>{current.help}</p>
                  <div className='options'>
                    {current.options.map((option) => (
                      <label
                        className={`option ${answers[current.key] === option.value ? "selected" : ""}`}
                        key={String(option.value)}
                      >
                        <input
                          type='radio'
                          name={current.key}
                          value={String(option.value)}
                          checked={answers[current.key] === option.value}
                          onChange={() =>
                            setAnswers({
                              ...answers,
                              [current.key]: option.value,
                            })
                          }
                        />
                        <span className='radio-custom' />
                        <span>{option.label}</span>
                        <span className='option-arrow' aria-hidden='true'>
                          ↗
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className='quiz-controls'>
                  {step > 0 ? (
                    <button
                      className='text-button'
                      onClick={() => setStep(step - 1)}
                    >
                      ← Voltar
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    className='button button-green'
                    disabled={!answers[current.key]}
                    onClick={() =>
                      step === questions.length - 1
                        ? setComplete(true)
                        : setStep(step + 1)
                    }
                  >
                    {step === questions.length - 1
                      ? "Ver meu resultado"
                      : "Próxima pergunta"}{" "}
                    <span aria-hidden='true'>→</span>
                  </button>
                </div>
              </>
            ) : (
              <div className='results'>
                <div className='results-heading'>
                  <div>
                    <p className='eyebrow'>SEU PLANO PESSOAL</p>
                    <h3>Comece por aqui.</h3>
                    <p>
                      Escolha uma ideia por vez. O que funciona é o que cabe na
                      sua realidade.
                    </p>
                  </div>
                  <button
                    className='text-button'
                    onClick={() => {
                      setComplete(false);
                      setStep(0);
                    }}
                  >
                    Refazer ↻
                  </button>
                </div>
                <div className='recommendations'>
                  {result.map((tip, index) => (
                    <article className='recommendation' key={tip.title}>
                      <span className='rec-number'>0{index + 1}</span>
                      <div>
                        <span className='tag'>{tip.category}</span>
                        <h4>{tip.title}</h4>
                        <p>{tip.detail}</p>
                      </div>
                      <span className='rec-leaf' aria-hidden='true'>
                        ✳
                      </span>
                    </article>
                  ))}
                </div>
                <p className='privacy-note'>
                  As dicas são educativas e ficam apenas nesta tela. Feche ou
                  atualize a página para removê-las.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className='guide section-wrap' id='guia'>
          <div className='guide-intro'>
            <p className='eyebrow'>02 — IDEIAS QUE CABEM NA ROTINA</p>
            <h2>
              Menos desperdício.
              <br />
              <em>Mais cuidado.</em>
            </h2>
            <p>
              Não precisa mudar tudo de uma vez. Escolha uma prática para
              experimentar hoje.
            </p>
          </div>
          <div className='guide-grid'>
            <article className='guide-card water-card'>
              <span className='card-index'>01 / ÁGUA</span>
              <div className='guide-symbol' aria-hidden='true'>
                ⌁
              </div>
              <h3>
                Água é vida.
                <br />
                Use com intenção.
              </h3>
              <ul>
                <li>Reduza o tempo do banho aos poucos.</li>
                <li>Feche a torneira ao escovar os dentes.</li>
                <li>Observe sinais de vazamento em casa.</li>
              </ul>
              <span className='card-spark' aria-hidden='true'>
                ✳
              </span>
            </article>
            <article className='guide-card energy-card'>
              <span className='card-index'>02 / ENERGIA</span>
              <div className='guide-symbol bulb' aria-hidden='true'>
                ☼
              </div>
              <h3>
                Energia também
                <br />
                pede atenção.
              </h3>
              <ul>
                <li>Apague luzes em ambientes vazios.</li>
                <li>Desligue aparelhos após o uso.</li>
                <li>Abra as janelas e aproveite o dia.</li>
              </ul>
              <span className='card-spark' aria-hidden='true'>
                ✳
              </span>
            </article>
            <article className='guide-card habit-card'>
              <span className='card-index'>03 / HÁBITOS</span>
              <div className='guide-symbol' aria-hidden='true'>
                ↗
              </div>
              <h3>
                O melhor plano
                <br />é o possível.
              </h3>
              <ul>
                <li>Defina uma meta pequena e realista.</li>
                <li>Convide alguém para fazer junto.</li>
                <li>Reconheça cada progresso.</li>
              </ul>
              <span className='card-spark' aria-hidden='true'>
                ✳
              </span>
            </article>
          </div>
        </section>

        <section className='checklist section-wrap' id='checklist'>
          <div className='checklist-copy'>
            <p className='eyebrow'>03 — UM PASSO DE CADA VEZ</p>
            <h2>
              Seu combinado
              <br />
              <em>com o planeta.</em>
            </h2>
            <p>
              Marque o que quer experimentar. Seu progresso fica salvo neste
              navegador.
            </p>
            <div className='check-count'>
              <span>{checked.length}</span> de {actionTips.length} atitudes
              escolhidas
              <div className='check-meter'>
                <span
                  style={{
                    width: `${(checked.length / actionTips.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className='checklist-items'>
            {actionTips.map(([id, title], i) => (
              <label
                className={`check-item ${checked.includes(id) ? "is-checked" : ""}`}
                key={id}
              >
                <input
                  type='checkbox'
                  checked={checked.includes(id)}
                  onChange={() => toggleAction(id)}
                />
                <span className='check-box' aria-hidden='true'>
                  ✓
                </span>
                <span className='check-label'>
                  <small>0{i + 1}</small>
                  {title}
                </span>
                <span className='check-mark' aria-hidden='true'>
                  ↗
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className='closing'>
          <div className='closing-inner'>
            <span className='closing-star' aria-hidden='true'>
              ✳
            </span>
            <p>
              O planeta agradece.
              <br />
              <em>E a sua casa também.</em>
            </p>
            <a className='button button-light' href='#diagnostico'>
              Fazer meu diagnóstico <span aria-hidden='true'>↑</span>
            </a>
          </div>
          <span className='closing-orbit orbit-a' />
          <span className='closing-orbit orbit-b' />
        </section>
      </main>
      <footer className='footer'>
        <a className='brand footer-brand' href='#inicio'>
          <span className='brand-mark' aria-hidden='true'>
            e
          </span>
          <span>
            eco<span className='brand-light'>consumo</span>
          </span>
        </a>
        <p>Projeto de extensão · Consumo Consciente de Água e Energia</p>
        <a href='#inicio'>Voltar ao topo ↑</a>
        <small>
          Conteúdo educativo. Cada realidade doméstica é diferente; escolha
          práticas adequadas e seguras para você.
        </small>
      </footer>
    </>
  );
}

export default App;

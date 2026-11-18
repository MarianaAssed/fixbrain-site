/* NEBULA · textos psicoeducativos e de segurança (pt-BR).
   Cada parágrafo marcado diferencia o que é bem estabelecido do que é evidência moderada ou preliminar.
   Referências reais e verificáveis; revisar clinicamente antes de lançamento público. */
(function (root) {
  const E = {
    ok: '<span class="ev ev-ok">Bem estabelecido</span>',
    mod: '<span class="ev ev-mod">Evidência moderada</span>',
    pre: '<span class="ev ev-pre">Preliminar</span>',
    cli: '<span class="ev ev-cli">Orientação clínica</span>'
  };

  const ARTICLES = [
    {
      id: 'estresse',
      title: 'O que acontece no cérebro durante o estresse?',
      body: [
        E.ok + ' Diante de algo percebido como ameaça, estruturas como a amígdala e o hipotálamo acionam duas vias. A primeira, rápida, é o sistema nervoso simpático: o coração acelera, a respiração fica mais curta e os músculos se preparam para agir. A segunda é o eixo hipotálamo–hipófise–adrenal, que libera cortisol ao longo de minutos.',
        E.ok + ' Essa resposta é adaptativa. Ela mobiliza energia para lidar com o desafio e, em condições normais, se desliga quando ele passa.',
        E.ok + ' Sob estresse intenso, o córtex pré-frontal, ligado ao planejamento, à atenção e ao controle de impulsos, funciona pior de forma temporária. Isso ajuda a entender por que é difícil pensar com clareza nesses momentos.',
        E.mod + ' Quando a ativação se repete por muito tempo, o desgaste acumulado (chamado de carga alostática) se associa a alterações de sono, humor, memória e saúde cardiovascular.'
      ],
      refs: [
        'McEwen BS. Physiology and neurobiology of stress and adaptation: central role of the brain. Physiol Rev. 2007;87(3):873–904.',
        'Arnsten AFT. Stress signalling pathways that impair prefrontal cortex structure and function. Nat Rev Neurosci. 2009;10(6):410–422.'
      ]
    },
    {
      id: 'sna',
      title: 'Sistema nervoso autônomo: respostas simpáticas e parassimpáticas',
      body: [
        E.ok + ' O sistema nervoso autônomo regula funções que não comandamos diretamente, como batimentos cardíacos, pressão arterial, digestão e transpiração.',
        E.ok + ' O ramo simpático mobiliza o corpo para a ação. O ramo parassimpático, em grande parte pelo nervo vago, favorece recuperação, digestão e repouso. Os dois atuam ao mesmo tempo, em equilíbrio dinâmico, e não como um interruptor de liga e desliga.',
        E.ok + ' A respiração é uma das poucas funções automáticas que também podemos controlar de propósito. Por isso ela é uma porta de entrada para influenciar o estado do corpo.',
        E.mod + ' Em pesquisa, a variabilidade da frequência cardíaca (VFC) é usada como indicador indireto da atividade vagal. O NEBULA não mede VFC nem outros sinais fisiológicos.'
      ],
      refs: [
        'McCorry LK. Physiology of the autonomic nervous system. Am J Pharm Educ. 2007;71(4):78.',
        'Laborde S, Mosley E, Thayer JF. Heart rate variability and cardiac vagal tone in psychophysiological research. Front Psychol. 2017;8:213.'
      ]
    },
    {
      id: 'diafragma',
      title: 'O que é respiração diafragmática?',
      body: [
        E.ok + ' O diafragma é o principal músculo da respiração. Quando ele se contrai, desce e o abdômen se projeta levemente; quando relaxa, sobe e o ar sai. Em momentos de tensão é comum respirar mais com o peito e os ombros.',
        '<b>Como praticar.</b> Sente-se ou deite-se de forma confortável. Se quiser, apoie uma mão no abdômen. Inspire pelo nariz deixando a barriga se mover, e expire devagar. Não é preciso encher o pulmão ao máximo: respirar devagar não é o mesmo que respirar fundo, e ar em excesso pode causar tontura.',
        E.mod + ' Estudos com adultos saudáveis encontraram redução do estresse relatado e de marcadores fisiológicos após algumas semanas de treino. Uma revisão sistemática considerou os resultados promissores, mas com estudos pequenos e heterogêneos.'
      ],
      refs: [
        'Ma X, Yue ZQ, Gong ZQ, et al. The effect of diaphragmatic breathing on attention, negative affect and stress in healthy adults. Front Psychol. 2017;8:874.',
        'Hopper SI, Murray SL, Ferrara LR, Singleton JK. Effectiveness of diaphragmatic breathing for reducing physiological and psychological stress in adults: a quantitative systematic review. JBI Database System Rev Implement Rep. 2019;17(9):1855–1876.'
      ]
    },
    {
      id: 'ativacao',
      title: 'Como a respiração pode influenciar a ativação fisiológica?',
      body: [
        E.ok + ' A frequência cardíaca acompanha a respiração: tende a subir na inspiração e a cair na expiração. Esse fenômeno se chama arritmia sinusal respiratória.',
        E.mod + ' Respirar devagar, em torno de seis ciclos por minuto, amplia essa oscilação e aumenta a VFC durante a prática na maior parte dos estudos. Uma meta-análise de 2022 confirmou esse efeito imediato.',
        E.pre + ' A ideia de que uma expiração mais longa que a inspiração favoreça maior ativação parassimpática tem apoio, mas os resultados são mistos. Por isso o NEBULA trata qualquer proporção como sugestão, nunca como regra.'
      ],
      refs: [
        'Russo MA, Santarelli DM, O’Rourke D. The physiological effects of slow breathing in the healthy human. Breathe. 2017;13(4):298–309.',
        'Zaccaro A, Piarulli A, Laurino M, et al. How breath-control can change your life: a systematic review on psycho-physiological correlates of slow breathing. Front Hum Neurosci. 2018;12:353.',
        'Laborde S, Allen MS, Borges U, et al. Effects of voluntary slow breathing on heart rate and heart rate variability: a systematic review and a meta-analysis. Neurosci Biobehav Rev. 2022;138:104711.'
      ]
    },
    {
      id: 'autorregulacao',
      title: 'Estresse, ansiedade e autorregulação',
      body: [
        E.ok + ' Estresse é a resposta a uma demanda. Ansiedade envolve a antecipação de uma ameaça futura, muitas vezes com preocupação e sintomas no corpo. Em certa medida os dois são normais; passam a ser um problema quando são intensos, persistentes e atrapalham a vida.',
        E.ok + ' Autorregulação emocional é o conjunto de processos pelos quais influenciamos quais emoções sentimos, quando e como as expressamos. Estratégias corporais, como a respiração, são uma das ferramentas, ao lado de reavaliar a situação, resolver problemas e buscar apoio.',
        E.mod + ' Uma meta-análise de ensaios randomizados encontrou efeito pequeno a moderado de práticas respiratórias sobre o estresse relatado, com qualidade de evidência limitada.',
        E.cli + ' A respiração guiada não substitui o tratamento de transtornos de ansiedade.'
      ],
      refs: [
        'Gross JJ. Emotion regulation: current status and future prospects. Psychol Inq. 2015;26(1):1–26.',
        'Fincham GW, Strauss C, Montero-Marin J, Cavanagh K. Effect of breathwork on stress and mental health: a meta-analysis of randomised-controlled trials. Sci Rep. 2023;13:432.'
      ]
    },
    {
      id: 'regular',
      title: 'Por que a prática regular pode ajudar?',
      body: [
        E.mod + ' Como qualquer habilidade, a respiração lenta fica mais fácil de usar num momento difícil quando foi praticada antes, em momentos tranquilos.',
        E.pre + ' Num estudo randomizado com adultos saudáveis, cinco minutos diários de práticas respiratórias durante um mês melhoraram o humor relatado, com efeito semelhante ou maior que o de meditação mindfulness. São resultados recentes que ainda precisam de replicação.',
        '<b>Sugestão.</b> Poucos minutos, com regularidade e sem cobrança. O NEBULA registra sua prática para você acompanhar, mas não exige sequências nem dá pontuação.'
      ],
      refs: [
        'Balban MY, Neri E, Kogon MM, et al. Brief structured respiration practices enhance mood and reduce physiological arousal. Cell Rep Med. 2023;4(1):100895.'
      ]
    },
    {
      id: 'trauma',
      title: 'Respiração e sintomas relacionados ao trauma: benefícios e limitações',
      body: [
        E.mod + ' Ensaios clínicos com pessoas com TEPT, incluindo veteranos militares, encontraram redução de sintomas após programas que incluíam respiração. As amostras foram pequenas, e esses programas não substituem as psicoterapias focadas no trauma, que têm a evidência mais sólida.',
        E.cli + ' Para algumas pessoas com histórico de trauma, prestar atenção na respiração ou fechar os olhos pode aumentar o desconforto. Isso não é falha de quem pratica. Abordagens sensíveis ao trauma recomendam oferecer escolha, manter os olhos abertos e usar âncoras externas, como o ambiente ao redor.',
        E.cli + ' O NEBULA não faz exposição a memórias nem trata TEPT. Se a respiração não for confortável para você, use o Porto Seguro e converse com sua psicóloga ou psicólogo.'
      ],
      refs: [
        'Seppälä EM, Nitschke JB, Tudorascu DL, et al. Breathing-based meditation decreases posttraumatic stress disorder symptoms in U.S. military veterans: a randomized controlled longitudinal study. J Trauma Stress. 2014;27(4):397–405.',
        'Kim SH, Schneider SM, Bevans M, et al. PTSD symptom reduction with mindfulness-based stretching and deep breathing exercise: randomized controlled clinical trial of efficacy. J Clin Endocrinol Metab. 2013;98(7):2984–2992.',
        'American Psychological Association. Clinical practice guideline for the treatment of posttraumatic stress disorder (PTSD) in adults. 2017.',
        'Treleaven DA. Trauma-sensitive mindfulness: practices for safe and transformative healing. New York: W. W. Norton; 2018.'
      ]
    }
  ];

  /* Exercício de orientação ao presente, de olhos abertos, sem foco na respiração. */
  const GROUNDING = [
    { n: 5, text: 'Olhe ao redor e encontre <b>5 coisas que você pode ver</b>. Pode ser uma cor, uma luz, um objeto. Não precisa ter pressa.' },
    { n: 4, text: 'Repare em <b>4 coisas que você pode tocar ou sentir</b>: os pés no chão, a roupa, a cadeira, a temperatura do ar.' },
    { n: 3, text: 'Escute <b>3 sons</b> ao seu redor, perto ou longe.' },
    { n: 2, text: 'Note <b>2 cheiros</b>. Se não sentir nenhum, tudo bem: lembre de dois cheiros de que você gosta.' },
    { n: 1, text: 'Perceba <b>1 coisa boa</b> sobre este momento, por menor que seja.' }
  ];

  root.NebulaContent = { ARTICLES, GROUNDING };
})(typeof self !== 'undefined' ? self : this);

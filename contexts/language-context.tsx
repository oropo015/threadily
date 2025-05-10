"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

// Define translations
const translations = {
  en: {
    metadata: {
      title: "threadify - Format your text for social media threads",
      description: "Split your long text into perfectly-sized posts for social media threads",
    },
    home: {
      title: "Social Media Thread Generator",
      description: "Split your long text into perfectly-sized posts for social media threads",
    },
    header: {
      formatText: "Format your text for social media threads",
      platform: "Platform",
      language: "Language",
    },
    threadGenerator: {
      yourText: "Your Text",
      formatInstructions: "Format your text with these tools before generating your thread",
      editor: "Editor",
      findReplace: "Find & Replace",
      textareaPlaceholder: "Type or paste your content here...",
      formatText: "Format Text",
      generateThread: "Generate Thread",
      generating: "Generating...",
      find: "Find",
      findPlaceholder: "Text to find",
      replaceWith: "Replace with",
      replacePlaceholder: "Replacement text",
      replaceAll: "Replace All",
      yourThread: "Your Thread ({count} posts)",
      characters: "characters",
      copy: "Copy",
      copyAll: "Copy All",
      share: "Share",
      reset: "Reset",
      clearAll: "Clear All",
      noTextTitle: "No text provided",
      noTextDescription: "Please enter some text to generate a thread.",
      threadGeneratedTitle: "Thread generated",
      threadGeneratedDescription: "Your text has been split into thread posts.",
      noSearchTextTitle: "No search text",
      noSearchTextDescription: "Please enter text to find.",
      textReplacedTitle: "Text replaced",
      textReplacedDescription: 'Replaced "{findText}" with "{replaceText}"',
      textFormattedTitle: "Text formatted",
      textFormattedDescription: "Extra spaces and line breaks have been removed.",
      copiedTitle: "Copied to clipboard",
      copiedDescription: "The text has been copied to your clipboard.",
      copiedAllTitle: "All copied to clipboard",
      copiedAllDescription: "All thread posts have been copied to your clipboard.",
      allClearedTitle: "All cleared",
      allClearedDescription: "Your text and threads have been cleared.",
      errorTitle: "Error occurred",
      errorDescription: "There was an error generating your thread. Please try again.",
    },
    footer: {
      copyright: "© {year} threadify. All rights reserved.",
      buyMeCoffee: "Buy me a coffee",
      toolDescription: "A tool to format posts for multiple social platforms",
      privacyNotice:
        "threadify processes all text locally in your browser. We don't store or transmit your content to any server.",
    },
    platforms: {
      twitter: "X (Twitter)",
      threads: "Threads",
      reddit: "Reddit",
      mastodon: "Mastodon",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      platformSpecificTips: "Platform-specific tips",
      twitterTip: "Keep it concise. Use hashtags sparingly.",
      threadsTip: "Similar to Twitter but with more space. Great for longer thoughts.",
      redditTip: "Use Markdown formatting. Great for detailed explanations.",
      mastodonTip: "Similar to Twitter. Consider your instance's culture.",
      linkedinTip: "Professional tone works best. Use industry-specific hashtags and mention relevant connections.",
      facebookTip: "More casual and personal. Good for longer posts with multiple paragraphs and media.",
    },
    aiEnhancer: {
      title: "AI-Powered Thread Enhancement",
      description: "Use AI to enhance your thread with summaries, hashtags, and engagement boosters",
      summary: "Summary",
      summaryDescription: "Generate a concise summary of your thread to use as an introduction",
      generateSummary: "Generate Summary",
      addAsFirstPost: "Add as First Post",
      hashtags: "Hashtags",
      hashtagsDescription: "Get AI-suggested hashtags based on your content to increase discoverability",
      generateHashtags: "Generate Hashtags",
      addAllHashtags: "Add All Hashtags",
      engagement: "Engagement",
      engagementDescription: "Add questions or calls-to-action to boost engagement with your thread",
      generateEngagement: "Generate Engagement Boosters",
      addToThread: "Add to Thread",
      reset: "Reset",
      poweredBy: "Powered by Hugging Face AI models",
      summaryAdded: "Summary added",
      summaryAddedDescription: "The AI-generated summary has been added as the first post.",
      hashtagsAdded: "Hashtags added",
      hashtagsAddedDescription: "The AI-suggested hashtags have been added to your last post.",
      engagementAdded: "Engagement booster added",
      engagementAddedDescription: "The AI-generated engagement booster has been added as a new post.",
      noText: "No text provided",
      noTextDescription: "Please enter some text to generate AI enhancements.",
      error: "Error",
      errorDescription: "Failed to generate. Please try again.",
    },
  },
  es: {
    metadata: {
      title: "threadify - Formatea tu texto para hilos de redes sociales",
      description: "Divide tu texto largo en publicaciones perfectamente dimensionadas para hilos de redes sociales",
    },
    home: {
      title: "Generador de Hilos para Redes Sociales",
      description: "Divide tu texto largo en publicaciones perfectamente dimensionadas para hilos de redes sociales",
    },
    header: {
      formatText: "Formatea tu texto para hilos de redes sociales",
      platform: "Plataforma",
      language: "Idioma",
    },
    threadGenerator: {
      yourText: "Tu Texto",
      formatInstructions: "Formatea tu texto con estas herramientas antes de generar tu hilo",
      editor: "Editor",
      findReplace: "Buscar y Reemplazar",
      textareaPlaceholder: "Escribe o pega tu contenido aquí...",
      formatText: "Formatear Texto",
      generateThread: "Generar Hilo",
      generating: "Generando...",
      find: "Buscar",
      findPlaceholder: "Texto a buscar",
      replaceWith: "Reemplazar con",
      replacePlaceholder: "Texto de reemplazo",
      replaceAll: "Reemplazar Todo",
      yourThread: "Tu Hilo ({count} publicaciones)",
      characters: "caracteres",
      copy: "Copiar",
      copyAll: "Copiar Todo",
      share: "Compartir",
      reset: "Reiniciar",
      clearAll: "Borrar Todo",
      noTextTitle: "No hay texto",
      noTextDescription: "Por favor, introduce algún texto para generar un hilo.",
      threadGeneratedTitle: "Hilo generado",
      threadGeneratedDescription: "Tu texto ha sido dividido en publicaciones para el hilo.",
      noSearchTextTitle: "No hay texto de búsqueda",
      noSearchTextDescription: "Por favor, introduce texto para buscar.",
      textReplacedTitle: "Texto reemplazado",
      textReplacedDescription: 'Se reemplazó "{findText}" con "{replaceText}"',
      textFormattedTitle: "Texto formateado",
      textFormattedDescription: "Se han eliminado espacios y saltos de línea extra.",
      copiedTitle: "Copiado al portapapeles",
      copiedDescription: "El texto ha sido copiado a tu portapapeles.",
      copiedAllTitle: "Todo copiado al portapapeles",
      copiedAllDescription: "Todas las publicaciones del hilo han sido copiadas a tu portapapeles.",
      allClearedTitle: "Todo borrado",
      allClearedDescription: "Tu texto e hilos han sido borrados.",
      errorTitle: "Error ocurrido",
      errorDescription: "Hubo un error al generar tu hilo. Por favor, inténtalo de nuevo.",
    },
    footer: {
      copyright: "© {year} threadify. Todos los derechos reservados.",
      buyMeCoffee: "Invítame a un café",
      toolDescription: "Una herramienta para formatear publicaciones para múltiples plataformas sociales",
      privacyNotice:
        "threadify procesa todo el texto localmente en tu navegador. No almacenamos ni transmitimos tu contenido a ningún servidor.",
    },
    platforms: {
      twitter: "X (Twitter)",
      threads: "Threads",
      reddit: "Reddit",
      mastodon: "Mastodon",
      platformSpecificTips: "Consejos específicos de plataforma",
      twitterTip: "Mantenlo conciso. Usa hashtags con moderación.",
      threadsTip: "Similar a Twitter pero con más espacio. Ideal para pensamientos más largos.",
      redditTip: "Usa formato Markdown. Ideal para explicaciones detalladas.",
      mastodonTip: "Similar a Twitter. Considera la cultura de tu instancia.",
    },
    aiEnhancer: {
      title: "Mejora de Hilos con IA",
      description: "Usa IA para mejorar tu hilo con resúmenes, hashtags y potenciadores de engagement",
      summary: "Resumen",
      summaryDescription: "Genera un resumen conciso de tu hilo para usar como introducción",
      generateSummary: "Generar Resumen",
      addAsFirstPost: "Añadir como Primera Publicación",
      hashtags: "Hashtags",
      hashtagsDescription: "Obtén hashtags sugeridos por IA basados en tu contenido para aumentar la visibilidad",
      generateHashtags: "Generar Hashtags",
      addAllHashtags: "Añadir Todos los Hashtags",
      engagement: "Engagement",
      engagementDescription: "Añade preguntas o llamadas a la acción para aumentar el engagement con tu hilo",
      generateEngagement: "Generar Potenciadores de Engagement",
      addToThread: "Añadir al Hilo",
      reset: "Reiniciar",
      poweredBy: "Impulsado por modelos de IA de Hugging Face",
      summaryAdded: "Resumen añadido",
      summaryAddedDescription: "El resumen generado por IA ha sido añadido como primera publicación.",
      hashtagsAdded: "Hashtags añadidos",
      hashtagsAddedDescription: "Los hashtags sugeridos por IA han sido añadidos a tu última publicación.",
      engagementAdded: "Potenciador de engagement añadido",
      engagementAddedDescription:
        "El potenciador de engagement generado por IA ha sido añadido como nueva publicación.",
      noText: "No hay texto",
      noTextDescription: "Por favor, introduce algún texto para generar mejoras con IA.",
      error: "Error",
      errorDescription: "Error al generar. Por favor, inténtalo de nuevo.",
    },
  },
  fr: {
    metadata: {
      title: "threadify - Formatez votre texte pour les fils de médias sociaux",
      description:
        "Divisez votre long texte en publications parfaitement dimensionnées pour les fils de médias sociaux",
    },
    home: {
      title: "Générateur de Fils pour Médias Sociaux",
      description:
        "Divisez votre long texte en publications parfaitement dimensionnées pour les fils de médias sociaux",
    },
    header: {
      formatText: "Formatez votre texte pour les fils de médias sociaux",
      platform: "Plateforme",
      language: "Langue",
    },
    threadGenerator: {
      yourText: "Votre Texte",
      formatInstructions: "Formatez votre texte avec ces outils avant de générer votre fil",
      editor: "Éditeur",
      findReplace: "Rechercher et Remplacer",
      textareaPlaceholder: "Tapez ou collez votre contenu ici...",
      formatText: "Formater le Texte",
      generateThread: "Générer le Fil",
      generating: "Génération...",
      find: "Rechercher",
      findPlaceholder: "Texte à rechercher",
      replaceWith: "Remplacer par",
      replacePlaceholder: "Texte de remplacement",
      replaceAll: "Remplacer Tout",
      yourThread: "Votre Fil ({count} publications)",
      characters: "caractères",
      copy: "Copier",
      copyAll: "Tout Copier",
      share: "Partager",
      reset: "Réinitialiser",
      clearAll: "Tout Effacer",
      noTextTitle: "Aucun texte fourni",
      noTextDescription: "Veuillez entrer du texte pour générer un fil.",
      threadGeneratedTitle: "Fil généré",
      threadGeneratedDescription: "Votre texte a été divisé en publications pour le fil.",
      noSearchTextTitle: "Aucun texte de recherche",
      noSearchTextDescription: "Veuillez entrer du texte à rechercher.",
      textReplacedTitle: "Texte remplacé",
      textReplacedDescription: 'Remplacé "{findText}" par "{replaceText}"',
      textFormattedTitle: "Texte formaté",
      textFormattedDescription: "Les espaces et sauts de ligne supplémentaires ont été supprimés.",
      copiedTitle: "Copié dans le presse-papiers",
      copiedDescription: "Le texte a été copié dans votre presse-papiers.",
      copiedAllTitle: "Tout copié dans le presse-papiers",
      copiedAllDescription: "Toutes les publications du fil ont été copiées dans votre presse-papiers.",
      allClearedTitle: "Tout effacé",
      allClearedDescription: "Votre texte et vos fils ont été effacés.",
      errorTitle: "Erreur survenue",
      errorDescription: "Une erreur s'est produite lors de la génération de votre fil. Veuillez réessayer.",
    },
    footer: {
      copyright: "© {year} threadify. Tous droits réservés.",
      buyMeCoffee: "Offrez-moi un café",
      toolDescription: "Un outil pour formater des publications pour plusieurs plateformes sociales",
      privacyNotice:
        "threadify traite tout le texte localement dans votre navigateur. Nous ne stockons ni ne transmettons votre contenu à aucun serveur.",
    },
    platforms: {
      twitter: "X (Twitter)",
      threads: "Threads",
      reddit: "Reddit",
      mastodon: "Mastodon",
      platformSpecificTips: "Conseils spécifiques de plateforme",
      twitterTip: "Restez concis. Utilisez les hashtags avec modération.",
      threadsTip: "Similaire à Twitter mais avec plus d'espace. Idéal pour les pensées plus longues.",
      redditTip: "Utilisez le formatage Markdown. Idéal pour des explications détaillées.",
      mastodonTip: "Similaire à Twitter. Tenez compte de la culture de votre instance.",
    },
  },
  de: {
    metadata: {
      title: "threadify - Formatieren Sie Ihren Text für Social-Media-Threads",
      description: "Teilen Sie Ihren langen Text in perfekt dimensionierte Beiträge für Social-Media-Threads",
    },
    home: {
      title: "Social-Media-Thread-Generator",
      description: "Teilen Sie Ihren langen Text in perfekt dimensionierte Beiträge für Social-Media-Threads",
    },
    header: {
      formatText: "Formatieren Sie Ihren Text für Social-Media-Threads",
      platform: "Plattform",
      language: "Sprache",
    },
    threadGenerator: {
      yourText: "Ihr Text",
      formatInstructions: "Formatieren Sie Ihren Text mit diesen Tools, bevor Sie Ihren Thread generieren",
      editor: "Editor",
      findReplace: "Suchen & Ersetzen",
      textareaPlaceholder: "Geben Sie Ihren Inhalt hier ein oder fügen Sie ihn ein...",
      formatText: "Text formatieren",
      generateThread: "Thread generieren",
      generating: "Generiere...",
      find: "Suchen",
      findPlaceholder: "Zu suchender Text",
      replaceWith: "Ersetzen durch",
      replacePlaceholder: "Ersatztext",
      replaceAll: "Alle ersetzen",
      yourThread: "Ihr Thread ({count} Beiträge)",
      characters: "Zeichen",
      copy: "Kopieren",
      copyAll: "Alles kopieren",
      share: "Teilen",
      reset: "Zurücksetzen",
      clearAll: "Alles löschen",
      noTextTitle: "Kein Text vorhanden",
      noTextDescription: "Bitte geben Sie Text ein, um einen Thread zu generieren.",
      threadGeneratedTitle: "Thread generiert",
      threadGeneratedDescription: "Ihr Text wurde in Thread-Beiträge aufgeteilt.",
      noSearchTextTitle: "Kein Suchtext",
      noSearchTextDescription: "Bitte geben Sie Text zum Suchen ein.",
      textReplacedTitle: "Text ersetzt",
      textReplacedDescription: '"{findText}" wurde durch "{replaceText}" ersetzt',
      textFormattedTitle: "Text formatiert",
      textFormattedDescription: "Zusätzliche Leerzeichen und Zeilenumbrüche wurden entfernt.",
      copiedTitle: "In die Zwischenablage kopiert",
      copiedDescription: "Der Text wurde in Ihre Zwischenablage kopiert.",
      copiedAllTitle: "Alles in die Zwischenablage kopiert",
      copiedAllDescription: "Alle Thread-Beiträge wurden in Ihre Zwischenablage kopiert.",
      allClearedTitle: "Alles gelöscht",
      allClearedDescription: "Ihr Text und Ihre Threads wurden gelöscht.",
      errorTitle: "Fehler aufgetreten",
      errorDescription: "Bei der Generierung Ihres Threads ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
    },
    footer: {
      copyright: "© {year} threadify. Alle Rechte vorbehalten.",
      buyMeCoffee: "Spendieren Sie mir einen Kaffee",
      toolDescription: "Ein Tool zum Formatieren von Beiträgen für mehrere soziale Plattformen",
      privacyNotice:
        "threadify verarbeitet den gesamten Text lokal in Ihrem Browser. Wir speichern oder übertragen Ihre Inhalte nicht an einen Server.",
    },
    platforms: {
      twitter: "X (Twitter)",
      threads: "Threads",
      reddit: "Reddit",
      mastodon: "Mastodon",
      platformSpecificTips: "Plattformspezifische Tipps",
      twitterTip: "Halten Sie es kurz. Verwenden Sie Hashtags sparsam.",
      threadsTip: "Ähnlich wie Twitter, aber mit mehr Platz. Ideal für längeren Gedanken.",
      redditTip: "Verwenden Sie die Markdown-Formatierung. Ideal für detaillierte Erklärungen.",
      mastodonTip: "Ähnlich wie Twitter. Berücksichtigen Sie die Kultur Ihrer Instanz.",
    },
  },
  ja: {
    metadata: {
      title: "threadify - ソーシャルメディアスレッド用のテキストフォーマット",
      description: "長いテキストをソーシャルメディアスレッド用の完璧なサイズの投稿に分割",
    },
    home: {
      title: "ソーシャルメディアスレッドジェネレーター",
      description: "長いテキストをソーシャルメディアスレッド用の完璧なサイズの投稿に分割",
    },
    header: {
      formatText: "ソーシャルメディアスレッド用のテキストをフォーマット",
      platform: "プラットフォーム",
      language: "言語",
    },
    threadGenerator: {
      yourText: "あなたのテキスト",
      formatInstructions: "スレッドを生成する前にこれらのツールでテキストをフォーマットしてください",
      editor: "エディター",
      findReplace: "検索と置換",
      textareaPlaceholder: "ここにコンテンツを入力または貼り付け...",
      formatText: "テキストをフォーマット",
      generateThread: "スレッドを生成",
      generating: "生成中...",
      find: "検索",
      findPlaceholder: "検索するテキスト",
      replaceWith: "置換後",
      replacePlaceholder: "置換テキスト",
      replaceAll: "すべて置換",
      yourThread: "あなたのスレッド（{count}投稿）",
      characters: "文字",
      copy: "コピー",
      copyAll: "すべてコピー",
      share: "共有",
      reset: "リセット",
      clearAll: "すべてクリア",
      noTextTitle: "テキストがありません",
      noTextDescription: "スレッドを生成するためにテキストを入力してください。",
      threadGeneratedTitle: "スレッドが生成されました",
      threadGeneratedDescription: "テキストがスレッド投稿に分割されました。",
      noSearchTextTitle: "検索テキストがありません",
      noSearchTextDescription: "検索するテキストを入力してください。",
      textReplacedTitle: "テキストが置換されました",
      textReplacedDescription: '"{findText}"が"{replaceText}"に置換されました',
      textFormattedTitle: "テキストがフォーマットされました",
      textFormattedDescription: "余分なスペースと改行が削除されました。",
      copiedTitle: "クリップボードにコピーしました",
      copiedDescription: "テキストがクリップボードにコピーされました。",
      copiedAllTitle: "すべてクリップボードにコピーしました",
      copiedAllDescription: "すべてのスレッド投稿がクリップボードにコピーされました。",
      allClearedTitle: "すべてクリアしました",
      allClearedDescription: "テキストとスレッドがクリアされました。",
      errorTitle: "エラーが発生しました",
      errorDescription: "スレッドの生成中にエラーが発生しました。もう一度お試しください。",
    },
    footer: {
      copyright: "© {year} threadify. All rights reserved.",
      toolDescription: "複数のソーシャルプラットフォーム用の投稿をフォーマットするツール",
      privacyNotice:
        "threadifyはすべてのテキストをブラウザ内でローカルに処理します。あなたのコンテンツをサーバーに保存したり送信したりすることはありません。",
    },
    platforms: {
      twitter: "X (Twitter)",
      threads: "Threads",
      reddit: "Reddit",
      mastodon: "Mastodon",
      platformSpecificTips: "プラットフォーム固有のヒント",
      twitterTip: "簡潔に保ちます。ハッシュタグは控えめに使用してください。",
      threadsTip: "Twitterに似ていますが、スペースが広くなっています。より長い考えに最適です。",
      redditTip: "Markdown形式を使用してください。詳細な説明に最適です。",
      mastodonTip: "Twitterに似ています。インスタンスの文化を考慮してください。",
    },
  },
}

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (section: string, key: string, params?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")

  // Update localStorage keys
  // Load language preference from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("threadify-language")
      if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("threadify-language", language)
    }
  }, [language])

  const t = useCallback(
    (section: string, key: string, params?: Record<string, string | number>) => {
      const langData = translations[language as keyof typeof translations]
      if (!langData) return key

      const sectionData = langData[section as keyof typeof langData]
      if (!sectionData) return key

      let text = sectionData[key as keyof typeof sectionData] as string
      if (!text) return key

      // Replace parameters if provided
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          text = text.replace(`{${paramKey}}`, String(paramValue))
        })
      }

      return text
    },
    [language],
  )

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

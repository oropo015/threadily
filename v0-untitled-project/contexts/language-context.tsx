"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define the available languages
type Language = "en" | "es" | "fr" | "de" | "ja"

// Define the translations structure
type Translations = {
  [key in Language]: {
    [section: string]: {
      [key: string]: string
    }
  }
}

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (section: string, key: string, params?: Record<string, any>) => string
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations data
const translations: Translations = {
  en: {
    home: {
      title: "Create Perfect Social Media Threads",
      description: "Format your long text into perfectly-sized posts for Twitter, Threads, and LinkedIn.",
    },
    header: {
      formatText: "Format for:",
      platform: "Platform",
      language: "Language",
    },
    platforms: {
      twitter: "X (Twitter)",
      threads: "Threads",
      linkedin: "LinkedIn",
      reddit: "Reddit",
      mastodon: "Mastodon",
      facebook: "Facebook",
    },
    footer: {
      copyright: "© {year} Threadify. All rights reserved.",
      buyMeCoffee: "Buy me a coffee",
      toolDescription:
        "Threadify is a free tool to help you format your text for social media threads. Split your text into perfectly-sized posts for Twitter, Threads, LinkedIn, and more.",
      privacyNotice: "We don't store any of your data. All processing happens in your browser.",
    },
    editor: {
      placeholder: "Enter your text here...",
      splitButton: "Split Text",
      clearButton: "Clear",
      copyAllButton: "Copy All",
      copyButton: "Copy",
      characterCount: "{count} characters",
      postCount: "{count} posts",
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
  },
  es: {
    home: {
      title: "Crea Hilos Perfectos para Redes Sociales",
      description:
        "Formatea tu texto largo en publicaciones perfectamente dimensionadas para Twitter, Threads y LinkedIn.",
    },
    header: {
      formatText: "Formato para:",
      platform: "Plataforma",
      language: "Idioma",
    },
    platforms: {
      twitter: "X (Twitter)",
      threads: "Threads",
      linkedin: "LinkedIn",
      reddit: "Reddit",
      mastodon: "Mastodon",
      facebook: "Facebook",
    },
    footer: {
      copyright: "© {year} Threadify. Todos los derechos reservados.",
      buyMeCoffee: "Invítame a un café",
      toolDescription:
        "Threadify es una herramienta gratuita para ayudarte a formatear tu texto para hilos de redes sociales. Divide tu texto en publicaciones perfectamente dimensionadas para Twitter, Threads, LinkedIn y más.",
      privacyNotice: "No almacenamos ninguno de tus datos. Todo el procesamiento ocurre en tu navegador.",
    },
    editor: {
      placeholder: "Ingresa tu texto aquí...",
      splitButton: "Dividir Texto",
      clearButton: "Limpiar",
      copyAllButton: "Copiar Todo",
      copyButton: "Copiar",
      characterCount: "{count} caracteres",
      postCount: "{count} publicaciones",
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
  },
  fr: {
    home: {
      title: "Créez des Fils Parfaits pour les Réseaux Sociaux",
      description:
        "Formatez votre texte long en publications parfaitement dimensionnées pour Twitter, Threads et LinkedIn.",
    },
    header: {
      formatText: "Format pour :",
      platform: "Plateforme",
      language: "Langue",
    },
    platforms: {
      twitter: "X (Twitter)",
      threads: "Threads",
      linkedin: "LinkedIn",
      reddit: "Reddit",
      mastodon: "Mastodon",
      facebook: "Facebook",
    },
    footer: {
      copyright: "© {year} Threadify. Tous droits réservés.",
      buyMeCoffee: "Offrez-moi un café",
      toolDescription:
        "Threadify est un outil gratuit pour vous aider à formater votre texte pour les fils de réseaux sociaux. Divisez votre texte en publications parfaitement dimensionnées pour Twitter, Threads, LinkedIn et plus.",
      privacyNotice: "Nous ne stockons aucune de vos données. Tout le traitement se fait dans votre navigateur.",
    },
    editor: {
      placeholder: "Entrez votre texte ici...",
      splitButton: "Diviser le Texte",
      clearButton: "Effacer",
      copyAllButton: "Tout Copier",
      copyButton: "Copier",
      characterCount: "{count} caractères",
      postCount: "{count} publications",
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
  },
  de: {
    home: {
      title: "Erstellen Sie perfekte Social-Media-Threads",
      description:
        "Formatieren Sie Ihren langen Text in perfekt dimensionierte Beiträge für Twitter, Threads und LinkedIn.",
    },
    header: {
      formatText: "Format für:",
      platform: "Plattform",
      language: "Sprache",
    },
    platforms: {
      twitter: "X (Twitter)",
      threads: "Threads",
      linkedin: "LinkedIn",
      reddit: "Reddit",
      mastodon: "Mastodon",
      facebook: "Facebook",
    },
    footer: {
      copyright: "© {year} Threadify. Alle Rechte vorbehalten.",
      buyMeCoffee: "Spendiere mir einen Kaffee",
      toolDescription:
        "Threadify ist ein kostenloses Tool, das Ihnen hilft, Ihren Text für Social-Media-Threads zu formatieren. Teilen Sie Ihren Text in perfekt dimensionierte Beiträge für Twitter, Threads, LinkedIn und mehr.",
      privacyNotice: "Wir speichern keine Ihrer Daten. Die gesamte Verarbeitung erfolgt in Ihrem Browser.",
    },
    editor: {
      placeholder: "Geben Sie Ihren Text hier ein...",
      splitButton: "Text teilen",
      clearButton: "Löschen",
      copyAllButton: "Alles kopieren",
      copyButton: "Kopieren",
      characterCount: "{count} Zeichen",
      postCount: "{count} Beiträge",
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
  },
  ja: {
    home: {
      title: "完璧なソーシャルメディアスレッドを作成",
      description: "長いテキストをTwitter、Threads、LinkedInに最適なサイズの投稿に整形します。",
    },
    header: {
      formatText: "フォーマット：",
      platform: "プラットフォーム",
      language: "言語",
    },
    platforms: {
      twitter: "X (Twitter)",
      threads: "Threads",
      linkedin: "LinkedIn",
      reddit: "Reddit",
      mastodon: "Mastodon",
      facebook: "Facebook",
    },
    footer: {
      copyright: "© {year} Threadify. All rights reserved.",
      buyMeCoffee: "コーヒーをおごる",
      toolDescription:
        "Threadifyは、ソーシャルメディアスレッド用にテキストをフォーマットするための無料ツールです。テキストをTwitter、Threads、LinkedInなどに最適なサイズの投稿に分割します。",
      privacyNotice: "私たちはあなたのデータを保存しません。すべての処理はブラウザ内で行われます。",
    },
    editor: {
      placeholder: "ここにテキストを入力してください...",
      splitButton: "テキストを分割",
      clearButton: "クリア",
      copyAllButton: "すべてコピー",
      copyButton: "コピー",
      characterCount: "{count}文字",
      postCount: "{count}投稿",
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
  },
}

// Create the provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  // Function to translate text
  const t = (section: string, key: string, params?: Record<string, any>): string => {
    try {
      let text = translations[language][section][key] || `[${section}.${key}]`

      // Replace parameters if provided
      if (params) {
        Object.entries(params).forEach(([param, value]) => {
          text = text.replace(`{${param}}`, String(value))
        })
      }

      return text
    } catch (error) {
      console.error(`Translation error for ${language}.${section}.${key}:`, error)
      return `[${section}.${key}]`
    }
  }

  // Save language preference to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("threadify-language", language)
    }
  }, [language])

  // Load language preference from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("threadify-language") as Language
      if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
        setLanguage(savedLanguage)
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split("-")[0] as Language
        if (Object.keys(translations).includes(browserLang)) {
          setLanguage(browserLang)
        }
      }
    }
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Create a custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

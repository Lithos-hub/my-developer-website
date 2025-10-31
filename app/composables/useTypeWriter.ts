interface UseTypeWriterProps {
  texts: readonly string[];
  delay: number;
  speed: number;
  caretAnimation?: boolean;
  caretSymbol?: string;
  caretSpeed?: number;
  persistLines?: boolean[];
  count?: number;
}

export const useTypeWriter = ({
  texts,
  delay,
  speed,
  caretAnimation = false,
  caretSymbol = "|",
  caretSpeed = 500,
  persistLines = [],
  count = 1,
}: UseTypeWriterProps) => {
  const textRef = ref("");
  const isTyping = ref(false);
  const caret = ref("");
  const isCompleted = ref(false);
  const currentCount = ref(0);
  const showCaret = ref(true);

  // Manage the caret animation
  const startCaretAnimation = () => {
    if (!caretAnimation) {
      caret.value = "";
      return;
    }

    const caretInterval = setInterval(() => {
      caret.value = showCaret.value
        ? caret.value === caretSymbol
          ? ""
          : caretSymbol
        : "";
    }, caretSpeed);

    return caretInterval;
  };

  const startTyping = async () => {
    isTyping.value = true;
    textRef.value = "";
    isCompleted.value = false;
    currentCount.value = 0;
    showCaret.value = true;

    const caretInterval = startCaretAnimation();

    while (currentCount.value < count) {
      currentCount.value++;

      if (currentCount.value > 1) {
        textRef.value = "";
        showCaret.value = true;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        const shouldPersist = persistLines[i] || false;

        showCaret.value = true;

        if (speed === 0) {
          textRef.value += text;
        } else {
          for (let j = 0; j < text.length; j++) {
            textRef.value += text[j];
            await new Promise((resolve) => setTimeout(resolve, speed));
          }
        }

        showCaret.value = false;

        if (i < texts.length - 1 || !shouldPersist) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          if (!shouldPersist) {
            textRef.value = "";
          }
        }
      }

      if (currentCount.value < count) {
        await new Promise((resolve) => setTimeout(resolve, delay * 2));
      }
    }

    isTyping.value = false;
    isCompleted.value = true;
    showCaret.value = false;

    if (caretInterval) {
      clearInterval(caretInterval);
      caret.value = "";
    }
  };

  const displayText = computed(() => {
    if (!caretAnimation) {
      return textRef.value;
    }
    return `${textRef.value}${caret.value}`;
  });

  return {
    text: displayText,
    isTyping,
    isCompleted,
    startTyping,
    currentCount,
  };
};

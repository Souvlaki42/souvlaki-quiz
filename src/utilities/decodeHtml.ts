export default function (rawText: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = rawText;
    return textarea.value;
}
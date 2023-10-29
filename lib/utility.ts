export const textToLink = (text: string) => {
    return text.replace(/\s/g, "-").toLowerCase();
}
export default function getInitials(name: string) {
  if (!name) return "";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0][0]?.toUpperCase() || "";
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

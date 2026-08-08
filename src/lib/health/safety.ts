const restrictedPatterns = [
  'diagnose',
  'cure',
  'treat disease',
  'stop medication',
  'replace doctor',
];

export function isUnsafeHealthRequest(text: string) {
  const value = text.toLowerCase();

  return restrictedPatterns.some((pattern) =>
    value.includes(pattern),
  );
}

export function healthSafetyMessage() {
  return (
    'Forestheals provides educational wellness information, not a medical diagnosis or a replacement for professional medical care.'
  );
}

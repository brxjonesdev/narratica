export function deleteCharacterByID(narrativeID: string): Promise<{ ok: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ok: true });
    }, 1000);
  });
}
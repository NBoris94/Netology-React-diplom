export function load(KEY) {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return null;
    return JSON.parse(serializedState);
  } catch (e) {
    return null;
  }
}

export function save(KEY, state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}
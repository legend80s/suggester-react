export default function findChildIndex(child) {
  let i = 0;
  let prev = child.previousSibling;

  while (prev !== null) {
    i += 1;
    prev = prev.previousSibling;
  }

  return i;
}

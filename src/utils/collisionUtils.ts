export const checkCollision = (a: any, b: any) => {
  const ax = a.x;
  const ay = a.y;
  const bx = b.x;
  const by = b.y;

  const width = 100; // width/height of sprite (adjust if needed)
  const height = 100;

  const aLeft = ax - width / 2;
  const aRight = ax + width / 2;
  const aTop = ay - height / 2;
  const aBottom = ay + height / 2;

  const bLeft = bx - width / 2;
  const bRight = bx + width / 2;
  const bTop = by - height / 2;
  const bBottom = by + height / 2;

  return !(
    aRight < bLeft ||
    aLeft > bRight ||
    aBottom < bTop ||
    aTop > bBottom
  );
};

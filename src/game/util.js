export function aabb(rect1, rect2) {
  let r_top = rect1.y;
  let r_bot = rect1.y + rect1.height;
  let l_top = rect2.y;
  let l_bot = rect2.y + rect2.height;
  let r1_x = rect1.x;
  let r2_x = rect1.x + rect1.width;
  let l1_x = rect2.x;
  let l2_x = rect2.x + rect2.width;
  
  if (r_bot < l_top || l_bot < r_top)
    return false;

  if (r1_x > l2_x || l1_x > r2_x)
    return false;

  return true;
}

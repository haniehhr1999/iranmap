export const sortPointsAroundCenter = (
  points: [number, number][]
): [number, number][] => {
  if (points.length < 3) {
    return points;
  }

  const centerLat =
    points.reduce((sum, point) => sum + point[0], 0) /
    points.length;

  const centerLng =
    points.reduce((sum, point) => sum + point[1], 0) /
    points.length;

  return [...points].sort((a, b) => {
    const angleA = Math.atan2(
      a[0] - centerLat,
      a[1] - centerLng
    );

    const angleB = Math.atan2(
      b[0] - centerLat,
      b[1] - centerLng
    );

    return angleA - angleB;
  });
};
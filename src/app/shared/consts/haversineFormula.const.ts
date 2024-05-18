export const haversineFormula = (lat1: number, lng1: number, lat2: number, lng2: number, unit: 'km' | 'meters' = 'km') => {
  const R = 6371e3;
  const p1 = lat1 * Math.PI / 180;
  const p2 = lat2 * Math.PI / 180;
  const deltaLon = lng2 - lng1;
  const deltaLambda = (deltaLon * Math.PI) / 180;
  const d = Math.acos(
    Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
  ) * R;

  if (unit === 'meters') {
    return Math.floor(d);
  }
  return Math.floor(d / 1000);
}

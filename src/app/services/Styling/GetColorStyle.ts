import {LimitType} from "../../models/RestApi/SolidityFinderModels.model";

export function getSolidityDistanceColor(limitType: LimitType, upToPrice: number  ) {
  if (upToPrice < 0) {
    return "bg-white"
  }

  if (limitType === 'asks') {
    if (upToPrice >= 3) {
      return 'bg-green-400';
    } else if (upToPrice >= 1 && upToPrice < 3) {
      return 'bg-green-600';
    } else if (upToPrice >= 0 && upToPrice < 1) {
      return 'bg-green-800';
    }
  } else {
    if (upToPrice >= 3) {
      return 'bg-red-400';
    } else if (upToPrice >= 1 && upToPrice < 3) {
      return 'bg-red-600';
    } else if (upToPrice >= 0 && upToPrice < 1) {
      return 'bg-red-800';
    }
  }
  return '';
}

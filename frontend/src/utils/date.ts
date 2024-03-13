export const formatDate = (date: Date | string) => {
  const dateObj = date instanceof Date ? date : new Date(date);

  const diff = new Date().getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diff / 1000 / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInYears > 0) {
    return `${diffInYears}an`;
  }
  if (diffInMonths > 0) {
    return `${diffInMonths}m`;
  }
  if (diffInDays > 0) {
    return `${diffInDays}j`;
  }
  if (diffInHours > 0) {
    return `${diffInHours}h`;
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes}m`;
  }
  return "maintenant";
};
export const formatProfilDate = (date: Date | string) => {
  const dateObj = date instanceof Date ? date : new Date(date);

  const diff = new Date().getTime() - dateObj.getTime();
  const diffInMinutes = Math.floor(diff / 1000 / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInYears > 0 && diffInYears < 2) {
    return `${diffInYears} year`;
  }
  if (diffInYears > 1) {
    return `${diffInYears} years`;
  }
  if (diffInMonths > 0 && diffInMonths < 2) {
    return `${diffInMonths} month`;
  }
  if (diffInMonths > 1) {
    return `${diffInMonths} months`;
  }
  if (diffInDays > 0 && diffInDays < 2) {
    return `${diffInDays} day`;
  }
  if (diffInDays > 1) {
    return `${diffInDays} days`;
  }
  if (diffInHours > 0 && diffInHours < 2) {
    return `${diffInHours} hour`;
  }
  if (diffInHours > 1) {
    return `${diffInHours} hours`;
  }
  if (diffInMinutes > 0 && diffInMinutes < 2) {
    return `${diffInMinutes} minute`;
  }
  if (diffInMinutes > 1) {
    return `${diffInMinutes} minute`;
  }
  return "now";
};

export const dateParser = (num: Date | string) => {
  let timestamp: number = 0;

  if (num instanceof Date) {
    // Si num est de type Date, pas besoin de le parser
    timestamp = num.getTime();
  } else {
    // Si num est de type string, le parser
    timestamp = Date.parse(num);
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    // weekday: "long",
    second: "2-digit",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour12: false,
  };

  // const timestamp = Date.parse(num);

  const date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString().split(",").join(", à");
};

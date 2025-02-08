const getTimeOfDay = () => {
  const now = new Date();
  const timeInHours = now.getHours();
  if (timeInHours < 12) return "this morning";
  if (timeInHours >= 12 && timeInHours <= 17) return "this afternoon";
  return "tonight";
};

export default getTimeOfDay;

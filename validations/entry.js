// if (!Date || !Time || !Author || !Content) {
//   return res.status(400).json({ error: "Missing required fields" });
// }

const checkDate = (req, res, next) => {
  if (req.body.Date) next();
  res.status(404).json({ error: "Date is Required" });
};

const checkTime = (req, res, next) => {
  if (req.body.Time) next();
  res.status(404).json({ error: "Time is Required" });
};

const checkAuthor = (req, res, next) => {
    if (req.body.Author) next();
    res.status(404).json({ error: "Author is Required" });
}

const checkContent = (req, res, next) => {
    if (req.body.Content) next();
    res.status(404).json({ error: "Content is Required" });
}


module.exports =  {checkDate, checkTime, checkAuthor, checkContent}
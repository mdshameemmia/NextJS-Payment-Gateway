
const StandardDateFormat2 = (date) => {
    let dateAndTime = date.split("T");
    let dateArr = dateAndTime[0].split("-");
    const num = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const exactDate = month[num.indexOf(dateArr[1])] + " , " + dateArr[0];
    const finalDate = exactDate;
    return finalDate;
}

export default StandardDateFormat2
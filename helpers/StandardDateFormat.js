
const StandardDateFormat = (date) => {
    let dateAndTime = date.split("T");
    let dateArr = dateAndTime[0].split("-");
    let timeArr = dateAndTime[1].split(":");
    let timeIntoMilisecond = (timeArr[0]*60*60*1000) + (timeArr[1]*60*1000);
    const convertTime = new Date(timeIntoMilisecond);
    const exactTime =  convertTime.toLocaleTimeString();
    const exactDate = dateArr[2]+"/"+dateArr[1] + "/" + dateArr[0];
    const finalDate = exactDate;
    return finalDate;
}

export default StandardDateFormat
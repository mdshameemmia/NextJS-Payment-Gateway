const FloorNameFormat = (floor) => {
    
    if(floor == 0){
        return "Ground Floor";
    }else if(floor == 1){
        return "1st Floor";
    }else if(floor== 2){
        return "2nd Floor";
    }else if(floor==3){
        return "3rd Floor";
    }else {
        return floor+"th Floor"
    }
}

export default FloorNameFormat
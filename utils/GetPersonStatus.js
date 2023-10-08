const GetPersonStatus = (status) => {
    const customeImageStyle = { "width": "15px", "height": "15px", "borderRadius": "100%" };

    if (status === undefined) {
        return <img src='/signal-images/red_signal.gif' style={customeImageStyle} />
    } else if (status === 1) {
        return <img src='/signal-images/green_signal.gif' style={customeImageStyle} />
    } else if (status === 2) {
        return <img src='/signal-images/yellow_signal.gif' style={customeImageStyle} />
    } else if (status === 3) {
        return <img src='/signal-images/red_signal.gif' style={customeImageStyle} />
    } else {
        return <img src='/signal-images/red_signal.gif' style={customeImageStyle} />
    }
}

export default GetPersonStatus
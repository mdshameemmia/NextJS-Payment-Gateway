const GenerateRandomString = () => {
    return Math.floor(Math.random() * Date.now()).toString(36).toUpperCase();
};

export default GenerateRandomString;